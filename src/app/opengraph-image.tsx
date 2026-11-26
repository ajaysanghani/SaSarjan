import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = `${siteConfig.name}: ${siteConfig.hero.headline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Share card for WhatsApp, LinkedIn, X and others. Generated at build time from the site config. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#ffffff",
          borderTop: "24px solid #b61c67",
          color: "#2a1621",
        }}
      >
        <div style={{ fontSize: 32, color: "#961556", fontWeight: 600 }}>{siteConfig.name}</div>
        <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.1, maxWidth: 1000 }}>{siteConfig.hero.headline}</div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 30, color: "#5e4a56" }}>
          <span>{siteConfig.altTagline}</span>
          <span style={{ color: "#961556", fontWeight: 600 }}>sasarjan.com</span>
        </div>
      </div>
    ),
    size,
  );
}
