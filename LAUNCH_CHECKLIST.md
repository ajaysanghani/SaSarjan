# Launch checklist

## Owner input required

### Required
- [ ] **Notion form URL**: set `NEXT_PUBLIC_NOTION_FORM_URL`.
- [ ] **WhatsApp Community invitation URL**: set `NEXT_PUBLIC_WHATSAPP_COMMUNITY_URL`.
- [ ] **Confirm or replace the working name** "CoCreate India's Future" (`src/config/site.ts`: `name`, `wordmark`).
- [ ] **Confirm the status statement.** The footer and FAQ say: "This is not a political party or a government programme. It is not endorsed by any government body." Confirm that this is accurate.
- [ ] **Production domain**: defaults to `https://sasarjan.com`. Point that domain at the Vercel project, or set `NEXT_PUBLIC_SITE_URL` to the real domain.

### Recommended before wider promotion
- [ ] **Contact email**: defaults to `info@sasarjan.com`. Until a form URL is set, "Join the Initiative" opens an email to it, so make sure someone monitors it.
- [ ] **Privacy notice**: publish one and set `NEXT_PUBLIC_PRIVACY_NOTICE_URL`. Cover what the Notion form collects, why, who can see it, how long it is kept, how to ask for deletion, and that Notion processes the data. Consider India's DPDP Act, 2023.
- [ ] **Terms of participation** (optional): set `NEXT_PUBLIC_TERMS_URL`.
- [ ] **Organisational structure**: once confirmed, update the "Is this a political party…" FAQ in `src/content/faqs.ts`.
- [ ] **Social-sharing image**: add a real 1200×630 image as `src/app/opengraph-image.png` if you want link previews to show one.
- [x] **Logo**: the SaSarjan logo (`public/logo.png`) appears in the header and footer. The favicon (`src/app/icon.png`) is the mandala cropped from it.

## Notion form setup (on Notion, not in this repo)

The FAQ makes these statements about the form. Make sure they stay true:
- [ ] The form does **not** ask for Aadhaar numbers or identity documents.
- [ ] Any demographic questions, such as gender, are **optional** and explain why they are asked.
- [ ] The form has privacy information or a link to the privacy notice, plus a consent checkbox.
- [ ] Societal categories and participation pathways allow **multiple selections**.
- [ ] Recommended fields: name; email; state/UT; city or district (optional); role or background; expertise; categories of interest; pathways; skills; what you hope to contribute; what you want to learn; preferred languages; availability (optional); links (optional); consent.
- [ ] Notion's form confirmation message sets expectations without promising a role or a response time.

## WhatsApp Community setup
- [ ] Post community guidelines in the community description (respectful, relevant and constructive conversation; protect personal information; no confidential material without permission; membership is voluntary).
- [ ] Check what members' phone-number visibility looks like in your setup. The site warns that numbers may be visible to admins and to members of groups people join.

## Checks performed during build

All were run against a production build (`pnpm build && pnpm start`) in headless Chromium (Playwright):

- `tsc --noEmit` and `next build`: passed, with no type errors. The page is fully static.
- Horizontal overflow at 360px, 768px and 1440px: none, 0px each.
- axe-core 4.10 (WCAG 2.0/2.1 A and AA, plus best-practice rules) at 360px and 1440px: 0 violations. This was run with URLs configured.
- Keyboard: the first Tab reaches "Skip to main content". The mobile menu opens with Enter (`aria-expanded` = true) and Tab moves into it. Escape closes it and returns focus to the toggle. FAQ items open with Enter (native `<details>`).
- Heading structure: one `h1`, one `h2` per section, `h3` for cards.
- No browser console errors.
- Without a form URL, "Join the Initiative" opens an email to the contact address. Without a WhatsApp URL, WhatsApp buttons are hidden.
- Configured state, using test URLs `https://example.com/...` in a local build only: CTAs render as `<a target="_blank" rel="noopener noreferrer">` with screen-reader "(opens in a new tab)" text. Canonical, `og:url`, robots and sitemap use the configured domain.
- Analytics: with a stubbed `window.plausible`, clicking a CTA, opening an FAQ and scrolling to the focus areas each fired one event, with no personal data.

Not yet checked: real phones and screen readers (NVDA, VoiceOver, TalkBack), throttled-network performance, and a real Notion form or WhatsApp link.
