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
- Real Supabase-backed restaurant portal (feature-gated until configured): account login, restaurant editor, categories, bilingual items, secure image uploads, publishing, and customer WhatsApp order handoff (without delivery fees). Portal routes are /restaurants/login, /restaurants/register and /restaurants/portal. Public restaurant menu is /r/[slug].

**Important:** The marketing demo menu is illustrative and does not place orders. Once Supabase is configured, published restaurant menus can prepare live customer-to-restaurant WhatsApp order messages; messages are sent by customers themselves. No backend order storage or payments exist. The restaurant portal remains disabled until the Supabase migration and secure environment configuration are completed. The marketing service packages are quoted individually.

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
| `app/components/BrandStudioPreview.tsx` | 12-palette brand-style concept studio |\n| `app/components/FloatingActions.tsx` | Floating contact and back-to-top shortcuts |\n| `app/components/LegalContent.tsx` | Privacy and terms bilingual content |\n| `app/components/RestaurantPortal.tsx` | Restaurant dashboard & menu editing |\n| `app/components/RestaurantMenu.tsx` | White-label customer menu/cart |\n| `lib/platform.ts` | Auth, cookies and Supabase REST integration |\n| `supabase/migrations/20261119_webfikra_platform.sql` | Tenant-isolated database schema |\n| `supabase/migrations/20261119_webfikra_media.sql` | Secure menu-image storage bucket and upload permissions |
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

## Restaurant platform\n\nSee **[docs/restaurant-platform.md](docs/restaurant-platform.md)** for the secure Supabase deployment guide, environment configuration, signup protection, and restaurant administration. The required variables are listed in `.env.example`. Do not add any secret/service-role key to the repo.\n\n## Deployment workflow

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
- [x] Account pages only request passwords when Supabase integration is configured
- [x] Automated lint, TypeScript, production build, and browser smoke tests
- [ ] Verify Supabase migration and Auth integration against a real project, including multi-account RLS isolation\n- [ ] Final human review of the design and business claims
- [ ] Confirm phone number ownership, photos/media rights, and correct production domain
- [ ] Obtain approval before merging the draft pull request into `main`

**Not part of this launch:** payments, backend order storage and tracking, inventory, custom restaurant domains, or media uploads from device. Database-backed restaurant management and public WhatsApp ordering code are included but cannot be described as live until the Supabase migration, environment variables, and cross-tenant security tests are completed. Do not advertise them as live features.
