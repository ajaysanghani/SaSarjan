import { siteConfig } from "@/config/site";

/**
 * Privacy notice shown at /privacy.
 *
 * Keep it true: update it whenever the /join fields, the storage (Notion),
 * the hosting (Vercel), analytics or the review team change.
 */

const email = siteConfig.contactEmail ?? "info@sasarjan.com";

export const privacyUpdated = "25 November 2026";

export const privacySections: { heading: string; paragraphs?: string[]; list?: string[]; note?: string }[] = [
  {
    heading: "Who we are",
    paragraphs: [
      `This website is run by the ${siteConfig.name} organising team (SaSarjan). Under India's Digital Personal Data Protection Act, 2023, we are responsible for the information you give us.`,
      `Contact for anything in this notice: ${email}.`,
    ],
  },
  {
    heading: "What we collect",
    paragraphs: ["When you fill in the form on /join, we collect:"],
    list: [
      "Required: full name, email, state or Union Territory, current role and organisation, years of experience, how you would like to contribute, focus areas, and your consent.",
      "Optional: phone or WhatsApp number, city or district, LinkedIn or website, areas of expertise, achievements, what you can offer and would like to learn, time commitment, languages, how you heard about us, who referred you, age group and gender.",
    ],
  },
  {
    heading: "What we never collect",
    paragraphs: [
      "We never ask for Aadhaar numbers or identity documents. Age group and gender are optional and are used only in aggregate, to see who is missing from the initiative. We do not use advertising cookies or trackers.",
    ],
  },
  {
    heading: "Why we use it",
    list: [
      "To review your application and understand your interests, skills and availability.",
      "To contact you by email or phone about participation.",
      "To introduce you to relevant working groups and people in the initiative.",
    ],
    note:
      "We rely on the consent you give with the checkbox on the form. We do not sell your information or use it for advertising.",
  },
  {
    heading: "Who can see it",
    list: [
      "Our core organising team, who review applications in a private Notion database.",
      "Notion Labs, Inc., which stores the applications. Its servers are mainly in the United States, so your data may be stored outside India.",
      "Vercel Inc., which hosts this website and handles the form submission in transit. Its servers may also be outside India.",
    ],
    note:
      "We share your details with another participant, such as a working-group lead, only to make an introduction.",
  },
  {
    heading: "How long we keep it",
    paragraphs: [
      "We keep your application while you take part, and for up to 24 months after our last contact with you. Then we delete it. If you withdraw consent, we delete it sooner.",
    ],
  },
  {
    heading: "Your rights",
    list: [
      "Ask what information we hold about you.",
      "Ask us to correct or update it.",
      "Ask us to delete it.",
      "Withdraw your consent at any time. This does not affect anything done before you withdrew it.",
      "Nominate someone to exercise these rights for you if you die or become unable to.",
    ],
    note:
      `Write to ${email} from the email address you applied with. We aim to reply within 30 days. If you are not satisfied with our response, you can complain to the Data Protection Board of India.`,
  },
  {
    heading: "Age",
    paragraphs: [
      "The form is for people aged 18 and over. If you are under 18, please ask a parent or guardian to contact us before you apply.",
    ],
  },
  {
    heading: "WhatsApp Community",
    paragraphs: [
      "If you join our WhatsApp Community, WhatsApp (Meta) handles that data under its own privacy policy. Your phone number may be visible to community admins and to members of groups you join.",
    ],
  },
  {
    heading: "Changes",
    paragraphs: [
      "If we change this notice, we will update the date at the top. For significant changes, we will email people who have applied.",
    ],
  },
];
