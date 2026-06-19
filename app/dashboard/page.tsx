import { requireSession, getCurrentUser } from "@/app/lib/dal";
import { UpgradeButton, ManageBillingButton } from "@/app/dashboard/billing-actions";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  await requireSession();
  const user = await getCurrentUser();
  const { checkout } = await searchParams;

  if (!user) return null;

  const isPro = user.plan === "pro";

  return (
    <main className="dashboard container">
      <div className="dashboard-header">
        <h1>Welcome, {user.name}</h1>
        <p>{user.email}</p>
      </div>

      {checkout === "success" && (
        <div className="form-success">Payment successful! Your plan has been updated.</div>
      )}
      {checkout === "cancelled" && <div className="form-error">Checkout was cancelled.</div>}

      <div className="card" style={{ maxWidth: 480 }}>
        <h3>
          Plan: <span className={`plan-badge ${isPro ? "pro" : ""}`}>{isPro ? "Pro" : "Free"}</span>
        </h3>
        <p style={{ marginBottom: 20 }}>
          {isPro
            ? "You have full access to QoolBot Pro features."
            : "Upgrade to Pro for unlimited Q&A and priority support."}
        </p>
        {isPro ? <ManageBillingButton /> : <UpgradeButton />}
      </div>
    </main>
  );
}
