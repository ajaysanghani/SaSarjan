import type { Metadata } from "next";
import { IntroductionPage, ecosystemSites, introductionContent, introductionMetadata } from "@sasarjan/web-core";
import { AnalyticsListener } from "@/components/AnalyticsListener";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { siteConfig } from "@/config/site";
import { site } from "@/site.config";

// The page's hero headline, from the shared package.
const title = `SaSarjan — ${introductionContent.hero?.headline ?? introductionMetadata.title}`;
const { description } = introductionMetadata;

export const metadata: Metadata = {
  title,
  description,
  ...(siteConfig.siteUrl && { alternates: { canonical: "/ecosystem" } }),
  // Replaces the home page's share preview, which the root layout would otherwise pass down. The
  // share image comes from ./opengraph-image.tsx and ./twitter-image.tsx.
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "SaSarjan",
    title,
    description,
    ...(siteConfig.siteUrl && { url: "/ecosystem" }),
  },
  twitter: { card: "summary_large_image", title, description },
};

/** Organization and WebSite structured data, from facts the site already states. */
function jsonLd() {
  const sasarjan = ecosystemSites.find((s) => s.id === "sasarjan");
  const url = siteConfig.siteUrl ?? sasarjan?.url ?? "https://sasarjan.com";
  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${url}/#organization`,
      name: "SaSarjan",
      ...(sasarjan?.nativeName && { alternateName: sasarjan.nativeName }),
      url,
      logo: new URL("/logo.png", url).toString(),
      description: introductionContent.lead[0],
      ...(siteConfig.contactEmail && { email: siteConfig.contactEmail }),
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${url}/#website`,
      name: "SaSarjan",
      url,
      publisher: { "@id": `${url}/#organization` },
    },
  ];
}

export default function EcosystemPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // JSON-LD from our own constants; `<` is escaped so the data can never close the script.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }}
      />
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
