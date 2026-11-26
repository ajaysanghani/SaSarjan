import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { AnalyticsListener } from "@/components/AnalyticsListener";
import { EcosystemJoinForm } from "@/components/EcosystemJoinForm";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { siteConfig } from "@/config/site";
import { interestLabel } from "@/lib/ecosystem-join";
import { notionConfigured } from "@/lib/notion";

const title = "Join the SaSarjan Ecosystem";
const description =
  "Tell us how you would like to take part in the SaSarjan ecosystem: as a learner, volunteer, mentor, entrepreneur, partner, supporter or CoCreator.";

export const metadata: Metadata = {
  title,
  description,
  ...(siteConfig.siteUrl && { alternates: { canonical: "/ecosystem/join" } }),
  openGraph: { type: "website", locale: "en_IN", siteName: "SaSarjan", title, description },
  twitter: { card: "summary", title, description },
};

export default async function EcosystemJoinPage({
  searchParams,
}: {
  searchParams: Promise<{ interest?: string | string[] }>;
}) {
  const { interest } = await searchParams;
  const { contactEmail } = siteConfig;

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
              <p className="eyebrow">SaSarjan ecosystem</p>
              <h1 className="join-header__heading">Join the Ecosystem</h1>
              <p className="section__lead">
                Learn, earn, lead, contribute and CoCreate with people, organisations and communities across the
                SaSarjan ecosystem. Tell us a little about yourself and how you would like to take part.
              </p>
            </header>

            {notionConfigured() ? (
              <EcosystemJoinForm
                contactEmail={contactEmail}
                initialInterest={interestLabel(typeof interest === "string" ? interest : undefined)}
              />
            ) : (
              // Without storage the form could not save anything, so it is not shown at all.
              <div className="join-alert" role="note">
                <p className="join-alert__title">The joining form is being set up.</p>
                {contactEmail && (
                  <p>
                    In the meantime, please email <a href={`mailto:${contactEmail}`}>{contactEmail}</a> and tell us
                    how you would like to take part.
                  </p>
                )}
              </div>
            )}
          </div>

          <aside className="join-aside" aria-labelledby="eco-next-heading">
            <h2 id="eco-next-heading" className="join-aside__heading">
              What happens next
            </h2>
            <ol className="join-aside__steps">
              <li>We receive your details.</li>
              <li>We review them for relevant opportunities across the ecosystem.</li>
              <li>If there is a good fit, we contact you by email.</li>
            </ol>
            <p className="join-aside__privacy">
              <ShieldCheck aria-hidden="true" focusable="false" />
              <span>We ask only for what we need to find a good fit. Only your name, email and interest are required.</span>
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
