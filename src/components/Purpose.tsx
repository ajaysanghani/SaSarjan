import { purpose } from "@/content/sections";
import { Section } from "./Section";

export function Purpose() {
  return (
    <Section id="purpose" eyebrow={purpose.eyebrow} heading={purpose.heading}>
      <div className="purpose">
        <div className="purpose__text prose">
          {purpose.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <ConnectionDiagram />
      </div>
    </Section>
  );
}

/*
 * A 3×3 grid: eight kinds of knowledge and people around a shared centre.
 * Lines are drawn in an SVG behind the grid from the centre cell to each
 * outer cell, so the labels remain real, readable text at every size.
 */
const cellCentres = [1, 3, 5].flatMap((row) => [1, 3, 5].map((col) => [(col / 6) * 100, (row / 6) * 100]));

function ConnectionDiagram() {
  const outer = [...purpose.diagramNodes];
  // Insert the centre label in the middle of the 3×3 grid.
  const cells = [...outer.slice(0, 4), null, ...outer.slice(4, 8)];
  return (
    <figure className="connect">
      <div className="connect__grid">
        <svg className="connect__lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {cellCentres.map(([x, y], i) =>
            i === 4 ? null : (
              <line key={i} x1={50} y1={50} x2={x} y2={y} vectorEffect="non-scaling-stroke" />
            ),
          )}
        </svg>
        {cells.map((label, i) =>
          label === null ? (
            <span key="centre" className="connect__node connect__node--centre">
              {purpose.diagramCentre}
            </span>
          ) : (
            <span key={label} className="connect__node">
              {label}
            </span>
          ),
        )}
      </div>
      <figcaption className="connect__caption">
        Different kinds of knowledge and people, connected around a shared understanding.
      </figcaption>
    </figure>
  );
}
