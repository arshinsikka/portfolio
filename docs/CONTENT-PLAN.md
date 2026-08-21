# Content plan

A map of what exists, what is missing, and what to write first. **No copy is
drafted here.** Every figure below was measured from the content files, not
estimated.

Method: `client/src/content/*.ts` was executed and every field measured for
presence and length. Word counts are whitespace-delimited; character counts
include spaces. Asset paths were checked against `client/public/`.

`docs/CONTENT-TODO.md` **does not exist** — nothing to merge from it. Gaps
flagged in earlier phases are carried into §6 below.

---

## 1. Field inventory

### Roles — `roles.ts` (5 records)

| Company | Title | Description | Tags | Links | Current | Detail page |
|---|---|---|---|---|---|---|
| SP Digital | Data Science Intern | 32w / 271c | 4 | **0** | ● | — |
| Lecture AI | Co-Founder | 35w / 272c | 5 | 2 | ● | `lecture-ai` |
| KPMG | AI Labs Intern | 37w / 269c | 4 | **0** | — | — |
| AlygnAI | SDE Intern | 28w / 203c | 4 | **0** | — | — |
| StatusNeo | SWE Intern | **22w / 149c** | 4 | **0** | — | — |

Every field is filled. The pattern to note is uniformity: all five descriptions
sit between 22 and 37 words — one dense paragraph each, no variation in depth
between the current role and a 2024 internship. Four of five have no links.

### Projects — `projects.ts` (8 records)

| Title | Tier | Detail | Summary | Body | Tags | Links | Accolades | Role |
|---|---|---|---|---|---|---|---|---|
| Lecture AI | featured | **●** | 29w / 195c | 3 paras / 585c | 6 | 3 | 2 | Co-Founder |
| AI Architecture Strategy Engine | standard | — | 28w / 219c | **0** | 4 | 1 | 0 | Developer |
| LLM Evaluation Framework | standard | — | 19w / 177c | **0** | 4 | 1 | 0 | Developer |
| TrackUp | minor | — | 18w / 140c | **0** | 4 | **0** | 0 | Developer |
| Pediatric Tendon Stapler | minor | — | 31w / 239c | **0** | 3 | **0** | 0 | Product Designer |
| MarkBind Contributions | minor | — | 19w / 146c | **0** | 4 | **0** | 0 | Open Source Contributor |
| Donation Nation | minor | — | 28w / 217c | **0** | 3 | **0** | 0 | Founder |
| **ChessPhere** | minor | — | **3w / 24c** | **0** | **0** | **0** | 0 | **absent** |

Lecture AI is the only record with a `body`. The other seven have `body: []`, so
they can never have a detail page without new writing.

Lecture AI's `body[0]` is a **verbatim duplicate** of `summary`. The case study
uses one of them and skips the other; if you rewrite, they can diverge or the
duplicate can be dropped.

### Research — `research.ts` (1 record)

| Organisation | Title | Description | Tags | Links |
|---|---|---|---|---|
| Medanta Hospital, Gurugram | Research Intern & Author | 28w / 214c | 4 | **0** |

One record is the whole section. The Medanta entry names an authored paper —
*"The Future of Telemedicine in India"* — with **no link to it**. A peer-reviewed
publication that cannot be clicked is the single largest unrealised credibility
item in the content set.

### Leadership — `leadership.ts` (5 records)

| Organisation | Title | Description | Tags | Cross-ref |
|---|---|---|---|---|
| NUS Student Union (NUSSU) | Director of Human Resources | 30w / 256c | 3 | — |
| NUS Entrepreneurship Society (NES) | Operations Executive | 25w / 204c | 3 | — |
| India / NUS | Professional Chess Player & Team Captain | 36w / 262c | 4 | — |
| Donation Nation | Founder | **none** | 3 | `donation-nation` |
| Pediatric Tendon Stapler · NUS iDP | Product Designer | **none** | 3 | `pediatric-tendon-stapler` |

The last two intentionally carry no description — the canonical copy lives on the
project record — but nothing surfaces that copy on `/about`, so both render as a
bare title, date, and tags. See §4.

### Profile — `profile.ts` (singletons)

| Field | Length | Notes |
|---|---|---|
| `hero.tagline` | 11w / 76c | The `<h1>`. Carries the whole positioning. |
| `hero.intro` | 24w / 145c | |
| `lookingFor.body` | 28w / 202c | |
| `about.paragraphs[0]` | 30w / 193c | |
| `about.paragraphs[1]` | 30w / 171c | |
| `education.degree` | 65c | |
| `education.meta` | — | `"Aug 2023 – May 2027 · Minor in Psychology"` — dates and minor fused in one string. Splitting them would let Education use the standard row grid. |
| `education.notes` | 1 note, 31w / 216c | The TA role. Only note in the array. |
| `highlights` | 6 items, 5–8w each | |
| `contact.subtitle` | 79c | |
| `sectionCopy.work.subtitle` | 10w / 90c | Renders as the page lead on `/work` |
| `sectionCopy.projects.subtitle` | 10w / 72c | Page lead on `/projects` |
| `sectionCopy.research.subtitle` | 12w / 104c | Page lead on `/research` |
| `sectionCopy.leadership.subtitle` | 8w / 74c | Section lead on `/about` |

**Declared but never rendered** (dead fields — either write a use or delete):

- `hero.availabilityTitle` = `"Available for opportunities"`. Nothing renders it.
  The live status claim on the page is `lookingFor.leadIn` instead.
- `SITE_URL`. Declared as the provisional Vercel URL with a comment saying the
  real domain does not resolve — but nothing imports it, and `index.html`
  independently hardcodes `https://arshinsikka.com` in `canonical`, `og:url`, and
  `og:image`. Two sources of truth, neither used by the other.
- `Accolade.tone` (`"amber" | "purple"`). Vestigial from the deleted coloured
  pills; accolades now render as plain tags.

---

## 2. Placeholders currently live on the site — 8 slots

All eight render with a dashed hairline and the literal word PLACEHOLDER.

### Impact strip — 4 slots

**File:** `client/src/content/impact.ts` · **Renders:** homepage, full-width band
between "Open to opportunities" and Work Experience. Currently shows `000` four
times, roughly 200px below the `<h1>`.

Each slot needs a `value` (the figure, as it should read) and a `label` (2–4
words). Drop `placeholder: true` once filled.

Figures that already exist elsewhere in your content, with exact sources — these
are candidates, not decisions:

| Figure | Exact source sentence | File |
|---|---|---|
| `400+` | "Built evaluation infrastructure with **400+ adversarial prompts**…" | `roles.ts` SP Digital |
| `~60%` | "…reducing unsafe model responses by **~60%**." | `roles.ts` SP Digital |
| `~40–50%` | "…reducing knowledge lookup time by **~40–50%** for 12+ person teams." | `roles.ts` KPMG |
| `<15 min` / `<$1` | "…structured bilingual study notes in **<15 minutes** for **<$1**." | `roles.ts` Lecture AI |
| `72%` | "**72%** of surveyed NUS students rewatch lectures…" | `projects.ts` Lecture AI |
| `693` | "Runner-up in FIDE-rated tournament with **693 participants**." | `leadership.ts` chess |
| `100+` | "…onboarding and feedback systems supporting **100+ student leaders**…" | `leadership.ts` NUSSU |

**Why these were not auto-filled.** The figures are verbatim, but no existing
sentence supplies a short label. The only literal fragment beside `~60%` is
"unsafe model responses", which renders as **"~60% / UNSAFE MODEL RESPONSES"** —
reading as *60% of responses are unsafe*, the opposite of the claim. Same failure
for `~40–50%`. The label has to be written, and it has to carry the direction of
the change.

### Lecture AI case study — 4 slots

**File:** `client/src/pages/project-detail.tsx` · **Renders:** `/projects/lecture-ai`

| ID | Section | What it needs |
|---|---|---|
| **C1** | The Challenge | The problem the project set out to solve, 2–3 sentences. The opening sentence of the existing "Key stats:" paragraph ("72% of surveyed NUS students rewatch lectures due to missed content.") is a candidate to split out — it is currently filed under Results but reads as the challenge. |
| **C2** | My Role | What you owned versus what the team owned. The record supplies only `role: "Co-Founder"`, which is a title, not a scope. |
| **C3** | Key Decisions | The existing "Built with:" paragraph lists Whisper, Gemini 2.0 Flash, slide-context RAG, FastAPI, python-docx — a stack, not decisions. This needs the tradeoff behind each: why Gemini Flash, why no vector DB, why python-docx. |
| **C4** | Architecture | A plain-text pipeline diagram or a representative code excerpt. Renders in the `Artifact` component: monospace, hairline border, scrolls inside its own box. Needs no image. |

---

## 3. What each page shows

| Route | Records shown | Depth shown |
|---|---|---|
| `/` | 3 of 5 roles, 3 of 8 projects, 2 of 2 research | Titles, dates, tags only — no descriptions, by design |
| `/work` | 5 of 5 roles | Full descriptions + links |
| `/projects` | 8 of 8, in 3 tiers | Summaries + accolades + links |
| `/projects/lecture-ai` | 1 project | Case study, 6 sections, 4 placeholders |
| `/research` | 2 of 2 | Full descriptions |
| `/about` | About, Education, Quick Highlights, Leadership (5), Contact | Full |
| 404 | — | Heading, one line, homepage link |

---

## 4. Where it is thin — named records

**Critically thin**

- **ChessPhere** (`projects.ts`) — summary is three words, `"chess community
  platform"`. No `role`, no tags, no links, date is `"2020"` with no month. It is
  the only project with an absent role and the only one with zero tags. On
  `/projects` it renders as a title, a bare year, and nothing else. It is
  currently the weakest row on the site.
- **Impact strip** — four `000`s roughly 200px below the homepage `<h1>`. An
  unfilled figure reads worse than no figure at all.

**Thin: one line where a paragraph would fit**

- **StatusNeo — SWE Intern** (22w / 149c). Shortest role description by a third.
- **TrackUp** (18w) and **MarkBind Contributions** (19w) — the two shortest real
  project summaries.
- **LLM Evaluation Framework** (19w). Notably thin *given its subject*: the site
  positions you on measurement and evaluation, and this is the record that most
  directly evidences it.

**No description at all**

- **Donation Nation** and **Pediatric Tendon Stapler** in `leadership.ts`. Both
  point at a project record via `projectSlug`, but `/about` does not resolve the
  cross-reference, so both rows show title + date + tags and stop. Either surface
  the project's summary through the cross-ref (a code change, no writing) or give
  them their own leadership-angle description.

**No links**

- 4 of 5 roles (all but Lecture AI).
- 6 of 8 projects — everything except Lecture AI and the two standard projects.
- **Both** research records. Including the Medanta entry that names a published
  paper.

**No dates beyond a year**

- ChessPhere: `"2020"`. Every other record has a month range.

**Broken asset references** (these render as live links today)

- `/assets/Lecture_AI_Pitch_Deck.pdf` — referenced from `projects.ts` as a
  "Pitch Deck" link, shown on `/projects` and the Lecture AI case study.
  **The file does not exist in `client/public/assets/`.** It 404s.
- `/og-image.png` — referenced by `og:image` and `twitter:image` in
  `index.html`. **Does not exist.** Every link shared to LinkedIn, Slack, or
  WhatsApp currently previews with no image.

---

## 5. `hasDetailPage: false` — promotion assessment

Seven projects. A detail page needs six sections (overview, challenge, role,
decisions, results, links); all seven have `body: []`, so the question is how
much raw material exists to write from.

| Project | Material available | Verdict |
|---|---|---|
| **LLM Evaluation Framework** | 19w summary, public GitHub repo, on-thesis subject | **Best candidate.** Everything except the summary must be written, but the repo is the source material and the subject is exactly what the site claims you do. |
| **AI Architecture Strategy Engine** | 28w summary, public GitHub repo, multi-agent + tradeoff framing | **Strong second.** Same shape. Its "choose between prompting, RAG, fine-tuning under budget/latency/quality constraints" framing pairs naturally with the evaluation framework. |
| **Pediatric Tendon Stapler** | 31w summary — the richest of the minors. Real stakeholder process, iterations, a showcase | **Possible, but blocked.** It is a hardware/design story and would carry mostly on photographs, which are deferred. Written-only it loses most of its force. |
| **Donation Nation** | 28w summary, founder role, logistics/scale angle | **Possible.** Nothing to link, no repo. Would be written entirely from memory. |
| **MarkBind Contributions** | 19w summary, CP3108B context | **Not yet.** Would become strong if individual PRs were linked — that is a link-gathering task, not a writing task. Do the links first and reassess. |
| **TrackUp** | 18w summary, Java CLI, TDD | **No.** Coursework-shaped. A case study would flatter it beyond what it is. |
| **ChessPhere** | 3 words, 2020, no role, no tags | **No.** 100% from scratch, and five years old. |

**Recommendation:** promote **two**, not seven — LLM Evaluation Framework and AI
Architecture Strategy Engine. Two strong case studies alongside Lecture AI gives
three, which is enough to establish a pattern. Seven thin ones would dilute the
one good page you have.

---

## 6. Gaps carried forward from earlier phases

Not content, but they sit on content surfaces and will bite during the rewrite.

1. **`Lecture_AI_Pitch_Deck.pdf` is missing** — live 404 (see §4).
2. **`og-image.png` is missing** — no social preview on any share (see §4).
3. **Domain is unresolved.** `profile.ts` says `arshinsikka.com` does not resolve
   and points `SITE_URL` at Vercel; `index.html` hardcodes `arshinsikka.com` in
   `canonical`, `og:url`, and `og:image` anyway. Pick one and make `index.html`
   read from it.
4. **`theme-color` follows the OS, not the in-page toggle.** Cosmetic.
5. **Font preloading is not set up** (DESIGN.md §3).
6. **Three dead content fields**: `hero.availabilityTitle`, `SITE_URL`,
   `Accolade.tone` (see §1).
7. **`education.meta` fuses dates and minor**, which is why Education cannot use
   the standard row grid (DESIGN.md §6). Splitting it is a content decision.
8. **`projects.ts` `body[0]` duplicates `summary`** on Lecture AI.
9. **Resume PDF is a separate content surface.** `Arshin_Sikka_Resume.pdf` exists
   and is linked from the hero and the "Open to opportunities" block, but it is
   not in the content model and will drift from the site copy as you rewrite.

---

## 7. Write order — by impact on a 30-second read

The test: a recruiter opens `/`, reads the headline, scans down, maybe clicks
once. Ordered by what that person hits, weighted by how bad the current state is.

**Tier 1 — visible damage, fix first**

1. **The four impact figures.** Highest position of anything unfilled, and `000`
   actively costs credibility rather than merely missing an opportunity. Four
   values and four 2–4 word labels. Smallest writing job on this list, largest
   effect.
2. **ChessPhere — fill or remove.** Three words on a live page. Deciding to drop
   it is a legitimate and faster fix than writing it.
3. **The missing pitch deck and OG image.** Not writing. A dead download link and
   a blank social preview are both hit before anyone reads a sentence.

**Tier 2 — the one click they make**

4. **Lecture AI case study, C1–C4.** It is the only detail page, linked from both
   `/` and `/projects`, and the site's strongest asset. Four placeholders on it.
   Do **C3 (Key Decisions)** first — a stack list is what every portfolio has;
   the tradeoff reasoning is what distinguishes one.
5. **SP Digital role description.** The current role, and the one thing carrying
   the accent mark on both `/` and `/work`. It is the same 32 words as a 2024
   internship. It should be the deepest record you have.

**Tier 3 — depth where it is claimed**

6. **LLM Evaluation Framework summary**, then promote it to a case study. The
   site's positioning is measurement; this is the thinnest record on that exact
   claim.
7. **Research links** — especially the Medanta paper. A named publication with no
   link is unrealised credibility, and adding a URL is not writing.
8. **AI Architecture Strategy Engine** — expand, then promote.

**Tier 4 — completeness**

9. Role links for SP Digital, KPMG, AlygnAI, StatusNeo (where anything public
   exists).
10. The two leadership records with no description — or wire up the `projectSlug`
    cross-reference so the project summary surfaces there.
11. StatusNeo, TrackUp, MarkBind summaries.
12. MarkBind PR links, then reassess promotion.

**Deliberately not on this list:** the hero tagline, hero intro, `lookingFor`
body, and the two About paragraphs. All are filled, all are the right length for
their slot, and all read fine. Rewriting them is optional; everything above is
not.
