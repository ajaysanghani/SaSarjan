import { focusAreas } from "./focus-areas";

/**
 * Copy and options for the "Join the Initiative" form on /join.
 *
 * Option values must match the option names in the Notion "Contributor
 * Applications" database exactly, or Notion creates a new option. Edit both
 * together.
 */

export const joinPage = {
  eyebrow: "Participate",
  heading: "Join CoCreate India's Future",
  lead: "We are bringing together people across expertise, generations and regions to co-create transparent, inclusive and effective systems. Tell us about your experience and how you would like to contribute. It takes about five minutes.",
  privacy:
    "We never ask for Aadhaar numbers or identity documents. Questions about age and gender are optional and help us see who is missing.",
  next: {
    heading: "What happens next",
    steps: [
      "Our core team reads every application.",
      "If there is a good fit, we will write to you or call to talk it through.",
      "You will be introduced to the right working group and people.",
    ],
  },
  success: {
    heading: "Thank you. Your application has been received.",
    body: "Our core team reads every application. If there is a good fit, we will contact you by email or phone.",
  },
};

export const states = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
] as const;

export const unionTerritories = [
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
] as const;

export const outsideIndia = "Outside India";

export const experienceLevels = ["Student", "0–3 years", "4–10 years", "11–20 years", "20+ years"];

export const tracks = [
  {
    value: "National Leadership",
    hint: "A national-level track record of leading institutions, movements or public systems.",
  },
  {
    value: "State Leadership",
    hint: "Credibility and networks in a state or Union Territory; able to anchor a state chapter.",
  },
  {
    value: "Operations & Implementation",
    hint: "Programme management, coordination, technology, design, communications, organising.",
  },
  {
    value: "Think Tank & Policy Research",
    hint: "Research, policy, economics, law or domain expertise to produce evidence and proposals.",
  },
  {
    value: "Mentor / Guide",
    hint: "Guide emerging contributors and review proposals.",
  },
  {
    value: "Young Contributor",
    hint: "Students, young professionals and early-career researchers eager to learn by doing.",
  },
];

/**
 * Notion select options cannot contain commas, so the database uses " · "
 * where the site's focus-area titles use ", ".
 */
export const focusAreaOptions = focusAreas.map((area) => ({
  label: area.title,
  value: area.title.replaceAll(", ", " · "),
}));

export const expertiseAreas = [
  "Public Policy & Governance",
  "Public Administration",
  "Law & Justice",
  "Economics & Finance",
  "Education",
  "Health & Wellbeing",
  "Agriculture & Rural Development",
  "Environment & Climate",
  "Technology & Digital",
  "Entrepreneurship & Industry",
  "Social Sector & Community Work",
  "Research & Academia",
  "Urban Planning & Infrastructure",
  "Media & Communications",
  "Design",
  "Operations & Programme Management",
  "Other",
];

export const timeCommitments = [
  "A few hours a month",
  "1–2 hours a week",
  "3–5 hours a week",
  "5–10 hours a week",
  "10+ hours a week",
];

export const languages = [
  "Hindi",
  "English",
  "Bengali",
  "Marathi",
  "Telugu",
  "Tamil",
  "Gujarati",
  "Urdu",
  "Kannada",
  "Odia",
  "Malayalam",
  "Punjabi",
  "Assamese",
  "Other",
];

export const ageGroups = ["18–24", "25–34", "35–49", "50–64", "65+", "Prefer not to say"];

export const genders = ["Woman", "Man", "Another identity", "Prefer not to say"];

export const heardFrom = [
  "WhatsApp",
  "Referral by someone",
  "LinkedIn",
  "Website",
  "Event",
  "News / Media",
  "Other",
];
