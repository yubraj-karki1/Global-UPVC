"use client";

import { FormEvent, useState } from "react";

type Status = { type: "idle" | "loading" | "success" | "error"; message: string };

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
      <label className="field-label">Project location <span className="font-normal text-ink-soft">(optional)</span><input className="field focus-ring rounded-sm" name="location" maxLength={120} autoComplete="address-level2" placeholder="Town or district" /></label>
      <label className="field-label">What do you need?<textarea className="field min-h-32 resize-y focus-ring rounded-sm" name="message" required minLength={10} maxLength={1800} placeholder="Number of openings, approximate sizes, plot details, or questions…" /></label>
      <button className="button button-primary w-full rounded-sm focus-ring disabled:cursor-wait disabled:opacity-70" disabled={status.type === "loading"} type="submit">{status.type === "loading" ? "Sending…" : "Send Enquiry"}</button>
      <p className={`min-h-6 text-sm font-medium transition-all duration-300 ${status.type === "error" ? "text-red-600" : status.type === "success" ? "text-accent-deep" : "text-ink-soft"}`} role="status" aria-live="polite">{status.message}</p>
    </form>
  );
}
