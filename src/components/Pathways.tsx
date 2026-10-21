import { participation } from "@/content/sections";
import { Section } from "./Section";

export function Pathways() {
  return (
    <Section id="participation" eyebrow={participation.eyebrow} heading={participation.heading}>
      <ul className="pathway-grid">
        {participation.pathways.map((p) => {
          const Icon = p.icon;
          return (
            <li key={p.id} className="pathway">
              <Icon className="pathway__icon" aria-hidden="true" focusable="false" />
              <h3 className="pathway__title">{p.title}</h3>
              <p className="pathway__summary">{p.summary}</p>
              <p className="pathway__for">
                <span className="pathway__for-label">Often suits: </span>
                {p.forWhom}
              </p>
            </li>
          );
        })}
      </ul>
      <div className="callout">
        <p>{participation.note}</p>
        <p>{participation.valueNote}</p>
      </div>
    </Section>
  );
}
