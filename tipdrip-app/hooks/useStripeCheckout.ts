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
      body: JSON.stringify({ amount, account_id, username }),
    });

    const { url } = await response.json();

    if (url) {
      window.location.href = url; // This replaces stripe.redirectToCheckout
    } else {
      console.error("Failed to get checkout URL");
    }
  };

  return checkout;
};
