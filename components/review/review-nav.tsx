"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { initiatives } from "@/content/review";

/** Overview and one link per initiative (testimonials sit under Social proof), with feedback pinned at the foot. */
export function ReviewNav() {
  const pathname = usePathname();
  const current = (href: string) => (pathname === href ? "page" : undefined);

  return (
    <nav aria-label="Review sections" className="text-sm lg:flex lg:h-full lg:flex-col">
      <p className="bz-eyebrow mb-3 px-3">Contents</p>
      <ul className="space-y-0.5">
        <li>
          <Link href="/review" aria-current={current("/review")} className="bz-nav-item">
            <span className="bz-nav-num">00</span>
            Overview
          </Link>
        </li>
        {initiatives.map((initiative) => {
          const href = `/review/${initiative.id}`;
          const active = pathname === href;
          return (
            <li key={initiative.id}>
              <Link href={href} aria-current={current(href)} className="bz-nav-item">
                <span className="bz-nav-num">{initiative.short}</span>
                <span className="min-w-0 leading-snug">{initiative.title}</span>
              </Link>
              {initiative.id === "social-proof" && (active || pathname === "/review/testimonials") && (
                <ul className="bz-subnav mt-1 mb-2 ml-12 space-y-0.5 pl-3">
                  <li>
                    <Link href="/review/testimonials" aria-current={current("/review/testimonials")}>
                      Testimonial review
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          );
        })}
      </ul>
      {/* Pinned to the foot of the sidebar on wide screens. */}
      <div className="bz-rule-top mt-6 pt-3 lg:mt-auto">
        <Link href="/review/feedback" aria-current={current("/review/feedback")} className="bz-nav-item">
          <span className="bz-nav-num" aria-hidden="true" />
          Provident feedback
        </Link>
      </div>
    </nav>
  );
}
