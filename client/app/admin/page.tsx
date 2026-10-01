import type { Metadata } from "next";
import { AdminDashboard } from "@/components/AdminDashboard";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Admin Enquiries | Global UPVC",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-line bg-panel"><div className="shell flex min-h-[76px] items-center justify-between gap-5"><a href="/" className="focus-ring"><Image src="/images/global-upvc-logo.png" alt="Global UPVC — Windows & Prefab" width={155} height={47} priority className="h-auto w-[112px] max-w-[40vw] object-contain sm:w-[124px]" /></a><span className="font-heading text-xs font-bold uppercase tracking-[.18em] text-ink-soft">Enquiry administration</span></div></header>
      <AdminDashboard />
    </main>
  );
}
