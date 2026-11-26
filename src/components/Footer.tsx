import { SharedFooter } from "@sasarjan/web-core";
import { joinHref, siteConfig } from "@/config/site";
import { site } from "@/site.config";
import { Wordmark } from "./Wordmark";

/**
 * Site footer with the shared SaSarjan ecosystem band (`@sasarjan/web-core`).
 * Pass `condensed` on pages that already show the ecosystem tagline and introduction (/ecosystem).
 */
export function Footer({ condensed = false }: { condensed?: boolean }) {
  const { name, tagline, nav, links, contactEmail, social, launchYear, cta } = siteConfig;
  const year = new Date().getFullYear();
  const years = year > launchYear ? `${launchYear}–${year}` : `${launchYear}`;

  const takePart = [
    joinHref && { label: cta.primaryLabel, href: joinHref, event: "cta_join" },
    links.whatsappCommunityUrl && {
      label: cta.secondaryLabel,
      href: links.whatsappCommunityUrl,
      event: "cta_whatsapp_community",
    },
    ...social.map((s) => ({ label: s.label, href: s.url, event: "social_link" })),
  ].filter(Boolean) as { label: string; href: string; event: string }[];

  const legal = [
    links.privacyNoticeUrl && { label: "Privacy notice", href: links.privacyNoticeUrl },
    links.termsUrl && { label: "Terms", href: links.termsUrl },
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__about">
          <Wordmark />
          <p className="site-footer__name">{name}</p>
          <p>{tagline}</p>
        </div>

        <nav aria-label="Footer">
          <h2 className="site-footer__heading">Explore</h2>
          <ul className="site-footer__list">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
            <li>
              <a href="/#faq">FAQ</a>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className="site-footer__heading">Take part</h2>
          <ul className="site-footer__list">
            {takePart.map((l) => {
              const isEmail = l.href.startsWith("mailto:");
              const isExternal = !isEmail && !l.href.startsWith("/");
              return (
                <li key={l.href}>
                  <a
                    href={l.href}
                    {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    data-track={l.event}
                    data-track-id="footer"
                  >
                    {l.label}
                    {isExternal && <span className="sr-only"> (opens in a new tab)</span>}
                  </a>
                </li>
              );
            })}
            {contactEmail && (
              <li>
                <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
              </li>
            )}
          </ul>
        </div>
      </div>

      <SharedFooter variant="band" site={site} condensed={condensed} />

      <div className="container site-footer__bottom">
        <p>
          © {years} {name}
        </p>
        {legal.length > 0 && (
          <ul className="site-footer__legal">
            {legal.map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </footer>
  );
}
