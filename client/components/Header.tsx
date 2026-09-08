"use client";

import { useState } from "react";
import { WindowMark } from "./WindowMark";

const links = [
  ["Products", "/#products"],
  ["Why Us", "/#why-us"],
  ["Process", "/#process"],
  ["Gallery", "/#gallery"],
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-background/95 backdrop-blur-md shadow-sm">
      <div className="shell flex h-[72px] items-center justify-between">
        <a href="/" className="group flex items-center gap-3 font-heading text-sm font-bold leading-tight tracking-tight transition-transform hover:scale-105 focus-ring" aria-label="Global UPVC home">
          <WindowMark className="h-9 w-9 transition-transform group-hover:scale-110" />
          <span>GLOBAL UPVC<br /><span className="font-body text-[10px] font-semibold tracking-[.15em] text-ink-soft">WINDOWS &amp; PREFAB</span></span>
        </a>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation">
          {links.map(([label, href]) => <a className="nav-link focus-ring" href={href} key={href}>{label}</a>)}
          <a className="button button-primary focus-ring" href="/#contact">Get a Quote</a>
        </nav>
        <button className="group flex h-11 w-11 flex-col items-center justify-center gap-1.5 border border-ink transition-all hover:bg-ink/5 md:hidden focus-ring" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" aria-label="Toggle navigation">
          <span className={`block h-px w-5 bg-ink transition-all duration-300 ${open ? "rotate-45 translate-y-2" : ""}`} aria-hidden="true" />
          <span className={`block h-px w-5 bg-ink transition-all duration-300 ${open ? "opacity-0" : ""}`} aria-hidden="true" />
          <span className={`block h-px w-5 bg-ink transition-all duration-300 ${open ? "-rotate-45 -translate-y-2" : ""}`} aria-hidden="true" />
        </button>
      </div>
      <nav id="mobile-menu" className={`transform transition-all duration-300 origin-top ${open ? "visible opacity-100 scale-y-100" : "invisible opacity-0 scale-y-95"} border-t border-line bg-panel px-5 py-5 md:hidden`} aria-label="Mobile navigation">
        {links.map(([label, href]) => <a onClick={() => setOpen(false)} className="block border-b border-line py-3 font-heading font-semibold transition-colors hover:text-accent-deep focus-ring" href={href} key={href}>{label}</a>)}
        <a onClick={() => setOpen(false)} className="button button-primary mt-5 w-full justify-center focus-ring" href="/#contact">Get a Quote</a>
      </nav>
    </header>
  );
}
