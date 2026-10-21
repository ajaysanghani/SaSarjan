type Props = {
  id: string;
  eyebrow?: string;
  heading: string;
  lead?: string;
  tone?: "plain" | "muted";
  /** Analytics event fired once when the section is viewed. */
  viewEvent?: string;
  children: React.ReactNode;
};

/** Standard page section: labelled landmark, eyebrow, h2 and optional lead. */
export function Section({ id, eyebrow, heading, lead, tone = "plain", viewEvent, children }: Props) {
  const headingId = `${id}-heading`;
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`section section--${tone}`}
      data-track-view={viewEvent}
    >
      <div className="container">
        <header className="section__header">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h2 id={headingId} className="section__heading">
            {heading}
          </h2>
          {lead && <p className="section__lead">{lead}</p>}
        </header>
        {children}
      </div>
    </section>
  );
}
