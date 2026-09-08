export function WindowMark({ className = "" }: { className?: string }) {
  return (
    <span className={`window-mark ${className}`} aria-hidden="true">
      <span /><span /><span /><span />
    </span>
  );
}
