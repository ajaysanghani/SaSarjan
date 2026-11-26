import { ImageResponse } from "next/og";
import { ecosystemSites } from "@sasarjan/web-core";

/** The /ecosystem share image: 1200×630, drawn at build time, no image files. */
export const ecosystemOgSize = { width: 1200, height: 630 };
export const ecosystemOgAlt =
  "SaSarjan — CoCreating a World of Collective Prosperity. Seven initiatives: " +
  ecosystemSites.map((s) => s.name).join(", ") +
  ".";

// The site's accent colours (globals.css --accent-strong and --accent-soft).
const ACCENT = "#961556";
const SOFT = "#fbe9f2";
const TEXT = "#2a1621";

export function renderEcosystemOg() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#ffffff",
          color: TEXT,
          borderTop: `16px solid ${ACCENT}`,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 34, fontWeight: 700, color: ACCENT, letterSpacing: 1 }}>SaSarjan</div>
          <div style={{ marginTop: 18, fontSize: 68, fontWeight: 800, lineHeight: 1.08, maxWidth: 980 }}>
            CoCreating a World of Collective Prosperity
          </div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
          {ecosystemSites.map((site) => (
            <div
              key={site.id}
              style={{
                display: "flex",
                padding: "10px 22px",
                borderRadius: 999,
                background: SOFT,
                color: ACCENT,
                fontSize: 28,
                fontWeight: 700,
              }}
            >
              {site.name}
            </div>
          ))}
        </div>
      </div>
    ),
    ecosystemOgSize,
  );
}
