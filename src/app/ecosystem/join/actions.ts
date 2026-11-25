"use server";

import { headers } from "next/headers";
import { type EcosystemJoin, type JoinErrors, parseEcosystemJoin } from "@/lib/ecosystem-join";
import { createEcosystemJoin, notionConfigured } from "@/lib/notion";
import { allowAttempt } from "@/lib/rate-limit";

export type EcosystemJoinState =
  | { status: "idle" }
  | { status: "success" }
  | {
      status: "error";
      message: string;
      errors: JoinErrors;
      values: Partial<EcosystemJoin>;
      /** Changes on every failed attempt so the form remounts with the submitted answers. */
      attempt: number;
    };

export async function submitEcosystemJoin(
  _prev: EcosystemJoinState,
  form: FormData,
): Promise<EcosystemJoinState> {
  const { values, errors } = parseEcosystemJoin(form);
  const fail = (message: string, fieldErrors: JoinErrors = {}): EcosystemJoinState => ({
    status: "error",
    message,
    errors: fieldErrors,
    values,
    attempt: Date.now(),
  });

  // Spam trap: a field people never see. Its name is meaningless so autofill leaves it empty.
  // Only bots fill it, so they get a quiet "success" and nothing is saved.
  const honeypot = form.get("eco_hp");
  if (typeof honeypot === "string" && honeypot.trim()) return { status: "success" };

  const h = await headers();
  const client = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  if (!allowAttempt(client)) {
    return fail("Too many attempts from your connection. Please wait a few minutes and try again.");
  }

  if (Object.keys(errors).length > 0) return fail("Please check the highlighted questions.", errors);

  // Never confirm what was not saved.
  if (!notionConfigured()) {
    return fail("The joining form is not set up yet, so your details were not saved. Please email us instead.");
  }

  try {
    await createEcosystemJoin(values);
  } catch (err) {
    console.error("[ecosystem-join] Could not save:", err instanceof Error ? err.message : err);
    return fail("Sorry, we could not save your details just now. Please try again in a few minutes, or email us.");
  }
  return { status: "success" };
}
