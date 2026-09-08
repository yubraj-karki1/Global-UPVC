"use client";

import { FormEvent, useState } from "react";

type Status = { type: "idle" | "loading" | "success" | "error"; message: string };

const NEPAL_LOCATIONS = [
  "Bagmati Province — Kathmandu",
  "Bagmati Province — Lalitpur",
  "Bagmati Province — Bhaktapur",
  "Bagmati Province — Kirtipur",
  "Bagmati Province — Patan",
  "Bagmati Province — Chitwan",
  "Bagmati Province — Hetauda",
  "Bagmati Province — Dhading",
  "Bagmati Province — Makwanpur",
  "Bagmati Province — Nuwakot",
  "Bagmati Province — Rasuwa",
  "Bagmati Province — Sindhuli",
  "Bagmati Province — Sindhupalchok",
  "Bagmati Province — Dolakha",
  "Bagmati Province — Kavrepalanchok",
  "Bagmati Province — Ramnagar",
  "Bagmati Province — Banepa",
  "Bagmati Province — Dhulikhel",
  "Bagmati Province — Gajuri",
  "Bagmati Province — Nala",
  "Bagmati Province — Suryabinayak",
  "Bagmati Province — Bhimeshwar",
  "Bagmati Province — Baiteshwor",
  "Bagmati Province — Lukla",
  "Bagmati Province — Bidur",
  "Bagmati Province — Trishuli",
  "Gandaki Province — Pokhara",
  "Gandaki Province — Bharatpur",
  "Gandaki Province — Baglung",
  "Gandaki Province — Myagdi",
  "Gandaki Province — Parbat",
  "Gandaki Province — Syangja",
  "Gandaki Province — Kaski",
  "Gandaki Province — Tanahun",
  "Gandaki Province — Lamjung",
  "Gandaki Province — Nawalpur",
  "Gandaki Province — Gorkha",
  "Gandaki Province — Mustang",
  "Gandaki Province — Manang",
  "Gandaki Province — Kushma",
  "Gandaki Province — Besisahar",
  "Gandaki Province — Waling",
  "Gandaki Province — Besishahar",
  "Lumbini Province — Butwal",
  "Lumbini Province — Bhairahawa",
  "Lumbini Province — Tansen",
  "Lumbini Province — Kapilvastu",
  "Lumbini Province — Rupandehi",
  "Lumbini Province — Dang",
  "Lumbini Province — Bardiya",
  "Lumbini Province — Banke",
  "Lumbini Province — Arghakhanchi",
  "Lumbini Province — Gulmi",
  "Lumbini Province — Palpa",
  "Lumbini Province — Pyuthan",
  "Lumbini Province — Rolpa",
  "Lumbini Province — Rukum East",
  "Lumbini Province — Rukum West",
  "Lumbini Province — Salyan",
  "Lumbini Province — Surkhet",
  "Lumbini Province — Tulsipur",
  "Lumbini Province — Nepalgunj",
  "Karnali Province — Surkhet",
  "Karnali Province — Dailekh",
  "Karnali Province — Jajarkot",
  "Karnali Province — Jumla",
  "Karnali Province — Kalikot",
  "Karnali Province — Mugu",
  "Karnali Province — Dolpa",
  "Karnali Province — Humla",
  "Karnali Province — Birendranagar",
  "Sudurpashchim Province — Dhangadhi",
  "Sudurpashchim Province — Bhimdutta Municipality",
  "Sudurpashchim Province — Kailali",
  "Sudurpashchim Province — Kanchanpur",
  "Sudurpashchim Province — Dadeldhura",
  "Sudurpashchim Province — Baitadi",
  "Sudurpashchim Province — Darchula",
  "Sudurpashchim Province — Bajhang",
  "Sudurpashchim Province — Bajura",
  "Sudurpashchim Province — Achham",
  "Sudurpashchim Province — Attariya",
  "Sudurpashchim Province — Tikapur",
  "Sudurpashchim Province — Mahendranagar",
  "Sudurpashchim Province — Jhulaghat",
  "Province 1 — Biratnagar",
  "Province 1 — Itahari",
  "Province 1 — Dharan",
  "Province 1 — Bhadrapur",
  "Province 1 — Damak",
  "Province 1 — Morang",
  "Province 1 — Sunsari",
  "Province 1 — Jhapa",
  "Province 1 — Ilam",
  "Province 1 — Panchthar",
  "Province 1 — Taplejung",
  "Province 1 — Sankhuwasabha",
  "Province 1 — Tehrathum",
  "Province 1 — Dhankuta",
  "Province 1 — Bhojpur",
  "Province 1 — Solukhumbu",
  "Province 1 — Okhaldhunga",
  "Province 1 — Khotang",
  "Province 1 — Udayapur",
  "Province 1 — Siraha",
  "Province 1 — Saptari",
  "Province 1 — Mahottari",
  "Province 1 — Dhanusha",
  "Province 1 — Sindhuli",
  "Province 2 — Janakpur",
  "Province 2 — Birgunj",
  "Province 2 — Rajbiraj",
  "Province 2 — Lahan",
  "Province 2 — Bardibas",
  "Province 2 — Saptari",
  "Province 2 — Siraha",
  "Province 2 — Dhanusha",
  "Province 2 — Mahottari",
  "Province 2 — Rautahat",
  "Province 2 — Sarlahi",
  "Province 2 — Madhubani",
  "Province 2 — Bara",
  "Province 2 — Parsa",
  "Province 2 — Makwanpur"
];

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ type: "idle", message: "" });

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    const message = [
      `Project type: ${String(values.projectType)}`,
      values.location ? `Project location: ${String(values.location)}` : "",
      "",
      String(values.message),
    ].filter(Boolean).join("\n");
    const data = { name: values.name, phone: values.phone, message, website: values.website };
    setStatus({ type: "loading", message: "Sending your enquiry…" });
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "http://localhost:5000";
      const response = await fetch(`${baseUrl}/api/enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.message || "Could not send your enquiry.");
      form.reset();
      setStatus({ type: "success", message: "Thank you. We received your enquiry and will get back to you." });
    } catch (error) {
      setStatus({ type: "error", message: error instanceof Error ? error.message : "Could not send your enquiry. Please try again." });
    }
  }

  return (
    <form onSubmit={submit} className="grid gap-5" aria-label="Enquiry form">
      <label className="absolute -left-[10000px]" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      <label className="field-label">Name<input className="field focus-ring rounded-sm" name="name" required minLength={2} maxLength={100} autoComplete="name" /></label>
      <label className="field-label">Phone<input className="field focus-ring rounded-sm" name="phone" required minLength={7} maxLength={25} autoComplete="tel" inputMode="tel" /></label>
      <label className="field-label">Project type<select className="field focus-ring rounded-sm" name="projectType" defaultValue="" required><option value="" disabled>Select a service</option><option>UPVC windows</option><option>UPVC doors</option><option>Prefabricated home</option><option>Hardware & fittings</option><option>Glass work</option><option>Site consultation</option><option>Other</option></select></label>
      <label className="field-label">Project location <span className="font-normal text-ink-soft">(optional)</span><select className="field focus-ring rounded-sm" name="location" defaultValue=""><option value="">Select a province, district, or city</option>{NEPAL_LOCATIONS.map((location, index) => <option key={`${location}-${index}`} value={location}>{location}</option>)}</select></label>
      <label className="field-label">What do you need?<textarea className="field min-h-32 resize-y focus-ring rounded-sm" name="message" required minLength={10} maxLength={1800} placeholder="Number of openings, approximate sizes, plot details, or questions…" /></label>
      <button className="button button-primary w-full rounded-sm focus-ring disabled:cursor-wait disabled:opacity-70" disabled={status.type === "loading"} type="submit">{status.type === "loading" ? "Sending…" : "Send Enquiry"}</button>
      <p className={`min-h-6 text-sm font-medium transition-all duration-300 ${status.type === "error" ? "text-red-600" : status.type === "success" ? "text-accent-deep" : "text-ink-soft"}`} role="status" aria-live="polite">{status.message}</p>
    </form>
  );
}
