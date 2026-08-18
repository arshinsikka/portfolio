# Codebase Audit — `arshinsikka/portfolio`

**Audited:** 2026-08-19
**Branch:** `frontend-revamp` (cut from `main` @ `a8d26f6`)
**Scope:** Full read of every tracked source file. No application code was modified.

> **Method note.** All line numbers below are as reported by `cat -n` / `wc -l`. `wc -l` counts newline
> characters, so a file without a trailing newline (`about-me.tsx`) reports one line fewer than its
> real content. `node_modules` is **not installed** in this checkout, so `tsc --noEmit`, a real build,
> and bundle-size measurement could **not** be run. Everything about type-safety and bundle weight
> below is derived from reading source, not from executing the toolchain — flagged as such where it
> matters.

---

## 1. Stack and Build

### 1.1 Framework, router, styling, package manager

| Concern | Finding | Evidence |
|---|---|---|
| Framework | **React 18.3.1** (`^18.3.1`), plain SPA. Not Next.js. | `package.json:56,59`; `client/src/main.tsx:5` uses `createRoot` |
| Build tool | **Vite 5.4.19** (`^5.4.19`) with `@vitejs/plugin-react` | `package.json:95`; `vite.config.ts:1-8` |
| Router | **wouter 3.3.5** — `<Switch>` / `<Route>`, two routes only | `client/src/App.tsx:1,10-17` |
| Styling | **Tailwind CSS v3.4.17**, class-based dark mode, PostCSS pipeline | `tailwind.config.ts:4`; `postcss.config.js:1-6` |
| Component library | **shadcn/ui** ("new-york" style, neutral base, CSS variables) over Radix primitives | `components.json:3-11` |
| Language | **TypeScript 5.6.3**, `strict: true` | `tsconfig.json`, `package.json:93` |
| Package manager | **npm** (`package-lock.json`, `lockfileVersion: 3`). No pnpm/yarn/bun lockfile present. | `package-lock.json` |
| Server (legacy) | **Express 4.21.2** + Vite middleware, used only for Replit/local dev | `server/index.ts`, `server/vite.ts` |
| Serverless API | One Vercel function: `api/chat.ts` | `api/chat.ts:172` |

This is a **three-headed project**: a Vite SPA (`client/`), an Express server (`server/`) that is a
leftover from Replit and is *not deployed on Vercel*, and a single Vercel serverless function
(`api/chat.ts`). The Express server and the serverless function implement the **same** `/api/chat`
endpoint twice.

### 1.2 Full dependency list

`dependencies` (63 packages):

| Package | What it is actually used for here | Status |
|---|---|---|
| `@hookform/resolvers` | Zod↔react-hook-form bridge | **NEVER IMPORTED** |
| `@jridgewell/trace-mapping` | Source-map tracing | **NEVER IMPORTED** |
| `@neondatabase/serverless` | Postgres pool for Neon | `server/db.ts:1` — but no DB feature exists in the app |
| `@radix-ui/react-accordion` | `ui/accordion.tsx` | shadcn shell only; **no app code renders it** |
| `@radix-ui/react-alert-dialog` | `ui/alert-dialog.tsx` | shell only, unrendered |
| `@radix-ui/react-aspect-ratio` | `ui/aspect-ratio.tsx` | shell only, unrendered |
| `@radix-ui/react-avatar` | `ui/avatar.tsx` | shell only, unrendered (hero uses a raw `<img>`) |
| `@radix-ui/react-checkbox` | `ui/checkbox.tsx` | shell only, unrendered |
| `@radix-ui/react-collapsible` | `ui/collapsible.tsx` | shell only, unrendered |
| `@radix-ui/react-context-menu` | `ui/context-menu.tsx` | shell only, unrendered |
| `@radix-ui/react-dialog` | `ui/dialog.tsx`, `ui/sheet.tsx`, `ui/command.tsx` | shells only, unrendered |
| `@radix-ui/react-dropdown-menu` | `ui/dropdown-menu.tsx` | shell only, unrendered |
| `@radix-ui/react-hover-card` | `ui/hover-card.tsx` | shell only, unrendered |
| `@radix-ui/react-label` | `ui/label.tsx`, `ui/form.tsx` | shells only, unrendered |
| `@radix-ui/react-menubar` | `ui/menubar.tsx` | shell only, unrendered |
| `@radix-ui/react-navigation-menu` | `ui/navigation-menu.tsx` | shell only, unrendered — the real navbar is hand-rolled |
| `@radix-ui/react-popover` | `ui/popover.tsx` | shell only, unrendered |
| `@radix-ui/react-progress` | `ui/progress.tsx` | shell only, unrendered |
| `@radix-ui/react-radio-group` | `ui/radio-group.tsx` | shell only, unrendered |
| `@radix-ui/react-scroll-area` | `ui/scroll-area.tsx` | shell only, unrendered |
| `@radix-ui/react-select` | `ui/select.tsx` | shell only, unrendered |
| `@radix-ui/react-separator` | `ui/separator.tsx` | shell only, unrendered |
| `@radix-ui/react-slider` | `ui/slider.tsx` | shell only, unrendered |
| `@radix-ui/react-slot` | `asChild` in `button`, `breadcrumb`, `sidebar`, `form` | reachable only via `Badge`/`Card` (no `asChild` use) |
| `@radix-ui/react-switch` | `ui/switch.tsx` | shell only, unrendered |
| `@radix-ui/react-tabs` | `ui/tabs.tsx` | shell only, unrendered |
| `@radix-ui/react-toast` | `ui/toast.tsx` → `ui/toaster.tsx` | **rendered** (`App.tsx:23`) but **no code ever calls `toast()`** — always empty |
| `@radix-ui/react-toggle` | `ui/toggle.tsx` | shell only, unrendered |
| `@radix-ui/react-toggle-group` | `ui/toggle-group.tsx` | shell only, unrendered |
| `@radix-ui/react-tooltip` | `ui/tooltip.tsx` → `TooltipProvider` in `App.tsx:22` | Provider mounted; **no `<Tooltip>` is ever rendered** |
| `@tanstack/react-query` | `QueryClientProvider` + a configured client | `App.tsx:21`, `lib/queryClient.ts` — **zero `useQuery`/`useMutation` calls in the codebase** |
| `class-variance-authority` | variant definitions in 10 `ui/*` files | reachable via `Badge`, `Card` |
| `clsx` | inside `cn()` | `lib/utils.ts:1` — genuinely used everywhere |
| `cmdk` | `ui/command.tsx` | shell only, unrendered |
| `connect-pg-simple` | PG session store | **NEVER IMPORTED** |
| `date-fns` | date formatting | **NEVER IMPORTED** (all dates are hand-typed strings) |
| `drizzle-orm` | `shared/schema.ts`, `server/db.ts`, `server/storage.ts` | used by a `users` table nothing reads or writes |
| `drizzle-zod` | `createInsertSchema` | `shared/schema.ts:2` — same dead feature |
| `embla-carousel-react` | `ui/carousel.tsx` | shell only, unrendered |
| `express` | dev/Replit server | `server/*` — not executed on Vercel |
| `express-session` | sessions | **NEVER IMPORTED** |
| `framer-motion` | animation | **NEVER IMPORTED** — all animation is hand-written CSS keyframes in `index.css:76-186` |
| `input-otp` | `ui/input-otp.tsx` | shell only, unrendered |
| `lucide-react` | icons — the one UI dep that earns its place | 31 files incl. `navbar.tsx:2`, `hero-section.tsx:1` |
| `memorystore` | in-memory session store | **NEVER IMPORTED** |
| `next-themes` | theme switching | **NEVER IMPORTED** — theme is hand-rolled in `navbar.tsx:22-36` |
| `passport` | auth | **NEVER IMPORTED** |
| `passport-local` | auth strategy | **NEVER IMPORTED** |
| `react` | the framework | 46 files |
| `react-day-picker` | `ui/calendar.tsx` | shell only, unrendered |
| `react-dom` | `createRoot` | `main.tsx:1` |
| `react-hook-form` | `ui/form.tsx` | shell only, unrendered — **there is no form on this site** |
| `react-icons` | `SiInstagram`, `SiTelegram`, `SiLinkedin` | `footer.tsx:2` — 3 icons; a second icon library alongside lucide |
| `react-resizable-panels` | `ui/resizable.tsx` | shell only, unrendered |
| `recharts` | `ui/chart.tsx` (365 lines) | shell only, unrendered — **there is no chart on this site** |
| `tailwind-merge` | inside `cn()` | `lib/utils.ts:2` |
| `tailwindcss-animate` | Tailwind plugin | `tailwind.config.ts:78` |
| `tw-animate-css` | Tailwind v4 animation lib | **NEVER IMPORTED** (and mismatched — this project is Tailwind v3) |
| `vaul` | `ui/drawer.tsx` | shell only, unrendered |
| `wouter` | routing | `App.tsx:1` |
| `ws` | WebSocket ctor for Neon | `server/db.ts:3` — dead feature |
| `zod` | schema types | `shared/schema.ts:3` — dead feature |
| `zod-validation-error` | prettier Zod errors | **NEVER IMPORTED** |
| `bufferutil` (optional) | native ws speedup | **NEVER IMPORTED** directly |

`devDependencies` (26 packages):

| Package | Used for | Status |
|---|---|---|
| `@replit/vite-plugin-cartographer` | Replit-only Vite plugin | `vite.config.ts:12` — dynamically imported only when `REPL_ID` is set |
| `@replit/vite-plugin-runtime-error-modal` | Replit error overlay | `vite.config.ts:4,10` — **loaded unconditionally, including on Vercel builds** |
| `@tailwindcss/typography` | Tailwind plugin | `tailwind.config.ts:78` — registered, but **no `prose` class appears anywhere in the codebase** |
| `@tailwindcss/vite` | Tailwind **v4** Vite plugin | **NEVER IMPORTED** — version-mismatched leftover |
| `@types/connect-pg-simple` | types | for a never-imported package |
| `@types/express` | types | used by `server/*` |
| `@types/express-session` | types | for a never-imported package |
| `@types/node` `20.16.11` | Node types | `tsconfig.json:16` |
| `@types/passport`, `@types/passport-local` | types | for never-imported packages |
| `@types/react`, `@types/react-dom` | types | used |
| `@types/ws` | types | used by `server/db.ts` |
| `@vitejs/plugin-react` | JSX transform | `vite.config.ts:2` |
| `autoprefixer` | PostCSS plugin | `postcss.config.js:4` |
| `drizzle-kit` | `db:push` | `drizzle.config.ts:1` |
| `esbuild` | bundles the Express server in `build` | `package.json:8` |
| `postcss` | CSS pipeline | `postcss.config.js` |
| `tailwindcss` | styling | `tailwind.config.ts` |
| `tsx` | runs `server/index.ts` in dev | `package.json:7` |
| `typescript` | `npm run check` | `package.json:10` |
| `vite` | build/dev | used |

**Installed but never imported anywhere (14 runtime deps):**
`@hookform/resolvers`, `@jridgewell/trace-mapping`, `connect-pg-simple`, `date-fns`, `express-session`,
`framer-motion`, `memorystore`, `next-themes`, `passport`, `passport-local`, `tw-animate-css`,
`zod-validation-error`, `bufferutil`, plus devDep `@tailwindcss/vite`.

**Imported but NOT declared in `package.json`:** `nanoid` — used at `server/vite.ts:7`
(`import { nanoid } from "nanoid"`). It resolves today only because Vite/PostCSS pull it in
transitively (`package-lock.json:6227`). This is a real phantom dependency; a lockfile refresh that
hoists differently would break `npm run dev`.

**Additionally dead-in-practice (imported, but unreachable from any rendered UI):** the 43
`client/src/components/ui/*.tsx` files that no app component imports — see §3.4.

### 1.3 Build and dev scripts

`package.json:6-11`:

```
dev    NODE_ENV=development tsx server/index.ts
build  vite build && esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist
start  NODE_ENV=production node dist/index.js
check  tsc
db:push  drizzle-kit push
```

Problems:

- **`npm run dev` cannot start without a Postgres URL.** `server/index.ts:3` → `server/routes.ts:3`
  → `server/storage.ts:2` → `server/db.ts:8-12`, which **throws** `"DATABASE_URL must be set"` at
  module load. A static portfolio with no database feature refuses to boot locally without a database.
- **`npm run build` does work Vercel throws away.** The `esbuild ... --outdir=dist` half produces
  `dist/index.js`, but `vercel.json:3` sets `outputDirectory: "dist/public"`, so the server bundle is
  never deployed. Every Vercel build pays for it anyway.
- `npm run check` runs bare `tsc`; `tsconfig.json` has `noEmit: true` so this is a type-check. It has
  **no `--watch`, and no lint/format/test script exists at all** — there is no ESLint, no Prettier
  config, and no test runner in the repo.

### 1.4 Vercel configuration

`vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist/public",
  "installCommand": "npm install",
  "framework": "vite",
  "devCommand": "npm run dev",
  "rewrites": [{ "source": "/api/:path*", "destination": "/api/:path*" }]
}
```

- Output dir `dist/public` matches `vite.config.ts:28` (`build.outDir`).
- Vite `root` is `client/` (`vite.config.ts:26`), so the **public directory is `client/public/`** —
  repo-root `public/` is **not** copied into the build (see §8 for the concrete breakage this causes).
- `api/chat.ts` is picked up by Vercel's zero-config Node function detection (a default-exported
  `(req, res)` handler). There is no `functions` block, so runtime/memory/duration are all defaults.
- The `rewrites` entry is an **identity rewrite** — `/api/:path*` → `/api/:path*` rewrites a path to
  itself and does nothing.
- `devCommand: "npm run dev"` inherits the `DATABASE_URL` crash above.
- `vite.config.ts:10` loads `@replit/vite-plugin-runtime-error-modal` **unconditionally** — including
  in production Vercel builds. The cartographer plugin is correctly gated on `REPL_ID`
  (`vite.config.ts:11-19`); this one is not.

### 1.5 Node version and lockfile

- **No `engines` field** in `package.json`, **no `.nvmrc`, no `.node-version`.** Vercel will use its
  account-default Node, whatever that is at build time.
- `.replit:1` declares `nodejs-20`; `@types/node` is pinned to `20.16.11`. Node 20 is the only stated
  intent, and it is stated only in a Replit file Vercel never reads.
- `package-lock.json` is `lockfileVersion: 3` (npm 7+), 320 KB, consistent with the `npm install`
  command. Its `name` is `rest-express` — the project was never renamed from the Replit template.
- Lockfile issue: **`nanoid` is a direct import but only a transitive dependency** (§1.2).
- `vite.config.ts` uses **top-level `await`** (`vite.config.ts:15`) inside the plugin array. This
  requires an ESM-capable config load; it works with Vite 5 but makes the config non-portable to any
  CJS consumer.

---

## 2. File Tree

Excluding `node_modules`, `.git`, `dist`. `.local/state/replit/` contains 21 committed Replit agent
state blobs — these are build/agent output that should never have been tracked; they are listed once
and not itemized.

```
.
├── .claude/settings.local.json          (10)   Claude Code permission allowlist; contains a stale
│                                               absolute path to "~/Desktop/IMP STUFF/PortfolioHero"
├── .gitignore                            (8)   ignores .env, node_modules, dist, server/public
├── .local/state/replit/…                       21 committed Replit agent state files (.bin/.json/
│                                               design_reference HTML). Pure build artifact noise.
├── .replit                              (46)   Replit run/deploy config; nodejs-20, port 5000
├── api/
│   └── chat.ts                         (250)   Vercel serverless fn: POST /api/chat → Groq
│                                               (llama-3.3-70b-versatile). Lines 4-167 are a verbatim
│                                               inlined copy of shared/system-prompt.ts.
├── attached_assets/                             8 files: 2 duplicate resume PDFs, 2 iCloud stubs,
│                                               4 Replit prompt transcripts (.txt). Aliased as
│                                               "@assets" in vite.config.ts:23 but never imported.
├── client/
│   ├── index.html                       (62)   SPA shell. All SEO meta, OG/Twitter cards, JSON-LD
│                                               Person schema, inline SVG data-URI favicon.
│   ├── public/assets/
│   │   ├── Arshin_Sikka_Resume.pdf              116 KB, served at /assets/…
│   │   └── arshin-profile.png                   1.65 MB, 1024×1536 — see §8
│   └── src/
│       ├── App.tsx                      (31)   Provider stack (QueryClient → Tooltip → Toaster),
│       │                                       wouter Router, mounts ChatWidget globally
│       ├── main.tsx                      (5)   createRoot bootstrap
│       ├── index.css                   (193)   Tailwind directives, :root/.dark CSS var palette,
│       │                                       8 @keyframes + helper classes, scroll-progress bar
│       ├── components/
│       │   ├── navbar.tsx              (178)   fixed nav, scroll-spy, dark toggle, scroll progress,
│       │   │                                   mobile dropdown. THE nav-items source of truth.
│       │   ├── hero-section.tsx         (92)   #home: avatar, name, tagline, 3 CTAs, scroll cue
│       │   ├── about-me.tsx            (104)   #about: bio, education card, 6 highlight cards
│       │   ├── looking-for.tsx          (27)   "Open to opportunities" banner. NO section id.
│       │   ├── work-experience.tsx     (198)   #experience: ExperienceCard + 5 hardcoded jobs
│       │   ├── projects.tsx            (281)   #projects: FeaturedProject + AIProjectCard +
│       │   │                                   OtherProjectCard + 5 hardcoded projects
│       │   ├── research-experience.tsx (103)   #research: ResearchCard + 2 hardcoded items
│       │   ├── leadership.tsx          (132)   #leadership: LeadershipCard + 5 hardcoded items
│       │   ├── contact.tsx              (79)   #contact: phone card + email card (hardcoded)
│       │   ├── footer.tsx               (68)   4 social links + copyright
│       │   ├── chat-widget.tsx         (299)   Floating AI chat: FAB, panel, messages, chips,
│       │   │                                   nudge bubble, cooldown, fetch to /api/chat
│       │   └── ui/                              48 shadcn/ui files, 5,047 lines total. Only 5 are
│       │                                        reachable from the app (badge, card, toast,
│       │                                        toaster, tooltip). Itemized in §3.4.
│       ├── hooks/
│       │   ├── use-mobile.tsx           (19)   768px matchMedia hook — used ONLY by ui/sidebar.tsx
│       │   │                                   (itself unused) → dead
│       │   └── use-toast.ts            (191)   shadcn toast reducer/store — no caller
│       ├── lib/
│       │   ├── queryClient.ts           (57)   QueryClient + apiRequest + getQueryFn — the helpers
│       │   │                                   are exported but never called
│       │   └── utils.ts                  (6)   cn() = twMerge(clsx(...)) — genuinely used
│       └── pages/
│           ├── home.tsx                 (27)   Composes the 9 sections in DOM order
│           └── not-found.tsx            (21)   404 card. Copy still says "Did you forget to add the
│                                               page to the router?" (template text)
├── components.json                      (22)   shadcn CLI config (new-york, neutral, cssVariables)
├── drizzle.config.ts                    (14)   drizzle-kit config; throws without DATABASE_URL
├── package-lock.json                (320 KB)   npm lockfileVersion 3, name "rest-express"
├── package.json                        (~99)   see §1
├── postcss.config.js                     (6)   tailwindcss + autoprefixer
├── public/assets/
│   └── .Lecture_AI_Pitch_Deck.pdf.icloud        iCloud placeholder — NOT a real PDF. See §8.
├── replit.md                            (~95)  Architecture doc describing a full-stack app with
│                                               PostgreSQL/sessions/forms that does not exist
├── server/
│   ├── index.ts                         (75)   Express bootstrap, API logger middleware, port 5000
│   ├── routes.ts                        (58)   POST /api/chat → Groq. Duplicate of api/chat.ts.
│   ├── db.ts                            (14)   Neon pool + Drizzle. Throws without DATABASE_URL.
│   ├── storage.ts                       (61)   MemStorage + DatabaseStorage over a users table.
│   │                                           No caller anywhere.
│   └── vite.ts                          (85)   Vite middleware / static serving. Imports nanoid.
├── shared/
│   ├── schema.ts                        (17)   Drizzle users table + Zod insert schema. Unused.
│   └── system-prompt.ts                (164)   SYSTEM_PROMPT const. Imported only by server/routes.ts.
├── tailwind.config.ts                   (85)   darkMode:"class", colors mapped to CSS vars,
│                                               accordion keyframes, 2 plugins
├── tsconfig.json                        (23)   strict, bundler resolution, @/* and @shared/* aliases
├── updated_assets/                              13AF…PNG (1.65 MB, identical byte size to
│                                               arshin-profile.png) + "Resume March'26.pdf"
│                                               (identical byte size to the served resume).
│                                               Nothing imports this directory.
├── vercel.json                          (10)   see §1.4
└── vite.config.ts                       (37)   react + replit plugins, @ / @shared / @assets aliases,
                                                root=client, outDir=dist/public
```

**Totals:** 7,714 lines across all TS/TSX/CSS/HTML. Of that, **5,047 lines (65%) live in
`client/src/components/ui/`**, and 4,600+ of those lines are never rendered.

---

## 3. Component Inventory

### 3.1 Application components (`client/src/components/*.tsx`) — 11 files, 1,561 lines

| Component | File | Lines | Renders | Props | Imported from |
|---|---|---|---|---|---|
| `Navbar` (default) | `navbar.tsx` | 178 | Scroll-progress bar + fixed `<nav>`: logo button, 7 desktop nav buttons, dark toggle, mobile hamburger + dropdown | **none** | `pages/home.tsx:1` |
| `HeroSection` (default) | `hero-section.tsx` | 92 | `<section id="home">`: avatar + availability dot, gradient `<h1>`, tagline, intro, 3 CTAs, chevron cue | **none** | `pages/home.tsx:2` |
| `AboutMe` (default) | `about-me.tsx` | 104 | `<section id="about">`: h2, 2 bio paragraphs, Education card, 6-item Quick Highlights grid | **none** | `pages/home.tsx:3` |
| `LookingFor` (default) | `looking-for.tsx` | 27 | A **`<div>`** (not a section, no `id`): briefcase icon, "Open to opportunities" copy, resume button | **none** | `pages/home.tsx:4` |
| `ExperienceCard` | `work-experience.tsx:27` | 79 | Timeline dot + line + card: title, Current pill, company/location, dates, description, optional links, tag badges | `{ experience: ExperienceItem; index: number; isLast: boolean }` — **`index` is destructured at line 27 and never used** | local only |
| `WorkExperience` (default) | `work-experience.tsx:107` | 92 | `<section id="experience">`: h2 + subtitle + 5 `ExperienceCard`s | **none** | `pages/home.tsx:5` |
| `FeaturedProject` | `projects.tsx:6` | 89 | Fully hardcoded Lecture AI showcase: gradient border, 3 status pills, h3, 3 paragraphs, 3 buttons, 6 tags | **none — 100% literal JSX** | local only |
| `AIProjectCard` | `projects.tsx:106` | 35 | Medium card: title, "Developer · dates", description, tags, GitHub button | `{ project: AIProject }` | local only |
| `OtherProjectCard` | `projects.tsx:152` | 26 | Small card: title, "role · dates", description, tags | `{ project: OtherProject }` | local only |
| `Projects` (default) | `projects.tsx:181` | 101 | `<section id="projects">`: h2 + subtitle + `FeaturedProject` + 2 AI cards + 3 other cards + hardcoded "Earlier work" line | **none** | `pages/home.tsx:6` |
| `ResearchCard` | `research-experience.tsx:13` | 45 | Card: title, org · dates, description, optional paper link, tags | `{ research: ResearchItem }` | local only |
| `ResearchExperience` (default) | `research-experience.tsx:59` | 45 | `<section id="research">`: h2 + subtitle + 2-col grid of 2 cards | **none** | `pages/home.tsx:7` |
| `LeadershipCard` | `leadership.tsx:14` | 46 | Card: title + Current pill, org/location/dates, description, tags | `{ leadership: LeadershipItem }` | local only |
| `Leadership` (default) | `leadership.tsx:61` | 72 | `<section id="leadership">`: h2 + subtitle + 3-col grid of 5 cards | **none** | `pages/home.tsx:8` |
| `Contact` (default) | `contact.tsx` | 79 | `<section id="contact">`: h2 + subtitle + Phone card + Email card (2 addresses) | **none** | `pages/home.tsx:9` |
| `Footer` (default) | `footer.tsx` | 68 | `<footer>`: 4 social icon links + copyright | **none** | `pages/home.tsx:10` |
| `TypingIndicator` | `chat-widget.tsx:20` | 14 | Avatar bubble + 3 bouncing dots | **none** | local only |
| `ChatWidget` (default) | `chat-widget.tsx:37` | 263 | Mobile backdrop, chat panel (header/messages/chips/input), floating FAB, nudge bubble, hover tooltip | **none** | `App.tsx:8` — mounted **outside** the Router, so it renders on the 404 page too |
| `Home` (default) | `pages/home.tsx` | 27 | `<div className="min-h-screen">` wrapping all 9 sections | **none** | `App.tsx:6` |
| `NotFound` (default) | `pages/not-found.tsx` | 21 | Centered `Card` with `AlertCircle` + "404 Page Not Found" | **none** | `App.tsx:7` |
| `Router` | `App.tsx:10` | 8 | wouter `<Switch>` with `/` and catch-all | **none** | local only |
| `App` (default) | `App.tsx:19` | 11 | Provider tree + Router + ChatWidget | **none** | `main.tsx:2` |

**Not one application component accepts a single prop from its parent.** Every default export is a
zero-argument function that closes over its own hardcoded data. The only props in the entire app
layer are the four internal card components.

### 3.2 Refactor candidates (>200 lines)

Two application files cross 200 lines. (`ui/sidebar.tsx` at 771 and `ui/chart.tsx` at 365 also cross
it, but they are vendored shadcn output that nothing renders — delete rather than refactor.)

**`client/src/components/projects.tsx` — 281 lines.** Mixes **five** distinct responsibilities:

1. **Section layout** (lines 228-241, 269-278) — `<section>`, container width, heading block, the
   trailing "Earlier work" prose.
2. **A one-off hardcoded page region** (lines 6-94, `FeaturedProject`) — Lecture AI's award pills,
   marketing copy, statistics, three CTA buttons and six tags are typed directly into JSX with no
   data structure. It is not a component in any reusable sense; it is a slab of content wearing a
   function signature.
3. **Two independent card *design systems*** (lines 106-140 and 152-177) — `AIProjectCard` and
   `OtherProjectCard` are near-identical in structure but diverge in radius (`rounded-xl` vs
   `rounded-lg`), shadow (`shadow-md` vs `shadow-sm`), padding (`p-7` vs `p-6`), lift distance
   (`-translate-y-1` vs `-translate-y-0.5`), body text size (`text-sm` vs `text-xs`) and badge color.
4. **Two content datasets** (lines 182-199 `aiProjects`, 201-226 `otherProjects`) — declared *inside*
   the `Projects()` function body, so both arrays are reallocated on every render.
5. **Type definitions** (lines 98-104, 144-150) — `AIProject` and `OtherProject` are two shapes for
   what is conceptually one entity, differing only by `githubUrl` vs `role`.

**`client/src/components/chat-widget.tsx` — 299 lines.** Mixes **six** responsibilities:

1. **Network/transport** (lines 94-113) — hand-rolled `fetch`, status-code branching, response shape
   fallback. Bypasses the `apiRequest` helper in `lib/queryClient.ts:10` entirely.
2. **Conversation state machine** (lines 38-46, 84-137) — messages, loading, cooldown, plus a raw
   `setTimeout` ref for a 2-second client-side rate limit.
3. **Marketing/growth logic** (lines 61-82) — the "Try me! 👋" nudge, its `sessionStorage` flag, a
   2s show timer, a 5s auto-hide timer, and a `document`-level one-shot click listener.
4. **Error copy** (lines 118-129) — user-facing strings, including a hardcoded email address that
   also appears in `contact.tsx:52` and in both copies of the system prompt.
5. **Presentation shell** (lines 150-262) — backdrop, panel chrome, gradient header, scroll region.
6. **Message rendering** (lines 186-220) — three separate hand-built bubble layouts (welcome, model,
   user) plus a fourth in `TypingIndicator` (lines 20-33), all repeating the same
   `w-7 h-7 rounded-full bg-blue-600 …` avatar block **three times** (lines 23, 187, 202).

`work-experience.tsx` (198) and `navbar.tsx` (178) sit just under the threshold but have the same
shape of problem: `work-experience.tsx` holds 60 lines of résumé content (108-168) inside a render
function, and `navbar.tsx` fuses four unrelated concerns — theme persistence (22-36), scroll
progress + scroll-spy in one listener (39-59), outside-click dismissal (62-71), and resize handling
(74-78).

### 3.3 Duplicated and near-duplicated markup

**(a) Section-header block — 6 near-identical instances.** Same wrapper, same `h2` classes, same
subtitle `p` classes; only the strings differ. `about-me.tsx:36-40` (no subtitle),
`work-experience.tsx:175-182`, `projects.tsx:233-240`, `research-experience.tsx:84-92`,
`leadership.tsx:114-121`, `contact.tsx:9-16`. All six carry the literal comment `{/* Section Title */}`.

**(b) Page container — 8 instances of the identical class string.**
`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8` at `about-me.tsx:33`, `work-experience.tsx:172`,
`contact.tsx:6`; `max-w-6xl mx-auto px-4 sm:px-6 lg:px-8` at `navbar.tsx:96`, `projects.tsx:230`,
`research-experience.tsx:81`, `leadership.tsx:111`, `footer.tsx:38`. Two arbitrary width tiers with
no stated rule for which section gets which.

**(c) Card shell — 5 near-duplicates** with drifting values:
- `work-experience.tsx:40` — `bg-white dark:bg-slate-900 p-6 rounded-lg shadow-md hover:shadow-lg … border-slate-100 dark:border-slate-700`
- `projects.tsx:108` — `bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-xl … hover:-translate-y-1 … p-7`
- `projects.tsx:154` — `bg-white dark:bg-slate-800 rounded-lg shadow-sm hover:shadow-md … hover:-translate-y-0.5 … p-6`
- `research-experience.tsx:15` — `bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-xl … hover:-translate-y-1 … p-8`
- `leadership.tsx:16` — `bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-xl … hover:-translate-y-1 … p-7`

Note the dark background is `slate-900` in one and `slate-800` in the other four. Padding is
`p-6`/`p-7`/`p-8` with no scale.

**(d) Tag `<Badge>` — 5 instances, 2 divergent variants.**
Slate variant (identical string ×3): `projects.tsx:123`, `research-experience.tsx:49`,
`leadership.tsx:51`. Blue variant (identical string ×2): `work-experience.tsx:95`, `projects.tsx:84`.
A 6th at `projects.tsx:169` is a third variant (`text-slate-600 dark:text-slate-400`, no hover).

**(e) "Current" pill — 2 byte-identical instances** apart from two trailing utilities:
`work-experience.tsx:48-50` and `leadership.tsx:23-25`.

**(f) GitHub button — 2 identical instances:** `projects.tsx:54` and `projects.tsx:133`
(`w-fit` is the only difference).

**(g) Outlined link button — 3 instances of the same recipe:**
`work-experience.tsx:77`, `research-experience.tsx:36`, and the two hero secondaries
`hero-section.tsx:67,78`.

**(h) "org · location · dates" metadata row — 2 near-duplicates:**
`research-experience.tsx:20-24` and `leadership.tsx:30-40`.

**(i) Resume-open handler — 2 byte-identical functions:**
`hero-section.tsx:8-10` and `looking-for.tsx:4-6` (`window.open("/assets/Arshin_Sikka_Resume.pdf", "_blank")`).

**(j) Chat avatar bubble — 3 identical instances:**
`chat-widget.tsx:23-25`, `187-189`, `202-204`.

**(k) Dark-mode toggle button — 2 near-identical instances** (desktop `p-2` vs mobile `p-2.5`):
`navbar.tsx:123-129` and `navbar.tsx:134-140`.

**(l) The entire Groq call — duplicated across runtimes.** `server/routes.ts:6-53` and
`api/chat.ts:169-249` share the same `GROQ_URL`, `GROQ_MODEL`, temperature, max_tokens, and error
handling. And `SYSTEM_PROMPT` is **byte-for-byte identical** (9,043 characters, verified) between
`shared/system-prompt.ts:1-164` and the inlined literal at `api/chat.ts:4-167`.

### 3.4 The `ui/` directory — 48 files, 5,047 lines

Reachable from the rendered app (5 files, 275 lines):

| File | Lines | Reached via |
|---|---|---|
| `badge.tsx` | 36 | `work-experience.tsx:1`, `projects.tsx:1`, `research-experience.tsx:1`, `leadership.tsx:1` |
| `card.tsx` | 79 | `pages/not-found.tsx:1` only (404 page) |
| `tooltip.tsx` | 30 | `App.tsx:5` — only `TooltipProvider`; no `<Tooltip>` is ever rendered |
| `toaster.tsx` | 33 | `App.tsx:4` — mounted, but nothing calls `toast()`, so it always renders empty |
| `toast.tsx` | 127 | via `toaster.tsx` and `hooks/use-toast.ts:6` |

**Unreachable (43 files, 4,772 lines).** No application file imports any of these, and none is
transitively reachable from `Home` or `NotFound`:
`accordion` (56), `alert-dialog` (139), `alert` (59), `aspect-ratio` (5), `avatar` (50),
`breadcrumb` (115), `button` (56), `calendar` (68), `carousel` (260), `chart` (365), `checkbox` (28),
`collapsible` (11), `command` (151), `context-menu` (198), `dialog` (122), `drawer` (118),
`dropdown-menu` (198), `form` (178), `hover-card` (29), `input-otp` (69), `input` (22), `label` (24),
`menubar` (256), `navigation-menu` (128), `pagination` (117), `popover` (29), `progress` (28),
`radio-group` (42), `resizable` (45), `scroll-area` (46), `select` (160), `separator` (29),
`sheet` (140), `sidebar` (771), `skeleton` (15), `slider` (26), `switch` (27), `table` (117),
`tabs` (53), `textarea` (22), `toggle-group` (61), `toggle` (43).

Notably **`ui/button.tsx` is unused** — every button on the site is a raw `<button>` with an inline
class string. The design system's own button primitive lost to copy-paste.

---

## 4. Page Structure and Navigation

### 4.1 Single page, confirmed

**This is a single scrolling page.** `pages/home.tsx:13-26` renders all nine components in sequence
inside one `<div className="min-h-screen">`. There is no second content route.

Sections in DOM order:

| # | Component | Element | Anchor `id` | Heading text | Level | Line |
|---|---|---|---|---|---|---|
| 1 | `Navbar` | `<nav>` (fixed) | — | (logo button "Arshin Sikka") | — | `navbar.tsx:95` |
| 2 | `HeroSection` | `<section>` | `home` | "Arshin Sikka" | `h1` | `hero-section.tsx:14,36` |
| 3 | `AboutMe` | `<section>` | `about` | "About Me" | `h2` | `about-me.tsx:32,37` |
| — | ↳ | `<div>` | — | "Education" | `h3` | `about-me.tsx:56` |
| — | ↳ | `<div>` | — | "Quick Highlights" | `h3` | `about-me.tsx:80` |
| 4 | `LookingFor` | **`<div>`** | **NONE** | *(no heading — bold span only)* | — | `looking-for.tsx:9` |
| 5 | `WorkExperience` | `<section>` | `experience` | "Work Experience" | `h2` | `work-experience.tsx:171,176` |
| 6 | `Projects` | `<section>` | `projects` | "Projects" | `h2` | `projects.tsx:229,234` |
| — | ↳ | `<div>` | — | "Lecture AI" (featured) | `h3` | `projects.tsx:26` |
| — | ↳ | `<div>` | — | "AI Tools & Frameworks" | `h3` | `projects.tsx:247` |
| — | ↳ | `<div>` | — | "Other Projects" | `h3` | `projects.tsx:259` |
| 7 | `ResearchExperience` | `<section>` | `research` | "Research Experience" | `h2` | `research-experience.tsx:80,85` |
| 8 | `Leadership` | `<section>` | `leadership` | "Leadership & Involvement" | `h2` | `leadership.tsx:110,115` |
| 9 | `Contact` | `<section>` | `contact` | "Let's Connect" | `h2` | `contact.tsx:5,10` |
| — | ↳ | `<div>` | — | "Phone" / "Email" | `h3` ×2 | `contact.tsx:23,42` |
| 10 | `Footer` | `<footer>` | — | *(no heading)* | — | `footer.tsx:37` |
| — | `ChatWidget` | fixed overlay | — | *(no heading)* | — | mounted at `App.tsx:25` |

### 4.2 How navigation works

**Custom scroll-spy, hand-rolled, no library.** All of it lives in `client/src/components/navbar.tsx`:

- **Link source of truth:** `NAV_ITEMS`, a 7-entry array at `navbar.tsx:4-12`, declared at module
  scope. Each entry has `{ id, label, href }`, where `href` is just `"#" + id` — the `href` field is
  redundant with `id` and is immediately stripped back down at `navbar.tsx:81`.
- **Navigation mechanism:** `scrollTo()` at `navbar.tsx:80-84` does
  `document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })`. Smooth behavior is also set
  globally in `index.css:56-58`.
- **These are `<button>` elements, not links** (`navbar.tsx:110-121` desktop, `161-172` mobile). There
  is no `href`, so: the URL never updates, no `#about` deep-link is producible, middle-click and
  cmd-click do nothing, and the links are invisible to crawlers and to "copy link address".
- **Active-section detection:** a single scroll listener at `navbar.tsx:39-59`. It iterates
  `NAV_ITEMS` **backwards** and picks the last section whose `el.offsetTop <= window.scrollY + 120`.
  It uses `offsetTop` (offset from `offsetParent`, not the document) — correct here only because
  every section's `offsetParent` happens to be `<body>`. **No `IntersectionObserver` is used
  anywhere in the codebase.**
- **Scroll progress bar:** same listener (`navbar.tsx:41-44`) computes a percentage and writes it to
  inline `style.width` on `#scroll-progress` (`navbar.tsx:89-93`), styled in `index.css:120-129`.
  This means a `setState` on **every scroll frame**, re-rendering the whole `Navbar` (and its 7
  buttons) continuously while the user scrolls.
- **Mobile menu:** `isOpen` state, outside-click dismissal via a `mousedown` listener
  (`navbar.tsx:62-71`), and a resize listener that force-closes above 768px (`navbar.tsx:74-78`).
  The dropdown is hidden with `max-h-0 opacity-0` (`navbar.tsx:155-157`) — it stays in the DOM and
  in the tab order when closed (see §7.3).
- **Non-nav scroll trigger:** `hero-section.tsx:4-6` duplicates the scroll logic for the "Contact Me"
  button.

**No `scroll-margin-top` / `scroll-mt-*` anywhere.** The navbar is `h-16` (64px) and fixed; anchored
sections rely on their own `py-20` (80px) padding to keep headings clear of it. That works today by
coincidence, not by design — any section whose top padding shrinks will scroll under the navbar.

### 4.3 Unreachable routing

- **`NotFound` (`pages/not-found.tsx`) is unreachable from the UI.** `App.tsx:14` registers it as
  wouter's catch-all, but no link, button, or handler in the app navigates to any path other than
  `/`. It is only reachable by typing a URL. Its body text is still the unedited template string
  *"Did you forget to add the page to the router?"* (`not-found.tsx:15`) — developer-facing copy
  shipped to visitors.
- **The whole wouter router is arguably unreachable-by-design**: there is exactly one content route.
- **`server/routes.ts` `/api/chat` is unreachable in production.** The Express app is never started
  on Vercel (`vercel.json` deploys only `dist/public` + `api/`), so that entire handler and its
  `shared/system-prompt.ts` import are dead in the deployed artifact.
- **`server/storage.ts` (both `MemStorage` and `DatabaseStorage`) has zero callers**, in any runtime.
- **`lib/queryClient.ts` `apiRequest` and `getQueryFn`** are exported and never called;
  `ChatWidget` hand-rolls its own `fetch` instead (`chat-widget.tsx:95`).

**Open question flagged here, resolved in §11:** whether `vercel.json`'s explicit `rewrites` array
suppresses the Vite framework preset's SPA fallback. If it does, any non-`/` URL would 404 at the
CDN and `NotFound` would never render at all. I could not determine this from the repo.

---

## 5. Content and Data Layer

### 5.1 Where content lives

**There is no data layer.** No `data/`, no `constants/`, no JSON, no Markdown, no MDX, no CMS, no
CSV, no env-driven content. 100% of the site's content is either a TypeScript array literal declared
*inside a React component function body*, or a string typed directly into JSX.

### 5.2 Every location holding content strings

| # | Location | Form | What it holds |
|---|---|---|---|
| 1 | `client/index.html:8-11` | HTML meta | `<title>`, description, author, keywords |
| 2 | `client/index.html:20-33` | HTML meta | OG + Twitter card title/description/image/url |
| 3 | `client/index.html:36-56` | JSON-LD | Person schema: name, job title, email, university, `knowsAbout`, social URLs |
| 4 | `navbar.tsx:4-12` | module-scope array | 7 nav labels + anchor ids |
| 5 | `navbar.tsx:104` | JSX literal | Logo text "Arshin Sikka" |
| 6 | `hero-section.tsx:25,38,42,49` | JSX literals | Image alt, name, tagline, 3-sentence intro |
| 7 | `hero-section.tsx:9,61,70,75,81` | JSX literals | Resume path, 3 CTA labels, GitHub URL |
| 8 | `about-me.tsx:4-29` | **in-component array** | 6 `highlights` (icon + text) |
| 9 | `about-me.tsx:37,45-50,56,63-71,80` | JSX literals | h2, 2 bio paragraphs, Education heading, degree, dates, TA blurb, Highlights heading |
| 10 | `looking-for.tsx:5,14-15,21` | JSX literals | Resume path, availability paragraph incl. "Summer 2026" / "May 2027", button label |
| 11 | `work-experience.tsx:108-168` | **in-component array** | 5 jobs: title, company, location, dates, description, tags, `isCurrent`, links |
| 12 | `work-experience.tsx:49,176,179-181` | JSX literals | "Current" pill text, h2, section subtitle |
| 13 | `projects.tsx:17,20,23,27,30,38-45,57,66,74,80` | **JSX literals** | The entire Lecture AI featured block: 3 badge labels, title, role/dates, 3 descriptive paragraphs with embedded stats, 3 button labels, 6 tags |
| 14 | `projects.tsx:182-199` | **in-component array** | 2 `aiProjects` |
| 15 | `projects.tsx:201-226` | **in-component array** | 3 `otherProjects` |
| 16 | `projects.tsx:234,237-239,248,260` | JSX literals | h2, subtitle, 2 sub-headings |
| 17 | `projects.tsx:270-277` | JSX literal | "Earlier work" line naming ChessPhere and Donation-Nation with years |
| 18 | `research-experience.tsx:60-77` | **in-component array** | 2 research items |
| 19 | `research-experience.tsx:85,88-91` | JSX literals | h2 + subtitle |
| 20 | `leadership.tsx:62-107` | **in-component array** | 5 leadership items |
| 21 | `leadership.tsx:24,115-116,118-120` | JSX literals | "Current" pill, h2, subtitle |
| 22 | `contact.tsx:10,14,24,29,34,43,50,55,63,68` | JSX literals | h2, subtitle, "Phone"/"Email" labels, **phone number**, **both email addresses** |
| 23 | `footer.tsx:5-34` | **in-component array** | 4 social links: name, URL, icon, hover color, tooltip |
| 24 | `footer.tsx:63` | JSX literal | Copyright "© 2026 Arshin Sikka" |
| 25 | `chat-widget.tsx:11-16` | module-scope array | 4 starter-chip prompts |
| 26 | `chat-widget.tsx:167,171,191-192,247` | JSX literals | Chat title, subtitle, welcome message, input placeholders |
| 27 | `chat-widget.tsx:126-127` | JS literals | 2 error messages, one containing the NUS email |
| 28 | `shared/system-prompt.ts:1-164` | template literal | **The entire résumé again**: education, 4 current roles, 3 past roles, 6 projects, 2 research items, chess record, skills, contact details |
| 29 | `api/chat.ts:4-167` | template literal | **A byte-identical second copy of #28** (9,043 chars, verified identical) |
| 30 | `pages/not-found.tsx:11,15` | JSX literals | 404 heading + template body text |
| 31 | `replit.md` | Markdown | Stale architecture prose (describes forms, sessions, and DB features that do not exist) |

### 5.3 How hard is it to add content, concretely

**Adding a new work experience:**

*Minimum to make it appear on the page:* **1 file, 1 edit.** Append an `ExperienceItem` object to the
`experiences` array at `work-experience.tsx:108-168`. The `ExperienceItem` interface
(`work-experience.tsx:10-19`) gives you the shape, so this is genuinely easy — the easiest content
task in the repo.

*To keep the site internally consistent:* **3 files, 3 edits.** The AI chat widget answers from a
copy of the résumé, so you must also add the role to `shared/system-prompt.ts` (~line 25-70 region)
**and** to the inlined duplicate at `api/chat.ts` (~line 25-70). Miss either and the chatbot will
state your work history is something other than what the page shows. Miss only `api/chat.ts` and
nothing changes at all in production, because that is the copy Vercel actually runs.

*If the role is also "current":* the "Open to opportunities" paragraph at `looking-for.tsx:15` and
the hero intro at `hero-section.tsx:49` both name the current employer in prose — **5 files**.

**Adding a new project** — the answer depends entirely on which of four unrelated mechanisms it
belongs to:

| Tier | Files to edit | Effort |
|---|---|---|
| An "AI Tools & Frameworks" project | `projects.tsx:182-199` + both prompt copies | 3 files, append to a typed array |
| An "Other Project" | `projects.tsx:201-226` + both prompt copies | 3 files, append to a **different** typed array with a **different** interface (`role` instead of `githubUrl`) |
| The featured project | `projects.tsx:6-94` + both prompt copies | 3 files, but the featured slot is **89 lines of hand-written JSX with no data model at all** — swapping it means rewriting the block, and there is no way to have two featured projects |
| "Earlier work" mention | `projects.tsx:270-277` | 1 file, editing a prose sentence with inline `<span>`s |

**The deeper problem: the same entity is duplicated across unrelated files.** There is no single
record for any real-world thing.

- **Lecture AI** appears in `work-experience.tsx:120-140` (as a job), `projects.tsx:6-94` (as the
  featured project), `hero-section.tsx:49` (in prose), `about-me.tsx:18-19` and `about-me.tsx:46`
  (in prose), `client/index.html:9,24,32` (in three meta tags), and twice in the system prompts —
  **8 places, with independently-worded dates and descriptions.**
- **Pediatric Tendon Stapler** appears in `projects.tsx:210-217` **and** `leadership.tsx:99-106`,
  with two different descriptions and two different role labels ("Product Designer" both times, but
  different date phrasing), plus both prompts.
- **Donation Nation** appears in `leadership.tsx:90-98` (as leadership) and `projects.tsx:275-276`
  (as "Donation-Nation", hyphenated differently) plus both prompts — the name is not even spelled
  consistently.
- **The NUS email** appears in `contact.tsx:52,55`, `chat-widget.tsx:127`, `client/index.html:44`,
  and both prompts — **6 places.**

A single résumé update therefore touches somewhere between 3 and 8 files, and there is no mechanism —
no type, no test, no lint rule — that will tell you when one copy drifts from another.

---

## 6. Styling System

### 6.1 Where colors are defined

Colors live in **three disconnected places**, and the one that governs almost the entire visible site
is the *least* structured of the three.

1. **`client/src/index.css:5-49`** — 20 CSS custom properties under `:root` and 20 under `.dark`,
   in `hsl()` notation. This is the shadcn token layer.
2. **`tailwind.config.ts:14-70`** — maps those variables onto Tailwind color names
   (`bg-background`, `text-foreground`, `bg-card`, …), plus **14 variables that are never defined**.
3. **Inline Tailwind palette classes in every component** — `slate-*`, `blue-*`, `purple-*`,
   `green-*`, `amber-*`, `pink-*`, `sky-*`, `indigo-*`, `gray-*`, `red-*`. **This is what the site
   actually renders.** The token layer in (1) and (2) is used for `body` background/text
   (`index.css:61`) and inside the unused `ui/` components, and essentially nowhere else.

### 6.2 Complete color inventory

**Defined CSS variables — light, `index.css:5-26`:**

| Variable | Value | Line |
|---|---|---|
| `--background` | `hsl(0, 0%, 100%)` | 6 |
| `--foreground` | `hsl(20, 14.3%, 4.1%)` | 7 |
| `--muted` | `hsl(60, 4.8%, 95.9%)` | 8 |
| `--muted-foreground` | `hsl(25, 5.3%, 44.7%)` | 9 |
| `--popover` | `hsl(0, 0%, 100%)` | 10 |
| `--popover-foreground` | `hsl(20, 14.3%, 4.1%)` | 11 |
| `--card` | `hsl(0, 0%, 100%)` | 12 |
| `--card-foreground` | `hsl(20, 14.3%, 4.1%)` | 13 |
| `--border` | `hsl(20, 5.9%, 90%)` | 14 |
| `--input` | `hsl(20, 5.9%, 90%)` | 15 |
| `--primary` | `hsl(207, 90%, 54%)` | 16 |
| `--primary-foreground` | `hsl(211, 100%, 99%)` | 17 |
| `--secondary` | `hsl(60, 4.8%, 95.9%)` | 18 |
| `--secondary-foreground` | `hsl(24, 9.8%, 10%)` | 19 |
| `--accent` | `hsl(60, 4.8%, 95.9%)` | 20 |
| `--accent-foreground` | `hsl(24, 9.8%, 10%)` | 21 |
| `--destructive` | `hsl(0, 84.2%, 60.2%)` | 22 |
| `--destructive-foreground` | `hsl(60, 9.1%, 97.8%)` | 23 |
| `--ring` | `hsl(20, 14.3%, 4.1%)` | 24 |
| `--radius` | `0.5rem` | 25 |

**Defined CSS variables — dark, `index.css:28-49`:** same 20 keys, values
`hsl(240, 10%, 3.9%)` (background/popover/card), `hsl(0, 0%, 98%)` (foreground/secondary-fg/accent-fg/
destructive-fg/popover-fg/card-fg), `hsl(240, 3.7%, 15.9%)` (muted/border/input/secondary/accent),
`hsl(240, 5%, 64.9%)` (muted-foreground), `hsl(207, 90%, 54%)` (primary — unchanged),
`hsl(211, 100%, 99%)` (primary-fg), `hsl(0, 62.8%, 30.6%)` (destructive),
`hsl(240, 4.9%, 83.9%)` (ring).

Note the two palettes have **different hue families**: light is warm (hue 20-60), dark is cool
(hue 240). They are not the same design in two modes; they are two unrelated shadcn presets.

**Referenced by `tailwind.config.ts` but NEVER defined anywhere — 13 broken tokens:**
`--chart-1` … `--chart-5` (`tailwind.config.ts:56-62`), `--sidebar-background`, `--sidebar-foreground`,
`--sidebar-primary`, `--sidebar-primary-foreground`, `--sidebar-accent`, `--sidebar-accent-foreground`,
`--sidebar-border`, `--sidebar-ring` (`tailwind.config.ts:63-72`). Utilities like `bg-chart-1` or
`bg-sidebar` compile to `var(--chart-1)` with no fallback and would render as an invalid/inherited
color. `ui/sidebar.tsx:529` additionally emits `hsl(var(--sidebar-border))` — an `hsl()` wrapping an
undefined variable, which is invalid CSS. (Harmless only because nothing renders it.)

**Raw color literals in CSS/HTML:**

| Value | Where | Purpose |
|---|---|---|
| `#0f172a` | `client/index.html:15` | `theme-color` meta (hardcoded, does not follow the dark toggle) |
| `#2563eb` | `client/index.html:18` | favicon SVG background |
| `#2563eb` → `#9333ea` | `index.css:125` | scroll-progress gradient |
| `rgba(37, 99, 235, 0.45)` | `index.css:108` | avatar glow, light |
| `rgba(15, 23, 42, 0.9)` | `index.css:114` | avatar glow ring, dark |
| `rgba(96, 165, 250, 0.5)` | `index.css:115` | avatar glow, dark |
| `rgba(0, 0, 0, 0.12)` | `index.css:139` | `.card-hover` shadow (class is **never used**) |
| `rgba(0, 0, 0, 0.5)` | `index.css:142` | `.card-hover` shadow dark (**never used**) |
| `rgba(99, 102, 241, 0.7 / 0)` | `index.css:150,156` | chat FAB pulse ring |
| `rgba(139, 92, 246, 0.4 / 0)` | `index.css:151,157` | chat FAB pulse ring 2 |
| `rgba(0, 0, 0, 0.4)` | `index.css:152,158` | chat FAB drop shadow |
| `white` (keyword) | `index.css:107` | avatar glow inner ring — hardcoded, not theme-aware |
| `#ccc`, `#fff` | `ui/chart.tsx:55` | vendored shadcn default (unused) |

**Tailwind palette classes used in application components** — 130 distinct class strings. Grouped by
family, with usage counts:

*Slate (the de-facto brand neutral, 63 distinct classes):*
`text-slate-800`(22) `text-slate-700`(19) `text-slate-600`(20) `text-slate-500`(14) `text-slate-400`(8)
`text-slate-300`(1) `text-slate-200`(2) `bg-white`(13) `bg-slate-50`(5) `bg-slate-100`(5)
`bg-slate-200`(1) `bg-slate-400`(3) `bg-slate-800`(4) `bg-slate-900`(5) `bg-white/95`(1)
`bg-transparent`(1) `border-slate-100`(8) `border-slate-200`(5) `border-slate-300`(2)
`border-slate-600`(1) `border-slate-700`(3) `border-white`(2) `border-transparent`(2)
`border-t-slate-900`(2) `ring-white`(1) `placeholder-slate-400`(1) `from-slate-50`(1)
`to-slate-100`(1) `bg-black/50`(1) `text-white`(16) `text-white/70`(2) `text-white/90`(1)
`text-transparent`(1)
— dark variants: `dark:text-slate-300`(32) `dark:text-slate-400`(19) `dark:text-white`(20)
`dark:text-slate-200`(4) `dark:text-slate-500`(4) `dark:text-slate-900`(1) `dark:bg-slate-900`(10)
`dark:bg-slate-800`(9) `dark:bg-slate-700`(7) `dark:bg-slate-900/95`(1) `dark:bg-white`(1)
`dark:border-slate-700`(11) `dark:border-slate-600`(4) `dark:border-slate-800`(1)
`dark:border-slate-200`(1) `dark:ring-slate-800`(1) `dark:from-slate-900`(1) `dark:via-slate-800`(1)
`dark:to-slate-900`(1) `dark:border-t-white`(1)
— hover variants: `hover:bg-slate-100`(6) `hover:bg-slate-50`(3) `hover:bg-slate-200`(3)
`hover:bg-slate-700`(3) `hover:text-slate-900`(4) `hover:text-white`(2) `hover:border-slate-400`(2)
`hover:bg-white/10`(1) `dark:hover:bg-slate-800`(7) `dark:hover:bg-slate-600`(5)
`dark:hover:bg-slate-700`(2) `dark:hover:text-white`(3) `dark:hover:text-slate-300`(1)
`dark:hover:border-slate-500`(2)

*Blue (primary accent):* `bg-blue-600`(8) `text-blue-600`(7) `text-blue-700`(2) `text-blue-400`(1)
`bg-blue-50`(3) `bg-blue-50/60`(1) `border-blue-600`(1) `border-blue-100`(1) `from-blue-600`(4)
`from-blue-500`(1) `via-blue-50`(1) `hover:bg-blue-700`(3) `hover:text-blue-600`(4)
`hover:text-blue-700`(1) `hover:text-blue-300`(1) `hover:bg-blue-100`(2) `hover:from-blue-400`(1)
`dark:text-blue-400`(7) `dark:text-blue-300`(2) `dark:bg-blue-950`(2) `dark:bg-blue-950/30`(1)
`dark:bg-blue-900/20`(1) `dark:bg-blue-500`(1) `dark:border-blue-900`(1) `dark:border-blue-400`(1)
`dark:from-blue-400`(1) `dark:hover:text-blue-400`(5) `dark:hover:bg-blue-900`(2)
`dark:hover:bg-blue-600`(1)

*Purple (secondary accent):* `to-purple-600`(4) `to-purple-700`(1) `bg-purple-600`(1)
`bg-purple-100`(1) `text-purple-700`(1) `border-purple-200`(1) `hover:bg-purple-700`(1)
`hover:to-purple-500`(1) `dark:to-purple-400`(1) `dark:text-purple-400`(1)
`dark:bg-purple-900/40`(1) `dark:bg-purple-500`(1) `dark:border-purple-800`(1)
`dark:hover:bg-purple-600`(1)

*Indigo:* `via-indigo-600`(2) `hover:via-indigo-500`(1) — used only in the chat gradient.

*Green (status):* `bg-green-500`(2) `bg-green-100`(2) `text-green-700`(2) `border-green-200`(2)
`dark:bg-green-900/40`(2) `dark:text-green-400`(2) `dark:border-green-800`(2)

*Amber (status):* `bg-amber-100`(1) `text-amber-700`(1) `border-amber-200`(1)
`dark:bg-amber-900/40`(1) `dark:text-amber-400`(1) `dark:border-amber-800`(1)

*Pink / Sky (social hovers only):* `hover:text-pink-600` `dark:hover:text-pink-400`
`hover:text-sky-500` `dark:hover:text-sky-400` — `footer.tsx:24,31`

*Gray / Red (404 page only, a different neutral ramp):* `bg-gray-50` `text-gray-900` `text-gray-600`
`text-red-500` — `not-found.tsx:6,10,11,14`. **This is the only place `gray-*` is used instead of
`slate-*`** — the 404 page is on a different neutral scale from the entire rest of the site.

### 6.3 Is there a design token system?

**No — there is a token system that the product does not use.** The shadcn CSS-variable layer exists
and is wired into `tailwind.config.ts:14-73`, but scanning the 11 application components turns up
**zero** uses of `bg-primary`, `text-foreground`, `bg-card`, `border-border`, `bg-muted`, or any other
semantic token. The site is styled entirely with raw palette values.

Concrete consequences:

- **The `--primary` token is `hsl(207, 90%, 54%)` ≈ `#1e94eb`. The button the user actually sees is
  `bg-blue-600` = `#2563eb`.** The declared brand color and the rendered brand color are different
  colors. Changing `--primary` changes nothing visible.
- Dark mode is implemented by hand-writing a `dark:` twin for **every** color utility. There are 87
  distinct `dark:` classes across 11 files. Every new element requires remembering to author its dark
  variant, and several places forgot: `work-experience.tsx:31` sets `border-white` on the timeline dot
  with no `dark:` counterpart; `hero-section.tsx:30`'s availability dot is `border-white` with a
  `dark:border-slate-800`, so the two adjacent white rings behave differently.
- No `theme.extend.spacing`, no `theme.extend.fontFamily`, no `theme.extend.fontSize`, no
  `theme.extend.boxShadow`. The only `extend` entries are `borderRadius` (derived from `--radius`),
  `colors`, and the two accordion keyframes (`tailwind.config.ts:9-77`).

### 6.4 Typography

- **No web font is loaded.** There is no `<link rel="preconnect">` to Google Fonts, no `@font-face`,
  no `@import`, and no `theme.extend.fontFamily`. Verified: the only `font-family` string in the repo
  is inside the favicon's SVG data URI (`client/index.html:18`).
- `index.css:61` applies `@apply font-sans`, which resolves to **Tailwind v3's default stack**:
  `ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, …`. The site
  therefore renders in SF Pro on macOS/iOS, Segoe UI on Windows, and Roboto on Android — **three
  visually different typographic identities depending on the visitor's OS.**
- **Type scale:** ad hoc, not systematic. 15 distinct size utilities are used across 11 files:
  `text-sm`(33) `text-xs`(22) `text-lg`(9) `text-base`(6) `text-3xl`(6) `md:text-4xl`(6)
  `text-xl`(4) `text-2xl`(4) `md:text-lg`(2) `md:text-base`(2) `text-4xl`(1) `md:text-xl`(1)
  `md:text-5xl`(1) `md:text-3xl`(1) `lg:text-6xl`(1). Only three responsive pairings are consistent
  (`text-3xl md:text-4xl` for every h2, `text-lg` for every section subtitle,
  `text-4xl md:text-5xl lg:text-6xl` for the single h1).
- **Weights:** three, applied by eye — `font-semibold`(19), `font-medium`(17), `font-bold`(14). Some
  h3s are `font-bold` (`projects.tsx:109`, `leadership.tsx:19`, `research-experience.tsx:16`), others
  are `font-semibold` (`about-me.tsx:56,80`, `work-experience.tsx:44`, `projects.tsx:247,259`) at
  comparable levels.
- **One genuinely good decision:** `index.css:68-71` sets `p, li { font-size: clamp(0.9375rem, 2.5vw, 1rem); line-height: 1.7 }`
  and `index.css:62` sets `body { line-height: 1.65 }`. This is the only fluid-typography rule in the
  project. It also **silently overrides** any `text-sm`/`text-xs` applied to a `<p>` at certain
  viewport widths, since it is an element selector inside `@layer base` — a subtle conflict with the
  33 `text-sm` and 22 `text-xs` utilities, many of which are on `<p>` elements
  (e.g. `projects.tsx:115,161`, `leadership.tsx:42`).
- **A live class conflict:** `contact.tsx:23` and `contact.tsx:42` both carry
  `className="text-base font-semibold … text-xs"` — two mutually exclusive size utilities on the same
  element. Tailwind's generated stylesheet orders `text-xs` before `text-base`, so `text-base` wins
  and the `text-xs` is inert. This is exactly the class of bug `tailwind-merge` exists to prevent, and
  `cn()` is available in `lib/utils.ts` — but these are raw `className` strings, so it never runs.

### 6.5 Spacing

Spacing sticks to Tailwind's default 4px scale — the values in use are
`0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 10, 12, 14, 16, 20`. That is *consistent* in the sense
that nothing is arbitrary, but it is not a *scale* in the design sense: there is no rule for which
value means what.

- **Section rhythm is consistent:** every section is `py-20`, every section header is `mb-16`.
- **Card padding is not:** `p-6` (`work-experience.tsx:40`, `projects.tsx:154`, `contact.tsx:22,41`,
  `about-me.tsx:59,89`), `p-7` (`projects.tsx:108`, `leadership.tsx:16`), `p-8`
  (`research-experience.tsx:15`), `p-8 md:p-10` (`projects.tsx:10`). Four different card paddings for
  five card types.
- **Grid gaps are not:** `gap-5` (`projects.tsx:262`), `gap-6` (`about-me.tsx:83`, `projects.tsx:250`),
  `gap-7` (`leadership.tsx:124`), `gap-8` (`research-experience.tsx:95`, `contact.tsx:19`). Four gap
  values across five grids.
- **11 arbitrary bracket values**, all in `navbar.tsx` and `chat-widget.tsx`: `max-h-[480px]`
  (`navbar.tsx:156`), `min-h-[44px]` (`navbar.tsx:164`), `md:bottom-[88px]` `md:w-[400px]`
  `md:h-[520px]` (`chat-widget.tsx:160`), `max-w-[85%]` (`chat-widget.tsx:190`), `max-w-[80%]`
  (`chat-widget.tsx:207`), `border-[6px]` (`chat-widget.tsx:273`), `border-[3px]`
  (`hero-section.tsx:30`), plus `[animation-delay:0ms|150ms|300ms]` (`chat-widget.tsx:27-29`).

### 6.6 Dark mode

**Implementation:** hand-rolled, entirely inside `client/src/components/navbar.tsx`.
`next-themes` is installed (`package.json:53`) and never imported.

- **Strategy:** `darkMode: "class"` (`tailwind.config.ts:4`) — a `.dark` class on
  `document.documentElement`.
- **State:** a `useState<boolean>` at `navbar.tsx:17`, local to the `Navbar` component. **There is no
  context, no provider, and no store.** No other component can read the theme. Anything that needs to
  know the current theme in JS (rather than via a `dark:` class) cannot.
- **Initialization:** `navbar.tsx:22-29`, a `useEffect` that reads `localStorage.getItem("theme")`,
  falls back to `prefers-color-scheme: dark`, and adds the class.
- **Toggle:** `navbar.tsx:31-36` flips state, calls `classList.toggle("dark", next)`, and writes
  `localStorage.setItem("theme", …)`.
- **Persistence:** yes — `localStorage` key `"theme"`, values `"dark"` / `"light"`.

Defects in this implementation:

1. **Flash of wrong theme (FOUC) on every load.** The class is applied in a React `useEffect`, which
   runs after hydration. A returning dark-mode visitor gets a white page for the duration of
   HTML parse + JS download + parse + React mount. There is no blocking inline script in
   `client/index.html` to set the class before first paint — and `index.html:15` hardcodes
   `theme-color: #0f172a`, so the browser chrome is already dark while the page is still white.
2. **The initial `prefers-color-scheme` read is a one-shot.** `navbar.tsx:24` calls `.matches` once
   and never subscribes to the media query, so a visitor who switches their OS theme mid-session sees
   no change.
3. **No `Escape`/system sync, and the toggle is duplicated** — the desktop and mobile toggle buttons
   (`navbar.tsx:123-129`, `134-140`) are two separate near-identical elements.
4. **Two elements ignore dark mode entirely:** `not-found.tsx` uses `bg-gray-50`, `text-gray-900`,
   `text-gray-600` with **no `dark:` variants at all** — the 404 page is permanently light.
   `work-experience.tsx:31`'s timeline dot is `border-white` with no dark counterpart.
5. **The chat widget is permanently dark**, in both themes: `chat-widget.tsx:160` hardcodes
   `bg-slate-900`, `:190` `bg-slate-800 text-slate-200`, `:230` `border-slate-600 text-slate-300`.
   Only the nudge bubble at `:269` is theme-aware (`bg-slate-900 dark:bg-white`) — meaning in light
   mode the widget is a dark panel with a dark bubble, and in dark mode it is a dark panel with a
   *white* bubble. The one theme-aware element in the widget is the one that is inconsistent with it.

---

## 7. Responsiveness and Accessibility

### 7.1 Breakpoints in use

Tailwind defaults, unmodified (`sm:640px`, `md:768px`, `lg:1024px`, `xl:1280px`, `2xl:1536px`).
Across the 13 application/page files, only **three** are ever used: `md:` (39 uses), `sm:` (20),
`lg:` (14). **`xl:` and `2xl:` are never used anywhere** — layouts stop adapting above 1024px and
simply center inside `max-w-4xl` (896px) or `max-w-6xl` (1152px).

Per file:

| File | Breakpoints used |
|---|---|
| `navbar.tsx` | `sm: md: lg:` |
| `hero-section.tsx` | `sm: md: lg:` |
| `about-me.tsx` | `sm: md: lg:` |
| `looking-for.tsx` | `sm: lg:` — **no `md:`** |
| `work-experience.tsx` | `sm: md: lg:` |
| `projects.tsx` | `sm: md: lg:` |
| `research-experience.tsx` | `sm: md: lg:` |
| `leadership.tsx` | `sm: md: lg:` |
| `contact.tsx` | `sm: md: lg:` |
| `footer.tsx` | `sm: lg:` — only on container padding; **the social row and copyright have no responsive handling at all** |
| `chat-widget.tsx` | `md:` only |
| `pages/home.tsx` | **NONE** |
| `pages/not-found.tsx` | **NONE** — `mx-4` + `max-w-md`, fixed at every width |

**Components with no meaningful mobile handling:**

- **`pages/not-found.tsx`** — zero responsive classes. Acceptable for a small centered card, but it
  is also the only page with no dark mode.
- **`footer.tsx`** — the social row is `flex justify-center items-center space-x-6` at every width
  (`footer.tsx:41`). With only 4 icons this survives, but nothing about it is responsive.
- **`contact.tsx:19`** — `grid-cols-1 md:grid-cols-2`. The Phone and Email cards each hold very little
  content, so at ≥768px they are two mostly-empty boxes.
- **`work-experience.tsx:39`** — the timeline uses a hardcoded `ml-8` indent with an absolutely
  positioned dot at `left-0` and a rail at `left-1.5`, with **no responsive adjustment**. At 320px the
  card loses 32px of an already-narrow column.
- **`chat-widget.tsx:160`** — the only truly responsive-by-design component: full-screen `inset-0`
  below `md`, floating `400×520` panel above. It also correctly adds a backdrop on mobile only
  (`chat-widget.tsx:153`).
- **`projects.tsx:9-10`** — the featured card nests `rounded-2xl p-1` inside `rounded-2xl p-8 md:p-10`.
  The 1px gradient-border trick means the inner card's radius must stay in sync manually.

### 7.2 Semantic HTML

**Good:**
- Exactly one `<h1>` (`hero-section.tsx:36`), and it contains the person's name.
- Seven true `<section>` elements with unique ids; a real `<nav>` (`navbar.tsx:95`); a real
  `<footer>` (`footer.tsx:37`).
- Heading order is legal throughout: h1 → h2 (×6) → h3 (×10). No level is skipped.
- External links consistently carry `target="_blank" rel="noopener noreferrer"`
  (`hero-section.tsx:76-77`, `projects.tsx:52-53,61-62,131-132`, `work-experience.tsx:74-75`,
  `research-experience.tsx:34-35`, `footer.tsx:47-48`).
- Phone and email use proper `tel:` / `mailto:` hrefs (`contact.tsx:31,52,65`).

**Problems:**

1. **No `<main>` landmark anywhere.** `pages/home.tsx:14` is a bare `<div className="min-h-screen">`.
   Screen-reader users get no "skip to main content" target and no main region.
2. **No skip link.** With a 7-item fixed nav plus a dark toggle, every keyboard user tabs through 8+
   controls before reaching content, on every section jump.
3. **No `<section>` is labelled.** None of the seven has `aria-labelledby` or `aria-label`, so they
   are unlabeled regions in a screen reader's landmark list.
4. **`LookingFor` is a `<div>` where a `<section>` belongs** (`looking-for.tsx:9`). It is a distinct
   content region with its own border, background, and call to action, and it has no `id`, so it can
   never be linked to or announced as a region.
5. **The primary navigation is built from `<button>`, not `<a>`** (`navbar.tsx:110-121, 161-172`).
   These are real navigation targets with real anchor ids. As buttons they produce no href, no URL
   fragment, no deep-linkability, no open-in-new-tab, and no crawlable link graph. The site logo
   (`navbar.tsx:100-105`) is a `<button>` for the same reason.
6. **The two hero CTAs that navigate are `<button>`s** (`hero-section.tsx:56,65`). "View Resume"
   opens a PDF URL via `window.open` (`hero-section.tsx:9`) — that is a link. Same at
   `looking-for.tsx:17`.
7. **Every card is a `<div>`.** With a mouse the whole card looks interactive (hover lift + shadow at
   `projects.tsx:108`, `leadership.tsx:16`, `research-experience.tsx:15`) but only the small inner
   `<a>` is actually focusable or clickable. The affordance and the behaviour disagree.
8. **The tag lists are `<div>`s of `<Badge>`s**, not `<ul>`/`<li>` (`work-experience.tsx:90-100`,
   `projects.tsx:118-128`, etc.), so their count is not announced.

### 7.3 Alt text, ARIA, focus, keyboard

**Images:** exactly one `<img>` in the codebase (`hero-section.tsx:23-27`), and it has
`alt="Arshin Sikka"` — correct. All other graphics are lucide/react-icons SVGs.

**ARIA present (9 attributes total, all in 3 files):** `aria-label` on the dark toggle ×2
(`navbar.tsx:126,137`), the hamburger (`:144`), `aria-expanded` on the hamburger (`:145`),
`aria-hidden` on the progress bar (`:92`), `aria-label` on the 4 footer social links
(`footer.tsx:51`), and `aria-label` on the chat close/send/toggle (`chat-widget.tsx:177,255,288`).

**ARIA / keyboard problems:**

1. **Focus indicators are removed with no replacement.** `chat-widget.tsx:248` sets `outline-none` on
   the chat text input and adds no `focus:ring` / `focus-visible:` style. That input becomes
   invisible to keyboard focus. **WCAG 2.4.7 (AA) failure.**
2. **Not one focus style exists in the entire application layer.** Grepping the 13 app files for
   `focus:`, `focus-visible:`, or `focus-within:` returns exactly one hit — the `outline-none` above.
   Every button, link, and nav item relies solely on the browser's default focus ring, which is
   further weakened because several controls are dark-on-dark. The `ui/` primitives *do* define
   proper `focus-visible:ring-2` styles — but the app doesn't use those primitives.
3. **Keyboard trap risk in the mobile menu.** `navbar.tsx:154-158` hides the dropdown with
   `max-h-0 opacity-0 overflow-hidden`. `opacity: 0` and zero height do **not** remove elements from
   the tab order. A keyboard user on mobile tabs through 7 invisible, unreachable-by-sight nav buttons
   after the hamburger. `visibility: hidden`, `display: none`, or `inert` is what's needed here.
4. **The chat panel is not a dialog.** `chat-widget.tsx:159-262` has no `role="dialog"`, no
   `aria-modal`, no `aria-labelledby`, no focus trap, and **no `Escape` handler** — the only key
   handled is `Enter` (`chat-widget.tsx:139-144`). On mobile it covers the entire viewport
   (`inset-0`), so a keyboard user who opens it can tab straight out into the page behind the
   backdrop, and cannot dismiss it without finding the ✕. Focus *is* moved into the input on open
   (`chat-widget.tsx:54-59`), but focus is **never restored** to the FAB on close.
5. **The mobile backdrop is a clickable `<div>`** (`chat-widget.tsx:151-156`) — `onClick` with no
   `role`, no `tabIndex`, no keyboard handler.
6. **`title` used as the only label on a non-interactive `<div>`.** `hero-section.tsx:30` puts
   `title="Available for opportunities"` on the green availability dot. `title` on a `<div>` is not
   reliably announced and never appears on touch. The same pattern is on the footer links
   (`footer.tsx:52`) — harmless there, because `aria-label` is also present.
7. **The active nav item is not programmatically active.** `navbar.tsx:113-117` communicates the
   current section purely with color and a bottom border. There is no `aria-current="location"`.
8. **Live-region gap in the chat.** New assistant messages are appended
   (`chat-widget.tsx:196-216`) with no `aria-live` region, so a screen-reader user gets no
   announcement that a reply arrived. The typing indicator (`:20-33`) is likewise silent.
9. **`animate-bounce` and `animate-pulse-glow` run indefinitely** (`hero-section.tsx:86`,
   `chat-widget.tsx:287`) and **there is no `prefers-reduced-motion` guard anywhere** in
   `index.css`. Neither is `scroll-behavior: smooth` (`index.css:57`) guarded, which is a known
   vestibular trigger.
10. **`maximum-scale=5` on the viewport** (`client/index.html:5`). Not a hard failure (WCAG requires
    zoom to at least 200%, and 5× exceeds that), but capping user zoom at all is a smell.

### 7.4 Color contrast (WCAG 2.1)

Computed from Tailwind v3 palette hex values. AA normal text requires ≥4.5:1; AA large
(≥18.66px bold / ≥24px) requires ≥3:1.

**Light mode:**

| Pair | Ratio | AA | AAA | Where |
|---|---|---|---|---|
| `slate-800` on `white` | **14.63:1** | PASS | PASS | every h2, card titles |
| `slate-700` on `white` | **10.35:1** | PASS | PASS | body copy — `about-me.tsx:44` |
| `slate-700` on `slate-50` | **9.90:1** | PASS | PASS | highlight cards — `about-me.tsx:94` |
| `slate-700` on `slate-100` | **9.45:1** | PASS | PASS | tag badges — `projects.tsx:123` |
| `slate-600` on `white` | **7.58:1** | PASS | PASS | nav links, section subtitles — `navbar.tsx:116` |
| `gray-600` on `gray-50` | **7.23:1** | PASS | PASS | 404 body — `not-found.tsx:14` |
| `blue-700` on `blue-50` | **6.16:1** | PASS | fail | tag badge — `work-experience.tsx:95` |
| `purple-700` on `purple-100` | **5.92:1** | PASS | fail | "VIP@SoC Finalist" — `projects.tsx:22` |
| `blue-600` on `white` | **5.17:1** | PASS | fail | active nav link — `navbar.tsx:115` |
| `white` on `blue-600` | **5.17:1** | PASS | fail | primary CTA — `hero-section.tsx:58` |
| `slate-500` on `white` | **4.76:1** | PASS (barely) | fail | dates/roles — `projects.tsx:158` |
| `green-700` on `green-100` | **4.57:1** | PASS (barely) | fail | "Current" pill — `work-experience.tsx:48` |
| `slate-500` on `slate-50` | **4.55:1** | PASS (barely) | fail | meta text on tinted sections |
| `amber-700` on `amber-100` | **4.51:1** | PASS (by 0.01) | fail | "BLOCK71-backed" — `projects.tsx:19` |
| **`slate-400` on `white`** | **2.56:1** | **FAIL** | fail | **"Earlier work:" line — `projects.tsx:270`** |
| **`slate-400` on `slate-50`** | **2.45:1** | **FAIL** | fail | muted text on tinted sections |

**Dark mode:**

| Pair | Ratio | AA | AAA | Where |
|---|---|---|---|---|
| `white` on `slate-900` | **17.85:1** | PASS | PASS | headings |
| `slate-300` on `slate-900` | **12.02:1** | PASS | PASS | body copy; chat chips (`chat-widget.tsx:230`) |
| `slate-200` on `slate-800` | **11.87:1** | PASS | PASS | chat bubbles — `chat-widget.tsx:190` |
| `slate-300` on `slate-800` | **9.85:1** | PASS | PASS | body copy on tinted sections |
| `blue-300` on `blue-950` | **8.15:1** | PASS | PASS | tag badge — `work-experience.tsx:95` |
| `blue-400` on `slate-900` | **7.02:1** | PASS | PASS | active nav — `navbar.tsx:115` |
| `slate-400` on `slate-900` | **6.96:1** | PASS | fail | dates/meta |
| `slate-400` on `slate-800` | **5.71:1** | PASS | fail | meta; chat placeholder (`chat-widget.tsx:248`) |
| `green-400` on `green-900` | **5.23:1** | PASS | fail | "Current" pill (approx — real bg is `/40` alpha) |
| **`slate-500` on `slate-900`** | **3.75:1** | **FAIL** (AA-Large only) | fail | **"Earlier work" line — `projects.tsx:270`** |

**Two confirmed AA failures**, both on the same element — the "Earlier work: ChessPhere …
Donation-Nation …" line at `projects.tsx:270-277`, at `text-sm` (well below large-text size) in both
themes. Four more pairs pass by less than 0.3, so any darkening of a background tint will push them
under.

*Uncertain / not computed:* `text-white/70` and `text-white/90` on the chat header's three-stop
gradient (`chat-widget.tsx:162,166,170`) — the effective background varies continuously across the
element, and the alpha compositing depends on where the text sits. The gradient runs
`blue-600 → indigo-600 → purple-600`, all fairly dark, so white text is very likely fine; 70% white
over `purple-600` (`#9333ea`) is the worst case and is the one to verify by measurement.
Similarly, all `dark:bg-*-900/40` badge backgrounds (`work-experience.tsx:48`, `projects.tsx:19,22`,
`leadership.tsx:23`) composite over whatever section background is behind them; I approximated with
the opaque `-900` value.

---

## 8. Assets

| File | Dimensions | Size | Optimized? | Used? |
|---|---|---|---|---|
| `client/public/assets/arshin-profile.png` | 1024 × 1536 | **1,650,461 B (1.65 MB)** | **No** | Yes — `hero-section.tsx:24` |
| `client/public/assets/Arshin_Sikka_Resume.pdf` | 611 × 790 pt | 118,979 B (116 KB) | n/a | Yes — `hero-section.tsx:9`, `looking-for.tsx:5` |
| `public/assets/.Lecture_AI_Pitch_Deck.pdf.icloud` | — | **177 B** | — | **Referenced but broken** — see below |
| `updated_assets/13AF5E29-4053-4563-90D6-730BCFFD3620.PNG` | 1024 × 1536 | 1,650,461 B | No | **Unused** |
| `updated_assets/Resume March'26.pdf` | 611 × 790 pt | 118,979 B | n/a | **Unused** |
| `attached_assets/ARSHIN SIKKA_RESUME_JUNE'25_1753116613453.pdf` | 611 × 790 pt | 67,296 B | n/a | **Unused** |
| `attached_assets/ARSHIN SIKKA_RESUME_JUNE'25_1753120527090.pdf` | 611 × 790 pt | 67,296 B | n/a | **Unused (byte-identical duplicate of the above)** |
| `attached_assets/.Arshin Sikka Linkedin Picture_…jpg.icloud` | — | 199 B | — | **Unused iCloud stub** |
| `attached_assets/.Lecture AI - Pitch Deck_…pdf.icloud` | — | 193 B | — | **Unused iCloud stub** |
| `attached_assets/Pasted-*.txt` ×4 | — | 2.2–2.6 KB | — | **Unused** — Replit prompt transcripts |

### The profile image

`arshin-profile.png` is **1.65 MB at 1024×1536**, and it renders at `w-32 h-32` (128px) on mobile and
`md:w-40 md:h-40` (160px) on desktop (`hero-section.tsx:26`), cropped to a circle with
`rounded-full object-cover`. Even at 2× DPR that is a 320px display size — the file is **~3.2× wider
than needed in each dimension, i.e. roughly 10× the pixels**, in a lossless format, for a
photographic portrait. There is no `<picture>`, no WebP/AVIF, no `srcset`, no `width`/`height`
attributes (so it contributes CLS), and no `loading` or `fetchpriority` hint. This single file is
almost certainly larger than the entire JS bundle and is on the critical path for LCP.

### The broken pitch-deck link

`projects.tsx:68-75` renders a download button pointing at `/assets/Lecture_AI_Pitch_Deck.pdf` with a
`download` attribute. **That file does not exist.** What exists is
`public/assets/.Lecture_AI_Pitch_Deck.pdf.icloud` — a 177-byte **iCloud placeholder**, not a PDF. The
real file was never materialized locally and was committed as a stub.

It is broken twice over:

1. The content is a stub, not a PDF.
2. Even if the PDF were there, **`public/` at the repo root is not the Vite public directory.**
   `vite.config.ts:26` sets `root: client`, so Vite's `publicDir` resolves to `client/public/`.
   Nothing under repo-root `public/` is copied into `dist/public`. (`server/index.ts:11` serves
   repo-root `public/` via `express.static` — which is why this may have appeared to work under
   Replit, and why it cannot work on Vercel.)

So on the deployed site, the "Pitch Deck" button on the featured project resolves to whatever the
SPA fallback returns — a 404 or an HTML page saved as `Lecture_AI_Pitch_Deck.pdf`.

### The missing OG image

`client/index.html:25` and `:33` both point at `https://arshinsikka.com/og-image.png`. **No file named
`og-image*` exists anywhere in the repository.** Every LinkedIn, Twitter/X, Slack, and iMessage share
of this portfolio renders with a broken or blank preview card — on a site whose entire purpose is
being shared with recruiters.

### Unused assets summary

**Every file in `attached_assets/` (8 files) and `updated_assets/` (2 files) is unused.**
`vite.config.ts:23` even registers an `@assets` alias pointing at `attached_assets/` — and nothing
imports from it. `updated_assets/13AF…PNG` and `updated_assets/Resume March'26.pdf` are byte-size
identical to the two files actually being served, i.e. they are the same assets stored a second time
under different names. The two `attached_assets` resume PDFs are byte-identical to each other.
Together this is ~3.6 MB of committed dead weight, plus 21 Replit agent `.bin` state files under
`.local/state/replit/`.

---

## 9. Performance and Code Health

### 9.1 Heavy things

*(Bundle sizes could not be measured — `node_modules` is absent. The following is reasoning from
imports and known package sizes, not from a build.)*

1. **The 1.65 MB hero PNG** (§8) — the single largest performance problem on the site, by a wide
   margin, and the LCP element.
2. **`recharts` is a dependency for a chart that does not exist.** `ui/chart.tsx` (365 lines) imports
   it; nothing imports `ui/chart.tsx`. Recharts is one of the heaviest React libraries in common use
   (it pulls in a large d3 subset). It *should* be tree-shaken out by Rollup since the module is
   unreferenced — but it remains installed, resolved, and a permanent trap for anyone who imports
   `ui/chart.tsx` casually.
3. **`framer-motion` is installed and never imported at all** — a top-5 animation library shipped as
   a dependency for zero animations. All 8 animations are hand-written `@keyframes` in
   `index.css:76-186`.
4. **`next-themes` installed, never imported** — while dark mode is hand-rolled in `navbar.tsx`.
5. **Two icon libraries.** `lucide-react` (31 files) plus `react-icons` (`footer.tsx:2`) for exactly
   three brand glyphs. `react-icons/si` is a very large barrel; whether Vite tree-shakes it to three
   icons depends on the subpath import (`react-icons/si` is the right subpath, so it likely does),
   but carrying a second icon library for three logos is unjustified.
6. **The entire dead server stack ships as dependencies**: `@neondatabase/serverless`, `drizzle-orm`,
   `drizzle-zod`, `ws`, `express`, `express-session`, `passport`, `passport-local`,
   `connect-pg-simple`, `memorystore`. None of these reach the browser bundle, but every one is
   installed on every Vercel build and slows `npm install`.
7. **`@replit/vite-plugin-runtime-error-modal` runs in production builds** (`vite.config.ts:10`,
   ungated) — see §1.4.
8. **Scroll handler re-renders the navbar on every frame.** `navbar.tsx:44` calls `setScrollPct` on
   every scroll event. There is no `requestAnimationFrame` throttle and no early-out when the rounded
   percentage is unchanged, so `Navbar` and its 7 child buttons reconcile continuously during any
   scroll. The listener is correctly `{ passive: true }` (`navbar.tsx:57`), which prevents jank in
   the scroll itself, but not the React work.
9. **Content arrays reallocated on every render** — `about-me.tsx:4-29`, `work-experience.tsx:108-168`,
   `projects.tsx:182-226`, `research-experience.tsx:60-77`, `leadership.tsx:62-107`,
   `footer.tsx:5-34`. Since these components never re-render in practice (no props, no state) the
   cost is nil today, but it is why the content cannot be imported anywhere else.
10. **No code splitting, no lazy loading.** `ChatWidget` (299 lines + its whole render tree) is
    imported statically at `App.tsx:8` and mounted eagerly, even though it is collapsed to a 64px FAB
    on first paint and most visitors never open it.
11. **No `React.memo`, `useMemo`, or `useCallback` anywhere** in the app layer. Correct call at this
    scale — noted for completeness, not as a defect.

### 9.2 Dead code

- **43 unused `ui/*` components, 4,772 lines** (§3.4) — 62% of the entire codebase.
- **`hooks/use-mobile.tsx` (19 lines)** — imported only by `ui/sidebar.tsx:6`, which nothing imports.
  Transitively dead.
- **`hooks/use-toast.ts` (191 lines)** — `toast()` and `useToast()` are exported; grep confirms
  **zero call sites** outside the hook's own definition. `<Toaster />` at `App.tsx:23` renders an
  empty list forever.
- **`lib/queryClient.ts` (57 lines)** — `apiRequest` (line 10) and `getQueryFn` (line 27) have no
  callers. The `QueryClientProvider` at `App.tsx:21` wraps an app with **zero queries and zero
  mutations**.
- **`ui/tooltip.tsx`** — `TooltipProvider` is mounted (`App.tsx:22`); no `<Tooltip>` is ever rendered.
- **`shared/schema.ts` (17 lines)** — a `users` table with `username`/`password`. No auth exists.
- **`server/storage.ts` (61 lines)** — `MemStorage` and `DatabaseStorage`; `storage` is imported by
  `server/routes.ts:3` and then **never used in that file**. Its only effect is forcing `server/db.ts`
  to load and throw without `DATABASE_URL`.
- **`server/db.ts` (14 lines)** — a Neon pool for a database the app never queries.
- **`server/routes.ts` + `server/index.ts` + `server/vite.ts` (218 lines)** — the whole Express app
  is dead in production (§4.3).
- **`shared/system-prompt.ts` (164 lines)** — imported only by the dead `server/routes.ts`; the live
  copy is inlined in `api/chat.ts`.
- **`.card-hover` CSS class (`index.css:134-143`)** — defined with light and dark shadows; **applied
  to zero elements**. Every card re-implements the same lift with Tailwind utilities instead.
- **`ExperienceCardProps.index`** (`work-experience.tsx:23`) — declared, passed at line 189,
  destructured at line 27, never read.
- **`NAV_ITEMS[].href`** (`navbar.tsx:4-12`) — always `"#" + id`, and `scrollTo` immediately strips
  the `#` back off (`navbar.tsx:81`). Redundant field.
- **`@assets` Vite alias** (`vite.config.ts:23`) — resolves `attached_assets/`; no import uses it.
- **`bg-clip-text` redefined at `index.css:190-193`** — Tailwind v3 already provides this utility.
  Redefining it *outside* any `@layer` places it after the utilities layer in source order, which
  changes cascade position for no stated reason.
- **`replit.md`** — 95 lines describing an architecture (PostgreSQL sessions, react-hook-form
  validation, TanStack Query data flow, "optimistic updates") that does not match this codebase.
  Actively misleading to a new contributor.
- **`.claude/settings.local.json:5`** — a permission entry hardcoding
  `/Users/arshinsikka/Desktop/IMP STUFF/PortfolioHero`, a path this repo no longer lives at.

### 9.3 Commented-out blocks, TODOs, console statements

- **Commented-out code: none.** Grep for commented JSX/code blocks returns nothing. The comments that
  exist are section dividers (`// ─── Featured Project ───`) and short explanatory notes. This is
  genuinely clean.
- **TODO / FIXME / XXX / HACK: none.** Zero across the whole repo.
- **`console.*`: 7 call sites.**

| Location | Statement | Assessment |
|---|---|---|
| `chat-widget.tsx:119` | `console.error("API Error:", err)` | **Ships to the browser.** Fires on every failed chat request. |
| `server/vite.ts:19` | `console.log(...)` | The `log()` helper — intentional. |
| `server/routes.ts:38` | `console.error("Groq error:", errText)` | Server-side; dead code path. |
| `server/routes.ts:50` | `console.error("Chat route error:", err)` | Server-side; dead code path. |
| `api/chat.ts:209` | `console.error("Body parse error:", parseErr)` | Vercel function logs — fine. |
| `api/chat.ts:232` | `console.error("Groq error:", errText)` | Vercel function logs — fine. |
| `api/chat.ts:246` | `console.error("Handler error:", err)` | Vercel function logs — fine. |

### 9.4 TypeScript health

`tsconfig.json` sets `"strict": true` — good. **`tsc` could not be executed** (no `node_modules`), so
the following comes from reading source only.

**Explicit `any` — 3 occurrences, all in the API layer:**

| Location | Code | Impact |
|---|---|---|
| `api/chat.ts:238` | `const data = (await groqRes.json()) as any;` | The Groq response is untyped. `data.choices?.[0]?.message?.content` on line 240 is unchecked; a schema change fails silently into the fallback string. |
| `server/routes.ts:43` | identical | Same, in the dead copy. |
| `server/index.ts:46` | `(err: any, _req, res, _next) => …` | Express error middleware. Conventional, but `err.status`/`err.statusCode`/`err.message` on lines 47-48 are all unchecked. |

**Implicit `any` / weak typing:**

| Location | Issue |
|---|---|
| `server/index.ts:16` | `Record<string, any>` for the captured JSON response |
| `server/index.ts:19` | `res.json = function (bodyJson, ...args)` — parameters inferred from the overloaded `res.json` signature; the monkey-patch itself is untyped |
| `api/chat.ts:197-207` | `messages` is declared `Array<{role: string; content: string}>` and then **assigned from an unvalidated `JSON.parse`**. `role: string` is not `"user" \| "assistant"`. No runtime validation — `zod` is a dependency and is not used here. The parsed value is forwarded straight to Groq. |
| `server/routes.ts:17-19` | Same pattern: `req.body as {messages: …}` — a bare cast over untrusted input. |
| `chat-widget.tsx:112` | `data.text ?? "…"` where `data` is the untyped result of `res.json()` |
| `chat-widget.tsx:120` | `err instanceof Error && err.message === "rate_limited"` — error signalling by string comparison on a thrown `Error` message (`chat-widget.tsx:107`), rather than a typed error |

**Typing that is done well:**
- `ExperienceItem` / `ExperienceLink` (`work-experience.tsx:4-19`), `AIProject` / `OtherProject`
  (`projects.tsx:98-104,144-150`), `ResearchItem` (`research-experience.tsx:4-11`), `LeadershipItem`
  (`leadership.tsx:4-12`), `Message` (`chat-widget.tsx:6-9`) are all properly declared.
- `ExperienceLink.icon` is a literal union `"github" | "external"` — the one discriminated union in
  the codebase, used correctly at `work-experience.tsx:79`.
- `useRef<ReturnType<typeof setTimeout>>` (`chat-widget.tsx:44`) avoids the `NodeJS.Timeout` vs
  `number` trap correctly.

**Typing gap:** the four content interfaces are declared **inside the component files that consume
them** and are not exported. Nothing else can reference the shape of a project or a job.

### 9.5 Security / operational health

- **`/api/chat` is an unauthenticated, unrate-limited proxy to a paid LLM API.** `api/chat.ts:173`
  sets `Access-Control-Allow-Origin: "*"`, and the handler forwards any caller's `messages` array to
  Groq with the site owner's `GROQ_API_KEY` at `max_tokens: 1024` (`api/chat.ts:226`). The only rate
  limiting that exists is a **2-second `setTimeout` in the client** (`chat-widget.tsx:132-135`) — a
  trivially bypassable UI affordance, not a control. The client even handles HTTP 429
  (`chat-widget.tsx:107`), implying rate limiting was intended somewhere; it is not implemented on
  the server. Anyone can `curl` this endpoint in a loop from any origin.
- **Unbounded conversation length.** `chat-widget.tsx:99` sends the *entire* message history on every
  turn, with no cap on turns or characters, on top of a 9,043-character system prompt. Cost per
  request grows without limit within a session.
- **Raw upstream error text is returned to the client.** `api/chat.ts:231-235` reads Groq's error body
  and echoes it verbatim in the response with Groq's own status code. Provider error payloads can
  carry organization or model metadata.
- **The body-parsing approach is fragile.** `api/chat.ts:199-207` reads the raw request stream
  manually via `req.on("data")`. Vercel's Node runtime typically pre-parses JSON bodies onto
  `req.body`; whether the raw stream is still readable afterward is runtime-dependent. Git history
  shows this was changed twice (`339e713 "Fix body parsing…"`, `a8d26f6 "Inline system prompt…"`),
  which suggests it was arrived at empirically. It presumably works today; it is not a pattern to
  keep.
- **The system prompt is public.** `api/chat.ts:4-167` ships to the serverless function, and its
  full content — including the phone number `+65 80164894` and both email addresses
  (`api/chat.ts:151-153`) — is also enumerable by simply asking the chatbot. That is a deliberate
  choice for a portfolio; noted, not criticized.
- **`.gitignore` covers `.env` and `.env.local`.** No secrets are committed. `GROQ_API_KEY` and
  `DATABASE_URL` are read from the environment only. Good.

---

## 10. Honest Assessment

### 10.1 The ten biggest structural problems, ranked by how much they block a redesign

**1. All content is welded into presentation, and duplicated across files.**
*Files:* `work-experience.tsx:108-168`, `projects.tsx:6-94,182-226,270-277`, `leadership.tsx:62-107`,
`research-experience.tsx:60-77`, `about-me.tsx:4-29`, `footer.tsx:5-34`, `contact.tsx` (all),
`hero-section.tsx` (all), `looking-for.tsx` (all), `shared/system-prompt.ts`, `api/chat.ts:4-167`,
`client/index.html:8-56`.
This is the single biggest blocker. A redesign means rewriting layout — and because every résumé fact
lives *inside* the JSX being rewritten, the content has to be manually re-extracted and re-typed out
of the old markup during the rewrite. There is no `projects.json`, no `experience.ts`, nothing to
point new components at. Worse, the same facts exist in 3–8 places (§5.3), so the rewrite must find
and reconcile every copy. Any redesign that starts before this is extracted will lose or corrupt
content.

**2. `client/src/components/ui/` — 4,772 lines of unused vendored code, 62% of the codebase.**
*Files:* 43 of 48 files in `client/src/components/ui/`, notably `sidebar.tsx` (771),
`chart.tsx` (365), `carousel.tsx` (260), `menubar.tsx` (256), `context-menu.tsx` (198),
`dropdown-menu.tsx` (198), `form.tsx` (178).
Every search, every grep, every "where is the button component" question drowns in this. It carries
31 Radix dependencies and 6 more libraries. It also makes the codebase's real size unknowable: the
project reads as ~7,700 lines when the actual product is ~1,900. During a redesign this directory is
pure noise that must be waded through on every file operation.

**3. The design token layer is decorative — real styling is 130 hardcoded palette classes.**
*Files:* `index.css:5-49`, `tailwind.config.ts:14-73`, and all 11 application components.
`--primary` is `hsl(207,90%,54%)`; every actual button is `bg-blue-600` (`#2563eb`). They are
different colors. A redesign that changes the tokens changes nothing on screen. To restyle the site
you must find and hand-edit ~130 distinct color class strings across 11 files, and author a matching
`dark:` twin for each. There is no single place to change the brand color. 13 tokens referenced in
`tailwind.config.ts:56-72` aren't even defined.

**4. Zero component reuse — every element is a bespoke class string.**
*Files:* the 12 duplication clusters catalogued in §3.3.
There is no `<Section>`, no `<Container>`, no `<Card>`, no `<Tag>`, no `<Button>` — despite
`ui/button.tsx` and `ui/card.tsx` sitting unused in the repo. Six section headers, eight containers,
five card shells, six badge variants and three button recipes are each written out longhand. Changing
"the card look" during a redesign means editing five files and reconciling five sets of drifted
values (`p-6`/`p-7`/`p-8`, `rounded-lg`/`rounded-xl`, `shadow-sm`/`shadow-md`,
`dark:bg-slate-800`/`dark:bg-slate-900`).

**5. Three runtimes, two of which are dead, plus a duplicated API.**
*Files:* `server/index.ts`, `server/routes.ts`, `server/db.ts`, `server/storage.ts`, `server/vite.ts`,
`shared/schema.ts`, `shared/system-prompt.ts`, `api/chat.ts`, `vercel.json`, `package.json:7-8`,
`drizzle.config.ts`.
`npm run dev` — the documented way to run this project — **crashes without a `DATABASE_URL`**
(`server/db.ts:8-12`) for a site with no database. `npm run build` compiles a server bundle Vercel
discards. `/api/chat` exists twice with a 9,043-character system prompt duplicated byte-for-byte. A
contributor cannot tell which of the two handlers is live without reading `vercel.json`. This blocks
redesign work at the *first step*: getting the thing running locally.

**6. Two shipped-broken assets, both on the main conversion paths.**
*Files:* `projects.tsx:68-75` + `public/assets/.Lecture_AI_Pitch_Deck.pdf.icloud`;
`client/index.html:25,33` (missing `og-image.png`).
The featured project's "Pitch Deck" download points at an iCloud placeholder that also sits in a
directory Vite never copies (§8). The OG image referenced by every social share does not exist. On a
portfolio whose job is to be shared with recruiters, both of these are live failures right now, and
neither is visible from the code alone without checking the filesystem.

**7. Accessibility is systematically absent from the app layer.**
*Files:* `pages/home.tsx:14` (no `<main>`), `navbar.tsx:110-121,154-172`, `chat-widget.tsx:159-262,248`,
`hero-section.tsx:56,65`, `looking-for.tsx:9,17`, `not-found.tsx`, `index.css:57,147-176`.
No `<main>`, no skip link, no labelled regions, nav built from `<button>` instead of `<a>`, focus
outline removed with nothing in its place (`chat-widget.tsx:248`), **not one `focus-visible:` style in
the entire application layer**, a mobile menu that stays in the tab order while invisible
(`navbar.tsx:155-157`), a full-screen chat panel with no `role="dialog"`, no focus trap and no
`Escape`, no `aria-live` on streaming chat replies, no `prefers-reduced-motion` guard on two infinite
animations, and two confirmed WCAG AA contrast failures. A redesign inherits all of it unless the
component layer is rebuilt.

**8. The 1.65 MB hero image is the LCP element.**
*Files:* `client/public/assets/arshin-profile.png`, `hero-section.tsx:23-27`.
A 1024×1536 lossless PNG rendered into a 128–160px circle. No `srcset`, no WebP/AVIF, no
`width`/`height` (CLS), no `fetchpriority`. It is almost certainly heavier than the entire JS bundle.
Any redesign that keeps this file starts from a failing Core Web Vitals baseline regardless of how
good the new markup is.

**9. Dark mode state is trapped inside `Navbar` and flashes on every load.**
*Files:* `navbar.tsx:17,22-36`, `client/index.html` (no blocking script), `not-found.tsx`,
`chat-widget.tsx:160,190,230`.
Theme is a `useState` local to one component (`navbar.tsx:17`) — no context, no provider, unreadable
by anything else. It is applied in a `useEffect`, guaranteeing a white flash for returning dark-mode
visitors while `theme-color` is already `#0f172a`. The 404 page has no dark styling at all; the chat
widget is permanently dark in both themes. Any redesign that touches theming has to rebuild this from
scratch, and it constrains where the toggle can live.

**10. No quality infrastructure, and documentation that actively lies.**
*Files:* absent ESLint/Prettier/test configs; `package.json:6-11`; `replit.md`;
`.claude/settings.local.json:5`; `package.json:2` (`"name": "rest-express"`); missing `engines`;
`.local/state/replit/` (21 committed blobs).
No linter, no formatter, no test of any kind, no CI, no `engines` field, no `.nvmrc`. The one
architecture document (`replit.md`) describes PostgreSQL sessions, react-hook-form validation and
"optimistic updates" — none of which exist. `nanoid` is imported without being declared
(`server/vite.ts:7`). During a redesign there is nothing that will tell you when you break something,
and the only written guidance will point you the wrong way.

### 10.2 What to keep, and what to rewrite

**Keep — genuinely good, reuse as-is:**

| Item | Why |
|---|---|
| **The written content itself** — every description in `work-experience.tsx:108-168`, `projects.tsx`, `leadership.tsx:62-107`, `research-experience.tsx:60-77`, and the `SYSTEM_PROMPT` body | This is the actual asset. It is specific, metric-bearing ("~60%", "400+ adversarial prompts", "12+ person teams"), well-edited, and non-generic. It needs to be *extracted*, not rewritten. |
| **`client/index.html:7-56`** | Genuinely thorough for a personal site: canonical URL, full OG + Twitter cards, valid JSON-LD `Person` schema with `alumniOf` and `sameAs`, an inline SVG data-URI favicon (zero requests). Only the missing `og-image.png` needs fixing. |
| **`client/src/lib/utils.ts`** | Six lines, correct, universally used. |
| **The four content interfaces** — `ExperienceItem` (`work-experience.tsx:10-19`), `AIProject`/`OtherProject` (`projects.tsx:98-104,144-150`), `ResearchItem` (`research-experience.tsx:4-11`), `LeadershipItem` (`leadership.tsx:4-12`) | These are already the right shapes for a data layer. They need to be moved out and exported, not redesigned. `ExperienceLink.icon`'s literal union is exactly right. |
| **`index.css:60-71`** | The fluid `clamp()` body-text rule and the 1.65/1.7 line-heights are the best typographic decision in the project. Keep the idea; make it not fight the utility classes. |
| **`.gitignore`** | Correct. No secrets are committed anywhere. |
| **`chat-widget.tsx`'s UX design** (not its code) | The nudge-once-per-session pattern, starter chips, typing indicator, mobile-fullscreen/desktop-panel split, and cooldown-on-send are all well-judged product decisions. Preserve the behaviour spec; rewrite the implementation. |
| **`api/chat.ts:172-249`'s handler shape** | The Groq integration, CORS preflight, method guard, missing-key guard, and fallback-string handling are sound. It needs types, validation, and server-side rate limiting — not a redesign. |

**Rewrite from scratch:**

| Item | Why |
|---|---|
| **All 11 application components** (`client/src/components/*.tsx`, 1,561 lines) | Not because they are badly written — they read cleanly — but because every one of them is a fused block of content + layout + color + one-off classes with no props and no reuse. There is no incremental path from "six hand-written section headers" to "one `<Section>` component" that is cheaper than writing the new one. Extract the content first, then rebuild. |
| **The entire `client/src/components/ui/` directory** | Delete 43 unused files outright. Re-add via the shadcn CLI only what the new design actually renders. Keeping them "just in case" is what produced this situation. |
| **The styling system** (`index.css:5-49`, `tailwind.config.ts:14-73`, and every inline color class) | The token layer and the rendered styles are two unrelated systems. Pick one — either commit to semantic tokens and use them, or drop the token layer and own the palette classes deliberately. The current state is the worst of both: the maintenance cost of tokens with none of the benefit. Also: define the 13 dangling variables or remove them. |
| **`server/` entirely** (218 lines) | Dead in production, and it is what breaks local dev. Nothing in it is reachable on Vercel. |
| **`shared/schema.ts`, `server/db.ts`, `server/storage.ts`, `drizzle.config.ts`** | A `users` table with a `password` column, a Neon connection pool, and two storage implementations, for a static portfolio. Delete; drop the 8 associated dependencies. |
| **`hooks/use-toast.ts`, `hooks/use-mobile.tsx`, `lib/queryClient.ts`** (267 lines) | Zero call sites between them. If the redesign needs toasts or data fetching, add them back deliberately. |
| **Dark-mode implementation** (`navbar.tsx:17,22-36`) | Needs to be a provider or a `next-themes` integration (already installed), plus a blocking inline script in `index.html` to kill the FOUC. Cannot be patched in place — the state has to move out of `Navbar`. |
| **`pages/not-found.tsx`** | 21 lines using a different neutral ramp (`gray-*`) from the rest of the site, no dark mode, and developer-facing template copy shipped to users. |
| **`replit.md`** | Delete or replace. Every architectural claim in it is false for this codebase. |
| **`attached_assets/`, `updated_assets/`, `public/`, `.local/state/replit/`, `.replit`** | ~3.6 MB of duplicate and stub files, 21 Replit agent state blobs, and a `public/` directory Vite never reads. Nothing here is referenced by working code. |
| **`package.json` dependency list** | 14 never-imported runtime deps + `@tailwindcss/vite`. Add `nanoid` if `server/` survives (it should not). Add `engines`. Rename from `rest-express`. |

**The honest summary:** the *content* and the *SEO shell* are the valuable parts of this repository,
and they are both in good shape. Everything between them — the component layer, the styling system,
the server, and two-thirds of the file count — is Replit/shadcn scaffolding that was never pruned,
wrapped around content that was never extracted. A redesign should begin by lifting the content into
a data layer and deleting `ui/`, `server/`, and the asset directories. After that the remaining
surface is roughly 1,900 lines, which is a tractable rewrite.

---

## 11. Open Questions

These are things the code did not tell me. I have not guessed at answers.

**Deployment and build**

1. **Does `vercel.json`'s explicit `rewrites` array suppress the Vite framework preset's SPA
   fallback?** If it does, `/anything` returns a CDN 404 and `pages/not-found.tsx` (`App.tsx:14`) is
   dead on arrival. If it does not, the identity rewrite at `vercel.json:8` is simply a no-op. I could
   not determine this from the repository. Checking a non-existent path on the live site answers it.
2. **What Node version does the Vercel project actually build with?** No `engines`, no `.nvmrc`. Only
   `.replit:1` (`nodejs-20`) and `@types/node@20.16.11` hint at intent, and Vercel reads neither.
3. **Is the deployed site actually on Vercel, and at `arshinsikka.com`?** `client/index.html:12,22`
   asserts that canonical URL, and `vercel.json` exists — but there is no `.vercel/` directory, no CI
   config, and no deployment record in the repo.
4. **Does `api/chat.ts`'s manual stream read reliably receive a body on Vercel's Node runtime?**
   (§9.5) The commit history suggests this was resolved empirically. I cannot verify it without
   deploying.
5. **Is the Express server (`server/`) still used for anything — a Replit mirror, a staging box?**
   If it is genuinely retired, `npm run dev` is broken for everyone and nobody has noticed, which
   would itself be informative.
6. **Was the site ever built successfully with `node_modules` present?** I could not run
   `tsc --noEmit` or `vite build`. Everything in §9.4 about type health is from reading source.

**Assets**

7. **Where is the real `Lecture_AI_Pitch_Deck.pdf`?** Only iCloud stubs exist
   (`public/assets/.Lecture_AI_Pitch_Deck.pdf.icloud`, `attached_assets/.Lecture AI - Pitch Deck_….pdf.icloud`).
   Is the file on the author's iCloud and simply never materialized before committing?
8. **Which resume is current?** `client/public/assets/Arshin_Sikka_Resume.pdf` (116 KB) is byte-size
   identical to `updated_assets/Resume March'26.pdf`; both `attached_assets` PDFs are a different,
   older 67 KB file named `JUNE'25`. Is the served one the March 2026 version, and is the
   `updated_assets/` copy the intended source of truth?
9. **Was an `og-image.png` ever designed?** It is referenced twice (`client/index.html:25,33`) and
   exists nowhere. Is there a file to add, or does one need to be made?
10. **Is `updated_assets/13AF5E29-…PNG` intended to replace `arshin-profile.png`?** Identical byte
    size and dimensions suggest it is the same photo, but the naming implies it was staged as an
    update that was never applied.

**Content**

11. **Which "Current" roles are still current as of today (2026-08-19)?** `work-experience.tsx:113`
    says SP Digital is "Jan 2026 – Present" and `isCurrent: true`; `leadership.tsx:66,75,84` marks
    three roles current. Nothing in the repo dates these claims. The site has no build-time date
    stamp to check them against.
12. **Should Lecture AI appear as both a job and the featured project?** It is deliberate-looking
    duplication (`work-experience.tsx:120-140` and `projects.tsx:6-94`) with two different
    descriptions — intentional emphasis, or drift?
13. **Is "Donation Nation" vs "Donation-Nation" a deliberate distinction?** `leadership.tsx:92`
    spells it unhyphenated; `projects.tsx:275` spells it hyphenated.
14. **Which email should be primary?** `contact.tsx:50` labels the NUS address "(preferred)", but the
    git author on this repo is `arshincollege@gmail.com` — a third address that appears nowhere in the
    site content.
15. **Is `looking-for.tsx` deliberately excluded from the nav?** It is the only content region with no
    `id` and no `<section>`. Given it carries the availability call-to-action, was it meant to be
    linkable?
16. **Is the phone number intended to be public?** `contact.tsx:34` and both system prompts
    (`api/chat.ts:153`) publish `+65 80164894` — the latter meaning the chatbot will read it out to
    anyone who asks.

**Product / chat**

17. **Was server-side rate limiting on `/api/chat` ever implemented and removed?** The client handles
    HTTP 429 explicitly (`chat-widget.tsx:107,125-126`) but nothing on the server ever returns one
    (§9.5). Is Groq's own quota the only backstop?
18. **Is `llama-3.3-70b-versatile` on Groq the intended model?** Commit `403e1dc` says "Update model
    being used in ArshinAI" — was this a cost decision, a quality decision, or availability?
19. **Should the chat widget respect the site's dark/light theme?** It is hardcoded dark
    (`chat-widget.tsx:160,190,230`) while its nudge bubble is theme-aware (`:269`). Deliberate design
    choice, or an oversight?

**Process**

20. **Is `replit.md` meant to be maintained, or is it an artifact to delete?** It is the only
    architecture doc and it describes a different application.
21. **Were `.local/state/replit/` (21 files) and `.claude/settings.local.json` committed
    intentionally?** Both look like local state that escaped `.gitignore`.
22. **Is there an existing design direction for the revamp** — a Figma file, a reference site, a brand
    palette? Nothing in the repo indicates one, and §6 shows the current palette was inherited from a
    shadcn preset rather than chosen.
