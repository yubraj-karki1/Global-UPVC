import { Header } from "./Header";

export function LegalPage({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) {
  return <><Header /><main className="section-space"><article className="shell max-w-4xl"><p className="eyebrow">Global Hardware and Prefab Pvt. Ltd.</p><h1 className="mt-4 font-heading text-4xl font-semibold tracking-tight sm:text-6xl">{title}</h1><p className="mt-4 text-sm text-ink-soft">Last updated: {updated}</p><div className="legal-copy mt-12">{children}</div></article></main></>;
}
