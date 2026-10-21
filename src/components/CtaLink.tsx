import { ArrowRight, ArrowUpRight, Mail } from "lucide-react";

type Props = {
  /** Configured destination. Nothing is rendered when it is null. */
  href: string | null;
  label: string;
  variant?: "primary" | "secondary";
  /** Analytics event name fired on click. */
  event: string;
  /** Where on the page this CTA sits, for analytics. */
  placement: string;
};

/**
 * Button-styled link. Links within this site open in place; external web
 * links open in a new tab with `noopener` and tell screen-reader users so;
 * `mailto:` links open the visitor's email app. Renders nothing when no
 * destination is configured.
 */
export function CtaLink({ href, label, variant = "primary", event, placement }: Props) {
  if (!href) return null;

  const isEmail = href.startsWith("mailto:");
  const isInternal = href.startsWith("/") || href.startsWith("#");
  const Icon = isEmail ? Mail : isInternal ? ArrowRight : ArrowUpRight;

  return (
    <a
      className={`btn btn--${variant}`}
      href={href}
      {...(isEmail || isInternal ? {} : { target: "_blank", rel: "noopener noreferrer" })}
      data-track={event}
      data-track-id={placement}
    >
      {label}
      <Icon className="btn__icon" aria-hidden="true" focusable="false" />
      {!isInternal && (
        <span className="sr-only">{isEmail ? "(opens your email app)" : "(opens in a new tab)"}</span>
      )}
    </a>
  );
}
