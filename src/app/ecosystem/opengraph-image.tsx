import { ecosystemOgAlt, ecosystemOgSize, renderEcosystemOg } from "@/lib/ecosystem-og";

export const alt = ecosystemOgAlt;
export const size = ecosystemOgSize;
export const contentType = "image/png";

export default function Image() {
  return renderEcosystemOg();
}
