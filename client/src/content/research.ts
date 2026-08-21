import type { ResearchItem } from "./types";

export const research: ResearchItem[] = [
  {
    slug: "ofi-regime-tradability-research",
    title: "Does a Known Market Signal Survive the Cost of Trading It?",
    organization: "Independent",
    dates: "Aug 2026",
    description:
      "A pre-registered study testing whether a well-documented order-flow signal stays profitable once you account for the cost of trading on it. It doesn't. The protocol was committed before any analysis code existed, which is the only reason I caught the most striking result I found being an artifact rather than a finding.",
    tags: ["Market Microstructure", "Pre-registration", "Statistics"],
    projectSlug: "ofi-regime-tradability",
  },
  {
    slug: "singapore-society-simulation-research",
    title: "Singapore Society Simulation",
    organization: "National University of Singapore",
    dates: "2026",
    description:
      "Whether AI agents grounded in real demographic data can predict how a population reasons about a policy question. They diverged substantially from what real people said in public discussion, and changing the demographic mix of the agents moved the collective conclusion by a large margin. Supervised research, presented at a school showcase.",
    tags: ["LLM Agents", "Social Simulation", "Policy"],
    projectSlug: "singapore-society-simulation",
  },
  {
    slug: "medanta-telemedicine",
    title: "Telemedicine — Is It Going to Stay in India?",
    organization: "Medanta Hospital",
    dates: "2022",
    description:
      "I spent an internship working with clinicians on a telemedicine platform that had gone from a convenience to essential infrastructure almost overnight. Watching doctors use it, and hearing what frustrated them, turned into a question worth studying: would any of this survive once the pandemic stopped forcing the issue? I wrote the paper on that, using a year of the hospital's telemedicine data alongside surveys of both doctors and patients, looking at effectiveness across specialties and at whether access actually reached people outside major cities. I was the author, and it was published. The part I found most interesting was that adoption wasn't a technology problem. Where it worked, it was because regulation and clinician habit had moved too, and where it didn't, better software wouldn't have fixed it.",
    tags: ["Telemedicine", "Healthcare", "Published Paper"],
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
