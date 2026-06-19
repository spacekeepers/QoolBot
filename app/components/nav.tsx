import Link from "next/link";
import { getCurrentUser } from "@/app/lib/dal";
import { logout } from "@/app/lib/actions";

export async function Nav() {
  const user = await getCurrentUser();

  return (
    <header className="container">
      <nav className="nav">
        <Link href="/" className="nav-brand">
          Qool<span>Bot</span>
        </Link>
        <div className="nav-links">
          {user ? (
            <>
              <Link href="/dashboard" className="btn btn-secondary">
                Dashboard
              </Link>
              <form action={logout}>
                <button type="submit" className="btn btn-secondary">
                  Log out
                </button>
              </form>
            </>
          ) : (
            <>
              <Link href="/login" className="btn btn-secondary">
                Log in
              </Link>
              <Link href="/signup" className="btn btn-primary">
                Sign up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
