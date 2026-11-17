import type { Metadata } from "next";
import { safeNext } from "@/lib/site-access";

export const metadata: Metadata = { title: "Enter password | Provident Insurance preview" };

/** Password-only sign-in for the client preview. No username. */
export default async function UnlockPage({ searchParams }: { searchParams: Promise<{ next?: string; error?: string }> }) {
  const { next, error } = await searchParams;
  return (
    <main className="flex min-h-screen items-center justify-center bg-light-grey px-4">
      <form method="post" action="/api/unlock" className="w-full max-w-sm rounded-card bg-white p-8 shadow-md">
        <h1 className="text-xl font-bold text-dark-grey">Provident website preview</h1>
        <p className="mt-2 text-sm text-dark-grey/80">Enter the password you were given to see the preview.</p>
        <input type="hidden" name="next" value={safeNext(next)} />
        <label className="mt-6 block text-sm font-bold text-dark-grey" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoFocus
          autoComplete="current-password"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "password-error" : undefined}
          className="mt-2 w-full rounded-md border border-lighter-grey px-3 py-2 text-base text-dark-grey"
        />
        {error && (
          <p id="password-error" className="mt-2 text-sm text-primary">
            That password didn&apos;t match. Please try again.
          </p>
        )}
        <button type="submit" className="mt-6 w-full rounded-full bg-primary px-5 py-3 font-bold text-white">
          View the preview
        </button>
      </form>
    </main>
  );
}
