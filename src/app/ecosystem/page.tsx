import type { Metadata } from "next";
import { IntroductionPage, introductionMetadata } from "@sasarjan/web-core";
import { AnalyticsListener } from "@/components/AnalyticsListener";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { siteConfig } from "@/config/site";
import { site } from "@/site.config";

// Title and description come from the shared package, like the rest of this page's copy.
export const metadata: Metadata = {
  ...introductionMetadata,
  ...(siteConfig.siteUrl && { alternates: { canonical: "/ecosystem" } }),
  // Replace the home page's share preview, which the root layout would otherwise pass down.
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: siteConfig.name,
    ...introductionMetadata,
    ...(siteConfig.siteUrl && { url: "/ecosystem" }),
  },
  twitter: { card: "summary", ...introductionMetadata },
};

export default function EcosystemPage() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <Header />
      <main id="main" tabIndex={-1}>
        <IntroductionPage site={site} as="div" />
      </main>
      {/* The page already shows the tagline and introduction, so the footer band is condensed. */}
      <Footer condensed />
      <AnalyticsListener />
    </>
  );
}
