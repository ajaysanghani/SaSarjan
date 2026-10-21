"use server";

import { type Application, type FieldErrors, parseApplication } from "@/lib/join";
import { createApplication } from "@/lib/notion";

export type JoinState =
  | { status: "idle" }
  | { status: "success" }
  | {
      status: "error";
      message: string;
      errors: FieldErrors;
      values: Partial<Application>;
      /** Changes on every failed attempt so the form remounts with the submitted answers. */
      attempt: number;
    };

/** Submissions faster than this are almost certainly bots. */
const MIN_FILL_MS = 4_000;

export async function submitApplication(_prev: JoinState, form: FormData): Promise<JoinState> {
  // Spam traps: a field humans never see, and a render timestamp set in the browser.
  // The honeypot's name is deliberately meaningless so browser autofill leaves it empty.
  const honeypot = form.get("kc_hp");
  const startedAt = Number(form.get("startedAt"));
  const tooFast = Number.isFinite(startedAt) && startedAt > 0 && Date.now() - startedAt < MIN_FILL_MS;
  if ((typeof honeypot === "string" && honeypot.trim()) || tooFast) {
    // Look successful so bots get no signal to adapt to.
    return { status: "success" };
  }

  const { values, errors } = parseApplication(form);
  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Please check the highlighted questions.",
      errors,
      values,
      attempt: Date.now(),
    };
  }

  try {
    await createApplication(values);
  } catch (err) {
    console.error("[join] Could not save application:", err instanceof Error ? err.message : err);
    return {
      status: "error",
      message:
        "Sorry, we could not save your application just now. Please try again in a few minutes, or email us.",
      errors: {},
      values,
      attempt: Date.now(),
    };
  }

  return { status: "success" };
}
