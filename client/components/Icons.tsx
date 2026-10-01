export type IconName = "window" | "door" | "home" | "hardware" | "glass" | "measure";

export function LineIcon({ name }: { name: IconName }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "square" as const };
  const paths: Record<IconName, React.ReactNode> = {
    window: <><rect x="3" y="3" width="18" height="18" /><path d="M12 3v18M3 12h18" /></>,
    door: <><path d="M5 21V3h14v18M9 21V7h7v14" /><circle cx="14" cy="14" r=".6" fill="currentColor" /></>,
    home: <><path d="m3 11 9-8 9 8M5 10v11h14V10M9 21v-6h6v6" /></>,
    hardware: <><path d="M14.5 6.5a4 4 0 0 0-5 5L3 18l3 3 6.5-6.5a4 4 0 0 0 5-5l-3 3-3-3 3-3Z" /></>,
    glass: <><rect x="4" y="3" width="16" height="18" /><path d="m8 17 8-10M12 18l5-6" /></>,
    measure: <><path d="m4 17 13-13 3 3L7 20l-3-3Z" /><path d="m13 8 3 3M10 11l2 2M7 14l3 3" /></>,
  };
  return <svg viewBox="0 0 24 24" className="h-8 w-8" aria-hidden="true" {...common}>{paths[name]}</svg>;
}

export function BrandIcon({ name, className = "" }: { name: "facebook" | "instagram" | "whatsapp"; className?: string }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (name === "facebook") return <svg viewBox="0 0 24 24" className={className} aria-hidden="true"><path fill="currentColor" d="M13.5 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H7.3V13h2.8v8z" /></svg>;
  if (name === "instagram") return <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...common}><rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.8" cy="6.5" r=".8" fill="currentColor" stroke="none" /></svg>;
  return <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...common}><path d="M20.5 11.7a8.3 8.3 0 0 1-12.3 7.2L3 20l1.2-5a8.3 8.3 0 1 1 16.3-3.3Z" /><path d="M8.5 8.3c.2-.5.5-.6.9-.6h.5c.2 0 .4.1.5.4l.8 1.8c.1.2.1.4-.1.6l-.6.7c-.2.2-.2.4 0 .6.6 1 1.4 1.8 2.5 2.4.2.1.4.1.6-.1l.8-.9c.2-.2.4-.2.7-.1l1.7.8c.3.1.4.3.4.5 0 .3-.1 1.1-.6 1.5-.5.5-1.2.7-1.9.6-1-.1-2.3-.7-3.8-2-1.8-1.5-2.8-3.3-3-4.4-.2-.9.1-1.5.6-1.8Z" /></svg>;
}
