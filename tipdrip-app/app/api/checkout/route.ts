// app/api/checkout/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil' as any,
});

export async function POST(req: Request) {
  try {
    const origin = req.headers.get('origin') || 'http://localhost:3000';
    const { amount, stripeAccountId, username } = await req.json();

    if (!stripeAccountId) {
      return NextResponse.json({ error: 'Missing stripeAccountId' }, { status: 400 });
    }

    if (!amount || typeof amount !== 'number') {
      return NextResponse.json({ error: 'Missing or invalid amount' }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      // 👇 ADD THIS: Top-level metadata for the Checkout Session
      metadata: {
        username,
        stripeAccountId,
      },
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Tip for ${username}`,
            },
            unit_amount: amount, // Note: Ensure this is in cents (amount * 100)
          },
          quantity: 1,
        },
      ],
      payment_intent_data: {
        transfer_data: {
          destination: stripeAccountId
        },
        // This metadata goes to the PaymentIntent (good for Stripe Dashboard)
        metadata: {
          username,
          stripeAccountId,
        },
      },
      success_url: `${origin}/success`,
      cancel_url: `${origin}/tip/${username}`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}