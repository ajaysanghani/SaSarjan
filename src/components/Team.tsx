import { siteConfig } from "@/config/site";
import { Section } from "./Section";

/** "Who we are": the people behind the initiative and early updates. Renders nothing until filled in. */
export function Team() {
  const { team, updates } = siteConfig;
  if (team.length === 0 && updates.length === 0) return null;
  return (
    <Section id="who-we-are" eyebrow="Who we are" heading="The people getting this started.">
      {team.length > 0 && (
        <ul className="team-list">
          {team.map((p) => (
            <li key={p.name} className="team-card">
              {p.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img className="team-card__photo" src={p.photo} alt="" width={72} height={72} loading="lazy" />
              ) : (
                <span className="team-card__photo team-card__initial" aria-hidden="true">
                  {p.name.charAt(0)}
                </span>
              )}
              <span>
                <span className="team-card__name">
                  {p.url ? (
                    <a href={p.url} target="_blank" rel="noopener noreferrer">
                      {p.name}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  ) : (
                    p.name
                  )}
                </span>
                <span className="team-card__role">{p.role}</span>
              </span>
            </li>
          ))}
        </ul>
      )}
      {updates.length > 0 && (
        <>
          <h3 className="team-updates__heading">Latest updates</h3>
          <ul className="team-updates">
            {updates.map((u) => (
              <li key={u.date + u.text}>
                <time className="team-updates__date">{u.date}</time> {u.text}
              </li>
            ))}
          </ul>
        </>
      )}
    </Section>
  );
}
