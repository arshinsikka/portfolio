import type { ResearchItem } from "./types";

export const research: ResearchItem[] = [
  {
    slug: "oulad-early-warning-research",
    title: "Predicting Who Drops Out, and the Metric That Couldn't Tell",
    organization: "Independent",
    dates: "Aug 2026",
    description:
      "I built a model to predict which university students would drop out of a course. It ranked students by risk well, but the scoring rule I'd committed to in advance could barely tell it apart from simply flagging every student. I also found that the usual way of monitoring a model for drift would have missed its decline, and my attempt to test whether reaching out to students actually helps failed its own validity check.",
    tags: ["Machine Learning", "Evaluation", "Pre-registration", "Causal Inference"],
    projectSlug: "oulad-early-warning",
  },
  {
    slug: "ofi-regime-tradability-research",
    title: "Does a Known Market Signal Survive the Cost of Trading It?",
    organization: "Independent",
    dates: "Aug – Nov 2026",
    description:
      "There's a signal traders use: when there are more buy orders than sell orders on an exchange, the price usually ticks up. I tested whether you can actually make money on it once you pay the trading fees. You can't, and that held again three months later on data I hadn't seen. Writing the whole method down before looking at any data is how I caught a result that looked real but came from the maths, and how two promising leads got tested properly instead of reported.",
    tags: ["Market Microstructure", "Pre-registration", "Statistics"],
    projectSlug: "ofi-regime-tradability",
  },
  {
    slug: "singapore-society-simulation-research",
    title: "Singapore Society Simulation",
    organization: "National University of Singapore",
    dates: "2026",
    description:
      "I gave AI agents real demographic profiles and had them argue about a policy question, to see whether they'd reason like the actual population does. They didn't. And when I changed the mix of people in the simulation, the group's conclusion moved a lot.",
    tags: ["LLM Agents", "Social Simulation", "Policy"],
    projectSlug: "singapore-society-simulation",
  },
  {
    slug: "medanta-telemedicine",
    title: "Telemedicine — Is It Going to Stay in India?",
    organization: "Medanta Hospital",
    dates: "2022",
    description:
      "At Medanta Hospital I worked with doctors on a telemedicine platform that had become essential almost overnight during the pandemic, testing it and collecting their feedback on what would make it work better for them and their patients. That led to a published paper on whether telemedicine would last once the pandemic stopped forcing it. It draws on a year of the hospital's telemedicine data plus doctor and patient surveys, looks at how well it worked across specialties and whether it reached people outside the big cities, and covers the government's role, including the Telemedicine Practice Guidelines.",
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
