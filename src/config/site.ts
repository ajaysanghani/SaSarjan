/**
 * Central site configuration.
 *
 * Everything the project owner is likely to change before or after launch
 * lives here: name, wordmark, hero copy, external destinations and contact
 * details. Section content (focus areas, FAQs, etc.) lives in `src/content/`.
 *
 * External URLs can be written here directly (the first argument of
 * `urlSetting` / `setting`) or supplied through environment variables (see
 * `.env.example`), which take precedence. Optional links that are empty are
 * simply not shown.
 */

/** Returns the env value if set, otherwise the value written here, otherwise null. */
function setting(direct: string, fromEnv: string | undefined): string | null {
  const value = fromEnv?.trim() || direct.trim();
  return value || null;
}

/** Like `setting`, but only accepts absolute http(s) URLs. */
function urlSetting(direct: string, fromEnv: string | undefined): string | null {
  const value = setting(direct, fromEnv);
  if (!value) return null;
  try {
    const { protocol } = new URL(value);
    return protocol === "https:" || protocol === "http:" ? value : null;
  } catch {
    return null;
  }
}

export const siteConfig = {
  /** Provisional working name. Change freely. */
  name: "CoCreate India's Future",

  /** Logo shown in the header and footer. Set to null to use the text wordmark instead. */
  logo: {
    src: "/logo.png",
    alt: "SaSarjan — co-creating together",
    width: 750,
    height: 213,
  } as { src: string; alt: string; width: number; height: number } | null,

  /** Text wordmark, used when `logo` is null. `accent` is rendered in the accent colour. */
  wordmark: { lead: "CoCreate", accent: "India's Future" },

  /** Short purpose statement used in the footer and metadata. */
  tagline:
    "Bringing together India's knowledge, experience and creativity to co-create transparent, inclusive and effective systems for collective prosperity.",

  /** Alternative supporting statement, kept for reuse. */
  altTagline: "From scattered efforts to collective progress.",

  hero: {
    headline: "India's Future Is a Collective Creation.",
    body: [
      "India's challenges are interconnected. Their solutions require people who understand different parts of society to learn from one another and work together.",
      "We are bringing together people across expertise, generations, professions and regions to co-create transparent, inclusive and effective systems that serve people, strengthen communities and regenerate nature.",
    ],
  },

  cta: {
    primaryLabel: "Join the Initiative",
    secondaryLabel: "Join the WhatsApp Community",
  },

  links: {
    /** Notion registration form. Until set, "Join" buttons open an email to `contactEmail`. */
    notionFormUrl: urlSetting("", process.env.NEXT_PUBLIC_NOTION_FORM_URL),
    /** WhatsApp Community invitation. WhatsApp buttons are hidden until this is set. */
    whatsappCommunityUrl: urlSetting("", process.env.NEXT_PUBLIC_WHATSAPP_COMMUNITY_URL),
    /** Optional: link to a published privacy notice page. */
    privacyNoticeUrl: urlSetting("", process.env.NEXT_PUBLIC_PRIVACY_NOTICE_URL),
    /** Optional: link to published terms of participation. */
    termsUrl: urlSetting("", process.env.NEXT_PUBLIC_TERMS_URL),
  },

  /** Contact email shown in the footer and used as the "Join" fallback. */
  contactEmail: setting("info@sasarjan.com", process.env.NEXT_PUBLIC_CONTACT_EMAIL),

  /** Social profiles, if any. Only add real, verified profiles. */
  social: [] as { label: string; url: string }[],

  /**
   * Production URL (e.g. "https://example.org"). Used for canonical URL,
   * sitemap and robots. Vercel marks preview deployments noindex on its own.
   */
  siteUrl: urlSetting("https://sasarjan.com", process.env.NEXT_PUBLIC_SITE_URL),

  /** Copyright start year. Footer shows "2026" or "2026–<current year>". */
  launchYear: 2026,

  nav: [
    { label: "Purpose", href: "#purpose" },
    { label: "Focus Areas", href: "#focus-areas" },
    { label: "Participation", href: "#participation" },
    { label: "Principles", href: "#principles" },
    { label: "How We Work", href: "#how-we-work" },
  ],
};

export type SiteConfig = typeof siteConfig;

/**
 * Where "Join" buttons go: the Notion form if configured, otherwise an email
 * to the contact address. Null only if neither is set.
 */
export const joinHref: string | null =
  siteConfig.links.notionFormUrl ??
  (siteConfig.contactEmail
    ? `mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(`Joining ${siteConfig.name}`)}`
    : null);

/** Lists optional settings that are still missing. Used for the dev-only notice. */
export function missingRequiredConfig(): string[] {
  const missing: string[] = [];
  if (!siteConfig.links.notionFormUrl) missing.push("Notion form URL (NEXT_PUBLIC_NOTION_FORM_URL)");
  if (!siteConfig.links.whatsappCommunityUrl)
    missing.push("WhatsApp Community URL (NEXT_PUBLIC_WHATSAPP_COMMUNITY_URL)");
  return missing;
}
