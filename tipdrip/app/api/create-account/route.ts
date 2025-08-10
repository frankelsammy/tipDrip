// /app/api/create-account-link/route.ts
import { NextRequest } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
});

export async function POST(request: NextRequest) {
  try {
    // Step 1: Create Express account
    const account = await stripe.accounts.create({
      type: 'express',
    });

    // Step 2: Create onboarding link
    const origin = request.headers.get('origin') || 'http://localhost:3000';

    const accountLink = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: `${origin}/onboarding/refresh`,
      return_url: `${origin}/onboarding/return`,
      type: 'account_onboarding',
    });

    // Store account.id in your DB associated with the user

    return Response.json({ url: accountLink.url });
  } catch (error) {
    console.error('Stripe error:', error);
    return new Response('Error connecting to Stripe', { status: 500 });
  }
}
