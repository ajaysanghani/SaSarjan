import Image from "next/image";
import { siteConfig } from "@/config/site";

/** Logo image, or the text wordmark when no logo is configured. */
export function Wordmark({ priority = false, href = "/#top" }: { priority?: boolean; href?: string }) {
  const { logo, wordmark, name } = siteConfig;
  return (
    <a href={href} className="wordmark" aria-label={`${name} — back to top`}>
      {logo ? (
        <Image
          src={logo.src}
          alt={logo.alt}
          width={logo.width}
          height={logo.height}
          priority={priority}
          sizes="200px"
          className="wordmark__logo"
        />
      ) : (
        <>
          <span className="wordmark__lead">{wordmark.lead}</span>{" "}
          <span className="wordmark__accent">{wordmark.accent}</span>
        </>
      )}
    </a>
  );
}
