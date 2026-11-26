import {
  ageGroups,
  expertiseAreas,
  experienceLevels,
  focusAreaOptions,
  genders,
  heardFrom,
  languages,
  outsideIndia,
  states,
  timeCommitments,
  tracks,
  unionTerritories,
} from "@/content/join-form";

/** One contributor application, as validated from the /join form. */
export type Application = {
  fullName: string;
  email: string;
  phone: string;
  state: string;
  city: string;
  role: string;
  linkedin: string;
  experience: string;
  tracks: string[];
  focusAreas: string[];
  expertise: string[];
  achievements: string;
  offer: string;
  learn: string;
  time: string;
  languages: string[];
  ageGroup: string;
  gender: string;
  heardFrom: string;
  referredBy: string;
  consent: boolean;
};

export type FieldName = keyof Application;
export type FieldErrors = Partial<Record<FieldName, string>>;

/** Notion rich text holds at most 2,000 characters per block. */
export const LONG_TEXT_MAX = 2000;

const SHORT_TEXT_MAX = 200;

const allowed = {
  state: [...states, ...unionTerritories, outsideIndia] as readonly string[],
  experience: experienceLevels,
  tracks: tracks.map((t) => t.value),
  focusAreas: focusAreaOptions.map((o) => o.value),
  expertise: expertiseAreas,
  time: timeCommitments,
  languages,
  ageGroup: ageGroups,
  gender: genders,
  heardFrom,
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE = /^\+?[\d\s()-]{7,20}$/;

function text(form: FormData, name: string) {
  const value = form.get(name);
  return typeof value === "string" ? value.trim() : "";
}

/** Keeps only values from the allowed list, so visitors cannot create new Notion options. */
function pick(form: FormData, name: string, options: readonly string[]) {
  const value = text(form, name);
  return options.includes(value) ? value : "";
}

function pickMany(form: FormData, name: string, options: readonly string[]) {
  const values = form.getAll(name).filter((v): v is string => typeof v === "string");
  return options.filter((o) => values.includes(o));
}

/** Accepts "linkedin.com/in/x" as well as full URLs; returns "" if it is not a web address. */
function normaliseUrl(raw: string) {
  if (!raw) return "";
  const candidate = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  try {
    const url = new URL(candidate);
    return url.hostname.includes(".") ? url.toString() : "";
  } catch {
    return "";
  }
}

/** Reads the submitted form. Returns the cleaned values and any field errors. */
export function parseApplication(form: FormData): { values: Application; errors: FieldErrors } {
  const linkedinRaw = text(form, "linkedin");

  const values: Application = {
    fullName: text(form, "fullName"),
    email: text(form, "email"),
    phone: text(form, "phone"),
    state: pick(form, "state", allowed.state),
    city: text(form, "city"),
    role: text(form, "role"),
    linkedin: linkedinRaw,
    experience: pick(form, "experience", allowed.experience),
    tracks: pickMany(form, "tracks", allowed.tracks),
    focusAreas: pickMany(form, "focusAreas", allowed.focusAreas),
    expertise: pickMany(form, "expertise", allowed.expertise),
    achievements: text(form, "achievements"),
    offer: text(form, "offer"),
    learn: text(form, "learn"),
    time: pick(form, "time", allowed.time),
    languages: pickMany(form, "languages", allowed.languages),
    ageGroup: pick(form, "ageGroup", allowed.ageGroup),
    gender: pick(form, "gender", allowed.gender),
    heardFrom: pick(form, "heardFrom", allowed.heardFrom),
    referredBy: text(form, "referredBy"),
    consent: form.get("consent") === "yes",
  };

  const errors: FieldErrors = {};
  const short = ["fullName", "city", "role", "referredBy", "linkedin"] as const;
  const long = ["achievements", "offer", "learn"] as const;

  if (!values.fullName) errors.fullName = "Enter your full name.";
  if (!values.email) errors.email = "Enter your email address.";
  else if (!EMAIL.test(values.email) || values.email.length > SHORT_TEXT_MAX)
    errors.email = "Enter an email address like name@example.com.";
  if (values.phone && !PHONE.test(values.phone))
    errors.phone = "Enter a phone number using digits, with the country code if outside India.";
  if (!values.state) errors.state = "Choose your state or Union Territory.";
  if (linkedinRaw) {
    const url = normaliseUrl(linkedinRaw);
    if (url) values.linkedin = url;
    else errors.linkedin = "Enter a web address, for example linkedin.com/in/your-name.";
  }
  if (values.tracks.length === 0) errors.tracks = "Choose at least one way you would like to contribute.";
  if (!values.consent) errors.consent = "Please confirm we may store your information and contact you.";

  for (const name of short) {
    if (!errors[name] && values[name].length > SHORT_TEXT_MAX)
      errors[name] = `Keep this under ${SHORT_TEXT_MAX} characters.`;
  }
  for (const name of long) {
    if (!errors[name] && values[name].length > LONG_TEXT_MAX)
      errors[name] = `Keep this under ${LONG_TEXT_MAX.toLocaleString("en-IN")} characters.`;
  }

  return { values, errors };
}
