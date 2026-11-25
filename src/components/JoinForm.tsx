"use client";

import { useActionState, useEffect, useRef } from "react";
import { CircleCheck, LoaderCircle } from "lucide-react";
import { type JoinState, submitApplication } from "@/app/join/actions";
import {
  ageGroups,
  expertiseAreas,
  experienceLevels,
  focusAreaOptions,
  genders,
  heardFrom,
  joinPage,
  languages,
  outsideIndia,
  states,
  timeCommitments,
  tracks,
  unionTerritories,
} from "@/content/join-form";
import { type Application, type FieldErrors, type FieldName, LONG_TEXT_MAX } from "@/lib/join";
import { track } from "@/lib/analytics";

const initialState: JoinState = { status: "idle" };

/** Order of fields in the error summary, matching the order on the page. */
const fieldOrder: FieldName[] = [
  "fullName",
  "email",
  "phone",
  "state",
  "tracks",
  "city",
  "linkedin",
  "role",
  "achievements",
  "offer",
  "learn",
  "referredBy",
  "consent",
];

/** Fields inside the folded "Tell us more" section. */
const optionalFields: FieldName[] = ["city", "linkedin", "role", "achievements", "offer", "learn", "referredBy"];

const fieldLabels: Partial<Record<FieldName, string>> = {
  fullName: "Full name",
  email: "Email",
  phone: "Phone / WhatsApp",
  state: "State / UT",
  city: "City / District",
  role: "Current role and organisation",
  linkedin: "LinkedIn or website",
  tracks: "How you would like to contribute",
  achievements: "Key achievements",
  offer: "What you can offer",
  learn: "What you would like to learn",
  referredBy: "Referred by",
  consent: "Consent",
};

export function JoinForm({ contactEmail }: { contactEmail: string | null }) {
  const [state, formAction, pending] = useActionState(submitApplication, initialState);
  const startedAt = useRef<HTMLInputElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (startedAt.current && !startedAt.current.value) startedAt.current.value = String(Date.now());
  }, []);

  useEffect(() => {
    if (state.status === "error") summaryRef.current?.focus();
    if (state.status === "success") {
      successRef.current?.focus();
      track("join_submitted");
    }
  }, [state]);

  if (state.status === "success") {
    return (
      <div ref={successRef} className="join-success" tabIndex={-1} role="status">
        <CircleCheck className="join-success__icon" aria-hidden="true" focusable="false" />
        <h2 className="join-success__heading">{joinPage.success.heading}</h2>
        <p>{joinPage.success.body}</p>
        <a className="btn btn--secondary" href="/">
          Back to the home page
        </a>
      </div>
    );
  }

  const errors: FieldErrors = state.status === "error" ? state.errors : {};
  const v: Partial<Application> = state.status === "error" ? state.values : {};
  const errorList = fieldOrder.filter((name) => errors[name]);
  const moreHasErrors = optionalFields.some((name) => errors[name]);

  return (
    // React resets a form after its action runs, and selects do not reliably restore their
    // default; remounting per attempt re-applies the submitted answers to every field.
    <form key={state.status === "error" ? state.attempt : "new"} action={formAction} className="join-form" noValidate>
      {state.status === "error" && (
        <div ref={summaryRef} className="join-alert" role="alert" tabIndex={-1}>
          <p className="join-alert__title">{state.message}</p>
          {errorList.length > 0 && (
            <ul>
              {errorList.map((name) => (
                <li key={name}>
                  <a href={`#f-${name}`}>
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

      {/* Spam traps: hidden from people and assistive technology. */}
      <div className="join-hp" aria-hidden="true">
        <label htmlFor="kc_hp">Leave this empty</label>
        <input id="kc_hp" name="kc_hp" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>
      <input ref={startedAt} type="hidden" name="startedAt" defaultValue="" />

      <fieldset className="join-section">
        <legend className="join-section__title">About you</legend>
        <div className="join-grid">
          <TextField name="fullName" label="Full name" required autoComplete="name" errors={errors} value={v.fullName} />
          <TextField name="email" label="Email" type="email" required autoComplete="email" errors={errors} value={v.email} />
          <TextField
            name="phone"
            label="Phone / WhatsApp"
            type="tel"
            autoComplete="tel"
            hint="Include the country code if you are outside India."
            errors={errors}
            value={v.phone}
          />
          <div className="join-field">
            <Label name="state" required>
              State / Union Territory
            </Label>
            <select
              id="f-state"
              name="state"
              required
              defaultValue={v.state ?? ""}
              aria-invalid={Boolean(errors.state)}
              aria-describedby={errors.state ? "f-state-error" : undefined}
            >
              <option value="" disabled>
                Choose…
              </option>
              <optgroup label="States">
                {states.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </optgroup>
              <optgroup label="Union Territories">
                {unionTerritories.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </optgroup>
              <option>{outsideIndia}</option>
            </select>
            <ErrorText name="state" errors={errors} />
          </div>
        </div>
      </fieldset>

      <fieldset className="join-section">
        <legend className="join-section__title">How you would like to contribute</legend>
        <fieldset
          id="f-tracks"
          className="join-choices join-choices--cards"
          aria-describedby={errors.tracks ? "f-tracks-error" : "f-tracks-hint"}
          aria-invalid={Boolean(errors.tracks)}
        >
          <legend className="join-label">
            Contribution tracks <span className="join-req" aria-hidden="true">*</span>
            <span className="sr-only"> (required)</span>
          </legend>
          <p id="f-tracks-hint" className="join-hint">
            Choose all that fit. These are flexible pathways, not ranks.
          </p>
          <ErrorText name="tracks" errors={errors} />
          <div className="join-choices__list">
            {tracks.map((t) => (
              <label key={t.value} className="join-card-choice">
                <input
                  type="checkbox"
                  name="tracks"
                  value={t.value}
                  defaultChecked={v.tracks?.includes(t.value) ?? false}
                />
                <span>
                  <span className="join-card-choice__title">{t.value}</span>
                  <span className="join-card-choice__hint">{t.hint}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>
        <ChoiceGroup
          name="focusAreas"
          legend="Focus areas you care about"
          hint="Choose any that apply."
          type="checkbox"
          options={focusAreaOptions}
          selected={v.focusAreas ?? []}
          errors={errors}
        />
      </fieldset>

      {/* Optional details stay folded so the first step is short; opened again if one has an error. */}
      <details className="join-more" open={moreHasErrors || undefined}>
        <summary className="join-more__summary">
          <span className="join-more__title">Tell us more (optional)</span>
          <span className="join-hint">Your role, experience and languages help us match you faster. About three minutes.</span>
        </summary>

        <fieldset className="join-section">
          <legend className="join-section__title">Your background</legend>
          <div className="join-grid">
            <TextField name="city" label="City / District" autoComplete="address-level2" errors={errors} value={v.city} />
            <TextField
              name="linkedin"
              label="LinkedIn or website"
              type="url"
              inputMode="url"
              autoComplete="url"
              placeholder="linkedin.com/in/your-name"
              errors={errors}
              value={v.linkedin}
            />
          </div>
          <TextField
            name="role"
            label="Current role and organisation"
            autoComplete="organization-title"
            hint="For example: Former Chief Secretary, Government of X; Founder, Y; PhD scholar, Z."
            errors={errors}
            value={v.role}
          />
          <ChoiceGroup
            name="experience"
            legend="Years of experience"
            type="radio"
            options={experienceLevels}
            selected={v.experience ? [v.experience] : []}
            errors={errors}
          />
          <ChoiceGroup
            name="expertise"
            legend="Areas of expertise"
            type="checkbox"
            options={expertiseAreas}
            selected={v.expertise ?? []}
            errors={errors}
          />
          <ChoiceGroup
            name="time"
            legend="Time you can give"
            type="radio"
            options={timeCommitments}
            selected={v.time ? [v.time] : []}
            errors={errors}
          />
        </fieldset>

        <fieldset className="join-section">
          <legend className="join-section__title">Your experience</legend>
          <TextArea
            name="achievements"
            label="Key achievements and leadership experience"
            hint="The two or three most significant things you have led, built or achieved."
            rows={5}
            errors={errors}
            value={v.achievements}
          />
          <TextArea name="offer" label="What can you offer?" rows={4} errors={errors} value={v.offer} />
          <TextArea name="learn" label="What would you like to learn?" rows={3} errors={errors} value={v.learn} />
        </fieldset>

        <fieldset className="join-section">
          <legend className="join-section__title">A little more about you</legend>
          <p className="join-hint">{joinPage.privacy}</p>
          <ChoiceGroup
            name="languages"
            legend="Languages you can work in"
            type="checkbox"
            options={languages}
            selected={v.languages ?? []}
            errors={errors}
          />
          <div className="join-grid">
            <SelectField name="ageGroup" label="Age group" options={ageGroups} value={v.ageGroup} />
            <SelectField name="gender" label="Gender" options={genders} value={v.gender} />
            <SelectField name="heardFrom" label="How did you hear about us?" options={heardFrom} value={v.heardFrom} />
            <TextField name="referredBy" label="Referred by" hint="If someone suggested you apply." errors={errors} value={v.referredBy} />
          </div>
        </fieldset>
      </details>

      <div className="join-consent">
        <label className="join-check" id="f-consent">
          <input
            type="checkbox"
            name="consent"
            value="yes"
            required
            defaultChecked={v.consent ?? false}
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? "f-consent-error" : undefined}
          />
          <span>
            I agree that the CoCreate India&apos;s Future team may store this information and contact me about
            participation. <span className="join-req" aria-hidden="true">*</span>
            <span className="sr-only"> (required)</span>
          </span>
        </label>
        <ErrorText name="consent" errors={errors} />
      </div>

      <button type="submit" className="btn btn--primary join-submit" disabled={pending}>
        {pending ? (
          <>
            <LoaderCircle className="btn__icon join-spin" aria-hidden="true" focusable="false" />
            Sending…
          </>
        ) : (
          "Submit application"
        )}
      </button>
    </form>
  );
}

/* --------------------------------------------------------------------------
   Field helpers
   -------------------------------------------------------------------------- */

function Label({ name, required, children }: { name: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label htmlFor={`f-${name}`} className="join-label">
      {children}
      {required && (
        <>
          {" "}
          <span className="join-req" aria-hidden="true">
            *
          </span>
          <span className="sr-only"> (required)</span>
        </>
      )}
    </label>
  );
}

function ErrorText({ name, errors }: { name: FieldName; errors: FieldErrors }) {
  if (!errors[name]) return null;
  return (
    <p id={`f-${name}-error`} className="join-error">
      {errors[name]}
    </p>
  );
}

function describedBy(name: FieldName, hint: string | undefined, errors: FieldErrors) {
  const ids = [hint && `f-${name}-hint`, errors[name] && `f-${name}-error`].filter(Boolean);
  return ids.length ? ids.join(" ") : undefined;
}

type TextFieldProps = {
  name: FieldName;
  label: string;
  type?: "text" | "email" | "tel" | "url";
  required?: boolean;
  hint?: string;
  placeholder?: string;
  autoComplete?: string;
  inputMode?: "url";
  errors: FieldErrors;
  value?: string;
};

function TextField({ name, label, type = "text", required, hint, errors, value, ...rest }: TextFieldProps) {
  return (
    <div className="join-field">
      <Label name={name} required={required}>
        {label}
      </Label>
      <input
        id={`f-${name}`}
        name={name}
        type={type}
        required={required}
        maxLength={200}
        defaultValue={value ?? ""}
        aria-invalid={Boolean(errors[name])}
        aria-describedby={describedBy(name, hint, errors)}
        {...rest}
      />
      {/* Below the input so side-by-side fields keep their inputs aligned. */}
      {hint && (
        <p id={`f-${name}-hint`} className="join-hint">
          {hint}
        </p>
      )}
      <ErrorText name={name} errors={errors} />
    </div>
  );
}

function TextArea({
  name,
  label,
  required,
  hint,
  rows,
  errors,
  value,
}: {
  name: FieldName;
  label: string;
  required?: boolean;
  hint?: string;
  rows: number;
  errors: FieldErrors;
  value?: string;
}) {
  return (
    <div className="join-field">
      <Label name={name} required={required}>
        {label}
      </Label>
      {hint && (
        <p id={`f-${name}-hint`} className="join-hint">
          {hint}
        </p>
      )}
      <textarea
        id={`f-${name}`}
        name={name}
        rows={rows}
        required={required}
        maxLength={LONG_TEXT_MAX}
        defaultValue={value ?? ""}
        aria-invalid={Boolean(errors[name])}
        aria-describedby={describedBy(name, hint, errors)}
      />
      <ErrorText name={name} errors={errors} />
    </div>
  );
}

function SelectField({ name, label, options, value }: { name: string; label: string; options: string[]; value?: string }) {
  return (
    <div className="join-field">
      <label htmlFor={`f-${name}`} className="join-label">
        {label}
      </label>
      <select id={`f-${name}`} name={name} defaultValue={value ?? ""}>
        <option value="">Choose…</option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

type Option = string | { label: string; value: string };

function ChoiceGroup({
  name,
  legend,
  hint,
  type,
  options,
  selected,
  errors,
}: {
  name: FieldName;
  legend: string;
  hint?: string;
  type: "checkbox" | "radio";
  options: Option[];
  selected: string[];
  errors: FieldErrors;
}) {
  return (
    <fieldset id={`f-${name}`} className="join-choices" aria-describedby={describedBy(name, hint, errors)}>
      <legend className="join-label">{legend}</legend>
      {hint && (
        <p id={`f-${name}-hint`} className="join-hint">
          {hint}
        </p>
      )}
      <div className="join-choices__list">
        {options.map((o) => {
          const { label, value } = typeof o === "string" ? { label: o, value: o } : o;
          return (
            <label key={value} className="join-pill">
              <input type={type} name={name} value={value} defaultChecked={selected.includes(value)} />
              <span>{label}</span>
            </label>
          );
        })}
      </div>
      <ErrorText name={name} errors={errors} />
    </fieldset>
  );
}
