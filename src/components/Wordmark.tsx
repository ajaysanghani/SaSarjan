import { siteConfig } from "@/config/site";

/** Text-based wordmark. Swap for an image logo later if needed. */
export function Wordmark() {
  const { lead, accent } = siteConfig.wordmark;
  return (
    <a href="#top" className="wordmark" aria-label={`${siteConfig.name} — back to top`}>
      <span className="wordmark__lead">{lead}</span> <span className="wordmark__accent">{accent}</span>
    </a>
  );
}
