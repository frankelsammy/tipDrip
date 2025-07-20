// app/page.tsx
'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CheckoutPage() {
  const [amount, setAmount] = useState('');

  const handleCheckout = async () => {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ unit_amount: Number(amount) }),
    });

    const data = await res.json();
    const stripe = await stripePromise;
    await stripe?.redirectToCheckout({ sessionId: data.sessionId });
  };

  return (
    <main className="p-8">
      <h1 className="text-2xl mb-4">Buy My Product</h1>
      <input
        type="number"
        placeholder="Amount in cents"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        className="border px-3 py-2 rounded mb-4"
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleCheckout}
        type="button"
      >
        Checkout
      </button>
    </main>
  );
}
