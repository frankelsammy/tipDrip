// app/api/stripe/webhook/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";
import clientPromise from "@/lib/mongodb";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-06-30.basil",
});

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature");
  const body = await req.text();
  console.log("WEBHOOK HIT");
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error("Stripe signature failed:", err.message);
    return new NextResponse("Invalid signature", { status: 400 });
  }

  console.log("Stripe event:", event.type);

  // Only trust money-confirmed events
  if (event.type === "payment_intent.succeeded") {
    const pi = event.data.object as Stripe.PaymentIntent;

    const amount = pi.amount / 100;
    const username = pi.metadata?.username;
    const account_id = pi.metadata?.account_id;

    if (!username || !account_id) {
      console.error("Missing metadata on PaymentIntent", pi.id);
      return NextResponse.json({ received: true });
    }

    const client = await clientPromise;
    const db = client.db("tipdrip");

    // 🔒 Idempotency: prevent duplicate inserts
    const existing = await db
      .collection("tip-history")
      .findOne({ paymentIntentId: pi.id });

    if (existing) {
      console.log("⚠️ Duplicate webhook ignored:", pi.id);
      return NextResponse.json({ received: true });
    }

    try {
         await db.collection("tip-history").insertOne({
      username,
      account_id,
      amount,
      date: new Date()
    });


      console.log("Tip saved:", pi.id);
    } catch (err) {
      console.error("Mongo insert failed:", err);
    }
  }

  return NextResponse.json({ received: true });
}
