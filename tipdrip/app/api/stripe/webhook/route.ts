// app/api/stripe/webhook/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import clientPromise from '@/lib/mongodb';

// export const config = {
//   api: {
//     bodyParser: false, // Required for Stripe signatures
//   },
// };

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
});

export async function POST(req: Request) {
  console.log('stripe-webhook: request received', {
    method: req.method,
    headers: { 'stripe-signature': req.headers.get('stripe-signature') ?? null },
  });

  const sig = req.headers.get('stripe-signature');
  const body = await req.text();

  console.log("raw body length", body.length);

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
    console.log("stripe-webhook: signature verified, event type =", event.type);
  } catch (err: any) {
    console.error("stripe-webhook: signature verification failed", err.message);
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  // Handle event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const amount = (session.amount_total ?? 0) / 100;
    const username = session.metadata?.username;
    const account_id = session.metadata?.account_id;

    console.log("Webhook: received session", session.id);

    // Save to database
    const client = await clientPromise;
    const db = client.db("tipdrip");

    await db.collection("tip-history").insertOne({
      username,
      account_id,
      amount,
      date: new Date(),
      sessionId: session.id,
    });

    console.log("Saved to mongo.");
  }

  return NextResponse.json({ received: true });
}
