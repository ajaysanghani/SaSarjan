import { process } from "@/content/sections";
import { Section } from "./Section";

export function Process() {
  return (
    <Section id="how-we-work" eyebrow={process.eyebrow} heading={process.heading} lead={process.lead} tone="muted">
      <ol className="steps">
        {process.steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <li key={step.title} className="step">
              <div className="step__marker">
                <Icon className="step__icon" aria-hidden="true" focusable="false" />
              </div>
              <div>
                <p className="step__number">Step {i + 1}</p>
                <h3 className="step__title">{step.title}</h3>
                <p className="step__text">{step.text}</p>
              </div>
            </li>
          );
        })}
      </ol>
      <p className="callout">{process.note}</p>
    </Section>
  );
}
