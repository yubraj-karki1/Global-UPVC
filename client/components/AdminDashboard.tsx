"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";

type EnquiryStatus = "new" | "contacted" | "survey-booked" | "quoted" | "won" | "lost" | "archived";
type Enquiry = { _id: string; name: string; phone: string; message: string; projectType?: string; location?: string; dimensions?: string; budget?: string; preferredVisitAt?: string | null; source?: string; status?: EnquiryStatus; adminNotes?: string; followUpAt?: string | null; assignedTo?: string; activity?: { type: string; value: string; at: string }[]; createdAt: string };
type Stats = { total: number; overdueFollowUps: number; byStatus: Partial<Record<EnquiryStatus, number>> };
const apiUrl = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/$/, "");

export function AdminDashboard() {
  const [token, setToken] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | EnquiryStatus>("all");
  const [page, setPage] = useState(1);
  const [stats, setStats] = useState<Stats | null>(null);

  const logout = useCallback(() => {
    sessionStorage.removeItem("global-upvc-admin-token");
    setToken(null); setEnquiries([]); setMessage("");
  }, []);

  const loadEnquiries = useCallback(async (authToken: string) => {
    setLoading(true);
    try {
      const [response, statsResponse] = await Promise.all([fetch(`${apiUrl}/api/enquiries?limit=100`, { headers: { Authorization: `Bearer ${authToken}` } }), fetch(`${apiUrl}/api/enquiries/stats`, { headers: { Authorization: `Bearer ${authToken}` } })]);
      if (response.status === 401) { logout(); throw new Error("Your session expired. Please sign in again."); }
      if (!response.ok) throw new Error("Could not load enquiries.");
      setEnquiries(await response.json());
      if (statsResponse.ok) setStats(await statsResponse.json());
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

  async function assignEnquiry(id: string, assignedTo: string) {
    if (!token) return;
    const response = await fetch(`${apiUrl}/api/enquiries/${id}`, { method: "PATCH", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: JSON.stringify({ assignedTo }) });
    if (response.status === 401) { logout(); return; }
    if (!response.ok) { setMessage("Could not update assignment."); return; }
    const updated: Enquiry = await response.json();
    setEnquiries((current) => current.map((item) => item._id === id ? updated : item));
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
  const pageSize = 10;
  const pageCount = Math.max(1, Math.ceil(visible.length / pageSize));
  const paged = visible.slice((page - 1) * pageSize, page * pageSize);

  if (!ready) return <div className="shell py-20 text-ink-soft">Loading admin…</div>;
  if (!token) return <LoginForm login={login} loading={loading} message={message} />;

  const newCount = enquiries.filter((item) => (item.status || "new") === "new").length;

  return (
    <section className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(19,126,138,0.15),_transparent_25%),linear-gradient(180deg,#f7f7f2_0%,#eef3f3_100%)]">
      <div className="shell py-8 lg:py-10">
        <header className="mb-8 rounded-[28px] border border-line bg-panel/85 p-5 shadow-[0_18px_45px_rgba(8,19,25,0.08)] backdrop-blur-sm sm:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="eyebrow">Private dashboard</p>
              <h1 className="mt-3 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">Customer enquiries</h1>
              <p className="mt-3 text-sm text-ink-soft sm:text-base">{stats?.total ?? enquiries.length} total · {newCount} new</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button className="button button-outline focus-ring" onClick={exportCsv}>Export CSV</button>
              <button className="button button-outline focus-ring" onClick={() => token && loadEnquiries(token)} disabled={loading}>{loading ? "Refreshing…" : "Refresh"}</button>
              <button className="button button-primary focus-ring" onClick={logout}>Sign out</button>
            </div>
          </div>
        </header>
        <div className="mb-6 grid gap-3 sm:grid-cols-3"><Metric label="New leads" value={stats?.byStatus.new ?? newCount} /><Metric label="Quotes sent" value={stats?.byStatus.quoted ?? 0} /><Metric label="Overdue follow-ups" value={stats?.overdueFollowUps ?? 0} urgent /></div>

        <div className="mb-6 grid min-w-0 gap-3 rounded-[22px] border border-line bg-panel p-4 shadow-sm sm:grid-cols-[minmax(0,1fr)_auto]">
          <label className="field-label">
            <span className="sr-only">Search enquiries</span>
            <input className="field focus-ring" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search name, phone, location or message" />
          </label>
          <label className="field-label">
            <span className="sr-only">Filter by status</span>
            <select className="field min-w-0 sm:min-w-44 focus-ring" value={filter} onChange={(event) => setFilter(event.target.value as typeof filter)}>
              <option value="all">All statuses</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="survey-booked">Survey booked</option>
              <option value="quoted">Quoted</option>
              <option value="won">Won</option>
              <option value="lost">Lost</option>
              <option value="archived">Archived</option>
            </select>
          </label>
        </div>

        {message && <p className="mb-6 rounded-xl border border-brass/30 bg-[#fff7ed] px-4 py-3 text-sm font-medium text-ink" role="status">{message}</p>}

        <div className="grid gap-4">
          {visible.length === 0 && !loading ? (
            <div className="rounded-[24px] border border-line bg-panel p-10 text-center text-ink-soft shadow-sm">No enquiries match this view.</div>
          ) : (
            paged.map((enquiry) => (
              <EnquiryCard key={enquiry._id} enquiry={enquiry} updateStatus={updateStatus} saveDetails={saveAdminDetails} assign={assignEnquiry} remove={removeEnquiry} />
            ))
          )}
        </div>
        {pageCount > 1 && <div className="mt-6 flex items-center justify-center gap-4"><button className="button button-outline focus-ring" disabled={page === 1} onClick={() => setPage((value) => value - 1)}>Previous</button><span className="text-sm text-ink-soft">Page {page} of {pageCount}</span><button className="button button-outline focus-ring" disabled={page === pageCount} onClick={() => setPage((value) => value + 1)}>Next</button></div>}
      </div>
    </section>
  );
}

function Metric({ label, value, urgent = false }: { label: string; value: number; urgent?: boolean }) { return <div className={`rounded-[20px] border p-4 shadow-sm ${urgent && value > 0 ? "border-coral/40 bg-[#fff0e4]" : "border-line bg-panel"}`}><p className="text-xs font-bold uppercase tracking-wider text-ink-soft">{label}</p><p className="mt-2 font-heading text-3xl font-semibold">{value}</p></div>; }

function LoginForm({ login, loading, message }: { login: (event: FormEvent<HTMLFormElement>) => void; loading: boolean; message: string }) {
  return (
    <section className="grid min-h-[100vh] place-items-center bg-[radial-gradient(circle_at_top,_rgba(19,126,138,0.18),_transparent_24%),linear-gradient(180deg,#f5f6f2_0%,#edf3f2_100%)] px-4 py-12">
      <div className="w-full max-w-md rounded-[28px] border border-line bg-panel p-7 shadow-[0_20px_50px_rgba(8,19,25,0.12)] sm:p-10">
        <div className="mb-6 flex items-center justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-accent bg-[rgba(22,138,145,0.08)] text-2xl text-accent-deep">🔒</div>
        </div>
        <p className="eyebrow text-center">Protected access</p>
        <h1 className="mt-3 text-center font-heading text-3xl font-semibold">Admin sign in</h1>
        <p className="mt-3 text-center text-sm leading-6 text-ink-soft">Sign in to read and manage customer enquiries.</p>
        <form className="mt-8 grid gap-5" onSubmit={login}>
          <label className="field-label">Username<input name="username" className="field focus-ring" required autoComplete="username" /></label>
          <label className="field-label">Password<input name="password" type="password" className="field focus-ring" required autoComplete="current-password" /></label>
          <button className="button button-primary w-full focus-ring" disabled={loading}>{loading ? "Signing in…" : "Sign in"}</button>
          <p className="min-h-5 text-center text-sm text-red-800" role="status" aria-live="polite">{message}</p>
        </form>
        <a href="/" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent-deep hover:underline focus-ring">← Return to website</a>
      </div>
    </section>
  );
}

function EnquiryCard({ enquiry, updateStatus, saveDetails, assign, remove }: { enquiry: Enquiry; updateStatus: (id: string, status: EnquiryStatus) => void; saveDetails: (id: string, notes: string, followUpAt: string) => void; assign: (id: string, assignedTo: string) => void; remove: (enquiry: Enquiry) => void }) {
  const [notes, setNotes] = useState(enquiry.adminNotes || "");
  const [followUp, setFollowUp] = useState(enquiry.followUpAt ? new Date(enquiry.followUpAt).toISOString().slice(0, 16) : "");

  return (
    <article className="rounded-[26px] border border-line bg-panel p-5 shadow-[0_12px_35px_rgba(8,19,25,0.05)] sm:p-6">
      <div className="flex min-w-0 flex-col items-stretch justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="font-heading text-xl font-semibold text-ink">{enquiry.name}</h2>
            <span className="rounded-full border border-accent/20 bg-[rgba(22,138,145,0.08)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-accent-deep">{enquiry.status || "new"}</span>
          </div>
          <a className="mt-2 inline-block font-semibold text-accent-deep hover:underline focus-ring" href={`tel:${enquiry.phone}`}>{enquiry.phone}</a>
          <p className="mt-1 text-xs text-ink-soft">{new Intl.DateTimeFormat("en-NP", { dateStyle: "medium", timeStyle: "short" }).format(new Date(enquiry.createdAt))}</p>
        </div>

        <div className="flex flex-wrap items-start gap-2">
          <label>
            <span className="sr-only">Status for {enquiry.name}</span>
          <select className="field min-w-0 py-2 text-sm focus-ring sm:min-w-[150px]" value={enquiry.status || "new"} onChange={(event) => updateStatus(enquiry._id, event.target.value as EnquiryStatus)}>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="survey-booked">Survey booked</option>
              <option value="quoted">Quoted</option>
              <option value="won">Won</option>
              <option value="lost">Lost</option>
              <option value="archived">Archived</option>
            </select>
          </label>
          <button className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-800 transition hover:border-red-300 hover:bg-red-100 focus-ring" onClick={() => remove(enquiry)} aria-label={`Delete enquiry from ${enquiry.name}`}>Delete</button>
        </div>
      </div>

      <p className="mt-6 whitespace-pre-wrap border-l-2 border-brass bg-background/40 pl-4 leading-7 text-ink-soft">{enquiry.message}</p>
      <label className="field-label mt-5 block max-w-sm">Assigned staff member<input className="field focus-ring" value={enquiry.assignedTo || ""} onChange={(event) => assign(enquiry._id, event.target.value)} placeholder="Enter a staff name" /></label>
      {Boolean(enquiry.activity?.length) && <details className="mt-5 border-t border-line pt-4"><summary className="cursor-pointer text-sm font-semibold">Activity history ({enquiry.activity?.length})</summary><ol className="mt-3 grid gap-2">{[...(enquiry.activity || [])].reverse().map((entry, index) => <li key={`${entry.at}-${index}`} className="text-xs text-ink-soft">{new Intl.DateTimeFormat("en-NP", { dateStyle: "medium", timeStyle: "short" }).format(new Date(entry.at))} · {entry.value}</li>)}</ol></details>}
      {(enquiry.projectType || enquiry.location || enquiry.dimensions || enquiry.budget || enquiry.preferredVisitAt) && <dl className="mt-5 grid gap-3 rounded-xl bg-background/60 p-4 text-sm sm:grid-cols-2"><Detail label="Service" value={enquiry.projectType} /><Detail label="Location" value={enquiry.location} /><Detail label="Sizes / quantity" value={enquiry.dimensions} /><Detail label="Budget" value={enquiry.budget} /><Detail label="Preferred visit" value={enquiry.preferredVisitAt ? new Intl.DateTimeFormat("en-NP", { dateStyle: "medium", timeStyle: "short" }).format(new Date(enquiry.preferredVisitAt)) : ""} /><Detail label="Source" value={enquiry.source} /></dl>}

      <div className="mt-5 grid min-w-0 gap-4 border-t border-line pt-5 md:grid-cols-[minmax(0,1.7fr)_minmax(0,240px)_auto] md:items-end">
        <label className="field-label">
          Private admin notes
          <textarea className="field min-h-24 resize-y focus-ring" maxLength={2000} value={notes} onChange={(event) => setNotes(event.target.value)} />
        </label>
        <label className="field-label">
          Follow-up date
          <input type="datetime-local" className="field h-[52px] focus-ring" value={followUp} onChange={(event) => setFollowUp(event.target.value)} />
        </label>
        <button className="button button-outline h-[52px] self-end px-5 focus-ring" onClick={() => saveDetails(enquiry._id, notes, followUp)}>Save notes</button>
      </div>
    </article>
  );
}

function Detail({ label, value }: { label: string; value?: string }) { return value ? <div><dt className="text-xs font-bold uppercase tracking-wider text-ink-soft">{label}</dt><dd className="mt-1 font-medium text-ink">{value}</dd></div> : null; }
