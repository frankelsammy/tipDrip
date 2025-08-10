import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export interface CheckoutResponse {
  sessionId: string;
  error?: string;
}

export function useStripeCheckout() {
  const checkout = async (amount: number, accountId : string) => {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ unit_amount: Number(amount), account_id: accountId, }),
    });

    const data: CheckoutResponse = await res.json();
    if (!data.sessionId) {
      alert(data.error || 'Failed to create checkout session.');
      return;
    }
    const stripe = await stripePromise;
    await stripe?.redirectToCheckout({ sessionId: data.sessionId });
  };

  return checkout;
}
