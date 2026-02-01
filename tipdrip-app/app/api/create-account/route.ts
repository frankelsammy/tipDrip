import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import clientPromise from "@/lib/mongodb";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil' as any,
});

export async function POST(request: NextRequest) {
  try {

    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return new Response('Unauthorized', { status: 401 });
    }

    // Create the Stripe Express account
    const account = await stripe.accounts.create({
      type: 'express',
    });

    // Store the account.id in MongoDB
    const client = await clientPromise;
    const db = client.db("tipdrip");
    
    await db.collection("users").updateOne(
      { email: session.user.email },
      { $set: { stripeAccountId: account.id } }
    );

    // Create the onboarding link
    const origin = request.headers.get('origin') || 'http://localhost:3000';

    const accountLink = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: `${origin}/onboarding/setup`, // Send them back to setup to re-verify session
      return_url: `${origin}/onboarding/setup`,  // Send them back to setup to trigger the /history redirect
      type: 'account_onboarding',
    });

    return NextResponse.json({ url: accountLink.url });
  } catch (error) {
    console.error('Stripe/DB error:', error);
    return new Response('Error processing request', { status: 500 });
  }
}