# Tip Drip

Tip Drip is a simple and secure tipping platform designed for valet drivers, golf course staff, or similar service workers. Staff members wear NFC-enabled wristbands that guests can tap with their phones to quickly and easily send tips via Stripe.

## How It Works

1. Each wristband contains an NFC chip programmed with a unique URL linked to a staff member's tipping page.
2. Staff sign up and register their wristband's unique ID to associate it with their account.
3. When a guest taps the wristband, their phone opens the unique URL and redirects them to a Stripe Checkout page to send a tip.
4. All payments are processed securely through Stripe Connect, ensuring funds go directly to the staff member's Stripe account.
5. The platform tracks and logs all payments for reporting and management purposes.

## Tech Stack

- **Next.js** — Frontend and backend API routes built with React and Node.js for server-side rendering and seamless API integration.
- **Stripe Connect** — Payment processing and payouts for connected accounts with hosted Checkout sessions.
- **MongoDB** — Database for storing users, wristband unique IDs, and payment records.
- **NFC Technology** — Wristbands equipped with NFC chips storing URLs that link directly to tipping pages.
- **TypeScript** — Typed JavaScript for safer, more maintainable code.
- **Deployment** — Coming soon.
