import Link from "next/link";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link
      href="/"
      className={`flex items-baseline gap-1 text-2xl font-medium tracking-tight ${
        light ? "text-white" : "text-foreground"
      }`}
    >
      <span>provident</span>
      <svg
        viewBox="0 0 24 20"
        aria-hidden="true"
        className="h-4 w-5 self-center fill-primary"
      >
        <path d="M12 0 24 20H0z" />
      </svg>
      <span>insurance</span>
    </Link>
  );
}
