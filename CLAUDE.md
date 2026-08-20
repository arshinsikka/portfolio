# Portfolio Site

## About the owner
Arshin Sikka. Year 3 Computer Science at NUS, AI focus. This site is a
personal portfolio aimed at recruiters, hiring managers, and collaborators.

## Current phase
Frontend and information architecture rework only. Content is being
replaced later and is NOT to be edited, rewritten, or "improved" during
this phase. Treat all existing copy as placeholder that must survive
verbatim unless I explicitly say otherwise.

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

## Current phase
Phase 3, design. The homepage, navbar, and footer use the new system.
/work, /projects, /research, /about, and project-detail are still on the
old design and will look inconsistent. That is expected.

## History
docs/AUDIT.md is the original codebase audit. Parts of it are outdated,
it was written before the Express server, shadcn purge, and routing work.
Treat it as history, not current state.