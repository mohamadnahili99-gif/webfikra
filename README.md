# WEBFIKRA

Modern bilingual digital experiences for restaurants, cafés, and bakeries.

## What this repository contains

- Next.js App Router website, TypeScript, React, and Tailwind CSS
- Premium Arabic/English marketing landing page
- Interactive sample menu with categories, cart, quantity controls, example order message, and a sample total (no delivery fees or order submission)
- Live brand-style studio: business name, restaurant/café/bakery selection, **12 palettes**, custom accent color, three layout styles, three corner styles, and desktop/mobile concept previews
- Project inquiry form that prepares (but **does not send**) a WhatsApp message
- Illustrative creative concepts, service descriptions, and FAQs
- Bilingual `/privacy` and `/terms` pages, floating WhatsApp and back-to-top actions
- Existing `/order` page and inactive `/restaurants/login` and `/restaurants/register` routes with clear service notices (no account forms)

**Important:** The interactive menu is a demonstration only. It does not place orders or process payments. The existing restaurant login and registration pages are placeholders; no account credentials are accepted. The marketing service packages are scopes for quotation, not fixed public prices.

## Getting started

Use Node.js 22.

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Quality checks

```bash
npm run lint
npx tsc --noEmit
npm run build
```

GitHub Actions also runs these checks on pull requests targeting `main` and on pushes to the redesign branch. A separate browser workflow tests the live marketing page in Chromium on desktop and mobile; screenshots are uploaded to the workflow as review artifacts.

## Main files

| Path | Purpose |
| --- | --- |
| `app/page.tsx` | Main bilingual marketing page |
| `app/components/RestaurantExperience.tsx` | Interactive sample menu and cart message preview |
| `app/components/BrandStudioPreview.tsx` | 12-palette brand-style concept studio |\n| `app/components/FloatingActions.tsx` | Floating contact and back-to-top shortcuts |\n| `app/components/LegalContent.tsx` | Privacy and terms bilingual content |
| `app/components/LeadQuoteForm.tsx` | WhatsApp project inquiry builder |
| `app/hooks/useWebfikraLanguage.ts` | Shared language preference |
| `app/globals.css` | Brand typography and motion |
| `app/layout.tsx` | Root layout and metadata |
| `app/opengraph-image.tsx` | Social media sharing image |
| `app/icon.svg` | Brand favicon |

## Editing the site

- The landing page is intentionally branded in charcoal, orange, warm gold, and cream.
- Arabic is the first-visit default; switching languages is remembered locally where browser storage is available.
- Demo product details and prices are **illustrative**, not real client catalog data.
- Marketing imagery currently uses third-party Unsplash image URLs; replace these with appropriately licensed first-party assets before a final production release if desired.
- The existing `public/webfikra-hero.mp4` is used by the home hero when available; a food-photo poster is included for fallback display.
- The WhatsApp phone number is set in `app/components/LeadQuoteForm.tsx` and `app/components/BrandStudioPreview.tsx`. Contact links are also in `app/components/FloatingActions.tsx`, `app/components/LegalContent.tsx`, and `app/page.tsx`.
- If a custom domain is connected later, set `NEXT_PUBLIC_SITE_URL` to its full HTTPS origin, e.g. `https://your-domain.example`. In Vercel, the app otherwise uses the current deployment URL for social previews.

## Deployment workflow

1. Develop on `redesign-2026` and review pull request #2.
2. Ensure all quality checks succeed.
3. Verify the actual page on mobile and desktop, including images, the language switch, menu cart, and WhatsApp message.
4. Review contact information and imagery. Unverified Instagram and email addresses have been removed from the public footer. Only publish channels you own and can receive messages through.
5. **Only after review**, merge to `main` for production deployment.

No production merge is performed automatically from this branch.

## Definition of done for the marketing site

- [x] Responsive Arabic/English landing page and live interactions
- [x] Interactive demonstration menu and cart (no real orders)
- [x] Live style preview with 12 curated palettes and custom accent
- [x] Quote request composer with WhatsApp handoff
- [x] Legal/support routes and links
- [x] No misleading account-creation or password fields on inactive portal routes
- [x] Automated lint, TypeScript, production build, and browser smoke tests
- [ ] Final human review of the design and business claims
- [ ] Confirm phone number ownership, photos/media rights, and correct production domain
- [ ] Obtain approval before merging the draft pull request into `main`

**Not part of this launch:** database-backed customer accounts, online payments, live ordering backend, or a working restaurant admin dashboard. These require separate development, data/storage architecture, authentication, and production security review. Do not advertise them as live features.
