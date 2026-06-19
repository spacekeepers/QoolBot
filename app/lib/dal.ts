import "server-only";

import { cache } from "react";
import { redirect } from "next/navigation";
import { getSessionPayload } from "@/app/lib/session";
import { prisma } from "@/app/lib/prisma";

export const verifySession = cache(async () => {
  const payload = await getSessionPayload();
  if (!payload?.userId) {
    return null;
  }
  return { isAuth: true, userId: payload.userId };
});

export const requireSession = cache(async () => {
  const session = await verifySession();
  if (!session) {
    redirect("/login");
  }
  return session;
});

// Returns only the fields safe to expose to the client (no password hash).
export const getCurrentUser = cache(async () => {
  const session = await verifySession();
  if (!session) return null;

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: {
      id: true,
      name: true,
      email: true,
      plan: true,
      stripeCustomerId: true,
      stripeSubscriptionStatus: true,
    },
  });

  return user;
});
