import type { Metadata } from "next";
import { AdminDashboard } from "@/components/AdminDashboard";
import { WindowMark } from "@/components/WindowMark";

export const metadata: Metadata = {
  title: "Admin Enquiries | Global UPVC",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-line bg-panel"><div className="shell flex min-h-20 items-center justify-between gap-5"><a href="/" className="flex items-center gap-3 font-heading text-sm font-bold focus-ring"><WindowMark className="h-9 w-9" />GLOBAL UPVC</a><span className="font-heading text-xs font-bold uppercase tracking-[.18em] text-ink-soft">Enquiry administration</span></div></header>
      <AdminDashboard />
    </main>
  );
}
