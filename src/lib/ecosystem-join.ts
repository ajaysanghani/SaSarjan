import { ecosystemSites, participationInterests } from "@sasarjan/web-core";

/**
 * The "Join the Ecosystem" form on /ecosystem/join: field rules, shared by the form and the server
 * action. The interests come from `@sasarjan/web-core`, so the /ecosystem page's pathway links
 * (`?interest=<id>`) and this form agree. The labels match the options of the Notion
 * "Ecosystem Join Requests" database; change both together.
 */

export const interestOptions = participationInterests;

export const NOT_SURE = "Not sure yet";
export const initiativeOptions: readonly string[] = [...ecosystemSites.map((s) => s.name), NOT_SURE];

export type EcosystemJoin = {
  name: string;
  email: string;
  /** Label of a participation interest, e.g. "Mentor or Trainer". */
  interest: string;
  organisation: string;
  initiative: string;
  skills: string;
  contribution: string;
  message: string;
};

export type JoinField = keyof EcosystemJoin;
export type JoinErrors = Partial<Record<JoinField, string>>;

export const SHORT_MAX = 200;
export const LONG_MAX = 2000;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function text(form: FormData, name: string) {
  const value = form.get(name);
  return typeof value === "string" ? value.trim() : "";
}

/** The interest label for an id from a `?interest=` link, or "" if it is not one of ours. */
export function interestLabel(id: string | undefined): string {
  return interestOptions.find((i) => i.id === id)?.label ?? "";
}

/** Reads and validates a submission. Only listed options are kept, so no new Notion options appear. */
export function parseEcosystemJoin(form: FormData): { values: EcosystemJoin; errors: JoinErrors } {
  const interest = text(form, "interest");
  const initiative = text(form, "initiative");
  const values: EcosystemJoin = {
    name: text(form, "name"),
    email: text(form, "email"),
    interest: interestOptions.some((i) => i.label === interest) ? interest : "",
    organisation: text(form, "organisation"),
    initiative: initiativeOptions.includes(initiative) ? initiative : "",
    skills: text(form, "skills"),
    contribution: text(form, "contribution"),
    message: text(form, "message"),
  };

  const errors: JoinErrors = {};
  if (!values.name) errors.name = "Enter your name.";
  if (!values.email) errors.email = "Enter your email address.";
  else if (!EMAIL.test(values.email) || values.email.length > SHORT_MAX)
    errors.email = "Enter an email address like name@example.com.";
  if (!values.interest) errors.interest = "Choose how you would like to take part.";

  for (const name of ["name", "organisation"] as const) {
    if (!errors[name] && values[name].length > SHORT_MAX) errors[name] = `Keep this under ${SHORT_MAX} characters.`;
  }
  for (const name of ["skills", "contribution", "message"] as const) {
    if (values[name].length > LONG_MAX)
      errors[name] = `Keep this under ${LONG_MAX.toLocaleString("en-IN")} characters.`;
  }
  return { values, errors };
}
