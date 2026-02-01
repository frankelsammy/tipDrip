import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export interface CheckoutResponse {
  sessionId: string;
  error?: string;
}

export const useStripeCheckout = () => {
  const checkout = async (amount: number, account_id: string, username: string) => {
    const response = await fetch('/api/checkout', {
      method: 'POST',
      body: JSON.stringify({ amount, stripeAccountId: account_id, username }),
    });

    const data = await response.json();
    
    if (!response.ok || data.error) {
      console.error("Checkout error:", data.error || "Failed to get checkout URL");
      return;
    }

    if (data.url) {
      window.location.href = data.url;
    } else {
      console.error("Failed to get checkout URL");
    }
  };

  return checkout;
};
