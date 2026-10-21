# CoCreate India's Future — website

A minimal, single-page website for a civic co-creation initiative. The name
"CoCreate India's Future" is a **provisional working name** and can be changed in one place.

Built with Next.js (App Router), React and TypeScript, using plain CSS and
[`lucide-react`](https://lucide.dev) icons. It has no backend, database, CMS or tracking.
Everything is pre-rendered as static HTML.

## Local setup

```bash
pnpm install
cp .env.example .env.local   # optional: fill in URLs
pnpm dev                     # http://localhost:3000
pnpm build && pnpm start     # production build
```

In development, a yellow notice at the top lists any required settings that are still missing.
Production builds never show this notice.

## Configure the site

| What | Where |
| --- | --- |
| Name, wordmark, tagline, hero text, CTA labels, nav | `src/config/site.ts` |
| Notion form, WhatsApp Community, privacy/terms URLs, contact email, production URL | env vars (see `.env.example`) **or** the first `""` argument in `src/config/site.ts` |
| Focus areas | `src/content/focus-areas.ts` |
| Section copy (purpose, pathways, principles, inclusion, process, invitation) | `src/content/sections.ts` |
| FAQs | `src/content/faqs.ts` |
| Colours, type and spacing | tokens at the top of `src/app/globals.css` |

### External URLs

- `NEXT_PUBLIC_NOTION_FORM_URL` is the public link to the Notion participation form. The "Express Interest" buttons use it.
- `NEXT_PUBLIC_WHATSAPP_COMMUNITY_URL` is the WhatsApp Community invitation link.

Only absolute `http(s)` URLs are accepted. If a URL is missing or invalid, its buttons show a
non-clickable "Coming soon" state and the page explains that the link is not available yet.
Visitors are never sent to a guessed address.

`NEXT_PUBLIC_*` values are built into the page, so **rebuild or redeploy after changing them**.

### Search indexing

Until `NEXT_PUBLIC_SITE_URL` is set, the site sends `noindex`, `robots.txt` disallows crawling,
and the sitemap is empty. This keeps preview deployments out of search results. Set it to the
final domain only in the Production environment.

## Deploy on Vercel

1. Go to [vercel.com/new](https://vercel.com/new) and import this GitHub repository. Vercel detects Next.js and pnpm on its own.
2. Under **Settings → Environment Variables**, add the values from `.env.example`. Set `NEXT_PUBLIC_SITE_URL` for **Production** only.
3. Deploy. Every push then creates a preview deployment, and merges to the production branch deploy to production.
4. Add the custom domain under **Settings → Domains** when it has been decided.

Any static-capable Next.js host works the same way.

## Analytics

No analytics script is included. `src/lib/analytics.ts` passes events to
[Plausible](https://plausible.io) or [Umami](https://umami.is), but only if you add one of their
scripts to `src/app/layout.tsx`. Both are cookieless. Events sent:

| Event | When | Props |
| --- | --- | --- |
| `cta_express_interest` | Notion form button clicked | `id`: placement (hero, header, mobile_menu, invitation, footer) |
| `cta_whatsapp_community` | WhatsApp button clicked | `id`: placement |
| `faq_open` | An FAQ is opened | `id`: question id |
| `focus_areas_viewed` | Focus areas section scrolled into view | — |

A click is not a submission. The site cannot tell whether a Notion form was submitted, and it
does not claim to. Never send personal data in event props. Before adding analytics, review
consent requirements under India's Digital Personal Data Protection Act, 2023, and any other
applicable law, and describe the analytics in the privacy notice.

## Structure

```
src/
  app/          layout (metadata), page, globals.css, robots, sitemap, icon
  components/   Header, MobileNav, Hero, Purpose, FocusAreas, Pathways, Principles,
                Inclusion, Process, Invitation, Faq, Footer, CtaLink, Section, …
  config/       site.ts — central configuration
  content/      editable copy for each section
  lib/          analytics helper
```

Future additions (working groups, published proposals, updates, other languages) can be built as
new routes under `src/app/` that reuse `Section`, `CtaLink` and the content pattern.

See [LAUNCH_CHECKLIST.md](./LAUNCH_CHECKLIST.md) for owner inputs needed before launch.
