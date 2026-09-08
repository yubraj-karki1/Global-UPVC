"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";

type EnquiryStatus = "new" | "contacted" | "archived";
type Enquiry = { _id: string; name: string; phone: string; message: string; status?: EnquiryStatus; adminNotes?: string; followUpAt?: string | null; createdAt: string };
const apiUrl = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/$/, "");

export function AdminDashboard() {
  const [token, setToken] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | EnquiryStatus>("all");

  const logout = useCallback(() => {
    sessionStorage.removeItem("global-upvc-admin-token");
    setToken(null); setEnquiries([]); setMessage("");
  }, []);

  const loadEnquiries = useCallback(async (authToken: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/enquiries`, { headers: { Authorization: `Bearer ${authToken}` } });
      if (response.status === 401) { logout(); throw new Error("Your session expired. Please sign in again."); }
      if (!response.ok) throw new Error("Could not load enquiries.");
      setEnquiries(await response.json());
    } catch (error) { setMessage(error instanceof Error ? error.message : "Could not load enquiries."); }
    finally { setLoading(false); }
  }, [logout]);

  useEffect(() => {
    const stored = sessionStorage.getItem("global-upvc-admin-token");
    setToken(stored); setReady(true);
    if (stored) void loadEnquiries(stored);
  }, [loadEnquiries]);

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setLoading(true); setMessage("");
    const values = Object.fromEntries(new FormData(event.currentTarget));
    try {
      const response = await fetch(`${apiUrl}/api/admin/login`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.message || "Could not sign in.");
      sessionStorage.setItem("global-upvc-admin-token", result.token);
      setToken(result.token); setMessage("");
      await loadEnquiries(result.token);
    } catch (error) { setMessage(error instanceof Error ? error.message : "Could not sign in."); }
    finally { setLoading(false); }
  }

  async function updateStatus(id: string, status: EnquiryStatus) {
    if (!token) return;
    setMessage("");
    const response = await fetch(`${apiUrl}/api/enquiries/${id}`, { method: "PATCH", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
    if (response.status === 401) { logout(); return; }
    if (!response.ok) { setMessage("Could not update that enquiry."); return; }
    const updated: Enquiry = await response.json();
    setEnquiries((current) => current.map((item) => item._id === id ? updated : item));
  }

  async function saveAdminDetails(id: string, adminNotes: string, followUpAt: string) {
    if (!token) return;
    setMessage("");
    const response = await fetch(`${apiUrl}/api/enquiries/${id}`, { method: "PATCH", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: JSON.stringify({ adminNotes, followUpAt: followUpAt || null }) });
    if (response.status === 401) { logout(); return; }
    if (!response.ok) { setMessage("Could not save notes and follow-up date."); return; }
    const updated: Enquiry = await response.json();
    setEnquiries((current) => current.map((item) => item._id === id ? updated : item));
    setMessage("Admin notes saved.");
  }

  function exportCsv() {
    const escape = (value: unknown) => `"${String(value ?? "").replaceAll('"', '""')}"`;
    const rows = [["Submitted", "Name", "Phone", "Status", "Follow up", "Message", "Admin notes"], ...visible.map((item) => [item.createdAt, item.name, item.phone, item.status || "new", item.followUpAt || "", item.message, item.adminNotes || ""])];
    const blob = new Blob([rows.map((row) => row.map(escape).join(",")).join("\r\n")], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a"); anchor.href = url; anchor.download = `global-upvc-enquiries-${new Date().toISOString().slice(0, 10)}.csv`; anchor.click();
    URL.revokeObjectURL(url);
  }

  async function removeEnquiry(enquiry: Enquiry) {
    if (!token || !window.confirm(`Delete the enquiry from ${enquiry.name}? This cannot be undone.`)) return;
    const response = await fetch(`${apiUrl}/api/enquiries/${enquiry._id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
    if (response.status === 401) { logout(); return; }
    if (!response.ok) { setMessage("Could not delete that enquiry."); return; }
    setEnquiries((current) => current.filter((item) => item._id !== enquiry._id));
  }

  const visible = useMemo(() => enquiries.filter((enquiry) => {
    const matchesFilter = filter === "all" || (enquiry.status || "new") === filter;
    const term = search.trim().toLowerCase();
    return matchesFilter && (!term || `${enquiry.name} ${enquiry.phone} ${enquiry.message}`.toLowerCase().includes(term));
  }), [enquiries, filter, search]);

  if (!ready) return <div className="shell py-20 text-ink-soft">Loading admin…</div>;
  if (!token) return <LoginForm login={login} loading={loading} message={message} />;

  return (
    <section className="shell py-12 lg:py-16">
      <div className="flex flex-wrap items-end justify-between gap-5"><div><p className="eyebrow">Private dashboard</p><h1 className="mt-3 font-heading text-4xl font-semibold tracking-tight sm:text-5xl">Customer enquiries</h1><p className="mt-3 text-ink-soft">{enquiries.length} total · {enquiries.filter((item) => (item.status || "new") === "new").length} new</p></div><div className="flex flex-wrap gap-3"><button className="button button-outline focus-ring" onClick={exportCsv}>Export CSV</button><button className="button button-outline focus-ring" onClick={() => token && loadEnquiries(token)} disabled={loading}>{loading ? "Refreshing…" : "Refresh"}</button><button className="button button-primary focus-ring" onClick={logout}>Sign out</button></div></div>
      <div className="mt-10 grid gap-3 border border-line bg-panel p-4 sm:grid-cols-[1fr_auto]"><label className="field-label"><span className="sr-only">Search enquiries</span><input className="field focus-ring" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search name, phone, location or message" /></label><label className="field-label"><span className="sr-only">Filter by status</span><select className="field min-w-44 focus-ring" value={filter} onChange={(event) => setFilter(event.target.value as typeof filter)}><option value="all">All statuses</option><option value="new">New</option><option value="contacted">Contacted</option><option value="archived">Archived</option></select></label></div>
      {message && <p className="mt-5 border-l-2 border-brass pl-4 text-sm text-ink-soft" role="status">{message}</p>}
      <div className="mt-6 grid gap-4">{visible.length === 0 && !loading ? <div className="border border-line bg-panel p-10 text-center text-ink-soft">No enquiries match this view.</div> : visible.map((enquiry) => <EnquiryCard key={enquiry._id} enquiry={enquiry} updateStatus={updateStatus} saveDetails={saveAdminDetails} remove={removeEnquiry} />)}</div>
    </section>
  );
}

function LoginForm({ login, loading, message }: { login: (event: FormEvent<HTMLFormElement>) => void; loading: boolean; message: string }) {
  return <section className="shell grid min-h-[calc(100vh-5rem)] place-items-center py-12"><div className="w-full max-w-md border border-line bg-panel p-7 sm:p-10"><p className="eyebrow">Protected access</p><h1 className="mt-3 font-heading text-3xl font-semibold">Admin sign in</h1><p className="mt-3 text-sm leading-6 text-ink-soft">Sign in to read and manage customer enquiries.</p><form className="mt-8 grid gap-5" onSubmit={login}><label className="field-label">Username<input name="username" className="field focus-ring" required autoComplete="username" /></label><label className="field-label">Password<input name="password" type="password" className="field focus-ring" required autoComplete="current-password" /></label><button className="button button-primary w-full focus-ring" disabled={loading}>{loading ? "Signing in…" : "Sign in"}</button><p className="min-h-5 text-sm text-red-800" role="status" aria-live="polite">{message}</p></form><a href="/" className="mt-3 inline-block text-sm font-semibold text-accent-deep hover:underline focus-ring">← Return to website</a></div></section>;
}

function EnquiryCard({ enquiry, updateStatus, saveDetails, remove }: { enquiry: Enquiry; updateStatus: (id: string, status: EnquiryStatus) => void; saveDetails: (id: string, notes: string, followUpAt: string) => void; remove: (enquiry: Enquiry) => void }) {
  const [notes, setNotes] = useState(enquiry.adminNotes || "");
  const [followUp, setFollowUp] = useState(enquiry.followUpAt ? new Date(enquiry.followUpAt).toISOString().slice(0, 16) : "");
  return <article className="border border-line bg-panel p-5 sm:p-7"><div className="flex flex-wrap justify-between gap-4"><div><div className="flex flex-wrap items-center gap-3"><h2 className="font-heading text-xl font-semibold">{enquiry.name}</h2><span className="bg-background px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-accent-deep">{enquiry.status || "new"}</span></div><a className="mt-2 inline-block font-semibold text-accent-deep hover:underline focus-ring" href={`tel:${enquiry.phone}`}>{enquiry.phone}</a><p className="mt-1 text-xs text-ink-soft">{new Intl.DateTimeFormat("en-NP", { dateStyle: "medium", timeStyle: "short" }).format(new Date(enquiry.createdAt))}</p></div><div className="flex items-start gap-2"><label><span className="sr-only">Status for {enquiry.name}</span><select className="field py-2 text-sm focus-ring" value={enquiry.status || "new"} onChange={(event) => updateStatus(enquiry._id, event.target.value as EnquiryStatus)}><option value="new">New</option><option value="contacted">Contacted</option><option value="archived">Archived</option></select></label><button className="border border-line px-3 py-2 text-sm font-semibold text-red-800 hover:border-red-800 focus-ring" onClick={() => remove(enquiry)} aria-label={`Delete enquiry from ${enquiry.name}`}>Delete</button></div></div><p className="mt-6 whitespace-pre-wrap border-l-2 border-brass pl-4 leading-7 text-ink-soft">{enquiry.message}</p><div className="mt-6 grid gap-4 border-t border-line pt-6 md:grid-cols-[1fr_240px_auto]"><label className="field-label">Private admin notes<textarea className="field min-h-24 resize-y focus-ring" maxLength={2000} value={notes} onChange={(event) => setNotes(event.target.value)} /></label><label className="field-label">Follow-up date<input type="datetime-local" className="field focus-ring" value={followUp} onChange={(event) => setFollowUp(event.target.value)} /></label><button className="button button-outline self-end focus-ring" onClick={() => saveDetails(enquiry._id, notes, followUp)}>Save notes</button></div></article>;
}
