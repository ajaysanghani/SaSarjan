import "server-only";
import { defineSiteConfig } from "@sasarjan/web-core/config";
import { ecosystemJoinHref, joinHref, siteConfig } from "@/config/site";
import { notionConfigured } from "@/lib/notion";

const { nav, launchYear } = siteConfig;

/**
 * Shared SaSarjan ecosystem footer and /ecosystem page settings (`@sasarjan/web-core`).
 * Server code only: the config module bundles zod.
 *
 * Deliberately unset:
 * - `siteName`: the ecosystem directory shows "SaSarjan", not the provisional site name.
 * - `footer.contactEmail`: whether info@sasarjan.com becomes the shared contact is still open.
 *
 * `cocreator` points "Become a CoCreator" and the /ecosystem pathway actions at the "Join the
 * Ecosystem" form, but only once that form can save (NOTION_TOKEN is set when the site is built).
 * Until then those calls to action stay hidden rather than lead to a form that cannot work.
 */
export const site = defineSiteConfig({
  siteId: "sasarjan",
  ...(notionConfigured() && { cocreator: { href: ecosystemJoinHref } }),
  footer: {
    // Shown only by the `full` variant. This site renders `band` inside its own footer.
    siteLinks: [
      {
        heading: "Explore",
        links: [...nav, { label: "FAQ", href: "/#faq" }, { label: "Join the Initiative", href: "/join" }],
      },
    ],
    // No policy links: the site's own footer shows the privacy and terms links, and `band` doesn't.
    // (Passing the env-configured URLs here would also fail the build if one were plain http:.)
    policyLinks: [],
    launchYear,
  },
  introduction: {
    // On /ecosystem, after "Become a CoCreator": this site's own call to action.
    ctas: [{ label: siteConfig.cta.primaryLabel, href: joinHref, variant: "primary" }],
  },
});
