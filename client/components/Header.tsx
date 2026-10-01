"use client";

import { useState } from "react";
import Image from "next/image";

const links = [
  ["Products", "/#products"],
  ["Why Us", "/#why-us"],
  ["Process", "/#process"],
  ["Gallery", "/#gallery"],
  ["Planning guide", "/project-planning"],
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-background/95 backdrop-blur-md">
      <div className="shell flex h-[76px] items-center justify-between gap-5">
        <a href="/" className="flex shrink-0 items-center focus-ring" aria-label="Global UPVC home">
          <Image src="/images/global-upvc-logo.png" alt="Global UPVC — Windows & Prefab" width={155} height={47} priority className="h-auto w-[112px] max-w-[40vw] object-contain sm:w-[124px]" />
        </a>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation">
          {links.map(([linkLabel, href]) => <a className="nav-link focus-ring" href={href} key={href}>{linkLabel}</a>)}
          <a className="button button-primary focus-ring" href="/#contact">Get a Quote</a>
        </nav>
        <button className="group flex h-11 w-11 flex-col items-center justify-center gap-1.5 border border-ink transition-all hover:bg-ink/5 md:hidden focus-ring" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" aria-label="Toggle navigation">
          <span className={`block h-px w-5 bg-ink transition-all duration-300 ${open ? "rotate-45 translate-y-2" : ""}`} aria-hidden="true" />
          <span className={`block h-px w-5 bg-ink transition-all duration-300 ${open ? "opacity-0" : ""}`} aria-hidden="true" />
          <span className={`block h-px w-5 bg-ink transition-all duration-300 ${open ? "-rotate-45 -translate-y-2" : ""}`} aria-hidden="true" />
        </button>
      </div>
      <nav id="mobile-menu" inert={!open} className={`grid origin-top overflow-hidden border-line bg-panel px-5 transition-[grid-template-rows,padding,border-color] duration-300 md:hidden ${open ? "grid-rows-[1fr] border-t py-5" : "pointer-events-none grid-rows-[0fr] border-t-0 py-0"}`} aria-label="Mobile navigation">
        <div className="min-h-0 overflow-hidden">
        {links.map(([linkLabel, href]) => <a onClick={() => setOpen(false)} className="block border-b border-line py-3 font-heading font-semibold transition-colors hover:text-accent-deep focus-ring" href={href} key={href}>{linkLabel}</a>)}
        <a onClick={() => setOpen(false)} className="button button-primary mt-5 w-full justify-center focus-ring" href="/#contact">Get a Quote</a>
        </div>
      </nav>
    </header>
  );
}
