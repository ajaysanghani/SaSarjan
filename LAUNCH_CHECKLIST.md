# Launch checklist

What must be true before launch. Open items are tracked as
[GitHub issues](https://github.com/ajaysanghani/SaSarjan/issues) under the **Launch** milestone.
Tick items here when their issue is closed.

## Owner input required

### Required
- [x] **Notion token for the `/join` form**: `NOTION_TOKEN` is set on the production deployment. sasarjan.com/join shows the live form, not the fallback.
- [ ] **Verify a live submission**: the Contributor Applications database had no rows as of 22 Oct 2026. Submit one test application on sasarjan.com/join, confirm it appears in Notion with Review Status "New", then delete it.
- [ ] **WhatsApp Community invitation URL**: set `NEXT_PUBLIC_WHATSAPP_COMMUNITY_URL`.
- [ ] **Confirm or replace the working name** "CoCreate India's Future". It appears in `src/config/site.ts` (`name`, `wordmark`), in the `/join` copy in `src/content/join-form.ts`, and in the consent text in `src/components/JoinForm.tsx`.
- [ ] **Confirm the status statement.** The footer and FAQ say: "This is not a political party or a government programme. It is not endorsed by any government body." Confirm that this is accurate.
- [x] **Production domain**: sasarjan.com and www.sasarjan.com serve the site from Vercel.

### Recommended before wider promotion
- [ ] **Privacy notice**: the site now collects personal data itself (name, email, state, role and experience, plus optional phone, age group and gender) and stores it in Notion. Publish a notice and set `NEXT_PUBLIC_PRIVACY_NOTICE_URL`. Cover what is collected, why, who can see it, how long it is kept, how to ask for deletion, and that Notion processes the data. Consider India's DPDP Act, 2023. Link it from the form's consent text as well.
- [ ] **Contact email**: defaults to `info@sasarjan.com`. It is in the footer, the `/join` sidebar and the form's error message, so make sure someone monitors it.
- [ ] **Terms of participation** (optional): set `NEXT_PUBLIC_TERMS_URL`.
- [ ] **Organisational structure**: once confirmed, update the "Is this a political party…" FAQ in `src/content/faqs.ts`.
- [ ] **Analytics**: add a cookieless tool (Umami or Plausible) so the events in README → Analytics are recorded. Describe it in the privacy notice.
- [ ] **Social-sharing image**: add a real 1200×630 image as `src/app/opengraph-image.png` if you want link previews to show one.
- [x] **Logo**: the SaSarjan logo (`public/logo.png`) appears in the header and footer. The favicon (`src/app/icon.png`) is the mandala cropped from it.

## Join form and Notion database

The form, its privacy note and the FAQ make these statements. Make sure they stay true:
- [x] The form does **not** ask for Aadhaar numbers or identity documents.
- [x] Age group and gender are **optional**, and the form says why they are asked.
- [x] Focus areas, contribution tracks, expertise and languages allow **multiple selections**.
- [x] A required consent checkbox comes before submission.
- [ ] The consent text links to the privacy notice (once it exists).
- [ ] The FAQ "How will my information be used?" says applications are stored in Notion. At the moment it only says so when the fallback form URL is set.
- [ ] The success message says "Our core team reads every application". Agree who reviews new rows in Notion and how often.
- [ ] Only the people who need it can see the Contributor Applications database in Notion, and the integration is connected to that database only.
- [ ] After any change to select options in Notion, update `src/content/join-form.ts` to match exactly.

## WhatsApp Community setup
- [ ] Post community guidelines in the community description (respectful, relevant and constructive conversation; protect personal information; no confidential material without permission; membership is voluntary).
- [ ] Check what members' phone-number visibility looks like in your setup. The site warns that numbers may be visible to admins and to members of groups people join.

## Checks performed during build

These were run on the home page, before `/join` existed, against a production build
(`pnpm build && pnpm start`) in headless Chromium (Playwright):

- `tsc --noEmit` and `next build`: passed, with no type errors. The page is fully static.
- Horizontal overflow at 360px, 768px and 1440px: none, 0px each.
- axe-core 4.10 (WCAG 2.0/2.1 A and AA, plus best-practice rules) at 360px and 1440px: 0 violations. This was run with URLs configured.
- Keyboard: the first Tab reaches "Skip to main content". The mobile menu opens with Enter (`aria-expanded` = true) and Tab moves into it. Escape closes it and returns focus to the toggle. FAQ items open with Enter (native `<details>`).
- Heading structure: one `h1`, one `h2` per section, `h3` for cards.
- No browser console errors.
- Without a WhatsApp URL, WhatsApp buttons are hidden.
- Configured state, using test URLs `https://example.com/...` in a local build only: external CTAs render as `<a target="_blank" rel="noopener noreferrer">` with screen-reader "(opens in a new tab)" text. Canonical, `og:url`, robots and sitemap use the configured domain.
- Analytics: with a stubbed `window.plausible`, clicking a CTA, opening an FAQ and scrolling to the focus areas each fired one event, with no personal data.

Not yet checked: the same accessibility, keyboard and mobile-layout checks on `/join`; a real
submission from a deployed site to Notion; real phones and screen readers (NVDA, VoiceOver,
TalkBack); throttled-network performance; and a real WhatsApp link.
