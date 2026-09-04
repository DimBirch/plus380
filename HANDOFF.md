# Handoff — THREEEIGHTY website project

Everything a new agent/session needs to pick this up with zero prior context.

## 1. What this is

A bilingual (EN/UK) marketing website + self-service admin panel for **THREEEIGHTY**
("Epic Event Experience"), an international event-promotion agency (EDM festivals,
concerts, tours, corporate events, birthdays, team-building). Built with Next.js 14 App
Router, Tailwind, Supabase, deployed on Vercel. Domain is not yet connected — the site is
still on `plus380.vercel.app`.

## 2. Where everything lives

| What | Where |
|---|---|
| Project code | `/Users/dima/plus380` (local machine) |
| GitHub repo | https://github.com/DimBirch/plus380 (public, owner: DimBirch) |
| Live site | https://plus380.vercel.app (defaults to `/en`) |
| Vercel project | org `team_HwBqI41amOVdLvjLT6EU4kvC`, project `plus380` (id `prj_C1lziMNiM4QsrbdoTf3mw5DDMCOD`) — see `.vercel/project.json` |
| Supabase project | https://qekrcjzdfhxlkgkvztdl.supabase.co |
| Admin panel | https://plus380.vercel.app/admin/login — **not linked from any public page on purpose** (user asked for it hidden). Login is an email/password the user created directly in Supabase Authentication — the agent does not have it. |
| Contact email shown on site | hello@rel1ve.eu |

## 3. Tech stack

- Next.js 14.2.35 (App Router), TypeScript, Tailwind CSS
- Supabase: Postgres (`events` table), Auth (admin login), Storage (`event-images` bucket)
- Deployed on Vercel (Hobby plan)
- i18n: hand-rolled dictionary system (no next-intl) — `app/[locale]/`, locales `uk`/`en`, **default locale is `en`** (`lib/i18n/config.ts`)
- Fonts (`app/layout.tsx`, via `next/font/google`): **Unbounded** (headings — loaded with `cyrillic`/`cyrillic-ext` subsets, required for the UA copy), **Anton** (logo wordmark only, Latin-only is fine since the brand name is never translated), **Inter** (body), **JetBrains Mono** (labels/mono)

## 4. Brand

- Name: **THREEEIGHTY**, always styled as `THR` + `EEE` (in brand red) + `IGHTY` — see `components/Logo.tsx`. There's also a compact `variant="mark"` (just "380") used as an image placeholder.
- Tagline / credo: **"Epic Event Experience"** (kept in English in both locales, it's part of the lockup)
- Colors: strict red/black/white system. Brand red is `#e31b23` (Tailwind `red-500` in `tailwind.config.ts`, scale 300–700). No other accent colors — a previous iteration used violet/cyan/pink and it was deliberately replaced with red-only.
- The site now has a **light/dark theme toggle** (button in the header, sun/moon icon, `components/ThemeToggle.tsx`) and **defaults to light** for first-time visitors. Implementation: CSS variables in `app/globals.css` under `:root` (light) and `:root[data-theme="dark"]` (dark) — the `ink-*`, `bone-*` and `white` Tailwind color tokens all read those variables (see `tailwind.config.ts`), so components never needed individual `dark:` classes. Preference persists via `localStorage.theme` (`'dark'` or `'light'`); a blocking inline script in `app/layout.tsx` (first child of `<body>`) applies `data-theme="dark"` before paint if needed, so there's no flash.
- A decorative **animated dancing-figure SVG** (Keith Haring–style stick figure, `components/DancingFigure.tsx`) sits in the Hero background. It does a choreographed two-beat dance step (all limbs share one timing so it reads as an actual dance, not random flailing) plus a periodic vertical spin+jump flourish (`dance-*` keyframes in `app/globals.css`). This went through many rounds of user feedback — if asked to touch it again, read the keyframes/component together, they're tightly coupled.

## 5. Content model / admin panel

- `events` table (see `supabase/schema.sql` for the full schema + RLS policies): bilingual title/description, date, venue/city/country, category, cover image, gallery images array, ticket URL, attendee count, `featured` flag. Upcoming vs. past is computed from `event_date`, not stored.
- Admin panel (`app/admin/*`) lets the client log in and add/edit/delete events with image upload straight to Supabase Storage — no code changes needed for routine content updates.
- **No real events exist yet** — the client hasn't added any through the admin panel. `lib/data/sample-events.ts` provides fallback demo content only when Supabase env vars are absent (local preview before Supabase was wired up); it's dead code now that Supabase is connected, safe to delete later if you want to tidy up.

## 6. Environment variables

Already set in Vercel (Production, Preview, and Development environments) and in local
`.env.local` (gitignored):

```
NEXT_PUBLIC_SUPABASE_URL=https://qekrcjzdfhxlkgkvztdl.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_cMR6KpssNjFOCjiGWJRMiA_oO-Clyl6
```

Both are safe to expose (anon/publishable key is meant to be public; RLS in
`supabase/schema.sql` restricts writes to authenticated users).

## 7. How deploys work (important — read before pushing)

1. Edit code, then **always run a clean production build locally before deploying**:
   `rm -rf .next && npm run build` — catches type errors before they hit Vercel.
   ⚠️ **Never run `npm run build` while a `next dev` server (e.g. from `preview_start`)
   is also running against the same `.next` folder** — it corrupts the build and the
   dev server starts 500-ing until you `rm -rf .next` and restart it.
2. `git add -A && git commit -m "..." && git push` (remote `origin` is already
   configured with a dedicated deploy-only SSH key — see §8).
3. Deploy to Vercel: `npx vercel deploy --prod --yes` from `/Users/dima/plus380`.
   - It's unclear whether GitHub→Vercel auto-deploy-on-push is fully wired up (the
     project was originally imported via the Vercel dashboard, which normally does
     set that up) — throughout this project we never relied on it and manually ran
     `vercel deploy --prod` after every push, so keep doing both until you've
     confirmed one way or the other.
   - The Vercel CLI occasionally returns a transient `"Not authorized"` error on the
     first attempt — just run the same command again, it succeeds on retry.
   - Vercel CLI is already authenticated on this machine (device-flow login as
     account `hello-28494027`); `npx vercel whoami` should confirm. If a fresh
     environment doesn't have this, you'll need to re-run `vercel login` (prints an
     `https://vercel.com/oauth/device?user_code=...` link) — **ask the user before
     doing this**, since it grants access to their whole Vercel account, not just
     this project (this was explicitly confirmed with the user last time).

## 8. GitHub push access

A dedicated SSH deploy key was generated for this project (not the user's personal
key): `~/.ssh/id_ed25519_plus380`, with a host alias in `~/.ssh/config`:

```
Host github.com-plus380
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519_plus380
  IdentitiesOnly yes
```

The repo's `origin` remote uses that alias: `git@github.com-plus380:DimBirch/plus380.git`.
This should already work on this machine without further setup.

## 9. What's left to do

The **only explicitly outstanding task** from the user is connecting their real domain
(bought on GoDaddy — exact domain name not yet given to the agent, ask the user) to
this Vercel project, replacing `plus380.vercel.app`. Steps are already written out for
the user in `README.md` §4 ("Прив'язка домену з GoDaddy"): add the domain in Vercel
project settings → Domains, then add the A/CNAME records Vercel shows into GoDaddy's
DNS panel for that domain.

Beyond that, this has been an open-ended iterative design session — the user has been
asking for visual/content tweaks one at a time (color scheme, fonts, animations, copy,
theme toggle, etc.) and approving/adjusting each live on the deployed site. Expect more
of the same rather than a fixed spec. Always: make the change → clean build → visually
verify in the Browser pane (both `/en` and `/uk`, and both themes if the change touches
anything visual) → commit → push → `vercel deploy --prod --yes` → re-check the live URL.

## 10. Notable design/history context (so you don't undo things on purpose)

- The site went through a full rebrand mid-project: started as "+380" (violet/cyan/pink
  neon EDM look) → briefly "EEE80" → now **THREEEIGHTY** (red/black/white), per a real
  logo image the user supplied. If you see any leftover "+380" or "EEE80" strings
  anywhere, that's a bug, not intentional (last full sweep was commit `7f27774`).
- Laser-beam and equalizer-bar background effects were built, then explicitly removed
  by the user (commit `ea0f1dd`) — don't re-add them speculatively.
- The dancing figure animation and the theme toggle were the most recent features and
  are both working and deployed as of the last commit (`9793a02`).
- Company positions itself as Ukrainian-founded but now HQ'd in Breda, Netherlands (see
  the Offices section on the homepage: Breda = HQ, Kyiv, Tallinn, Zagreb = opening
  soon). Markets: US, Canada, EU, UK, Turkey, Balkans, Gulf states (not "Arab
  countries" — that phrasing was explicitly changed).

## 11. Quick command reference

```bash
cd /Users/dima/plus380

# local dev preview
npm run dev   # or use the Browser pane's preview_start with the "plus380-dev" launch.json entry

# before every deploy
rm -rf .next && npm run build

# ship it
git add -A && git commit -m "..." && git push
npx vercel deploy --prod --yes
```
