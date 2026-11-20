# WEBFIKRA

Modern bilingual digital experiences for restaurants, cafés, and bakeries.

## What this repository contains

- Next.js App Router website, TypeScript, React, and Tailwind CSS
- Premium Arabic/English marketing landing page
- Interactive sample menu with categories, cart, quantity controls, and a sample total
- Project inquiry form that prepares (but **does not send**) a WhatsApp message
- Illustrative creative concepts, service descriptions, and FAQs
- Existing `/order`, `/restaurants/login`, and `/restaurants/register` routes

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

GitHub Actions also runs these checks on pull requests targeting `main` and on pushes to the redesign branch.

## Main files

| Path | Purpose |
| --- | --- |
| `app/page.tsx` | Main bilingual marketing page |
| `app/components/RestaurantExperience.tsx` | Interactive sample menu |
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
- The WhatsApp phone number is set in `app/components/LeadQuoteForm.tsx`, while contact links on the homepage are in `app/page.tsx`.

## Deployment workflow

1. Develop on `redesign-2026` and review pull request #2.
2. Ensure all quality checks succeed.
3. Verify the actual page on mobile and desktop, including images, the language switch, menu cart, and WhatsApp message.
4. Review contact information and imagery.
5. **Only after review**, merge to `main` for production deployment.

No production merge is performed automatically from this branch.
