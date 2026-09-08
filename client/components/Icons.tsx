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
