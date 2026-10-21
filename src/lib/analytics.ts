/**
 * Privacy-respecting analytics hook point.
 *
 * No analytics provider is installed. `track` forwards events to Plausible or
 * Umami only if the project owner has added one of their scripts; otherwise it
 * does nothing. Never pass personal data in `props`.
 */

type Props = Record<string, string>;

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Props }) => void;
    umami?: { track: (event: string, props?: Props) => void };
  }
}

export function track(event: string, props?: Props) {
  if (typeof window === "undefined") return;
  window.plausible?.(event, props ? { props } : undefined);
  window.umami?.track(event, props);
  if (process.env.NODE_ENV === "development") {
    console.debug("[analytics]", event, props ?? {});
  }
}
