import { focusAreas, type FocusArea } from "@/content/focus-areas";
import { focusAreasIntro } from "@/content/sections";
import { Section } from "./Section";

export function FocusAreas() {
  return (
    <Section
      id="focus-areas"
      eyebrow={focusAreasIntro.eyebrow}
      heading={focusAreasIntro.heading}
      lead={focusAreasIntro.lead}
      tone="muted"
      viewEvent="focus_areas_viewed"
    >
      <ol className="area-grid">
        {focusAreas.map((area, i) => (
          <li key={area.id}>
            <FocusAreaCard area={area} number={i + 1} />
          </li>
        ))}
      </ol>
      <p className="callout">{focusAreasIntro.note}</p>
    </Section>
  );
}

function FocusAreaCard({ area, number }: { area: FocusArea; number: number }) {
  const Icon = area.icon;
  return (
    <article className="area-card" id={`area-${area.id}`} aria-labelledby={`area-${area.id}-title`}>
      <div className="area-card__top">
        <span className={`area-card__icon area-tint-${area.tint}`}>
          <Icon aria-hidden="true" focusable="false" />
        </span>
        <span className="area-card__number" aria-hidden="true">
          {String(number).padStart(2, "0")}
        </span>
      </div>
      <h3 id={`area-${area.id}-title`} className="area-card__title">
        {area.title}
      </h3>
      <p className="area-card__desc">{area.description}</p>
      {area.examples.length > 0 && (
        <p className="area-card__examples">
          <span className="sr-only">Examples: </span>
          {area.examples.join(" · ")}
        </p>
      )}
    </article>
  );
}
