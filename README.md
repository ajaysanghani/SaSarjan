# CoCreate India's Future — website

A minimal website for a civic co-creation initiative: a single home page, a `/join`
application form and the shared `/ecosystem` page. The name "CoCreate India's Future" is a **provisional working name** and can
be changed in one place.

Built with Next.js (App Router), React and TypeScript, using plain CSS and
[`lucide-react`](https://lucide.dev) icons. Pages are pre-rendered as static HTML. The only
server code is the `/join` server action, which saves applications to a Notion database
through the Notion API. There is no database of our own, no CMS and no tracking.

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
| "Who we are" people and early updates (section hidden while empty) | `team` and `updates` in `src/config/site.ts` |
| Notion token (server-only) | env var `NOTION_TOKEN` only (see `.env.example`) |
| WhatsApp Community, fallback Notion form, privacy/terms URLs, contact email, production URL | env vars (see `.env.example`) **or** the first `""` argument in `src/config/site.ts` |
| Focus areas | `src/content/focus-areas.ts` |
| Section copy (purpose, pathways, principles, inclusion, process, invitation) | `src/content/sections.ts` |
| Join form copy and answer options | `src/content/join-form.ts` |
| FAQs | `src/content/faqs.ts` |
| Colours, type and spacing | tokens at the top of `src/app/globals.css` |

### Join form (`/join`)

Every "Join the Initiative" button opens `/join`. Submissions are validated on the server
(`src/lib/join.ts`) and written by `src/lib/notion.ts` to the **Contributor Applications**
database in Notion, with Review Status set to "New". The token never reaches the browser.

1. Create an internal integration at [notion.so/profile/integrations](https://www.notion.so/profile/integrations).
2. Connect it to the Contributor Applications database (⋯ → Connections).
3. Set `NOTION_TOKEN` to the integration's secret. Never give it a `NEXT_PUBLIC_` prefix.
4. Optional: set `NOTION_CONTRIBUTORS_DATA_SOURCE_ID` to write to a different data source.

The answer options in `src/content/join-form.ts` must match the option names in the Notion
database exactly. Otherwise Notion creates new options. Change both together.

A hidden honeypot field and a minimum fill time of 4 seconds filter out simple bots. Bots get a
fake success message. If Notion rejects a submission, the visitor sees an error and the details
are logged on the server as `[join] Could not save application`.

Until `NOTION_TOKEN` is set, `/join` shows "The application form is being set up" and links to
`NEXT_PUBLIC_NOTION_FORM_URL`, or to an email to the contact address if no form URL is set.

### External URLs

- `NEXT_PUBLIC_WHATSAPP_COMMUNITY_URL` is the WhatsApp Community invitation link. WhatsApp buttons and the community card appear only once it is set.
- `NEXT_PUBLIC_NOTION_FORM_URL` is optional: a public Notion form used on `/join` only as the fallback described above.

Only absolute `http(s)` URLs are accepted. Visitors are never sent to a guessed address.

The logo is `public/logo.png`, set in `siteConfig.logo`. Set it to `null` to use the text wordmark instead.

`NEXT_PUBLIC_*` values are built into the page, and `/join` checks for `NOTION_TOKEN` when it
is pre-rendered, so **rebuild or redeploy after changing any of them**.

### Search indexing

The production URL defaults to `https://sasarjan.com`. Override it with `NEXT_PUBLIC_SITE_URL`.
It is used for the canonical URL, `robots.txt` and the sitemap. Vercel already marks preview
deployments `noindex`.

## Shared SaSarjan ecosystem content

The ecosystem band in the footer and the `/ecosystem` page come from
[`@sasarjan/web-core`](https://www.npmjs.com/package/@sasarjan/web-core), pinned exactly (currently
**0.2.1**). Their wording lives in that package, not here.

| What | Where |
| --- | --- |
| Package settings (`siteId: "sasarjan"`, `/ecosystem` call to action) | `src/site.config.ts` (server-only) |
| Footer band (`<SharedFooter variant="band" />`, condensed on `/ecosystem`) | `src/components/Footer.tsx` |
| `/ecosystem` page (`IntroductionPage`, `introductionMetadata`) | `src/app/ecosystem/page.tsx` |
| Colours (`--swc-*` tokens mapped to the site tokens) | top of `src/app/globals.css` |

Dependabot (`.github/dependabot.yml`) opens a weekly PR when a new version is published. Check the
footer and `/ecosystem` on that PR's Vercel preview before merging.

## Deploy on Vercel

1. Go to [vercel.com/new](https://vercel.com/new) and import this GitHub repository. Vercel detects Next.js and pnpm on its own.
2. Under **Settings → Environment Variables**, add the values from `.env.example`. Mark `NOTION_TOKEN` as Sensitive.
3. Deploy. Every push then creates a preview deployment, and merges to the production branch deploy to production.
4. Add the custom domain under **Settings → Domains** when it has been decided.

Any Next.js host that supports server actions works the same way. A purely static host
cannot run the `/join` form.

## Analytics

No analytics script is included. `src/lib/analytics.ts` passes events to
[Plausible](https://plausible.io) or [Umami](https://umami.is), but only if you add one of their
scripts to `src/app/layout.tsx`. Both are cookieless. Events sent:

| Event | When | Props |
| --- | --- | --- |
| `cta_join` | "Join the Initiative" button clicked | `id`: placement (hero, header, mobile_menu, invitation, footer) |
| `join_submitted` | The `/join` form shows its success message | — |
| `cta_whatsapp_community` | WhatsApp button clicked | `id`: placement |
| `faq_open` | An FAQ is opened | `id`: question id |
| `focus_areas_viewed` | Focus areas section scrolled into view | — |

A click is not a submission. `join_submitted` also fires for submissions caught by the bot
filters, so count real applications in Notion. Never send personal data in event props. Before adding analytics, review
consent requirements under India's Digital Personal Data Protection Act, 2023, and any other
applicable law, and describe the analytics in the privacy notice.

## Structure

```
src/
  app/          layout (metadata), page, globals.css, robots, sitemap, icon
    ecosystem/  /ecosystem page (shared, from @sasarjan/web-core)
    join/       /join page and its server action (actions.ts)
  components/   Header, MobileNav, Hero, Purpose, FocusAreas, Pathways, Principles,
                Inclusion, Process, Invitation, Faq, Footer, CtaLink, Section, JoinForm, …
  config/       site.ts — central configuration
  content/      editable copy for each section and the join form
  lib/          analytics helper, join form validation (join.ts), Notion client (notion.ts)
  site.config.ts  settings for the shared @sasarjan/web-core footer band and /ecosystem page
```

Future additions (working groups, published proposals, updates, other languages) can be built as
new routes under `src/app/` that reuse `Section`, `CtaLink` and the content pattern.

See [LAUNCH_CHECKLIST.md](./LAUNCH_CHECKLIST.md) for owner inputs needed before launch. Open
work is tracked as [GitHub issues](https://github.com/ajaysanghani/SaSarjan/issues) under the
**Launch** milestone.
