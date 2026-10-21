import { ArrowUpRight } from "lucide-react";

type Props = {
  /** Configured destination, or null when not yet configured. */
  href: string | null;
  label: string;
  variant?: "primary" | "secondary";
  /** Analytics event name fired on click. */
  event: string;
  /** Where on the page this CTA sits, for analytics. */
  placement: string;
  /** Short status shown instead of a link when `href` is missing. */
  unavailableLabel?: string;
};

/**
 * Button-styled external link. Opens in a new tab with `noopener` and tells
 * screen-reader users so. When no URL is configured it renders a
 * non-interactive, clearly labelled placeholder rather than a dead link.
 */
export function CtaLink({
  href,
  label,
  variant = "primary",
  event,
  placement,
  unavailableLabel = "Coming soon",
}: Props) {
  const className = `btn btn--${variant}`;

  if (!href) {
    return (
      <span className={`${className} btn--unavailable`}>
        {label}
        <span className="btn__status">{unavailableLabel}</span>
      </span>
    );
  }

  return (
    <a
      className={className}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-track={event}
      data-track-id={placement}
    >
      {label}
      <ArrowUpRight className="btn__icon" aria-hidden="true" focusable="false" />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}
