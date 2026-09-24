"use client";

import { useState } from "react";
import { WindowMark } from "./WindowMark";

const links = [
  ["Products", "/#products"],
  ["Why Us", "/#why-us"],
  ["Process", "/#process"],
  ["Gallery", "/#gallery"],
  ["Planning guide", "/project-planning"],
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState<"en" | "ne">("en");
  const translations: Record<string, [string, string]> = { Products: ["Products", "उत्पादनहरू"], "Why Us": ["Why Us", "हामी किन"], Process: ["Process", "प्रक्रिया"], Gallery: ["Gallery", "ग्यालरी"], "Planning guide": ["Planning guide", "योजना मार्गदर्शिका"], "Get a Quote": ["Get a Quote", "मूल्य माग्नुहोस्"] };
  const label = (value: string) => translations[value]?.[language === "en" ? 0 : 1] || value;
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-[#f8faf8]/95 backdrop-blur-md">
      <div className="shell flex h-[72px] items-center justify-between">
        <a href="/" className="group flex items-center gap-3 font-heading text-sm font-bold leading-tight tracking-tight focus-ring" aria-label="Global UPVC home">
          <WindowMark className="h-9 w-9 transition-transform group-hover:scale-110" />
          <span>GLOBAL UPVC<br /><span className="font-body text-[10px] font-semibold tracking-[.15em] text-ink-soft">WINDOWS &amp; PREFAB</span></span>
        </a>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation">
          {links.map(([linkLabel, href]) => <a className="nav-link focus-ring" href={href} key={href}>{label(linkLabel)}</a>)}
          <button className="nav-link focus-ring" onClick={() => setLanguage(language === "en" ? "ne" : "en")} aria-label="Change language">{language === "en" ? "नेपाली" : "English"}</button>
          <a className="button button-primary focus-ring" href="/#contact">{label("Get a Quote")}</a>
        </nav>
        <button className="group flex h-11 w-11 flex-col items-center justify-center gap-1.5 border border-ink transition-all hover:bg-ink/5 md:hidden focus-ring" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" aria-label="Toggle navigation">
          <span className={`block h-px w-5 bg-ink transition-all duration-300 ${open ? "rotate-45 translate-y-2" : ""}`} aria-hidden="true" />
          <span className={`block h-px w-5 bg-ink transition-all duration-300 ${open ? "opacity-0" : ""}`} aria-hidden="true" />
          <span className={`block h-px w-5 bg-ink transition-all duration-300 ${open ? "-rotate-45 -translate-y-2" : ""}`} aria-hidden="true" />
        </button>
      </div>
      <nav id="mobile-menu" inert={!open} className={`grid origin-top overflow-hidden border-line bg-panel px-5 transition-[grid-template-rows,padding,border-color] duration-300 md:hidden ${open ? "grid-rows-[1fr] border-t py-5" : "pointer-events-none grid-rows-[0fr] border-t-0 py-0"}`} aria-label="Mobile navigation">
        <div className="min-h-0 overflow-hidden">
        {links.map(([linkLabel, href]) => <a onClick={() => setOpen(false)} className="block border-b border-line py-3 font-heading font-semibold transition-colors hover:text-accent-deep focus-ring" href={href} key={href}>{label(linkLabel)}</a>)}
        <button className="mt-4 w-full py-2 font-semibold" onClick={() => setLanguage(language === "en" ? "ne" : "en")}>{language === "en" ? "नेपालीमा हेर्नुहोस्" : "View in English"}</button>
        <a onClick={() => setOpen(false)} className="button button-primary mt-5 w-full justify-center focus-ring" href="/#contact">{label("Get a Quote")}</a>
        </div>
      </nav>
    </header>
  );
}
