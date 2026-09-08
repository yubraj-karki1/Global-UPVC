import { Header } from "@/components/Header";
import { LineIcon } from "@/components/Icons";
import { getProduct, products } from "@/lib/products";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

type ProductPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = getProduct((await params).slug);
  if (!product) return {};
  return {
    title: `${product.title} | Global UPVC Lalitpur`,
    description: product.shortDescription,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = getProduct((await params).slug);
  if (!product) notFound();

  return (
    <><Header /><main>
      <section className="border-b border-line bg-background py-16 lg:py-24">
        <div className="shell">
          <a href="/#products" className="focus-ring inline-flex items-center gap-2 font-heading text-sm font-semibold text-ink-soft hover:text-accent-deep"><span aria-hidden="true">←</span> All products</a>
          <div className="mt-10 grid items-center gap-12 lg:grid-cols-2">
            <div><div className="text-accent-deep"><LineIcon name={product.icon} /></div><p className="eyebrow mt-7">Global UPVC · Lalitpur</p><h1 className="mt-4 font-heading text-[clamp(2.8rem,6vw,5.5rem)] font-semibold leading-[.98] tracking-[-.05em]">{product.title}</h1><p className="mt-7 max-w-xl text-lg leading-8 text-ink-soft">{product.introduction}</p><div className="mt-9 flex flex-wrap gap-3"><a href="/#contact" className="button button-primary focus-ring">Request a quote</a><a href="tel:+9779803058200" className="button button-outline focus-ring">Call 9803058200</a></div></div>
            <div className="relative aspect-[4/3] overflow-hidden border border-line"><Image src={product.image} alt={product.imageAlt} fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" /><span className="corner-joint bg-panel/60" aria-hidden="true" /></div>
          </div>
        </div>
      </section>

      <section className="section-space bg-panel"><div className="shell"><p className="eyebrow">Available solutions</p><h2 className="mt-4 max-w-2xl font-heading text-3xl font-semibold leading-tight sm:text-5xl">Designed around the site and the way you use it.</h2><div className="mt-12 grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-4">{product.options.map((option, index) => <article className="relative min-h-56 border-b border-r border-line p-6" key={option.title}><span className="font-heading text-xs font-bold text-brass">0{index + 1}</span><h3 className="mt-8 font-heading text-xl font-semibold">{option.title}</h3><p className="mt-3 text-sm leading-6 text-ink-soft">{option.description}</p></article>)}</div></div></section>

      <section className="section-space border-y border-line bg-ink text-panel"><div className="shell grid gap-12 lg:grid-cols-2"><div><p className="eyebrow text-brass">Suitable for</p><h2 className="mt-4 font-heading text-3xl font-semibold sm:text-4xl">Where this service fits.</h2><ul className="mt-8 grid gap-px bg-panel/20 sm:grid-cols-2">{product.suitableFor.map((item) => <li className="flex items-center gap-3 bg-ink p-5" key={item}><span className="text-brass" aria-hidden="true">✓</span>{item}</li>)}</ul></div><div><p className="eyebrow text-brass">For an initial quote</p><h2 className="mt-4 font-heading text-3xl font-semibold sm:text-4xl">Tell us these details.</h2><ol className="mt-8 border-t border-panel/20">{product.quoteNeeds.map((item, index) => <li className="flex gap-5 border-b border-panel/20 py-4" key={item}><span className="font-heading text-sm font-bold text-brass">{String(index + 1).padStart(2, "0")}</span><span>{item}</span></li>)}</ol></div></div></section>

      <section className="section-space"><div className="shell"><div className="border border-line bg-panel p-7 sm:p-12 lg:flex lg:items-center lg:justify-between"><div><p className="eyebrow">Next step</p><h2 className="mt-4 max-w-3xl font-heading text-3xl font-semibold leading-tight sm:text-5xl">Let’s measure it properly and prepare the right scope.</h2><p className="mt-5 text-ink-soft">Serving customers from Gwarko, Lalitpur. Site arrangements depend on project location.</p></div><a href="/#contact" className="button button-primary mt-8 shrink-0 lg:ml-10 lg:mt-0 focus-ring">Send project details</a></div><div className="mt-6 flex flex-wrap justify-between gap-4 text-sm"><a href="/#products" className="font-semibold text-accent-deep hover:underline focus-ring">← Browse all products</a><a href="https://maps.google.com/?q=27.6676768,85.3183918951" target="_blank" rel="noreferrer" className="font-semibold text-accent-deep hover:underline focus-ring">Get directions ↗</a></div></div></section>
    </main><footer className="bg-ink py-7 text-panel"><div className="shell flex flex-wrap justify-between gap-3 text-sm text-panel/65"><p>© {new Date().getFullYear()} Global Hardware and Prefab Pvt. Ltd.</p><a className="hover:text-panel focus-ring" href="/">Back to homepage</a></div></footer></>
  );
}
