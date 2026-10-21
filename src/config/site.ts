/**
 * Central site configuration.
 *
 * Everything the project owner is likely to change before or after launch
 * lives here: name, wordmark, hero copy, external destinations and contact
 * details. Section content (focus areas, FAQs, etc.) lives in `src/content/`.
 *
 * External URLs can be pasted here directly (the first, "" argument of
 * `urlSetting` / `setting`) or supplied through environment variables (see
 * `.env.example`). Leave a value empty when it is not yet known — the site then
 * shows an honest "not yet available" state instead of sending visitors to a
 * guessed destination.
 */

/** Returns the direct value if set, otherwise the env value, otherwise null. */
function setting(direct: string, fromEnv: string | undefined): string | null {
  const value = direct.trim() || fromEnv?.trim() || "";
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

  /** Text wordmark shown in the header. `accent` is rendered in the accent colour. */
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
    primaryLabel: "Express Interest",
    secondaryLabel: "Join the WhatsApp Community",
  },

  links: {
    /** REQUIRED before launch: the public URL of the Notion participation form. */
    notionFormUrl: urlSetting("", process.env.NEXT_PUBLIC_NOTION_FORM_URL),
    /** REQUIRED before launch: the WhatsApp Community invitation URL. */
    whatsappCommunityUrl: urlSetting("", process.env.NEXT_PUBLIC_WHATSAPP_COMMUNITY_URL),
    /** Optional: link to a published privacy notice page. */
    privacyNoticeUrl: urlSetting("", process.env.NEXT_PUBLIC_PRIVACY_NOTICE_URL),
    /** Optional: link to published terms of participation. */
    termsUrl: urlSetting("", process.env.NEXT_PUBLIC_TERMS_URL),
  },

  /** Contact email. Set only once it is confirmed and monitored. */
  contactEmail: setting("", process.env.NEXT_PUBLIC_CONTACT_EMAIL),

  /** Social profiles, if any. Only add real, verified profiles. */
  social: [] as { label: string; url: string }[],

  /**
   * Production URL (e.g. "https://example.org"). Used for canonical URL,
   * sitemap and robots. Leave empty until the domain is decided.
   */
  siteUrl: urlSetting("", process.env.NEXT_PUBLIC_SITE_URL),

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

/** Lists required settings that are still missing. Used for the dev-only notice. */
export function missingRequiredConfig(): string[] {
  const missing: string[] = [];
  if (!siteConfig.links.notionFormUrl) missing.push("Notion form URL (NEXT_PUBLIC_NOTION_FORM_URL)");
  if (!siteConfig.links.whatsappCommunityUrl)
    missing.push("WhatsApp Community URL (NEXT_PUBLIC_WHATSAPP_COMMUNITY_URL)");
  return missing;
}
