import { joinHref, siteConfig } from "@/config/site";
import { CtaLink } from "./CtaLink";
import { MobileNav } from "./MobileNav";
import { Wordmark } from "./Wordmark";

export function Header() {
  const { nav, cta } = siteConfig;
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Wordmark priority />
        <nav className="site-nav" aria-label="Main">
          <ul className="site-nav__list">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="site-nav__link">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="site-header__cta">
          <CtaLink
            href={joinHref}
            label={cta.primaryLabel}
            event="cta_join"
            placement="header"
          />
        </div>
        <MobileNav items={nav} ctaHref={joinHref} ctaLabel={cta.primaryLabel} />
      </div>
    </header>
  );
}
