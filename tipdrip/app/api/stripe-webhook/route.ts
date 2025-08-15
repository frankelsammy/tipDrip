import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import clientPromise from '@/lib/mongodb';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
});

export async function POST(req: Request) {
  const sig = req.headers.get('stripe-signature')!;
  const body = await req.text();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const amount = (session.amount_total ?? 0) / 100;
    const username = session.metadata?.username;
    const account_id = session.metadata?.account_id;
    const date = new Date();

    // Log before uploading to database
    console.log(`Uploading tip to database: username=${username}, account_id=${account_id}, amount=${amount}, date=${date.toISOString()}, sessionId=${session.id}`);

    // Save to MongoDB
    const client = await clientPromise;
    const db = client.db('tipdrip');
    await db.collection('tip-history').insertOne({
      username,
      account_id,
      amount,
      date,
      sessionId: session.id,
    });
  }

  return NextResponse.json({ received: true });
}