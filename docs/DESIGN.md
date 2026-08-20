# Design direction

Status: **proposed**. Implemented on `/` (plus the global navbar, footer, and
chat widget) only. `/work`, `/projects`, `/projects/:slug`, `/research`, and
`/about` still carry the old design and will look inconsistent until this
direction is approved.

---

## 1. The direction

**Warm paper, blue-black ink, machine-set metadata in the margin.**

The page is built like a technical index rather than a landing page. A warm
off-white ground carries near-black text at a comfortable reading measure, with
every block labelled in the left margin in monospace. Dates, organisations, and
tags are set in mono and aligned into columns, so a reader scanning for "what
has he actually done, and when" gets it from the shape of the page before
reading a word. Hierarchy comes from size and position, not from colour, boxes,
or shadow. There is exactly one accent, and it appears in three places.

The subject is a Year 3 CS student whose work is *measurement* — LLM
evaluation, guardrails, adversarial test suites, cost and latency tradeoffs. A
layout whose defining feature is that everything carries a visible, aligned
label is a formal echo of that. It is also, bluntly, the fastest thing for a
recruiter to read.

**What this is deliberately not:**

- **Not a card grid.** No rounded corners, no drop shadows, no hover lift. Cards
  make every item look equally important and waste vertical space; hairline rules
  do the same job in a fifth of the height.
- **Not centred.** Text is left-aligned and ragged-right throughout. The old hero
  centred five elements in a full viewport and said very little.
- **Not gradient-lit.** No blue-to-purple anything, least of all on the name.
- **Not animated.** The floating avatar, the bouncing chevron, the pulsing chat
  button, and the four entrance animations are gone. Motion is reserved for
  state changes and hover.
- **Not falsely live.** The green "online" dot next to the photo claimed a
  presence that does not exist and has been removed. The one status claim on the
  page — "Open to opportunities" — is real, is written in the copy, and is the
  thing the accent marks.
- **Not warm-cream-and-terracotta.** See below.

### A note on the accent

The brief originally specified a terracotta accent (`#B4441C` / `#E0703F`).
That palette passes AA and would have looked fine, but warm cream + serif
display + terracotta is currently the single most common "tasteful AI redesign"
on the web — which is an odd place to land when the problem being solved is that
the site reads as AI-generated. The neutrals are not the tell; warm off-white
against near-black is just paper, and it has been for five hundred years. The
rust is the tell.

The accent is now a **deep ink blue**. Rejected alternatives, and what they
looked too much like:

| Candidate | Light / Dark | Ratios | Verdict |
|---|---|---|---|
| **Ink blue** | `#1D3A6B` / `#7FA6E3` | 10.76 / 7.61 | **Chosen** |
| Cyanotype blue | `#0F4462` / `#7FB6D2` | 9.94 / 8.56 | Rejected — the blueprint reference is weaker than it sounds (blueprints are white-on-blue, so blue *ink* doesn't evoke them), and cyan against a yellow-warm ground reads faintly clinical. |
| Deep forest | `#1D4A37` / `#89C1A5` | 9.64 / 9.20 | Rejected — cream and bottle green is skincare and artisanal grocery. Reads lifestyle, not technical. |
| Aubergine | `#4A2545` / `#B98DB2` | 12.25 / 6.75 | Rejected — fashion editorial. Wrong register for a recruiter. |
| Oxblood | `#6E1F2B` / `#C9808C` | 10.62 / 6.25 | Rejected — same family as the terracotta being escaped. |

Ink blue wins on three grounds. It is a real material pairing — blue-black
fountain ink on warm stock is the physical artifact this page is imitating, and
this subject's world is documents, specs, and written-down measurements. It is
sober enough for a hiring manager without being corporate. And it is *far* more
legible than the alternatives it replaces: 10.76:1 against 5.32:1 for the
terracotta and 4.95:1 for the blue the old site used. At the 11px mono sizes
this design leans on, that gap is the difference between comfortable and
squinting.

It is worth being explicit that the old site was also blue. The distinction is
value and saturation, not hue: `#2563EB` is a mid-value saturated UI blue used
as a brand primary on twelve different elements. `#1D3A6B` is a dark, quiet ink
used on three.

---

## 2. Palette

Two themes, one neutral family, one accent. Every value is a CSS custom
property; nothing in the redesigned surface hardcodes a hex.

### Tokens

| Token | Light | Dark | Used for |
|---|---|---|---|
| `--paper` | `#FBFAF7` | `#12110F` | Page ground. The only background on the page. |
| `--ink` | `#171614` | `#EDEAE3` | Primary text. Also the primary button's fill. |
| `--ink-muted` | `#6E6B64` | `#8B8780` | Secondary text: metadata, labels, tags, captions. |
| `--rule` | `#E4E1D9` | `#26241F` | Decorative hairlines between blocks and rows. |
| `--rule-strong` | `#8A8578` | `#6B6459` | Boundaries that carry meaning: input borders, secondary button outline, link underlines. |
| `--accent` | `#1D3A6B` | `#7FA6E3` | Links, active nav, the change bar. Nothing else. |
| `--accent-hover` | `#162E56` | `#9DBBEC` | Link and nav hover. |
| `--on-accent` | `#FBFAF7` | `#12110F` | Text on an accent fill. |
| `--on-ink` | `#FBFAF7` | `#12110F` | Text on the primary button. |

### Contrast — light theme

| Foreground | Background | Ratio | Needs | Result |
|---|---|---|---|---|
| `--ink` #171614 | `--paper` #FBFAF7 | **17.32:1** | 4.5:1 | PASS (AAA) |
| `--ink-muted` #6E6B64 | `--paper` #FBFAF7 | **5.09:1** | 4.5:1 | PASS |
| `--accent` #1D3A6B | `--paper` #FBFAF7 | **10.76:1** | 4.5:1 | PASS (AAA) |
| `--accent-hover` #162E56 | `--paper` #FBFAF7 | **12.90:1** | 4.5:1 | PASS (AAA) |
| `--on-ink` #FBFAF7 | `--ink` #171614 | **17.32:1** | 4.5:1 | PASS (AAA) |
| `--on-accent` #FBFAF7 | `--accent` #1D3A6B | **10.76:1** | 4.5:1 | PASS (AAA) |
| `--ink` #171614 | `--rule` #E4E1D9 | **13.84:1** | 4.5:1 | PASS (AAA) |
| `--rule-strong` #8A8578 | `--paper` #FBFAF7 | **3.53:1** | 3.0:1 (non-text) | PASS |
| `--rule` #E4E1D9 | `--paper` #FBFAF7 | 1.25:1 | — | Decorative only. Carries no information; every block it separates is also separated by whitespace and a labelled heading. |

### Contrast — dark theme

| Foreground | Background | Ratio | Needs | Result |
|---|---|---|---|---|
| `--ink` #EDEAE3 | `--paper` #12110F | **15.71:1** | 4.5:1 | PASS (AAA) |
| `--ink-muted` #8B8780 | `--paper` #12110F | **5.28:1** | 4.5:1 | PASS |
| `--accent` #7FA6E3 | `--paper` #12110F | **7.61:1** | 4.5:1 | PASS (AAA) |
| `--accent-hover` #9DBBEC | `--paper` #12110F | **9.66:1** | 4.5:1 | PASS (AAA) |
| `--on-ink` #12110F | `--ink` #EDEAE3 | **15.71:1** | 4.5:1 | PASS (AAA) |
| `--on-accent` #12110F | `--accent` #7FA6E3 | **7.61:1** | 4.5:1 | PASS (AAA) |
| `--ink` #EDEAE3 | `--rule` #26241F | **12.90:1** | 4.5:1 | PASS (AAA) |
| `--rule-strong` #6B6459 | `--paper` #12110F | **3.23:1** | 3.0:1 (non-text) | PASS |
| `--rule` #26241F | `--paper` #12110F | 1.22:1 | — | Decorative only, as above. |

Nothing was adjusted to reach these numbers except the two `--rule-strong`
values, which started as light hairline greys and were darkened until they
cleared 3:1, because they outline real controls.

Links never rely on colour alone — they are underlined by default, which covers
colour blindness and the case where the accent is doing double duty as an
active-state marker.

---

## 3. Typography

Three faces, three jobs, no overlap.

| Face | Role | Why |
|---|---|---|
| **Newsreader** | Display: the name, the positioning line | A *text* face pressed into display use, with a real optical-size axis. That gives it the substance of an editorial serif rather than the fashion-plate feel of a pure display cut. Chosen over **Instrument Serif**, which is the more obvious pick and is currently on roughly every AI-generated landing page — the same reason the accent moved off terracotta. |
| **IBM Plex Sans** | Body, UI, row titles | Has actual voice at 16px — the flared stems, the open aperture, the distinctive `g` — where the alternative is engineered to have none. Its original design brief was the relationship between people and machines, which suits the subject. Chosen over **Geist**, which is deliberately Inter-adjacent (and Inter is out), and which as Vercel's own font on a Vercel-hosted site would read as "used the default". |
| **IBM Plex Mono** | Metadata: dates, organisations, tags, section labels, nav | Genuinely designed alongside Plex Sans — same skeleton, same era, coordinated proportions. A superfamily pairing is more disciplined than three unrelated families. |

**This is one deviation from the brief**, which proposed JetBrains Mono. JetBrains
Mono has a taller x-height and is marginally more legible at 11px, but it is also
in every developer portfolio, and it shares no design DNA with the body face.
Swapping back is one line in `tailwind.config.ts` plus one `@font-face` block.

### Loading

Self-hosted from `client/public/fonts/`, latin subset only, declared with
`@font-face` in `client/src/index.css` and `font-display: swap`. No third-party
request, no connection to `fonts.gstatic.com`, no privacy footnote.

| File | Bytes | Covers |
|---|---|---|
| `newsreader-var.woff2` | 57,300 | Variable, weight 200–800 + optical size |
| `plex-sans-var.woff2` | 40,240 | Variable, weight 100–700 |
| `plex-mono-400.woff2` | 10,052 | Static 400 |
| **Total** | **107,592 B (105.1 kB)** | |

Newsreader and Plex Sans ship as variable fonts, so a single file covers every
weight; only one mono weight is used, differentiated by case and colour instead
of a second file. Fallback stacks (`Georgia`, `Helvetica Neue`, `ui-monospace`)
only matter during the swap window.

Not done: `<link rel="preload">` for the two critical faces, which would remove
one round trip. That needs an edit to `client/index.html`, which is out of scope
for this task.

### Scale

Large display against small body, as specified. Sizes are Tailwind `fontSize`
keys, so they are used as `text-display`, `text-body`, and so on.

| Key | Size | Line height | Tracking | Face | Used for |
|---|---|---|---|---|---|
| `display` | `clamp(2.5rem, 6.5vw, 4rem)` | 1.02 | −0.022em | Newsreader | The name. Once per page. |
| `lead` | `clamp(1.25rem, 2.4vw, 1.75rem)` | 1.28 | −0.011em | Newsreader | The positioning line. |
| `h2` | 1.375rem / 22px | 1.25 | −0.01em | Newsreader | Reserved for in-content section headings on interior pages. |
| `h3` | 1rem / 16px | 1.4 | −0.005em | Plex Sans 500 | List row titles. |
| `body` | 1rem / 16px | 1.6 | — | Plex Sans 400 | Reading text. |
| `small` | 0.875rem / 14px | 1.55 | — | Plex Sans 400 | Secondary text, buttons, row sub-line. |
| `meta` | 0.8125rem / 13px | 1.45 | — | Plex Mono 400 | Dates. Tabular numerals, so date columns align. |
| `label` | 0.6875rem / 11px | 1.3 | +0.09em | Plex Mono 400 | Rail labels, nav, tags, footer. Uppercase. |

Two `font-feature-settings` decisions worth stating: `.font-mono` sets
`tabular-nums` so date columns align down the page, and `.font-display` sets
`font-optical-sizing: auto` so Newsreader's optical-size axis tracks the rendered
size instead of being frozen at a text weight.

Reading measure is capped at `--measure: 34rem`, which is ~65 characters in Plex
Sans at 16px.

---

## 4. Spacing

4px base, named so the rhythm is stated once rather than improvised per
component. Exposed as Tailwind spacing keys (`p-s4`, `gap-s2`, `mt-s6`).

| Key | Value | Typical use |
|---|---|---|
| `s1` | 0.25rem / 4px | Label-to-value gap |
| `s2` | 0.5rem / 8px | Inline gaps, button padding-y |
| `s3` | 0.75rem / 12px | Chip padding, tight stacks |
| `s4` | 1rem / 16px | Row padding-y, button padding-x |
| `s5` | 1.5rem / 24px | Page gutter, inline group gaps |
| `s6` | 2rem / 32px | Rail gap, footer padding-y |
| `s7` | 3rem / 48px | Block padding-y |
| `s8` | 4rem / 64px | — |
| `s9` | 6rem / 96px | — |

Layout constants, also tokens:

| Token | Value | Meaning |
|---|---|---|
| `--nav-row-h` | 4rem | Navbar inner row |
| `--nav-h` | `calc(var(--nav-row-h) + 1px)` | Total navbar height including its border. Everything that must clear the fixed navbar reads this. |
| `--rail-w` | 8.5rem / 136px | The margin rail |
| `--rail-gap` | 2rem | Rail to content |
| `--measure` | 34rem | Reading measure (~65ch) |
| `max-w-page` | 46rem / 736px | Rail + gap + content column |

Radius is effectively off: `--radius: 2px`, applied only to controls (buttons,
inputs, chips). Structural elements have square corners.

---

## 5. How this maps onto Tailwind

The previous token layer was decorative. `--primary` was `hsl(207 90% 54%)`
while every actual button hardcoded `bg-blue-600`, so changing `--primary`
changed nothing visible anywhere. Both halves of that are now fixed.

**`client/src/index.css`** defines the tokens on `:root` and overrides only the
values that differ on `.dark`. Because every colour resolves through a variable
that flips with the theme class, **no component in the redesigned surface
contains a single `dark:` variant.** That is the test of whether a token layer is
real, and the old one failed it.

The shadcn variables (`--background`, `--foreground`, `--border`, `--primary`,
`--ring`, …) are kept but repointed at the new tokens, so the surviving `ui/`
primitives inherit this system instead of the old blue one:

```css
--background: var(--paper);
--foreground: var(--ink);
--border:     var(--rule);
--input:      var(--rule-strong);
--primary:    var(--accent);
--ring:       var(--accent);
```

**`tailwind.config.ts`** extends `fontFamily` (`display` / `sans` / `mono`),
replaces the `fontSize` scale with the eight keys above, maps the colour tokens
(`paper`, `ink`, `ink-muted`, `rule`, `rule-strong`, `accent`, `accent-hover`,
`accent-foreground`, `on-ink`), adds the `s1`–`s9` spacing scale plus `rail` and
`rail-gap`, and adds `max-w-measure` / `max-w-page`.

### One trap worth documenting

`tailwind-merge` only knows Tailwind's stock scales. Given a custom font-size key
it cannot recognise, it classifies the class as a *text colour* — so
`cn("text-label", "text-ink-muted")` silently dropped the size, and
`cn("text-accent …", "text-small")` silently dropped the accent. Both bugs were
live and visible in the first build of this direction.

`client/src/lib/utils.ts` now uses `extendTailwindMerge` to declare the custom
`font-size` and `font-family` groups. **Any new key added to the type scale must
be added there too**, or `cn()` will start eating classes again without warning.

---

## 6. Components

Implemented in `client/src/components/primitives.tsx`.

### Link — `<TextLink>`

Accent, underlined, `decoration-rule-strong` at 3px offset. The underline is not
optional: it is what makes the link identifiable without colour.

- **Default** — `text-accent`, underline in `--rule-strong`
- **Hover** — `text-accent-hover`, underline switches to `--accent`, 150ms
- **Focus-visible** — 2px `--accent` outline, 3px offset
- **Active** — no separate treatment; the hover state persists through the press

### Nav item

Mono, 11px, uppercase, `+0.09em`. The second of the accent's three jobs.

- **Default** — `--ink-muted`
- **Hover** — `--ink`
- **Active route** — `--accent`, plus `aria-current="page"`
- **Focus-visible** — as above

No underline, no bottom border. The old design used a 2px accent border under
the active item, which fought the hairline system.

### Section heading — the rail label

A real `<h2>` positioned in the margin: mono, 11px, uppercase, `--ink-muted`.
On the homepage index each label is also a link to the route it indexes, so it
picks up the link hover colour. Below `md` the rail collapses and the label
becomes an eyebrow above the content.

### List row — `<ListRow>`

Replaces the card. Title left in Plex Sans 500 at 16px; date right in mono 13px
with tabular numerals; organisation and location on a sub-line in 14px muted;
tags below. Separated by a `--rule` hairline, `1rem` padding-y.

No border radius, no shadow, no hover lift, no background change. A row is only
interactive when it links somewhere real — `href` is set only where a
destination actually exists, which on the homepage means the two entries that
resolve to `/projects/lecture-ai`.

- **Linked title default** — `--ink` with a `--rule-strong` underline
- **Linked title hover** — `--accent`, underline switches to `--accent`
- **Non-linked title** — no underline, no pointer, no hover

### Tag — `<TagList>`

Mono, 11px, uppercase, `--ink-muted`, separated by a 1rem gap. No pill, no
border, no background, no colour. Tags are metadata; they were pretending to be
navigation. Semantically a `<ul>`, not a row of `<span>`s.

### Button — `<ButtonLink>`

**Primary** is an inverted ink fill, *not* the accent. Keeping the accent off
buttons is precisely what lets it stay rare enough to mean something — the brief
allotted the accent three jobs and a button fill would have been a fourth.

- **Default** — `bg-ink` / `text-on-ink`, 2px radius, 14px Plex Sans 500
- **Hover** — fill switches to `--accent`, text to `--on-accent` (150ms)
- **Focus-visible** — 2px `--accent` outline, 3px offset
- **Disabled** — not currently used on the homepage

**Secondary** is a hairline outline in `--rule-strong` with `--ink` text; on
hover the border goes to `--ink` and it fills, inverting to match primary's
resting state.

### Chat widget

Stays a corner widget. Restyled, not rebuilt — every behaviour (rate limiting,
cooldown, the once-per-session nudge, error copy) is untouched.

- **Launcher** — 48px square, 2px radius, hairline `--rule-strong` border on
  `--paper`, message glyph in `--ink`. Was a 64px purple-gradient circle with a
  sparkle icon and a permanent pulse animation. Hover inverts to an ink fill.
- **Panel** — `--paper`, hairline border, 2px radius, 380×520 on desktop,
  full-screen below `md`.
- **Header** — hairline rule underneath, two mono labels. The blue→indigo→purple
  gradient bar is gone.
- **Messages** — no bubbles, no avatars. Each turn is a mono `--ink-muted`
  speaker label above the text; the visitor's own turns additionally carry a
  `--rule-strong` bar in the left margin. This is the same device as the change
  bar, one step quieter.
- **Typing indicator** — the three bouncing dots are replaced by the word
  "Thinking" in a mono label.
- **Chips** — hairline outline, mono, sentence case.
- **Input** — hairline `--rule-strong` border that goes to `--accent` on
  `focus-within`. Send glyph is the one accent-coloured control in the panel.

---

## 7. Interaction states

The audit found **zero** `focus-visible` styles in the entire app. The floor is
now set globally in `index.css`:

```css
:where(a, button, input, textarea, select, summary, [tabindex]):focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
  border-radius: 2px;
}
```

`:where()` gives it zero specificity, so any component can override it without
`!important`. It uses `:focus-visible` rather than `:focus`, so it appears for
keyboard and assistive-tech users and not on mouse click. Verified in the
browser: tabbing to a rail label yields `outline: rgb(29, 58, 107) solid 2px`
with a 3px offset, and the element matches `:focus-visible`.

Summary of every state:

| Element | Hover | Focus-visible | Active/current | Disabled |
|---|---|---|---|---|
| Text link | colour → `--accent-hover`, underline → `--accent` | 2px accent outline | — | — |
| Nav item | colour → `--ink` | 2px accent outline | colour → `--accent`, `aria-current="page"` | — |
| Rail label link | colour → `--accent` | 2px accent outline | — | — |
| Row title link | colour → `--accent`, underline → `--accent` | 2px accent outline | — | — |
| Primary button | fill → `--accent` | 2px accent outline | — | — |
| Secondary button | border → `--ink`, fills and inverts | 2px accent outline | — | — |
| Icon button | background → `--rule`, colour → `--ink` | 2px accent outline | — | — |
| Chat input | — | border → `--accent` via `focus-within` | — | `opacity-30`, `cursor-not-allowed` |
| Chat chip | border → `--ink`, colour → `--ink` | 2px accent outline | — | — |

All transitions are 150ms. `prefers-reduced-motion: reduce` collapses every
animation and transition to 0.01ms globally.

Two accessibility fixes came along with the restyle. The mobile menu now
unmounts when closed instead of being hidden with `max-h-0 opacity-0`, so its
links leave the tab order — previously a keyboard user tabbed through five
invisible links. And nav items carry `aria-current="page"`, so the active route
is announced rather than only coloured.

---

## 8. The signature: the margin rail and the change bar

Every block on the page is a two-column grid: a fixed 136px rail on the left
carrying a monospace label, and the content hanging to its right at a fixed
measure. Hairlines span both columns. On the homepage the rail's first slot holds
the portrait rather than a label, which is how the photo gets smaller without
disappearing — it becomes the first entry in the margin instead of the centrepiece.

**Why this and not something else.** The device comes from technical
documentation and printed indices — marginal labels, aligned metadata, rules
between entries — not from landing-page convention. It encodes something true
rather than decorating: the label states what kind of thing the block contains,
and because the labels are set at a fixed width in a fixed face, the eye can run
down the left edge and find a section without reading. For a page whose primary
user is a recruiter scanning for evidence, that is the actual job.

It also earns the left alignment and the 65-character measure that the rest of
the brief asks for. A centred layout has no margin to put anything in; the rail
is what makes left alignment structural rather than stylistic.

**The change bar.** One block on the page — "Open to opportunities" — is
bracketed by a 2px accent rule running down its full height, rail and content
together. This is the vertical bar that technical specifications and legal
redlines put in the margin to flag the passage that has changed or needs
attention. Using it to mark the single thing the visitor is being asked to act
on is its native meaning, not a borrowed one.

It is the only non-text use of the accent anywhere on the page, which is what
makes it work. The accent's three jobs, in full:

1. Links
2. The active nav item
3. The change bar — once per page

Nothing else on the page is coloured.

---

## 9. Known gaps

- `/work`, `/projects`, `/projects/:slug`, `/research`, `/about` are untouched
  and inconsistent by design. They inherit the new body face, ground, and text
  colours from the global token layer, but keep their card grids, coloured
  badges, and centred headings.
- `client/index.html` is untouched, so the favicon is still a `#2563EB` rounded
  square with a system-font monogram and `<meta name="theme-color">` is still
  `#0f172a`. Both are visible brand surfaces that contradict this direction.
- Font preloading is not set up (see §3).
- Dark mode still initialises in a `useEffect` inside `Navbar`, so there is a
  flash of the light theme on load for dark-mode users. Out of scope here; the
  new tokens make the eventual fix a two-line inline script.
- `not-found.tsx` still carries developer template copy and no theme awareness.
