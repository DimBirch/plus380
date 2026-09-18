# Handoff — THREEEIGHTY website project

Everything a new agent/session needs to pick this up with zero prior context.

## 1. What this is

An **English-only** marketing website (the client had a bilingual EN/UK version earlier
in the project, then explicitly asked to drop Ukrainian from the public site — see §11)
+ a Ukrainian-language self-service admin panel, for **THREEEIGHTY** ("Epic Event
Experience"), an international event-promotion agency (EDM festivals, concerts, tours,
corporate events, birthdays, team-building). Built with Next.js 14 App Router, Tailwind,
Supabase, deployed on Vercel. The custom domain **`threeeighty.eu` is connected** (added
2026-09-16) — DNS lives at GoDaddy, apex points at Vercel with two A records, `www`
308-redirects to the apex, Let's Encrypt cert issued. The old
`plus380.vercel.app` URL now **308-redirects to `threeeighty.eu`** (path-preserving), so
there is a single canonical address.

## 2. Where everything lives

| What | Where |
|---|---|
| Project code | `/Users/dima/plus380` (local machine) |
| GitHub repo | https://github.com/DimBirch/plus380 (public, owner: DimBirch) |
| Live site | **https://threeeighty.eu** (primary, single English site, root `/`; events at `/events`, `/events/[slug]`) |
| Domain registrar | GoDaddy (`threeeighty.eu`), DNS on GoDaddy nameservers `ns23`/`ns24.domaincontrol.com` — **not** Vercel nameservers |
| Legacy URL | https://plus380.vercel.app — **308-redirects to `threeeighty.eu`** (path preserved), set on the domain in Vercel |
| Vercel project | org `team_HwBqI41amOVdLvjLT6EU4kvC`, project `plus380` (id `prj_C1lziMNiM4QsrbdoTf3mw5DDMCOD`) — see `.vercel/project.json` |
| Supabase project | https://qekrcjzdfhxlkgkvztdl.supabase.co |
| Admin panel | https://threeeighty.eu/admin/login — **not linked from any public page on purpose** (user asked for it hidden). Login is an email/password the user created directly in Supabase Authentication — the agent does not have it. |
| Contact email shown on site | hello@threeeighty.eu |

## 3. Tech stack

- Next.js 14.2.35 (App Router), TypeScript, Tailwind CSS
- Supabase: Postgres (`events` table), Auth (admin login), Storage (`event-images` bucket)
- Deployed on Vercel (Hobby plan)
- i18n: the public site is plain English now, no locale routing — pages live directly under `app/(site)/` (a route group, so no URL segment) and import `lib/i18n/dictionaries/en.ts` directly for copy. The admin panel (`app/admin/`) is separately hardcoded to Ukrainian via `lib/i18n/dictionaries/uk.ts` — that's intentional, not a bug (see §11). `lib/i18n/dictionary-type.ts` still defines the shared `Dictionary` TS type both files satisfy.
- Fonts (`app/layout.tsx`, via `next/font/google`): **Unbounded** (headings — loaded with `cyrillic`/`cyrillic-ext` subsets, required for the UA copy), **Anton** (logo wordmark only, Latin-only is fine since the brand name is never translated), **Inter** (body), **JetBrains Mono** (labels/mono)

## 4. Brand

- Name: **THREEEIGHTY**, always styled as `THR` + `EEE` (in brand red) + `IGHTY` — see `components/Logo.tsx`. There's also a compact `variant="mark"` (just "380") used as an image placeholder.
- Tagline / credo: **"Epic Event Experience"** (part of the lockup)
- Colors: strict red/black/white system. Brand red is `#e31b23` (Tailwind `red-500` in `tailwind.config.ts`, scale 300–700). No other accent colors — a previous iteration used violet/cyan/pink and it was deliberately replaced with red-only.
- The site now has a **light/dark theme toggle** (button in the header, sun/moon icon, `components/ThemeToggle.tsx`) and **defaults to light** for first-time visitors. Implementation: CSS variables in `app/globals.css` under `:root` (light) and `:root[data-theme="dark"]` (dark) — the `ink-*`, `bone-*` and `white` Tailwind color tokens all read those variables (see `tailwind.config.ts`), so components never needed individual `dark:` classes. Preference persists via `localStorage.theme` (`'dark'` or `'light'`); a blocking inline script in `app/layout.tsx` (first child of `<body>`) applies `data-theme="dark"` before paint if needed, so there's no flash.
- A decorative **animated dancing-figure SVG** (Keith Haring–style stick figure, `components/DancingFigure.tsx`) sits in the Hero background. It does a choreographed two-beat dance step (all limbs share one timing so it reads as an actual dance, not random flailing) plus a periodic vertical spin+jump flourish (`dance-*` keyframes in `app/globals.css`). This went through many rounds of user feedback — if asked to touch it again, read the keyframes/component together, they're tightly coupled.
- **Logo tagline alignment:** in the footer lockup the tagline is stretched to span the wordmark exactly, from the "T" to the final "Y". `Logo.tsx` renders it as per-character spans in a `justify-between` flex row — the first glyph sits flush left, the last flush right, slack spread evenly. **Do not** "simplify" this to `text-align: justify`: for Latin text that only widens the two word spaces, so the gaps balloon and the letters stay put. Letter-spacing is also deliberately absent — the flex gaps are the tracking, and a trailing `tracking` value would hold the last glyph off the right edge. Two optical compensations make the *ink* line up rather than just the boxes: the wordmark carries `mr-[0.025em]` (Anton's negative trailing tracking otherwise ends the box ~1.2px inside the "Y"), and the tagline carries `ml-[-0.052em]` plus `w-[calc(100%_+_0.104em)]` (JetBrains Mono sets glyphs ~0.5px inside their advance box, Anton's "T" sits flush). Measured by screenshotting the lockup at 2× and reading ink extents: both edges match to 0.00px.
- **Verifying visual alignment without eyes on an image:** render the element on a white full-viewport overlay with `zoom: 2`, screenshot it, then decode the PNG in Python (`zlib` + unfiltering — PIL is not installed) and compare ink extents per row band. Beware two traps: a *partially* white overlay lets page content bleed in as faint pixels that wreck the extents (cover the whole viewport), and if you index rows by byte offset instead of `offset // bpp` the numbers come out impossible.
- **Email signatures** live in `email-signature/`: `vova-bryhynets.html` (CEO) and `dima-birchenko.html` (CFO) are the filled-in ones, `threeeighty-signature.html` is the blank placeholder template for future hires, and a Ukrainian `README.md` covers copy-paste steps for Gmail (including the **Signature defaults** block — the step everyone misses, which is why a signature exists but never appears), Outlook and Apple Mail. They are table-based with inline styles only, and point at a **hosted** logo `public/email/threeeighty-logo.png` (424×138, shown at 212×69 = exactly 2× for retina) rather than embedding the image. That PNG was generated by rendering the lockup on a live page and screenshotting the element, so it matches `Logo.tsx` exactly — if the logo changes visually on the site, the PNG must be regenerated the same way (and the `width`/`height` attributes in every signature HTML updated to match). Don't delete the file or change the URL: every already-sent signature references it. The footer/contact email everywhere is `hello@threeeighty.eu` (the old `hello@rel1ve.eu` was replaced 2026-09-18); individual staff addresses follow `initials@threeeighty.eu` (`vb@`, `db@`).

## 5. Content model / admin panel

- `events` table (see `supabase/schema.sql` for the full schema + RLS policies) still has
  separate `title_uk`/`title_en` and `description_uk`/`description_en` columns (both
  `NOT NULL`) from when the site was bilingual, plus date, venue/city/country, category,
  cover image, gallery images array, ticket URL, attendee count, `featured` flag.
  Upcoming vs. past is computed from `event_date`, not stored.
- The admin form (`components/admin/EventForm.tsx`) now shows a **single** Title /
  Description field (the public site is English-only) and writes that same value into
  **both** the `_uk` and `_en` columns on save, purely to satisfy the `NOT NULL`
  constraint without a migration. The public site only ever reads `_en`. If you want to
  actually drop the `_uk` columns, that needs a Supabase SQL migration (safe to do — no
  real events exist yet, see below) plus updating `lib/types.ts` and every place that
  reads `event.title_en`/`event.description_en`.
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

## 9. Domain connection (done) + what's left

The domain task is **complete**: `threeeighty.eu` (bought on GoDaddy) is attached to
this Vercel project and serving the site. Exact DNS setup in GoDaddy:

```
A      @    216.198.79.1                        (Vercel — replaces GoDaddy parking)
A      @    64.29.17.1                          (Vercel)
CNAME  www  c301971d666a55ee.vercel-dns-017.com (Vercel — www 308-redirects to apex)
```

⚠️ **Do not touch the MX or TXT records.** The domain runs live Google Workspace email
(`aspmx.l.google.com` + `alt1-4.aspmx.l.google.com`), plus an SPF TXT and a
`google-site-verification` TXT. Only ever edit the A/CNAME records above.

Gotchas discovered while doing it, worth knowing next time:

- The Vercel CLI could **not** refresh its token because the DSH file sandbox blocks
  writes to `~/Library/Application Support/com.vercel.cli/`. Workaround that works:
  `npx vercel <cmd> -Q /Users/dima/plus380/.vercel-global` — a workspace-local global
  config dir (gitignored). Also set `npm_config_cache` to a workspace path, since
  `~/.npm` writes are blocked too.
- `npx vercel` also needs `-Q` for the login flow; `vercel login` device flow works fine
  non-interactively (prints the `vercel.com/oauth/device?user_code=...` URL).
- The Vercel CLI/API accepts an apex + `www`, and redirects must be set via the REST API
  (`PATCH /v9/projects/{id}/domains/{domain}` with
  `{"redirect":"<target>","redirectStatusCode":308}`) — the CLI has no redirect command.
  This works for **any** domain on the project, including the auto-generated
  `plus380.vercel.app`, which now redirects to `threeeighty.eu` the same way (path is
  preserved, e.g. `/events` → `https://threeeighty.eu/events`). Preview deployment URLs
  (`plus380-<hash>-*.vercel.app`) are unaffected.
- The app code contains **no** hardcoded domain: `middleware.ts` builds admin redirects
  from `request.url`, so the admin panel works on whatever host serves it.
- Vercel may hand out **newer A records** (`216.198.79.1` / `64.29.17.1`) instead of the
  widely-documented `76.76.21.21` — always use what `vercel domains verify` prints.
- After the GoDaddy change, propagation is uneven: Cloudflare/Quad9/OpenDNS picked it up
  in minutes, **Google DNS (8.8.8.8/8.8.4.4) stayed stale for ~an hour**, and the user's
  Fritz!Box router cached the old parking IPs, so the browser kept showing GoDaddy's
  "Launching Soon" page. Verify with
  `curl --resolve threeeighty.eu:443:216.198.79.1 https://threeeighty.eu` to prove the
  Vercel side is fine before blaming the deploy.

Beyond that, this has been an open-ended iterative design session — the user has been
asking for visual/content tweaks one at a time (color scheme, fonts, animations, copy,
theme toggle, etc.) and approving/adjusting each live on the deployed site. Expect more
of the same rather than a fixed spec. Always: make the change → clean build → visually
verify in the Browser pane (both light/dark themes if the change touches anything
visual) → commit → push → `vercel deploy --prod --yes` → re-check the live URL.

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

## 11. Public site went English-only (most recent change)

The site originally had a full UK/EN bilingual setup with a language switcher
(`app/[locale]/` dynamic segment, `lib/i18n/config.ts` with `locales`/`defaultLocale`,
`getDictionary(locale)`). The user asked to remove Ukrainian from the public site
entirely. What changed:

- `app/[locale]/*` was deleted and rebuilt as `app/(site)/*` (a route group — no URL
  segment), so pages are now at `/`, `/events`, `/events/[slug]` with no language
  prefix and no switcher.
- Every public component (`Header`, `Footer`, `Hero`, `FeaturedEvents`, `EventCard`,
  `EventsExplorer`, the event pages) had its `locale` prop removed; they now always
  render `lib/i18n/dictionaries/en.ts` content, passed down as `dict` exactly like
  before (so component internals barely changed — only how `dict` gets sourced at the
  top of the tree).
- `lib/i18n/config.ts` and the locale-aware `getDictionary()` were deleted;
  `lib/i18n/get-dictionary.ts` now just re-exports the `Dictionary` type.
- **The admin panel was deliberately left in Ukrainian** (`lib/i18n/dictionaries/uk.ts`
  is still fully used there) — the request was about the public site the visitors see,
  not the owner's own private tool. Don't "finish the job" by translating admin to
  English unless the user asks.
- The admin event form was simplified from two title/description inputs (UA + EN) to
  one, since there's only one language to fill in now — see §5 for how that maps to the
  still-bilingual database columns.
- Root metadata (`app/layout.tsx`) was pointed at the single English title/description
  directly instead of being generated per-locale.

## 12. Quick command reference

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
