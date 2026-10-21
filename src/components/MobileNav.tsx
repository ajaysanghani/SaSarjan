"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { CtaLink } from "./CtaLink";

type Props = {
  items: { label: string; href: string }[];
  ctaHref: string | null;
  ctaLabel: string;
};

/** Disclosure-style menu for small screens. Closes on Escape, link click or resize to desktop. */
export function MobileNav({ items, ctaHref, ctaLabel }: Props) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 960px)");
    const onChange = () => desktop.matches && setOpen(false);
    document.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onChange);
    return () => {
      document.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onChange);
    };
  }, [open]);

  return (
    <div className="mobile-nav">
      <button
        ref={buttonRef}
        type="button"
        className="mobile-nav__toggle"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
      </button>
      <nav
        id="mobile-nav-panel"
        className="mobile-nav__panel"
        aria-label="Main (mobile)"
        hidden={!open}
      >
        <ul className="mobile-nav__list">
          {items.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="mobile-nav__link" onClick={() => setOpen(false)}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <CtaLink href={ctaHref} label={ctaLabel} event="cta_join" placement="mobile_menu" />
      </nav>
    </div>
  );
}
