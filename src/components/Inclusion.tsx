import { Check } from "lucide-react";
import { inclusion } from "@/content/sections";
import { Section } from "./Section";

export function Inclusion() {
  return (
    <Section id="inclusion" eyebrow={inclusion.eyebrow} heading={inclusion.heading}>
      <div className="inclusion">
        <div className="prose">
          <p className="inclusion__body">{inclusion.body}</p>
          <p className="inclusion__note">{inclusion.note}</p>
        </div>
        <div className="inclusion__commitments">
          <h3 className="inclusion__subheading">{inclusion.commitmentsHeading}</h3>
          <ul className="check-list">
            {inclusion.commitments.map((c) => (
              <li key={c}>
                <Check className="check-list__icon" aria-hidden="true" focusable="false" />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
