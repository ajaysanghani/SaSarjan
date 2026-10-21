"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

/**
 * One delegated listener for the whole page, so individual components stay
 * server-rendered. Elements opt in with data attributes:
 *   data-track="event_name"        — click events (CTAs, links)
 *   data-track-view="event_name"   — fired once when the element scrolls into view
 *   <details data-track-toggle="faq_toggle" data-track-id="...">  — FAQ opens
 */
export function AnalyticsListener() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-track]");
      if (!el) return;
      const { track: event, trackId } = el.dataset;
      if (event) track(event, trackId ? { id: trackId } : undefined);
    };

    // `toggle` does not bubble, so listen in the capture phase.
    const onToggle = (e: Event) => {
      const el = e.target as HTMLElement;
      if (!(el instanceof HTMLDetailsElement) || !el.open) return;
      const { trackToggle: event, trackId } = el.dataset;
      if (event) track(event, trackId ? { id: trackId } : undefined);
    };

    document.addEventListener("click", onClick);
    document.addEventListener("toggle", onToggle, true);

    let observer: IntersectionObserver | undefined;
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const event = (entry.target as HTMLElement).dataset.trackView;
            if (event) track(event);
            observer?.unobserve(entry.target);
          }
        },
        { threshold: 0.25 },
      );
      document.querySelectorAll("[data-track-view]").forEach((el) => observer?.observe(el));
    }

    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("toggle", onToggle, true);
      observer?.disconnect();
    };
  }, []);

  return null;
}
