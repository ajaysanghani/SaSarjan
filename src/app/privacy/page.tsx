import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { siteConfig } from "@/config/site";
import { privacySections, privacyUpdated } from "@/content/privacy";

export const metadata: Metadata = {
  title: `Privacy notice — ${siteConfig.name}`,
  description: "What we collect through the join form, why, who can see it, how long we keep it, and your rights.",
  ...(siteConfig.siteUrl && { alternates: { canonical: "/privacy" } }),
};

export default function PrivacyPage() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <Header />
      <main id="main" tabIndex={-1} className="join-page">
        <article className="container privacy">
          <h1 className="join-header__heading">Privacy notice</h1>
          <p className="section__lead">Last updated: {privacyUpdated}</p>
          {privacySections.map((s) => (
            <section key={s.heading}>
              <h2>{s.heading}</h2>
              {s.paragraphs?.map((p) => <p key={p}>{p}</p>)}
              {s.list && (
                <ul>
                  {s.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
              {s.note && <p>{s.note}</p>}
            </section>
          ))}
        </article>
      </main>
      <Footer />
    </>
  );
}
