# Design direction

Status: **implemented on every route.** `/`, `/work`, `/projects`,
`/projects/lecture-ai`, `/research`, `/about`, and the 404 all use the same
container, rail, and content columns, plus the global navbar, footer, and chat
widget. There are no per-page containers and no non-token colour values left in
the app layer.

---

## 1. The direction

**Warm paper, blue-black ink, machine-set metadata in the margin.**

The page is built like a technical index rather than a landing page. A warm
off-white ground carries near-black text at a comfortable reading measure, with
every block labelled in the left margin in monospace. Dates, organisations, and
tags are set in mono and aligned into columns, so a reader scanning for "what
has he actually done, and when" gets it from the shape of the page before
reading a word. Hierarchy comes from size and position, not from colour, boxes,
or shadow. There is exactly one accent, and it appears in five places.

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
used on five.

---

## 2. Palette

Two themes, one neutral family, one accent. Every value is a CSS custom
property; nothing in the redesigned surface hardcodes a hex.

### Tokens

| Token | Light | Dark | Used for |
|---|---|---|---|
| `--paper` | `#FBFAF7` | `#12110F` | Page ground. The only background on the page. |
| `--ink` | `#171614` | `#EDEAE3` | Primary text. Also the secondary button's hover fill. |
| `--ink-muted` | `#54514C` | `#A7A39A` | Secondary text: metadata, labels, tags, captions. |
| `--rule` | `#E4E1D9` | `#26241F` | Decorative hairlines between blocks and rows. |
| `--rule-strong` | `#8A8578` | `#6B6459` | Boundaries that carry meaning: input borders, secondary button outline, link underlines. |
| `--accent` | `#1D3A6B` | `#7FA6E3` | Links, active nav, the change bar, the primary button, the current role. Nothing else. |
| `--accent-hover` | `#162E56` | `#9DBBEC` | Link, nav, and primary button hover. |
| `--on-accent` | `#FBFAF7` | `#12110F` | Text on an accent fill. |
| `--on-ink` | `#FBFAF7` | `#12110F` | Text on an ink fill (the secondary button on hover). |

### Contrast — light theme

| Foreground | Background | Ratio | Needs | Result |
|---|---|---|---|---|
| `--ink` #171614 | `--paper` #FBFAF7 | **17.32:1** | 4.5:1 | PASS (AAA) |
| `--ink-muted` #54514C | `--paper` #FBFAF7 | **7.57:1** | 4.5:1 | PASS (AAA) |
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
| `--ink-muted` #A7A39A | `--paper` #12110F | **7.50:1** | 4.5:1 | PASS (AAA) |
| `--accent` #7FA6E3 | `--paper` #12110F | **7.61:1** | 4.5:1 | PASS (AAA) |
| `--accent-hover` #9DBBEC | `--paper` #12110F | **9.66:1** | 4.5:1 | PASS (AAA) |
| `--on-ink` #12110F | `--ink` #EDEAE3 | **15.71:1** | 4.5:1 | PASS (AAA) |
| `--on-accent` #12110F | `--accent` #7FA6E3 | **7.61:1** | 4.5:1 | PASS (AAA) |
| `--ink` #EDEAE3 | `--rule` #26241F | **12.90:1** | 4.5:1 | PASS (AAA) |
| `--rule-strong` #6B6459 | `--paper` #12110F | **3.23:1** | 3.0:1 (non-text) | PASS |
| `--rule` #26241F | `--paper` #12110F | 1.22:1 | — | Decorative only, as above. |

Two adjustments were made to reach these numbers. The `--rule-strong` values
started as light hairline greys and were darkened until they cleared 3:1,
because they outline real controls.

`--ink-muted` was darkened from `#6E6B64` / `#8B8780`, which cleared AA at
5.09:1 and 5.28:1 but were not comfortable to read. AA is calibrated for normal
text; the rail labels this token paints are 11px mono with `+0.09em` tracking,
where the same ratio is meaningfully harder work. Both values now clear **AAA
(7:1)**, the small-text bar.

Weight was considered and rejected: `IBM Plex Mono` is self-hosted at **weight
400 only** (`plex-mono-400.woff2`), so `font-medium` would trigger synthetic
bolding, which smears the outlines and at 11px makes legibility *worse*. A real
500 weight would mean a second font file. Size was not changed either — the
labels are legible at 11px once the contrast is right, and enlarging them would
break the rail width.

The labels still read as secondary: 7.57:1 against `--ink`'s 17.32:1, at a third
of the size, in a different face, in the margin. Hierarchy comes from size and
position, as §1 states — not from making secondary text hard to read.

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
one round trip. `client/index.html` is no longer off limits, so this is now
simply outstanding rather than blocked.

### Scale

Large display against small body, as specified. Sizes are Tailwind `fontSize`
keys, so they are used as `text-display`, `text-body`, and so on.

| Key | Size | Line height | Tracking | Face | Used for |
|---|---|---|---|---|---|
| `display` | `clamp(2.5rem, 6.5vw, 4rem)` | 1.02 | −0.022em | Newsreader | The name. Once per page. |
| `lead` | `clamp(1.25rem, 2.4vw, 1.75rem)` | 1.28 | −0.011em | Newsreader | The positioning line. |
| `h2` | 1.375rem / 22px | 1.25 | −0.01em | Newsreader | Reserved for in-content section headings on interior pages. |
| `h3` | 1rem / 16px | 1.4 | −0.005em | Plex Sans 500 | Reserved for minor headings. |
| `org` | 1.125rem / 18px | 1.3 | −0.006em | Plex Sans 500 | The organisation in an index row. |
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

### Widow control

Set globally in `index.css`, not per component:

| Selector | Property | Why |
|---|---|---|
| `h1, h2, h3, .text-display, .text-lead, .text-h2, .text-h3, figcaption` | `text-wrap: balance` | Evens line lengths across the block, so a heading never drops one trailing word onto a line of its own. Browsers cap balancing at a handful of lines, which is why it is scoped to short text. |
| `p, li, dd` | `text-wrap: pretty` | Leaves earlier lines alone and only avoids a short final line. The right trade for prose, where `balance` would be ignored past the line cap anyway. |
| `.text-label` | `text-wrap: wrap` | Opts the rail labels back out. They sit in a fixed 6rem column where balancing gives worse breaks than simply filling the column. |

Both degrade to normal wrapping where unsupported, so nothing depends on them.
`balance` is broadly supported; `pretty` is newer and **Firefox does not
implement it**, so Firefox users get ordinary wrapping for body copy and
balanced headings.

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
| `--rail-w` | 6rem / 96px | The margin rail. Every route except the homepage. |
| `--rail-w-home` | `clamp(6rem, 15vw, 14rem)` | The homepage rail, applied by `.rail-home`. See below. |
| `--rail-gap` | 2rem / 32px | Rail to content |
| `--measure` | 34rem / 544px | Reading measure (~65ch). **Prose only.** |
| `--page-w` | `clamp(76rem, 84vw, 84rem)` | The page container, centred, border-box, gutter included |
| `--page-gutter` | 2rem / 32px | Container inner padding |

### The grid

The page is **centred and wide**. Two earlier attempts are worth recording
because both failed in instructive ways.

The first was `mx-auto max-w-page` at 46rem. That left a 32.5rem content column
— narrower than `--measure`, so `--measure` could never apply and every
`max-w-measure` in the app was inert.

The second left-anchored the page inside a centred shell. It was genuinely
anchored, but a 712px page on a 1920px display put the entire site in one half
of the viewport with 848px of dead margin beside it, which reads as broken
rather than deliberate.

What was wrong in both cases was the **rail**, not the alignment. At 8.5rem it
spent a third of a narrow page on one 11px mono label. The rail is now 6rem —
still wide enough for `WORK` / `EXPERIENCE` on two lines — and the width it gives
back goes to the content column.

| Viewport | Container | Rail | Content column | Left | Right | Container % | Content % |
|---|---|---|---|---|---|---|---|
| 1440px | 112 → 1328 (1216px) | 96px | **1024px** | 112px | 112px | 84.4% | **71.1%** |
| 1920px | 288 → 1632 (1344px) | 96px | **1152px** | 288px | 288px | 70.0% | **60.0%** |

`--page-w` is a `clamp`, not a literal, so 1440 resolves to the 76rem floor while
wider displays grow to an 84rem ceiling. A single fixed max-width cannot be both
comfortable at 1440 and full at 1920.

#### The homepage rail is wider

The homepage is the one route whose rail holds a photograph rather than an 11px
label, and 96px of photograph is a chat avatar. `.rail-home`, a wrapper around
the whole route, repoints `--rail-w` at `--rail-w-home`:

```css
--rail-w-home: clamp(6rem, 15vw, 14rem);
```

| Viewport | Rail | Content column | Prose |
|---|---|---|---|
| 768px | 115px | 557px | 544px |
| 1024px | 154px | 774px | 544px |
| 1280px | 192px | 928px | 544px |
| 1440px | 216px | **904px** | 544px |
| 1920px | 224px (ceiling) | 1024px | 544px |

**Why a clamp and not a flat 14rem.** The rail exists from `md` (768px) up, and
every pixel it takes comes out of the content column. A flat 224px rail at a
768px viewport leaves `704 − 224 − 32 = 448px` of content — *narrower than
`--measure`*, so prose could no longer reach its own measure, which this section
says must never happen. `15vw` tracks the viewport instead and gives 115px at
768, leaving 557px. That clears 544px by 13px, which makes 768px the binding
constraint on this token, not a comfortable one: anything wider than ~15vw at
the low end starts eating the measure. The 14rem ceiling stops the rail running
away on a large display (it caps out around 1493px), and the 6rem floor means it
can never be narrower than the site-wide rail.

The `<h1>` is capped at `max-w-lead` (54rem/864px) and the content column is
904px at 1440, so the wider rail does not touch the tagline's line breaks —
measured, three lines with either rail at every width from 768 up. Below `md`
the rail collapses and stacks, and the portrait is capped at 9rem so it does not
become a billboard on a phone.

**It is scoped to the route, not to the hero.** Every `Block` reads `--rail-w`,
so widening only the hero would step its content edge 120px right of every
section beneath it and break the single left edge the rail system exists to
draw.

### Spending width without stretching lines

The content column is 1024–1152px, roughly twice a comfortable measure. Prose
must never fill it. The rule:

- **Prose stays at `--measure`.** `<Prose>` enforces this so it cannot be
  forgotten per-component.
- **Structure takes the surplus.** The index row is a real three-column grid
  (organisation / role / date), the impact strip is a four-column band, and the
  technical artifact runs the full column. That is what the extra width is for.

The consequence is a deliberately ragged right edge — paragraphs stop at 544px
while rows and bands run to the full column. That is the intended silhouette,
not an alignment bug.

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
replaces the `fontSize` scale with the nine keys above, maps the colour tokens
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
`org` was added with the index row; the list in `utils.ts` must always match the
`fontSize` block in `tailwind.config.ts`. A `stat` key was documented here for a
long time and existed in neither file, so `text-stat` would have been silently
eaten by `cn()` had anything used it. Nothing did — see the note on `<StatBand>`
in §6.

**`plugins: []`.** `tailwindcss-animate` and `@tailwindcss/typography` were both
registered and neither supplied a class used anywhere — no `animate-in`,
`fade-in`, `zoom-in` or `slide-in` appears in the app, and no `prose` container
exists. Removing them took the built CSS from **29.05 kB to 16.31 kB**. The one
animation on the site is a hand-written `@keyframes nudge-in` in `index.css`, so
nothing depended on the plugin. Do not re-add either without a class that uses
it.

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

Mono, 11px, uppercase, `+0.09em`. The second of the accent's five jobs.

- **Default** — `--ink-muted`
- **Hover** — `--ink`
- **Active route** — `--accent`, plus `aria-current="page"`
- **Focus-visible** — as above

No underline, no bottom border. The old design used a 2px accent border under
the active item, which fought the hairline system.

### Section heading — the rail label

A real heading positioned in the margin: mono, 11px, uppercase, `--ink-muted`.
On an interior index page the rail label *is* the page title, so `Block` takes
`labelAs="h1"` and renders it as the `<h1>` — visually identical, because the
rail label is the heading treatment site-wide and a centred display `<h1>` would
break it. Every route has exactly one `<h1>`.
On the homepage index each label is also a link to the route it indexes, so it
picks up the link hover colour. Below `md` the rail collapses and the label
becomes an eyebrow above the content.

### Index row — `<IndexRow>`

Replaces the card, and now a real three-column index rather than a title with a
date pushed to the far edge.

Three columns from `lg` (1024px) up; below that the row stacks, because at
exactly `md` the middle column would squeeze to ~138px and wrap every role onto
four lines.

| Column | Width | Content | Type |
|---|---|---|---|
| 1 | `minmax(0, 15rem)` | **Organisation or artifact** — SP Digital, KPMG, Lecture AI | `text-org`, Plex Sans 500, `--ink` |
| 2 | `minmax(0, 1fr)` | Role · location, then tags beneath | `text-small` `--ink-muted`, tags `text-label` |
| 3 | `auto`, right-aligned | Date | `text-meta` mono, tabular |

**The organisation is the headline.** It previously sat in 14px muted grey
*below* the job title, subordinate to it — which inverted what a recruiter
actually scans for. Putting it in column one at 18px means the left edge of the
content column reads as a list of places, and the dates still align down column
three. No copy changed; only which string occupies which slot.

Separated by a `--rule` hairline, `s3` padding-y. No radius, no shadow, no lift.

**The row body.** Interior pages carry descriptions and links that the homepage
index deliberately omits. Those go in `children`, which renders inside column two
capped at `--measure` — so the organisation column stays a clean scannable list
on every page, and the row's three-column head is identical everywhere.

### Pairing blocks — the /about band

A block normally fills its content column. Two do not: `About Me` and
`Education` are both short, and each alone left prose at `--measure` with ~480px
of void beside it, while `Quick Highlights` and `Leadership` below filled the
column completely. Measured, that was 52% and 54% against 98% and 100% — the
page read as two different pages stacked.

They now share one block as a two-column band:
`lg:grid-cols-[var(--measure)_minmax(0,1fr)]`. The left column is exactly the
measure (544px) and Education takes the surplus (448px). Below `lg` they stack.

This is the standing rule applied, not bent — no line of prose got wider, and
nothing on any other page moved. The cost is one rail label: a block has one
rail, so Education's heading sits inline in its own column in the same 11px mono
the rail would have used. `/about` carries **four rail labels for five
sections**, and that is the only place on the site where a section heading is not
in the margin.

Reach for this only where two short blocks genuinely belong together. The
alternative — centring prose inside its column — was rejected: it would move
every page lead ~240px right and break the single left edge the rail system
depends on.

### Three things that are not lists

Not every section is a set of records with an organisation and a date. Three
resisted `IndexRow`, and each borrows the row's *type hierarchy* without its
grid rather than inventing a new treatment:

- **Education** is a single record: one degree, one metadata line, a list of
  notes. Its `meta` string combines the dates and the minor in one sentence, so
  splitting it into a date column would be a copy edit. The degree is set at
  `text-org` like an organisation, the metadata in mono like a date, and the
  notes are hairline rows beneath.
- **Quick Highlights** are six standalone sentences with no organisation, date,
  or role — nothing to put in three columns. They keep the hairline row rhythm in
  a two-column grid. Each item takes `border-t`, not `border-b`, because a top
  border aligns across each grid row regardless of how the text wraps.
- **Contact** is a set of labelled values. Each is a mono caption over a linked
  address — the rail-label-over-content shape, one level down.

### Impact strip — `<StatBand>`

**Not implemented.** No `StatBand`, no `Placeholder`, and no `content/impact.ts`
exist in the app, and no route renders an impact strip. The `stat` type key this
section depended on has been removed from §3 because it was never added to
`tailwind.config.ts` or `utils.ts` either. What follows is the design as
specified, kept as a brief for if it gets built — not a description of the code.

Three or four large numerals with small mono labels beneath, in a four-column
band. Large figures against small labels is the highest contrast per pixel
available without photography: the numeral carries at a glance, and the label
only has to be legible once the eye has already stopped.

Numerals would be Newsreader at a display size; labels are `text-label` mono uppercase
`--ink-muted`. Unfilled entries carry `placeholder: true` and render in
`--rule-strong` under a dashed rule, so a blank slot is impossible to miss.

### Technical artifact — `<Artifact>`

A code block or architecture diagram: hairline `--rule-strong` border, mono
`text-meta`, optional mono caption below a `--rule` divider. `overflow-x: auto`
on the `<pre>`, so a wide diagram scrolls inside its own box rather than widening
the page. For an AI engineering portfolio this is what evidences depth, and it
needs no photography.

### Placeholder — `<Placeholder>`

A slot whose copy has not been written: dashed `--rule-strong` border, mono
`text-meta`, prefixed with the literal word PLACEHOLDER in `--rule-strong`.
Capped at `--measure` so it previews where the real prose will sit.
Deliberately conspicuous — these must not survive to production by being
quietly forgettable.

### Prose — `<Prose>`

Body copy at `--measure`. Exists so the cap is structural rather than a
`max-w-measure` that each component has to remember.

### Theme toggle — `ThemeToggle`

`LIGHT / DARK` in 11px tracked mono inside a hairline `--rule-strong` box. The
active theme is `--ink`, the inactive is `--ink-muted` — the same pair the nav
uses for active and inactive routes.

It replaced a lucide sun/moon glyph in a 36px square, which was the one control
on the page belonging to no part of this system: it carried an icon set used
nowhere else, and it stated its state ambiguously (does a sun mean "you are in
light" or "switch to light"?). The word pair states both where you are and what
the click will do. `aria-label` carries the action, and dropping the two icons
removes them from the bundle.

### Chat widget

Stays a corner widget. Restyled, not rebuilt — every behaviour (rate limiting,
cooldown, the once-per-session nudge, error copy) is untouched.

- **Launcher** — 48px square, 2px radius, hairline `--rule-strong` border on
  `--paper`, containing the letters **AI** in 11px tracked mono — the same
  treatment as the nav items and the theme toggle. Not an icon: a speech bubble
  is the universal mark for human customer support, which is exactly what this is
  not, and the conventional alternatives (sparkles, a robot face) are the
  gimmick. Was a 64px purple-gradient circle with a sparkle icon and a permanent
  pulse animation. Hover inverts to an ink fill. The widget is named **My AI** in
  the panel header, the nudge, and the speaker labels.
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
| Index row (linked) | mono `→` fades into the left gutter, row hairline `--rule` → `--ink`, underline → `--accent` | 2px accent outline | — | — |
| Index row (no destination) | **nothing** | — | — | — |
| Theme toggle | border → `--ink` | 2px accent outline | active half is `--ink` | — |
| Primary button | fill → `--accent-hover` | 2px accent outline | — | — |
| Secondary button | border → `--ink`, fills and inverts | 2px accent outline | — | — |
| Icon button | background → `--rule`, colour → `--ink` | 2px accent outline | — | — |
| Chat input | — | border → `--accent` via `focus-within` | — | `opacity-30`, `cursor-not-allowed` |
| Chat chip | border → `--ink`, colour → `--ink` | 2px accent outline | — | — |

### The row hover, and why it earns its place

One pattern, used on every index row on the site. Hovering a row that leads
somewhere slides a mono `→` into the left gutter and promotes the row's own
hairline from `--rule` to `--ink`. Rows with no destination do not react at all.

The restraint argument is that this is not decoration: it carries information no
static state does. Only some rows are links — the two that resolve to
`/projects/lecture-ai` — and nothing else on the page distinguishes them, because
underlining every title would make the index look like a link farm. The hover is
therefore *what teaches which rows are clickable*, and the arrow says which
direction the click goes. The hairline promotion reuses the system's existing
vocabulary rather than introducing a fill, a shadow, or a lift, all of which §1
rules out.

All transitions are 150ms. `prefers-reduced-motion: reduce` collapses every
animation and transition to 0.01ms globally, which flattens the arrow's fade to
an instant appearance rather than removing the affordance.

Two accessibility fixes came along with the restyle. The mobile menu now
unmounts when closed instead of being hidden with `max-h-0 opacity-0`, so its
links leave the tab order — previously a keyboard user tabbed through five
invisible links. And nav items carry `aria-current="page"`, so the active route
is announced rather than only coloured.

---

## 8. The signature: the margin rail and the change bar

Every block on the page is a two-column grid: a fixed rail on the left carrying
a monospace label, and the content hanging to its right. Hairlines span both
columns. The rail is 96px on every interior route; the homepage widens it to
`clamp(6rem, 15vw, 14rem)` because its first rail slot holds a photograph (§4).

Almost every rail slot on the site holds the same kind of object — a mono label.
The homepage hero is the one exception: it holds the portrait, with the mono
fact block beneath it, which is why `Block` takes a `rail` prop for arbitrary
content at all. The left edge is still one unbroken column from the masthead to
the last section, because the rail's *origin* does not move — only its width.

**The opening statement.** The page leads with the positioning line at
`text-display`, set wide at `max-w-lead` (54rem). The name is set in the rail
label's treatment — 11px mono, uppercase, muted — but it sits at the top of the
*content* column rather than in the rail, because the rail is occupied by the
portrait. It is marked up as a `<p>`, not a heading: the `<h1>` is the
positioning line beneath it, and a heading above the h1 would invert that. Previously the name was the largest thing on
the page, which spent the display slot on a fact the navbar already states and
the tab title repeats. The `<h1>` is now the positioning line.
No copy changed; only which string occupies which slot.

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

The accent's jobs, in full:

| # | Job | Instances per page |
|---|---|---|
| 1 | Links | as many as there are links |
| 2 | The active nav item | 1 |
| 3 | The change bar | 1 |
| 4 | The primary button fill | 1 |
| 5 | **The current role** — the organisation name of the role I hold now | **1** |

Job 5 is the newest and the most load-bearing: it is the one thing on the
homepage that answers "what is he doing *now*" before any reading happens. Two
roles carry `isCurrent`, so the mark goes to the most recent only — colouring
both would make it a category rather than a pointer.

It is set as coloured text with no underline, so it cannot be mistaken for a
link, and it is the only coloured item in that region of the page.

Nothing else is coloured. Jobs 3 and 4 remain the only non-text uses.

**One vertical rhythm down the left.** The portrait is `--rail-w` square, so it
occupies the rail exactly, and every rail item — portrait and all four section
labels — shares one left edge at `--page-w`'s origin. Two things previously broke
that: the rail cell carried a `0.3rem` nudge that optically centres an 11px mono
label against its first line of content, which pushed the portrait 4px below the
name's cap-height; and the change bar's `-ml-s4 … pl-s4` did not account for its
own 2px border, so the one block that carries it sat 2px right of every other
rail item. The nudge is now skipped for arbitrary rail content, and the change
bar's offset covers the border. Measured after: portrait and all four labels
share one left edge, and the portrait's top edge lands on the cap height of the
`<h1>`'s first line to within 0.02px.

That alignment is not eyeballed. `--display-cap-offset` in `index.css` carries
the signed distance from a `text-display` element's border-box top to its cap
top, as a fraction of the font size, measured in the browser with a baseline
strut and a pixel scan of flat-topped capitals rather than read off font tables.
At line-height 1.02 Newsreader's own ascent and descent slightly exceed the line
box, so the half-leading is negative and the cap top sits *above* the box top —
the offset is `-0.01333`, and getting its sign wrong is the easy mistake.
`.hero-rail-offset` adds that to the name label's line box and the `s3` gap
below it. It carries its own `md` media query, because it is a hand-written
class and not a Tailwind utility: `md:hero-rail-offset` compiles to nothing.

---

## 9. Known gaps

- Font preloading is not set up (see §3).
- **Unfilled placeholders.** The impact strip carries four, and the Lecture AI
  case study carries four more (challenge, my role, key-decision rationale,
  architecture artifact). Each is conspicuous by design and none should reach
  production.
- `theme-color` follows the OS rather than the in-page toggle (see §2).
- **Orphaned vendor components.** `ui/badge.tsx` and `ui/card.tsx` have zero
  importers now that the four cards and `not-found` are gone. The toast stack —
  `ui/toast.tsx`, `ui/toaster.tsx`, `hooks/use-toast.ts`, and the `<Toaster />`
  in `App.tsx` — has no caller anywhere: nothing in the app raises a toast. All
  of it can be deleted; it was left in place because it was outside the scope of
  the rollout. `ui/toast.tsx`'s hardcoded `red-*` classes were repointed at the
  `--destructive` tokens in the meantime, so nothing hardcodes a colour today.
