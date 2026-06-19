import Link from "next/link";
import { getCurrentUser } from "@/app/lib/dal";

const features = [
  {
    title: "Instant answers",
    description: "Ask QoolBot anything about your codebase and get a clear, accurate answer.",
  },
  {
    title: "Built for teams",
    description: "Share an account and keep everyone working from the same context.",
  },
  {
    title: "Secure by default",
    description: "Your data stays yours. Sessions are encrypted and passwords are hashed.",
  },
];

export default async function Home() {
  const user = await getCurrentUser();

  return (
    <main>
      <section className="hero container">
        <h1>Your AI coding companion</h1>
        <p>
          QoolBot helps you ship faster with answers, explanations, and code review,
          right where you work.
        </p>
        <div className="hero-actions">
          {user ? (
            <Link href="/dashboard" className="btn btn-primary">
              Go to dashboard
            </Link>
          ) : (
            <>
              <Link href="/signup" className="btn btn-primary">
                Get started free
              </Link>
              <Link href="/login" className="btn btn-secondary">
                Log in
              </Link>
            </>
          )}
        </div>
      </section>

      <section className="section container">
        <h2>Why QoolBot</h2>
        <p className="section-subtitle">Everything you need to move faster, nothing you don&apos;t.</p>
        <div className="features-grid">
          {features.map((feature) => (
            <div className="card" key={feature.title}>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section container" id="pricing">
        <h2>Simple pricing</h2>
        <p className="section-subtitle">Start free. Upgrade when you need more.</p>
        <div className="pricing-grid">
          <div className="pricing-card">
            <h3>Free</h3>
            <div className="pricing-price">
              $0<span>/mo</span>
            </div>
            <ul className="pricing-features">
              <li>Basic Q&amp;A</li>
              <li>Community support</li>
              <li>Limited usage</li>
            </ul>
            <Link href={user ? "/dashboard" : "/signup"} className="btn btn-secondary">
              {user ? "Current plan" : "Sign up free"}
            </Link>
          </div>

          <div className="pricing-card featured">
            <span className="pricing-badge">Most popular</span>
            <h3>Pro</h3>
            <div className="pricing-price">
              $19<span>/mo</span>
            </div>
            <ul className="pricing-features">
              <li>Unlimited Q&amp;A</li>
              <li>Priority support</li>
              <li>Advanced code review</li>
            </ul>
            <Link href={user ? "/dashboard" : "/signup"} className="btn btn-primary">
              {user ? "Manage plan" : "Get Pro"}
            </Link>
          </div>

          <div className="pricing-card">
            <h3>Enterprise</h3>
            <div className="pricing-price">Custom</div>
            <ul className="pricing-features">
              <li>Dedicated support</li>
              <li>Custom integrations</li>
              <li>Volume pricing</li>
            </ul>
            <a href="mailto:sales@qoolbot.dev" className="btn btn-secondary">
              Contact sales
            </a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">© {new Date().getFullYear()} QoolBot. All rights reserved.</div>
      </footer>
    </main>
  );
}
