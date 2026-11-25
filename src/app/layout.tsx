import type { Metadata, Viewport } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import { siteConfig } from "@/config/site";
import "@sasarjan/web-core/styles.css"; // shared footer band and /ecosystem page; before the site's CSS
import "./globals.css";

const title = `${siteConfig.name} — Co-creating transparent, inclusive and effective systems`;
const description =
  "A civic co-creation initiative inviting people across India's states, Union Territories, professions, generations and languages to collaborate on public systems, civic participation and collective prosperity.";

// Self-hosted by Next.js at build time: no render-blocking request to Google Fonts.
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-inter", display: "swap" });
const serif = Source_Serif_4({ subsets: ["latin"], weight: "600", variable: "--font-source-serif", display: "swap" });

// Index only once the production domain is configured, so preview deployments stay out of search.
const indexable = Boolean(siteConfig.siteUrl);

export const metadata: Metadata = {
  ...(siteConfig.siteUrl && {
    metadataBase: new URL(siteConfig.siteUrl),
    alternates: { canonical: "/" },
  }),
  title,
  description,
  applicationName: siteConfig.name,
  keywords: [
    "collaborative governance",
    "civic participation",
    "public systems",
    "inclusion",
    "collective prosperity",
    "India",
    "co-creation",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: siteConfig.name,
    title,
    description,
    ...(siteConfig.siteUrl && { url: "/" }),
  },
  twitter: { card: "summary_large_image", title, description },
  robots: indexable ? { index: true, follow: true } : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" id="top" className={`${inter.variable} ${serif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
