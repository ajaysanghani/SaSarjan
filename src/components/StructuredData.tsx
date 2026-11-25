import { siteConfig } from "@/config/site";
import { faqs } from "@/content/faqs";

/** JSON-LD for search engines: the organisation, the website and the FAQ. */
export function StructuredData() {
  const { name, tagline, siteUrl, contactEmail, social } = siteConfig;
  if (!siteUrl) return null;
  const url = new URL("/", siteUrl).toString();
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name,
      url,
      logo: new URL("/logo.png", siteUrl).toString(),
      description: tagline,
      ...(contactEmail && { email: contactEmail }),
      ...(social.length > 0 && { sameAs: social.map((s) => s.url) }),
    },
    { "@context": "https://schema.org", "@type": "WebSite", name, url, inLanguage: "en-IN" },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer.join(" ") },
      })),
    },
  ];
  return (
    <script
      type="application/ld+json"
      // Escape "<" so the JSON can never close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
