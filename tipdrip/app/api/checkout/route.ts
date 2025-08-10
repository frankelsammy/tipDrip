// app/api/checkout/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
});



export async function POST(req: Request) {
  try {
    const origin = req.headers.get('origin') || 'http://localhost:3000';
    const { unit_amount = 2000, account_id } = await req.json();

    if (!account_id) {
      return NextResponse.json({ error: 'Missing accountId' }, { status: 400 });
    } else {
      console.log('At checkout: account_id', account_id);
    }

const session = await stripe.checkout.sessions.create({
  payment_method_types: ['card'],
  mode: 'payment',
  line_items: [
    {
      price_data: {
        currency: 'usd',
        product_data: { name: 'Example Product' },
        unit_amount,
      },
      quantity: 1,
    },
  ],
  payment_intent_data: {
    transfer_data: { destination: account_id },
  },
  success_url: `${origin}/success`,
  cancel_url: `${origin}/cancel`,
});


    return NextResponse.json({ sessionId: session.id });
  } catch (error: any) {
    console.error('Stripe error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
