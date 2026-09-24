import { Header } from "@/components/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UPVC Window & Prefab Project Planning Guide | Global UPVC",
  description: "Prepare measurements, site details and questions for a UPVC window, door or prefab-home quotation in Nepal.",
};

const sections: Array<[string, string[]]> = [
  ["For UPVC windows and doors", ["Count every opening and note approximate width and height.", "Share the preferred style: sliding, casement, fixed or a combination.", "Mention whether privacy, safety glass, ventilation, noise or security is important.", "Take a clear photo of each opening where possible."]],
  ["For prefab homes", ["Share the plot location, access conditions and approximate floor area.", "List rooms, intended use and any plans you already have.", "Tell us about utilities, foundation readiness and preferred completion period.", "Arrange a site review before final pricing or structural commitments."]],
  ["What happens after you enquire", ["We review your details and contact you for any missing information.", "A suitable site visit can be arranged to confirm measurements and access.", "The team prepares a scope and quotation based on the confirmed requirements.", "Fabrication and installation dates are agreed after the quotation is accepted."]],
];

export default function ProjectPlanningPage() {
  return <><Header /><main><section className="border-b border-line bg-background py-16 lg:py-24"><div className="shell max-w-4xl"><p className="eyebrow">Project planning guide</p><h1 className="mt-4 font-heading text-4xl font-semibold tracking-tight sm:text-6xl">A clearer brief makes for a more accurate quote.</h1><p className="mt-7 max-w-2xl text-lg leading-8 text-ink-soft">Use this short checklist before requesting a site visit for windows, doors, glass work or a prefab building.</p><a href="/#contact" className="button button-primary mt-9 focus-ring">Start a quote request</a></div></section><section className="section-space"><div className="shell grid gap-5 lg:grid-cols-3">{sections.map(([title, items]) => <article key={title} className="border border-line bg-panel p-7"><h2 className="font-heading text-2xl font-semibold">{title}</h2><ul className="mt-6 grid gap-4 text-sm leading-6 text-ink-soft">{items.map((item) => <li className="flex gap-3" key={item}><span className="font-bold text-accent-deep">✓</span><span>{item}</span></li>)}</ul></article>)}</div></section><section className="border-t border-line bg-ink py-14 text-panel"><div className="shell flex flex-wrap items-center justify-between gap-6"><div><p className="eyebrow text-brass">Need help deciding?</p><h2 className="mt-3 font-heading text-3xl font-semibold">Talk through your project with the team.</h2></div><a href="tel:+9779803058200" className="button border-panel text-panel hover:bg-panel hover:text-ink focus-ring">Call 9803058200</a></div></section></main></>;
}
