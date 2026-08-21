import type { ResearchItem } from "./types";

export const research: ResearchItem[] = [
  {
    slug: "medanta-telemedicine-research",
    title: "Research Intern & Author",
    organization: "Medanta Hospital, Gurugram",
    dates: "Dec 2021 – Nov 2022",
    description:
      'Contributed to telemedicine research during the COVID-19 pandemic by testing early prototypes with clinicians and collecting user feedback. Authored peer-reviewed paper titled "The Future of Telemedicine in India."',
    tags: ["Healthcare", "UX Research", "Writing", "Telemedicine"],
  },
];

/**
 * Which research the homepage shows, named one slug at a time.
 *
 * Deliberately *not* derived from `research` by recency: what belongs on the
 * front page is an editorial call about what represents the work best, and
 * recency kept answering it by accident. Adding a slug here is the whole
 * gesture; the record itself stays defined once, above.
 *
 * A slug with no matching record is dropped rather than crashing the page, and
 * an empty list means the homepage renders no research section at all — no
 * heading, no rail label, no hairline. That is the same property `projectGroups`
 * gives an empty project group, and it lives here for the same reason: it
 * belongs to the content model, not to whichever page happens to read it.
 */
const HOME_RESEARCH_SLUGS: string[] = [];

export const homeResearch = HOME_RESEARCH_SLUGS.map((slug) =>
  research.find((r) => r.slug === slug),
).filter((item): item is ResearchItem => item !== undefined);
