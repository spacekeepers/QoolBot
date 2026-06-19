# QoolBot

A Next.js app with real user accounts and Stripe-powered Pro subscriptions.

## Features

- Email/password signup and login with hashed passwords (bcrypt) and signed, httpOnly session cookies (jose).
- Protected `/dashboard` route via `proxy.ts`.
- Stripe Checkout for upgrading to the Pro plan, with a webhook handler that syncs subscription status back to the user record.
- Stripe Billing Portal for managing an existing subscription.

## Stack

- Next.js 16 (App Router) + React 19
- Prisma 7 with SQLite (via the `@prisma/adapter-better-sqlite3` driver adapter) for local dev
- Stripe Node SDK (Checkout Sessions, Billing Portal, Webhooks)

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file (gitignored) with:

   ```bash
   DATABASE_URL="file:./dev.db"
   SESSION_SECRET="<openssl rand -base64 32>"
   STRIPE_SECRET_KEY="sk_test_..."
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
   STRIPE_WEBHOOK_SECRET="whsec_..."
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   ```

   `STRIPE_WEBHOOK_SECRET` comes from the Stripe Dashboard webhook endpoint config, or from `stripe listen --print-secret` when testing locally with the Stripe CLI. Optionally set `STRIPE_PRICE_ID_PRO` to use a pre-created Stripe Price instead of the inline $19/mo price defined in `app/lib/stripe.ts`.

3. Set up the database:

   ```bash
   npx prisma migrate deploy
   ```

4. Run the dev server:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

5. To receive Stripe webhooks locally, forward events with the Stripe CLI:

   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```

## Project layout

- `app/lib/session.ts`, `app/lib/dal.ts`, `app/lib/actions.ts` — auth (sessions, data access layer, signup/login/logout server actions).
- `app/lib/stripe.ts` — Stripe client and Pro plan pricing.
- `app/api/checkout`, `app/api/billing-portal`, `app/api/webhooks/stripe` — Stripe Checkout, Billing Portal, and webhook routes.
- `proxy.ts` — route protection for `/dashboard`, `/login`, `/signup`.
- `prisma/schema.prisma` — the `User` model.
