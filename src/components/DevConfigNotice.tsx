import { missingRequiredConfig } from "@/config/site";

/** Development-only reminder listing required settings that are still empty. */
export function DevConfigNotice() {
  if (process.env.NODE_ENV !== "development") return null;
  const missing = missingRequiredConfig();
  if (missing.length === 0) return null;
  return (
    <div className="dev-notice" role="note">
      <strong>Development notice — not set:</strong> {missing.join("; ")}. Set these in{" "}
      <code>.env.local</code> or <code>src/config/site.ts</code>. Until then, /join links to the fallback form and WhatsApp buttons are hidden.
    </div>
  );
}
