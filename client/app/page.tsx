import { ContactForm } from "@/components/ContactForm";
import { Header } from "@/components/Header";
import { LineIcon } from "@/components/Icons";
import { WindowMark } from "@/components/WindowMark";
import { galleryPhotos, projectPhotos } from "@/lib/photos";
import { products } from "@/lib/products";
import Image from "next/image";

const facts = ["Manufactured & fitted in Lalitpur", "European-standard UPVC profiles", "Custom-measured, factory-fabricated", "Site visit, install & after-sales support"];
const benefits = [
  ["01", "Sealed against monsoon & dust", "Tight seals help keep wind-driven rain and everyday dust outside."],
  ["02", "Thermal & sound insulation", "Multi-chamber profiles and glazing help create calmer indoor spaces."],
  ["03", "Lightweight prefab structures", "Steel-frame systems reduce structural weight and build time."],
  ["04", "No painting, no rusting", "UPVC frames keep their finish without repainting or corrosion."],
];
const steps = ["Site visit", "Measure & design", "Fabrication", "Installation", "After-sales"];
const windowStyles = [
  ["Sliding", "A space-saving option for bedrooms, kitchens and wider openings."],
  ["Casement", "Hinged panels that open fully for ventilation and straightforward cleaning."],
  ["Fixed", "A non-opening glazed panel for daylight, views and combined window layouts."],
  ["Combination", "Opening and fixed panels arranged around the size and use of your room."],
];
const specificationPoints = [
  ["Opening style", "We match how the window or door opens to the room, airflow and available space."],
  ["Glass choice", "Glass is selected around privacy, safety, daylight, heat and noise requirements."],
  ["Hardware", "Handles, locks, rollers and hinges are specified for the unit size and daily use."],
  ["Site condition", "Measurements account for wall finish, sill level, access and installation clearance."],
];
const faqs = [
  ["Do you visit the site before quoting?", "Yes. A site visit lets the team understand the opening, access and project scope. If you already have dimensions, send them first for an initial discussion."],
  ["Can windows and doors be made to custom sizes?", "Yes. Units are measured for each opening and fabricated to the agreed design before installation."],
  ["Do you handle glass and hardware too?", "Yes. The team supplies UPVC units alongside compatible glass, handles, locks, rollers and other fittings."],
  ["What information should I send for a prefab home?", "Share the plot location, approximate building size, intended use, number of rooms and any drawing you already have. The team can then discuss the right next step."],
  ["Can I request only a site consultation?", "Yes. Use the enquiry form or call to describe the site and arrange a suitable visit."],
];

export default function Home() {
  return (
    <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "HomeAndConstructionBusiness",
      name: "Global Hardware and Prefab Pvt. Ltd.",
      alternateName: "Global UPVC Windows & Prefab Homes",
      telephone: ["+9779803058200", "+9779851217930", "+97715200304"],
      address: { "@type": "PostalAddress", addressLocality: "Gwarko", addressRegion: "Lalitpur", addressCountry: "NP" },
      areaServed: "Nepal",
      sameAs: ["https://www.facebook.com/globalupvcprefabhomes/", "https://www.instagram.com/globalupvcwindowsand/"]
    }) }} /><Header /><main id="top">
      <section className="relative overflow-hidden border-b border-line bg-[#e9efeb]">
        <div className="shell grid items-center gap-10 py-12 sm:py-16 lg:min-h-[650px] lg:grid-cols-[.92fr_1.08fr] lg:gap-16 lg:py-20">
          <div className="relative z-10 max-w-xl">
            <p className="eyebrow">Global Hardware and Prefab Pvt. Ltd. ? Lalitpur</p>
            <h1 className="mt-6 font-heading text-[clamp(2.45rem,6.3vw,5.1rem)] font-semibold leading-[.98] tracking-[-.055em]">Better openings. <span className="text-accent-deep">Built around your home.</span></h1>
            <p className="mt-7 max-w-lg text-base leading-7 text-ink-soft sm:text-lg sm:leading-8">UPVC windows, doors and prefab homes, measured and fitted by a local team that knows the conditions here.</p>
            <div className="mt-8 flex flex-wrap gap-3"><a href="#contact" className="button button-primary focus-ring">Arrange a site visit</a><a href="#products" className="button button-outline focus-ring">See what we make <span aria-hidden="true">?</span></a></div>
            <p className="mt-7 text-xs font-semibold uppercase tracking-[.12em] text-ink-soft">Gwarko, Lalitpur <span className="mx-2 text-brass">/</span> Serving projects across Nepal</p>
          </div>
          <figure className="relative min-h-[280px] overflow-hidden bg-ink sm:min-h-[420px] lg:min-h-[500px]">
            <Image src={projectPhotos.home.src} alt={projectPhotos.home.alt} fill priority sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent px-5 pb-5 pt-20 text-sm font-medium text-white sm:px-7 sm:pb-7">Thoughtful window and door systems for everyday living.</figcaption>
          </figure>
        </div>
      </section>

      <section aria-label="Key facts" className="bg-panel"><div className="shell grid divide-y divide-line border-x border-line sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">{facts.map((fact, i) => <div className={`fact-card flex min-h-28 items-center gap-4 p-6 ${i % 2 === 0 ? "bg-mint/45" : "bg-sky-soft/35"}`} key={fact}><span className={`font-heading text-xs font-bold ${i === 1 ? "text-coral" : "text-accent-deep"}`}>0{i + 1}</span><p className="text-sm font-semibold leading-5">{fact}</p></div>)}</div></section>

      <section id="products" className="section-space scroll-mt-24 bg-white"><div className="shell"><SectionHead kicker="Our work" title="A practical team for the parts that make a building feel finished." /><p className="mt-5 max-w-2xl leading-7 text-ink-soft">From a single replacement window to a complete prefab structure, we help you plan the right scope before work begins.</p><div className="mt-10 grid border-t border-line sm:grid-cols-2 lg:grid-cols-3">{products.map((product) => <a className="group border-b border-line py-7 pr-5 transition-colors hover:bg-background/70 sm:px-5" href={`/products/${product.slug}`} key={product.slug}><span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-mint text-accent-deep"><LineIcon name={product.icon} /></span><h3 className="mt-5 font-heading text-xl font-semibold">{product.title}</h3><p className="mt-2 max-w-sm text-sm leading-6 text-ink-soft">{product.shortDescription}</p><span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent-deep">Explore service <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">?</span></span></a>)}</div></div></section>

      <section className="border-y border-line bg-panel py-20 lg:py-24"><div className="shell grid gap-14 lg:grid-cols-[.8fr_1.2fr]"><div><SectionHead kicker="Window configurations" title="Choose how the opening needs to work." /><p className="mt-6 max-w-lg leading-7 text-ink-soft">Every room has different needs. We help balance ventilation, usable space, daylight and access before the unit is fabricated.</p><a href="#contact" className="button button-outline mt-8 focus-ring">Discuss your openings <span aria-hidden="true">→</span></a></div><div className="grid border-l border-t border-line sm:grid-cols-2">{windowStyles.map(([title, description], index) => <article className="relative border-b border-r border-line p-6 transition-all duration-300 hover:bg-background hover:shadow-md sm:min-h-48" key={title}><span className="font-heading text-xs font-bold text-brass">0{index + 1}</span><h3 className="mt-8 font-heading text-xl font-semibold">{title}</h3><p className="mt-3 text-sm leading-6 text-ink-soft">{description}</p><div className="corner-joint transition-colors group-hover:border-accent" aria-hidden="true" /></article>)}</div></div></section>

      <section id="why-us" className="scroll-mt-20 bg-gradient-to-b from-ink to-ink/95 py-20 text-panel lg:py-28"><div className="shell"><SectionHead kicker="Made for local conditions" title="Comfort through every season." dark /><div className="mt-14 grid gap-px bg-panel/10 md:grid-cols-2 lg:grid-cols-4">{benefits.map(([n, title, desc], idx) => <article className="bg-gradient-to-br from-ink/50 to-ink p-7 backdrop-blur-sm transition-all duration-300 hover:from-accent/20 hover:to-accent/10 hover:shadow-lg lg:min-h-72" key={title}><span className="font-heading text-5xl font-light text-brass">{n}</span><h3 className="mt-10 font-heading text-xl font-semibold">{title}</h3><p className="mt-4 text-sm leading-6 text-panel/75">{desc}</p></article>)}</div></div></section>

      <section id="process" className="section-space scroll-mt-24 bg-gradient-to-br from-background via-mint/25 to-sky-soft/35"><div className="shell"><SectionHead kicker="How it works" title="Measured properly. Made carefully. Fitted cleanly." /><ol className="mt-14 grid sm:grid-cols-2 lg:grid-cols-5">{steps.map((step, i) => <li className="relative border-l border-line px-5 py-6 last:border-r" key={step}><span className="outline-number">{String(i + 1).padStart(2, "0")}</span><h3 className="mt-7 font-heading text-lg font-semibold">{step}</h3>{i < steps.length - 1 && <span className="absolute right-4 top-8 text-coral" aria-hidden="true">→</span>}</li>)}</ol></div></section>

      <section className="bg-background pb-20 lg:pb-28"><div className="shell"><div className="grid border border-line bg-panel lg:grid-cols-[.7fr_1.3fr]"><div className="border-b border-line p-7 lg:border-b-0 lg:border-r lg:p-10"><p className="eyebrow">Before fabrication</p><h2 className="mt-4 font-heading text-3xl font-semibold leading-tight">The details that shape a proper quote.</h2><p className="mt-5 leading-7 text-ink-soft">A useful quotation depends on more than width and height. These choices are confirmed around the actual opening and how it will be used.</p></div><div className="grid sm:grid-cols-2">{specificationPoints.map(([title, description]) => <article className="border-b border-line p-7 odd:sm:border-r [&:nth-last-child(-n+2)]:sm:border-b-0" key={title}><h3 className="font-heading text-lg font-semibold">{title}</h3><p className="mt-3 text-sm leading-6 text-ink-soft">{description}</p></article>)}</div></div></div></section>

      <section id="gallery" className="section-space scroll-mt-24 border-y border-line bg-panel"><div className="shell"><div className="flex flex-wrap items-end justify-between gap-5"><SectionHead kicker="Our services" title="Materials and installation, planned around your project." /><p className="max-w-sm text-sm leading-6 text-ink-soft">These photographs illustrate UPVC installation and prefab construction. They are not presented as completed Global UPVC client projects.</p></div><div className="mt-12 grid auto-rows-[250px] gap-3 md:grid-cols-3">{galleryPhotos.map((photo) => <GalleryImage key={photo.src} {...photo} />)}</div><p className="mt-4 text-xs text-ink-soft">Illustrative service imagery only.</p></div></section>

      <section className="section-space border-b border-line"><div className="shell grid gap-8 lg:grid-cols-[.8fr_1.2fr]"><div><SectionHead kicker="Project record" title="Ask us about work relevant to your project." /><p className="mt-5 leading-7 text-ink-soft">We can discuss your requirements and share suitable project references with you.</p><a href="tel:+9779803058200" className="button button-outline mt-6 focus-ring">Ask for project references</a></div><div className="grid gap-4 sm:grid-cols-3">{galleryPhotos.map((photo) => <GalleryImage key={photo.src} {...photo} />)}</div></div></section>

      <section className="section-space"><div className="shell"><div className="cta-road relative overflow-hidden bg-accent-deep px-7 py-14 text-panel sm:px-12 lg:flex lg:items-center lg:justify-between lg:px-16 lg:py-20"><div className="relative z-10"><p className="eyebrow text-panel/70">Have measurements or a plot?</p><h2 className="mt-5 max-w-3xl font-heading text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">Tell us the opening size or the plot, and we&apos;ll quote it properly.</h2></div><a className="button relative z-10 mt-8 shrink-0 border-panel bg-panel text-accent-deep hover:bg-background lg:ml-10 lg:mt-0 focus-ring" href="#contact">Start an Enquiry</a></div></div></section>

      <section id="faq" className="scroll-mt-24 border-t border-line bg-background py-20 lg:py-28"><div className="shell grid gap-12 lg:grid-cols-[.7fr_1.3fr]"><div><SectionHead kicker="Common questions" title="Useful answers before we visit." /><p className="mt-6 max-w-md leading-7 text-ink-soft">For prices and timelines, contact the team with your measurements or plot details. Both depend on the confirmed scope.</p></div><div className="border-t border-line">{faqs.map(([question, answer]) => <details className="group border-b border-line bg-panel" key={question}><summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-5 py-6 font-heading text-lg font-semibold focus-ring sm:px-7"><span>{question}</span><span className="text-2xl font-light text-brass transition-transform group-open:rotate-45" aria-hidden="true">+</span></summary><p className="max-w-2xl px-5 pb-6 leading-7 text-ink-soft sm:px-7">{answer}</p></details>)}</div></div></section>

      <section id="contact" className="scroll-mt-20 border-t border-line bg-panel py-14 sm:py-20 lg:py-28"><div className="shell grid min-w-0 gap-10 sm:gap-14 lg:grid-cols-2"><div className="min-w-0"><SectionHead kicker="Contact" title="Let’s talk about your project." /><p className="mt-7 max-w-lg leading-7 text-ink-soft">Share what you need. We’ll contact you to confirm the site, sizes and next steps.</p><address className="mt-10 grid gap-5 not-italic"><ContactLine label="Location"><a className="contact-link focus-ring" href="https://maps.google.com/?q=27.6676768,85.3183918951" target="_blank" rel="noreferrer">Gwarko, Lalitpur, Nepal <span aria-hidden="true">↗</span></a></ContactLine><ContactLine label="Mobile"><span className="flex flex-wrap gap-x-5 gap-y-2"><a className="contact-link focus-ring" href="tel:+9779803058200">9803058200</a><a className="contact-link focus-ring" href="tel:+9779851217930">9851217930</a></span></ContactLine><ContactLine label="Landline"><a className="contact-link focus-ring" href="tel:+97715200304">01-5200304</a></ContactLine></address><div className="mt-9 flex flex-wrap items-center gap-3"><SocialLink href="https://facebook.com/globalupvcprefabhomes" label="Visit Global UPVC on Facebook">FB</SocialLink><SocialLink href="https://instagram.com/globalupvcwindowsand" label="Visit Global UPVC on Instagram">IG</SocialLink><a className="button button-outline ml-1 focus-ring" href="tel:+9779803058200">Call now</a></div><p className="mt-6 max-w-md text-xs leading-5 text-ink-soft">Contact details sourced from the business’s public listing. Please confirm them before production launch.</p></div><div className="min-w-0 border border-line p-4 sm:p-6 lg:p-9"><h3 className="mb-7 font-heading text-2xl font-semibold">Send an enquiry</h3><ContactForm /></div></div></section>
    </main><footer className="bg-ink py-8 text-panel"><div className="shell flex flex-col gap-5 text-sm text-panel/65 sm:flex-row sm:items-center sm:justify-between"><div><p>© {new Date().getFullYear()} Global Hardware and Prefab Pvt. Ltd.</p><p className="mt-1">Measured here. Made here. Fitted here.</p></div><nav className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Footer navigation"><a className="hover:text-panel focus-ring" href="#products">Products</a><a className="hover:text-panel focus-ring" href="#process">Process</a><a className="hover:text-panel focus-ring" href="#faq">FAQs</a><a className="hover:text-panel focus-ring" href="#contact">Contact</a><a className="hover:text-panel focus-ring" href="/privacy">Privacy</a><a className="hover:text-panel focus-ring" href="/terms">Terms</a></nav></div></footer></>
  );
}

function SectionHead({ kicker, title, dark = false }: { kicker: string; title: string; dark?: boolean }) { return <div className="max-w-3xl"><p className={`eyebrow ${dark ? "text-brass" : ""}`}>{kicker}</p><h2 className={`mt-4 font-heading text-3xl font-semibold leading-tight tracking-tight sm:text-5xl ${dark ? "text-panel" : "text-ink"}`}>{title}</h2></div>; }
function GalleryImage({ src, alt, label, className = "" }: { src: string; alt: string; label: string; className?: string }) { return <figure className={`group relative overflow-hidden border border-line bg-background ${className}`}><Image src={src} alt={alt} fill sizes="(min-width: 768px) 66vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.025]" /><figcaption className="absolute bottom-4 left-4 bg-panel px-3 py-2 font-heading text-xs font-semibold uppercase tracking-wider text-ink">{label}</figcaption></figure>; }
function GalleryTile({ label }: { label: string }) { return <div className="group relative grid place-items-center overflow-hidden border border-line bg-background"><WindowMark className="h-16 w-16 opacity-20 transition-transform duration-300 group-hover:scale-110" /><span className="absolute bottom-4 left-4 bg-panel px-3 py-2 font-heading text-xs font-semibold uppercase tracking-wider">Project photo slot · {label}</span></div>; }
function ContactLine({ label, children }: { label: string; children: React.ReactNode }) { return <div className="border-l-2 border-brass pl-4"><p className="text-xs font-semibold uppercase tracking-widest text-ink-soft">{label}</p><div className="mt-1 font-medium">{children}</div></div>; }
function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) { return <a href={href} target="_blank" rel="noreferrer" aria-label={label} className="grid h-11 w-11 place-items-center border border-ink font-heading text-xs font-bold transition-colors hover:bg-ink hover:text-panel focus-ring">{children}</a>; }
