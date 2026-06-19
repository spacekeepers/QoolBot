import "server-only";

import Stripe from "stripe";

let stripeInstance: Stripe | undefined;

export function getStripe() {
  if (!stripeInstance) {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      throw new Error("STRIPE_SECRET_KEY environment variable is not set");
    }
    stripeInstance = new Stripe(secretKey);
  }
  return stripeInstance;
}

// Pro plan: $19/mo. Defined inline so no pre-created Stripe Price object is
// required; set STRIPE_PRICE_ID_PRO to use a specific Price instead.
export const PRO_PLAN = {
  name: "QoolBot Pro",
  amountUsd: 1900,
  interval: "month" as const,
};
