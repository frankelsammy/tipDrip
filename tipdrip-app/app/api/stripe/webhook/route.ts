// app/api/stripe/webhook/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";
import clientPromise from "@/lib/mongodb";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-06-30.basil" as any,
});

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature");
  const body = await req.text();
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !endpointSecret) {
    return new NextResponse("Missing signature or secret", { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err: any) {
    console.error("❌ Signature failed:", err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  console.log("🔔 Event Received:", event.type);

  // For Destination Charges, we primarily want checkout.session.completed
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    // 1. Extract info from metadata
    const amount = (session.amount_total || 0) / 100;
    const username = session.metadata?.username;
    
    // 2. Account ID could be in metadata OR the 'account' field of the event
    const stripeAccountId = 
      session.metadata?.stripeAccountId || 
      session.metadata?.account_id || 
      (event as any).account;

    if (!username) {
      console.warn("⚠️ Session completed but no username found in metadata. Skipping DB insert.");
      return NextResponse.json({ received: true });
    }

    try {
      const client = await clientPromise;
      const db = client.db("tipdrip");

      // 3. Idempotency Check
      const existing = await db.collection("tip-history").findOne({ sessionId: session.id });
      
      if (existing) {
        console.log("ℹ️ Duplicate event ignored:", session.id);
        return NextResponse.json({ received: true });
      }

      // 4. Insert into DB
      await db.collection("tip-history").insertOne({
        username: username.toLowerCase(),
        stripeAccountId,
        amount,
        sessionId: session.id,
        status: "success",
        date: new Date(),
      });

      console.log(`✅ SUCCESS: $${amount} tip saved for @${username}`);
    } catch (err) {
      console.error("❌ MongoDB Error:", err);
      return new NextResponse("Database Error", { status: 500 });
    }
  }

  // Always return a 200 to Stripe for unhandled events to stop retries
  return NextResponse.json({ received: true });
}