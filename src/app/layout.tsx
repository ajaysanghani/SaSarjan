import type { Metadata, Viewport } from "next";
import { siteConfig } from "@/config/site";
import "./globals.css";

const title = `${siteConfig.name} — Co-creating transparent, inclusive and effective systems`;
const description =
  "A civic co-creation initiative inviting people across India's states, Union Territories, professions, generations and languages to collaborate on public systems, civic participation and collective prosperity.";

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
  twitter: { card: "summary", title, description },
  robots: indexable ? { index: true, follow: true } : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#faf8f3",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" id="top">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Source+Serif+4:opsz,wght@8..60,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
