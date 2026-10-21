import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { AnalyticsListener } from "@/components/AnalyticsListener";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JoinForm } from "@/components/JoinForm";
import { siteConfig } from "@/config/site";
import { joinPage } from "@/content/join-form";
import { notionConfigured } from "@/lib/notion";

export const metadata: Metadata = {
  title: `Join the Initiative — ${siteConfig.name}`,
  description:
    "Offer your experience to CoCreate India's Future: national and state leadership, operations and implementation, think tank and policy research, mentoring, and young contributors.",
  ...(siteConfig.siteUrl && { alternates: { canonical: "/join" } }),
};

export default function JoinPage() {
  const { contactEmail, links } = siteConfig;
  // Without a Notion token the form cannot save anything, so offer the fallbacks instead.
  const fallback = links.notionFormUrl ?? (contactEmail ? `mailto:${contactEmail}` : null);

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <Header />
      <main id="main" tabIndex={-1} className="join-page">
        <div className="container join-layout">
          <div className="join-main">
            <header className="join-header">
              <p className="eyebrow">{joinPage.eyebrow}</p>
              <h1 className="join-header__heading">{joinPage.heading}</h1>
              <p className="section__lead">{joinPage.lead}</p>
            </header>

            {notionConfigured() ? (
              <JoinForm contactEmail={contactEmail} />
            ) : (
              <div className="join-alert" role="note">
                <p className="join-alert__title">The application form is being set up.</p>
                {fallback && (
                  <p>
                    In the meantime, please <a href={fallback}>apply here</a>.
                  </p>
                )}
              </div>
            )}
          </div>

          <aside className="join-aside" aria-labelledby="join-next-heading">
            <h2 id="join-next-heading" className="join-aside__heading">
              {joinPage.next.heading}
            </h2>
            <ol className="join-aside__steps">
              {joinPage.next.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <p className="join-aside__privacy">
              <ShieldCheck aria-hidden="true" focusable="false" />
              <span>{joinPage.privacy}</span>
            </p>
            {contactEmail && (
              <p className="join-aside__contact">
                Questions? <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
              </p>
            )}
          </aside>
        </div>
      </main>
      <Footer />
      <AnalyticsListener />
    </>
  );
}
