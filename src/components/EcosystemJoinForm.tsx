"use client";

import { useActionState, useEffect, useRef } from "react";
import { CircleCheck, LoaderCircle } from "lucide-react";
import { type EcosystemJoinState, submitEcosystemJoin } from "@/app/ecosystem/join/actions";
import {
  type EcosystemJoin,
  type JoinErrors,
  type JoinField,
  LONG_MAX,
  SHORT_MAX,
  initiativeOptions,
  interestOptions,
} from "@/lib/ecosystem-join";

const initialState: EcosystemJoinState = { status: "idle" };

const fieldOrder: JoinField[] = ["name", "email", "interest", "organisation", "initiative", "skills", "contribution", "message"];
const fieldLabels: Record<JoinField, string> = {
  name: "Name",
  email: "Email",
  interest: "How you would like to take part",
  organisation: "Organisation",
  initiative: "Initiative",
  skills: "Skills",
  contribution: "What you would like to contribute",
  message: "Message",
};

export function EcosystemJoinForm({
  contactEmail,
  initialInterest,
}: {
  contactEmail: string | null;
  /** Interest label preselected from a `?interest=` link on /ecosystem. */
  initialInterest: string;
}) {
  const [state, formAction, pending] = useActionState(submitEcosystemJoin, initialState);
  const summaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.status === "error") summaryRef.current?.focus();
    if (state.status === "success") successRef.current?.focus();
  }, [state]);

  if (state.status === "success") {
    return (
      <div ref={successRef} className="join-success" tabIndex={-1} role="status">
        <CircleCheck className="join-success__icon" aria-hidden="true" focusable="false" />
        <h2 className="join-success__heading">Thank you. Your information has been received.</h2>
        <p>We will review it for relevant opportunities across the SaSarjan ecosystem.</p>
        <a className="btn btn--secondary" href="/ecosystem">
          Back to the ecosystem
        </a>
      </div>
    );
  }

  const errors: JoinErrors = state.status === "error" ? state.errors : {};
  const v: Partial<EcosystemJoin> = state.status === "error" ? state.values : {};
  const interest = v.interest ?? initialInterest;
  const errorList = fieldOrder.filter((name) => errors[name]);

  return (
    <form key={state.status === "error" ? state.attempt : "new"} action={formAction} className="join-form" noValidate>
      {state.status === "error" && (
        <div ref={summaryRef} className="join-alert" role="alert" tabIndex={-1}>
          <p className="join-alert__title">{state.message}</p>
          {errorList.length > 0 && (
            <ul>
              {errorList.map((name) => (
                <li key={name}>
                  <a href={`#e-${name}`}>
                    {fieldLabels[name]}: {errors[name]}
                  </a>
                </li>
              ))}
            </ul>
          )}
          {errorList.length === 0 && contactEmail && (
            <p>
              Email: <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
            </p>
          )}
        </div>
      )}

      <p className="join-form__legend-note">
        Questions marked <span className="join-req">*</span> are required.
      </p>

      {/* Spam trap: hidden from people and assistive technology. */}
      <div className="join-hp" aria-hidden="true">
        <label htmlFor="eco_hp">Leave this empty</label>
        <input id="eco_hp" name="eco_hp" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      <fieldset className="join-section">
        <legend className="join-section__title">About you</legend>
        <div className="join-grid">
          <Text name="name" label="Name" required autoComplete="name" errors={errors} value={v.name} />
          <Text name="email" label="Email" type="email" required autoComplete="email" errors={errors} value={v.email} />
        </div>
        <fieldset
          id="e-interest"
          className="join-choices"
          aria-invalid={Boolean(errors.interest)}
          aria-describedby={errors.interest ? "e-interest-error" : undefined}
        >
          <legend className="join-label">
            How would you like to take part? <span className="join-req" aria-hidden="true">*</span>
            <span className="sr-only"> (required)</span>
          </legend>
          <ErrorText name="interest" errors={errors} />
          <div className="join-choices__list">
            {interestOptions.map((option) => (
              <label key={option.id} className="join-pill">
                <input
                  type="radio"
                  name="interest"
                  value={option.label}
                  required
                  defaultChecked={interest === option.label}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <div className="join-grid">
          <Text name="organisation" label="Organisation" autoComplete="organization" errors={errors} value={v.organisation} />
          <div className="join-field">
            <label htmlFor="e-initiative" className="join-label">
              Initiative you are most interested in
            </label>
            <select id="e-initiative" name="initiative" defaultValue={v.initiative ?? ""}>
              <option value="">Choose…</option>
              {initiativeOptions.map((name) => (
                <option key={name}>{name}</option>
              ))}
            </select>
          </div>
        </div>
      </fieldset>

      <fieldset className="join-section">
        <legend className="join-section__title">What you bring</legend>
        <Text
          name="skills"
          label="Skills"
          hint="For example: teaching, software, community organising, finance."
          errors={errors}
          value={v.skills}
          maxLength={LONG_MAX}
        />
        <Area name="contribution" label="What would you like to contribute?" rows={4} errors={errors} value={v.contribution} />
        <Area name="message" label="Anything else you would like us to know?" rows={3} errors={errors} value={v.message} />
      </fieldset>

      <p className="join-hint">
        By submitting this form, you agree that SaSarjan may store this information and contact you about relevant
        opportunities in the ecosystem.
      </p>

      <button type="submit" className="btn btn--primary join-submit" disabled={pending}>
        {pending ? (
          <>
            <LoaderCircle className="btn__icon join-spin" aria-hidden="true" focusable="false" />
            Sending…
          </>
        ) : (
          "Join the Ecosystem"
        )}
      </button>
    </form>
  );
}

function Required() {
  return (
    <>
      {" "}
      <span className="join-req" aria-hidden="true">
        *
      </span>
      <span className="sr-only"> (required)</span>
    </>
  );
}

function ErrorText({ name, errors }: { name: JoinField; errors: JoinErrors }) {
  if (!errors[name]) return null;
  return (
    <p id={`e-${name}-error`} className="join-error">
      {errors[name]}
    </p>
  );
}

function describedBy(name: JoinField, hint: string | undefined, errors: JoinErrors) {
  const ids = [hint && `e-${name}-hint`, errors[name] && `e-${name}-error`].filter(Boolean);
  return ids.length ? ids.join(" ") : undefined;
}

function Text({
  name,
  label,
  type = "text",
  required,
  hint,
  autoComplete,
  errors,
  value,
  maxLength = SHORT_MAX,
}: {
  name: JoinField;
  label: string;
  type?: "text" | "email";
  required?: boolean;
  hint?: string;
  autoComplete?: string;
  errors: JoinErrors;
  value?: string;
  maxLength?: number;
}) {
  return (
    <div className="join-field">
      <label htmlFor={`e-${name}`} className="join-label">
        {label}
        {required && <Required />}
      </label>
      <input
        id={`e-${name}`}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        maxLength={maxLength}
        defaultValue={value ?? ""}
        aria-invalid={Boolean(errors[name])}
        aria-describedby={describedBy(name, hint, errors)}
      />
      {hint && (
        <p id={`e-${name}-hint`} className="join-hint">
          {hint}
        </p>
      )}
      <ErrorText name={name} errors={errors} />
    </div>
  );
}

function Area({
  name,
  label,
  rows,
  errors,
  value,
}: {
  name: JoinField;
  label: string;
  rows: number;
  errors: JoinErrors;
  value?: string;
}) {
  return (
    <div className="join-field">
      <label htmlFor={`e-${name}`} className="join-label">
        {label}
      </label>
      <textarea
        id={`e-${name}`}
        name={name}
        rows={rows}
        maxLength={LONG_MAX}
        defaultValue={value ?? ""}
        aria-invalid={Boolean(errors[name])}
        aria-describedby={describedBy(name, undefined, errors)}
      />
      <ErrorText name={name} errors={errors} />
    </div>
  );
}
