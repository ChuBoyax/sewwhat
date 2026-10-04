import { useShopStatus } from "../hooks/useShopStatus";

export function StatusPill({ dark = false, className = "" }) {
  const s = useShopStatus();
  if (!s) return null;
  return (
    <p
      className={`inline-flex items-center gap-2.5 rounded-full border px-4 py-2 text-sm font-semibold backdrop-blur ${
        dark ? "border-linen/15 bg-linen/5 text-linen" : "border-moss/10 bg-white/60 text-moss"
      } ${className}`}
    >
      <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
        {s.open && <span className="absolute inset-0 animate-ping rounded-full bg-tulip opacity-60" />}
        <span className={`relative h-2.5 w-2.5 rounded-full ${s.open ? "bg-tulip" : dark ? "bg-linen/40" : "bg-moss/35"}`} />
      </span>
      {s.label}
    </p>
  );
}
