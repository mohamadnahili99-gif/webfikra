# WEBFIKRA — Restaurant platform setup

This application has two deliberately separate layers:

- **Marketing website**: public at `/`, bilingual, with a demo menu and brand studio.
- **Restaurant platform (feature-gated)**: Supabase-backed authenticated portal at `/restaurants/login`, dashboard at `/restaurants/portal`, and public restaurant menus at `/r/[slug]`.

No Supabase credentials or service-role keys have been committed. This code **will not accept logins or store restaurant data until you configure it**.

## 1. Create/choose a Supabase project

In your Supabase project dashboard, open SQL Editor and run:

`supabase/migrations/20261119_webfikra_platform.sql`

The migration creates `wf_restaurants`, `wf_categories`, and `wf_items` with Row Level Security. Public users can read only **published** restaurants and visible menu entries. Authenticated users can edit only restaurants they own.

The script is intended for a fresh WEBFIKRA schema. Review migration policies against any existing customized schema before applying. Use the database backup and migration history maintained in Supabase.

## 2. Configure Vercel environment variables

Copy the variable names from `.env.example` into the Vercel project settings.

| Variable | Purpose |
| --- | --- |
| `SUPABASE_URL` | Your Supabase project URL |
| `SUPABASE_PUBLISHABLE_KEY` | Supabase **publishable** key or legacy anon key, never a secret/service_role key |
| `WEBFIKRA_ALLOW_SIGNUPS` | Keep `false` until you have configured email confirmation and signup abuse protection |
| `NEXT_PUBLIC_SITE_URL` | Optional canonical domain `https://webfikra.com` |

Set these for the relevant Vercel environment and deploy the branch after configuration.

**Never** paste your service-role key, JWT secret, Auth tokens, database password, or personal account credentials into a chat or commit them to GitHub.

## 3. Enable and test Supabase Auth

- Configure email/password sign-in and email confirmation in Supabase Auth.
- Set up a suitable production SMTP provider and anti-abuse controls such as CAPTCHA and rate limits before opening public signup.
- With signups off, an administrator can create or invite an initial user through the Supabase Authentication dashboard. Sign in through `/restaurants/login`.
- When you explicitly decide to allow self-registration, set `WEBFIKRA_ALLOW_SIGNUPS=true` after reviewing abuse limits and identity policy.
- Supabase Auth processes passwords. WEBFIKRA stores access/refresh credentials only in HTTP-only, SameSite Strict cookies that are used by Next.js route handlers; it does not expose the keys to the browser JavaScript.
- Session refresh is handled server-side as needed. All editing endpoints additionally rely on the database's RLS permissions.

## 4. Manage a restaurant

Open `/restaurants/portal` after logging in.

1. Create a restaurant with a unique slug, name, WhatsApp number in international digits, and branding.
2. Add categories, then menu items with names, descriptions, prices, and HTTPS photo URLs.
3. Choose the USD or LBP currency, theme color, address and opening hours.
4. Publish the restaurant when ready. Your public link is `https://your-domain/r/slug`.
5. Open the QR link if you want to obtain a printable QR graphic. **QR rendering currently uses an external QR API, which receives only the public menu URL.**

Each restaurant can have its own public subpath. Custom domains or per-restaurant subdomains require separate DNS/routing work; they are **not** active in this version.

## 5. Customer checkout and data model

The customer-facing website is available only after publication. Guests can select items, change quantities, review their cart, enter their name/address/notes, and open a pre-filled WhatsApp message addressed to the restaurant.

- The customer decides whether to send the WhatsApp message.
- **No delivery-fee fields or calculations** are added.
- Payment processing, backend order storage, status tracking, inventory, and live incoming-order dashboards are **not implemented**. WhatsApp messages are not stored in WEBFIKRA's database.

The restaurant footer remains only `Design by webfikra.com` as the white-label signature.

## Security / deployment checklist

- [ ] SQL migration applied, RLS and grants audited on your project
- [ ] Auth/email configuration and anti-abuse policies enabled
- [ ] Keys set correctly in Vercel (no service-role key anywhere in app env)
- [ ] Sign-in/signup, token refresh and sign-out tested with a real account
- [ ] Two test restaurant accounts checked for cross-tenant isolation (one cannot read/edit another)
- [ ] Draft restaurant and invisible items verified inaccessible as an anonymous user
- [ ] Live WhatsApp handoff tested with a test restaurant's real number
- [ ] Photos and logos licensed and contact information confirmed
- [ ] Browser, ESLint, TypeScript, and build checks passed
- [ ] Review and approval before merging `redesign-2026` into `main`

**Important**: A code build passing does not prove Supabase production auth and RLS policies are correctly deployed. These must be validated after connecting the actual project.

## Development

```bash
npm ci
npm run dev
npm run lint
npx tsc --noEmit
npm run build
```

The server route handlers expose no privileged service role. Configured publishable keys are sent only from the Next.js server to Supabase, with access scoped by signed user tokens and RLS.
