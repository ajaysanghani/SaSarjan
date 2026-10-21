import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export const dynamic = "force-static";

/** Allow crawling only once a production URL is configured. */
export default function robots(): MetadataRoute.Robots {
  if (!siteConfig.siteUrl) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: new URL("/sitemap.xml", siteConfig.siteUrl).toString(),
  };
}
