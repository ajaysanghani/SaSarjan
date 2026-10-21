import { principles } from "@/content/sections";
import { Section } from "./Section";

export function Principles() {
  return (
    <Section
      id="principles"
      eyebrow={principles.eyebrow}
      heading={principles.heading}
      lead={principles.lead}
      tone="muted"
    >
      <ul className="principle-grid">
        {principles.items.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.title} className="principle">
              <Icon className="principle__icon" aria-hidden="true" focusable="false" />
              <div>
                <h3 className="principle__title">{item.title}</h3>
                <p className="principle__text">{item.text}</p>
              </div>
            </li>
          );
        })}
      </ul>
      <p className="callout">{principles.note}</p>
    </Section>
  );
}
