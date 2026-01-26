// app/api/checkout/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
});



export async function POST(req: Request) {
  try {
    const origin = req.headers.get('origin') || 'http://localhost:3000';
    const { amount, account_id, username } = await req.json();

    if (!account_id) {
      return NextResponse.json({ error: 'Missing accountId' }, { status: 400 });
    }

    if (!amount || typeof amount !== 'number') {
      return NextResponse.json({ error: 'Missing or invalid amount' }, { status: 400 });
    }

    const unit_amount = Math.round(amount); // Make sure it’s in cents

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: 'Custom Tip' },
            unit_amount, // amount in cents
          },
          quantity: 1,
        },
      ],
      payment_intent_data: {
        transfer_data: { destination: account_id },
      },
      success_url: `${origin}/success`,
      cancel_url: `${origin}/tip/${username}`,
      metadata: {
        username,
        account_id,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Stripe error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
