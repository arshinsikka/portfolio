# Portfolio Site

## About the owner
Arshin Sikka. Year 3 Computer Science at NUS, AI focus. This site is a
personal portfolio aimed at recruiters, hiring managers, and collaborators.

## Current phase
**Content.** The design phase is finished. The design system in docs/DESIGN.md
is applied across every route — `/`, `/work`, `/projects`,
`/projects/lecture-ai`, `/research`, `/about`, and the 404 — plus the navbar,
footer, and chat widget. There are no per-page containers and no non-token
colour values left in the app layer.

The work now is writing and expanding the copy. Until I say a specific piece of
copy is being rewritten, existing copy still survives verbatim: do not edit,
reword, or "improve" it on your own initiative. Re-slotting an existing string
into a different component is fine and is not a copy change; changing the words
is.

The site currently carries eight deliberate placeholders — four in the homepage
impact strip and four in the Lecture AI case study. They are styled to be
conspicuous. None should reach production. docs/CONTENT-PLAN.md maps what each
one needs.

## Working rules
- I am not a professional developer. I supervise and verify. Explain
  what you changed and why, in plain terms.
- Never run git commit or git push. I do those myself.
- Never deploy. Never touch Vercel settings.
- Before any multi-file change, state your plan and wait for me to
  approve it.
- If a requirement is ambiguous and the answer meaningfully changes the
  outcome, ask. Do not guess and proceed.
- After changes, tell me the exact command to run the dev server and
  exactly what to look at to verify.

## Design intent
The current design reads as AI-generated. Specifically avoid: purple-to-blue
gradient headings, dark navy/slate default backgrounds, centered hero with
a row of pill buttons, Inter/Roboto/system font stacks, generic card grids.
Aim for something that looks like a person with taste made deliberate choices.

## Design system
docs/DESIGN.md is authoritative for colour, type, spacing, and component
specs. Read it before any styling work. Do not introduce colours, fonts,
or spacing values that are not in it.

Two traps it documents that are easy to reintroduce:
- Any new key added to the `fontSize` scale in tailwind.config.ts must also be
  declared in client/src/lib/utils.ts, or `cn()` silently eats the class.
- Prose is capped at `--measure`. The content column is roughly twice that
  width; the surplus is spent on structure (index-row columns, the impact band),
  never on longer lines.

## Content model
All copy lives in client/src/content/ as typed data — profile.ts, roles.ts,
projects.ts, research.ts, leadership.ts, impact.ts. Components read from there;
nothing in content/ imports a component, and no JSX or icon lives in a content
file. Add copy by editing those files, not by putting strings in components.

## History
docs/AUDIT.md is the original codebase audit. **It is historical and describes a
codebase that no longer exists.** It predates the Express server removal, the
shadcn purge, the routing work, and the entire design system. Do not use it to
reason about current structure — read the code and docs/DESIGN.md instead. It is
kept only as a record of where the project started.
