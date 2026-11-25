import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export const dynamic = "force-static";

/** Empty until the production URL is configured. */
export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteConfig.siteUrl) return [];
  return [
    { url: new URL("/", siteConfig.siteUrl).toString(), changeFrequency: "monthly", priority: 1 },
    { url: new URL("/join", siteConfig.siteUrl).toString(), changeFrequency: "monthly", priority: 0.8 },
    { url: new URL("/privacy", siteConfig.siteUrl).toString(), changeFrequency: "yearly", priority: 0.3 },
    { url: new URL("/ecosystem", siteConfig.siteUrl).toString(), changeFrequency: "monthly", priority: 0.5 },
  ];
}
