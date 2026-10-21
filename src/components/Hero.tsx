import { joinHref, siteConfig } from "@/config/site";
import { CtaLink } from "./CtaLink";

export function Hero() {
  const { hero, cta, links } = siteConfig;
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="container hero__inner">
        <div className="hero__text">
          <h1 id="hero-heading" className="hero__heading">
            {hero.headline}
          </h1>
          {hero.body.map((p) => (
            <p key={p} className="hero__body">
              {p}
            </p>
          ))}
          <div className="cta-row">
            <CtaLink
              href={joinHref}
              label={cta.primaryLabel}
              event="cta_join"
              placement="hero"
            />
            <CtaLink
              href={links.whatsappCommunityUrl}
              label={cta.secondaryLabel}
              variant="secondary"
              event="cta_whatsapp_community"
              placement="hero"
            />
          </div>
        </div>
        <HeroMesh />
      </div>
    </section>
  );
}

/* Ten connected nodes with no centre — one for each focus area. Decorative. */
const radii = [150, 132, 156, 138, 150, 134, 154, 140, 148, 136];
const nodes = radii.map((r, i) => {
  const angle = (i * 36 - 90) * (Math.PI / 180);
  return { x: 200 + r * Math.cos(angle), y: 200 + r * Math.sin(angle) };
});
const edges = nodes.flatMap((_, i) => [
  [i, (i + 1) % 10],
  [i, (i + 3) % 10],
]);

function HeroMesh() {
  return (
    <svg className="hero__mesh" viewBox="0 0 400 400" aria-hidden="true" focusable="false">
      <g className="hero__mesh-lines">
        {edges.map(([a, b]) => (
          <line
            key={`${a}-${b}`}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
          />
        ))}
      </g>
      {nodes.map((n, i) => (
        <circle key={i} cx={n.x} cy={n.y} r={9} className={`hero__mesh-node area-tint-${i + 1}`} />
      ))}
    </svg>
  );
}
