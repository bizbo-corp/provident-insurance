"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CircleMinus, CirclePlus, X } from "lucide-react";
import { NavLink } from "@/components/layout/nav-link";
import { Button } from "@/components/ui/button";
import { DEALER_LOGIN_URL, mainNav } from "@/content/site";
import type { NavItem } from "@/content/types";
import { cn } from "@/lib/utils";

const SCROLL_DELTA = 6;

function useHideOnScrollDown() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (y <= 0) setVisible(true);
      else if (y > last + SCROLL_DELTA) setVisible(false);
      else if (y < last - SCROLL_DELTA) setVisible(true);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return visible;
}

function DesktopItem({ item }: { item: NavItem }) {
  return (
    <li className="group relative ml-6 inline-block">
      <NavLink link={item} className="no-underline" />
      {item.children && (
        <ul className="absolute -left-8 z-30 hidden bg-dark-grey px-8 py-4 text-white group-hover:block">
          {item.children.map((child) => (
            <li key={child.label}>
              <NavLink link={child} className="block py-2 whitespace-nowrap no-underline" />
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

function MobileItem({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);
  const Icon = open ? CircleMinus : CirclePlus;
  return (
    <li className="mb-4">
      <div className="flex items-center justify-center">
        <NavLink link={item} className="no-underline hover:underline" />
        {item.children && (
          <button
            type="button"
            className="ml-2"
            aria-expanded={open}
            aria-label={`${open ? "Hide" : "Show"} ${item.label} links`}
            onClick={() => setOpen(!open)}
          >
            <Icon className="size-[1.2em]" aria-hidden="true" />
          </button>
        )}
      </div>
      {item.children && open && (
        <ul className="relative border-b border-white px-8 py-4 text-white">
          {item.children.map((child) => (
            <li key={child.label}>
              <NavLink link={child} className="block py-2 no-underline hover:underline" />
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-50 w-full transform overflow-y-auto bg-primary p-8 text-white transition-transform md:w-1/2",
          open ? "translate-x-0" : "-translate-x-full"
        )}
        aria-hidden={!open}
        inert={!open}
      >
        <button
          type="button"
          className="absolute top-4 right-4"
          aria-label="Close menu"
          onClick={onClose}
        >
          <X className="size-6" aria-hidden="true" />
        </button>
        <ul className="mt-8 text-center text-xl md:text-lg">
          <MobileItem item={{ label: "Home", href: "/" }} />
          {mainNav.map((item) => (
            <MobileItem key={item.label} item={item} />
          ))}
          <li>
            <Button asChild variant="outline" className="mt-4 border-white text-base text-white">
              <a href={DEALER_LOGIN_URL} target="_blank">Dealer login</a>
            </Button>
          </li>
        </ul>
      </div>
      {open && (
        <div
          className="fixed inset-0 z-20 bg-dark-grey/75"
          aria-hidden="true"
          onClick={onClose}
        />
      )}
    </>
  );
}

export function SiteHeader() {
  const visible = useHideOnScrollDown();
  const [menuOpen, setMenuOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);

  // The header is fixed, so publish its height for the page to offset against.
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const publish = () =>
      document.documentElement.style.setProperty("--nav-height", `${node.offsetHeight}px`);
    publish();
    const observer = new ResizeObserver(publish);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  return (
    <>
      <nav
        ref={ref}
        className={cn(
          "fixed inset-x-0 top-0 z-40 flex items-center bg-light-grey px-8 py-4 text-dark-grey transition-[transform,box-shadow] duration-450 ease-bar",
          visible ? "translate-y-0 shadow-bar-down" : "-translate-y-full"
        )}
      >
        <Link href="/" className="-my-3 block h-[84px] max-w-full flex-none">
          <Image
            src="/images/header-logo.svg"
            alt="Provident Insurance"
            width={375}
            height={143}
            priority
            className="block h-full w-auto"
          />
        </Link>
        <div className="flex grow justify-end">
          <ul className="hidden xl:block">
            {mainNav.map((item) => (
              <DesktopItem key={item.label} item={item} />
            ))}
          </ul>
          <button
            type="button"
            className="flex cursor-pointer xl:hidden"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
          >
            <span className="space-y-1">
              <span className="block h-1 w-8 bg-dark-grey" />
              <span className="block h-1 w-8 bg-dark-grey" />
              <span className="block h-1 w-8 bg-dark-grey" />
            </span>
          </button>
        </div>
        <div className="ml-8 hidden flex-none md:flex xl:ml-12">
          <Button asChild variant="outline">
            <a href={DEALER_LOGIN_URL} target="_blank">Dealer login</a>
          </Button>
        </div>
      </nav>
      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
