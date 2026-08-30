import type { ResearchItem } from "./types";

export const research: ResearchItem[] = [
  {
    slug: "oulad-early-warning-research",
    title: "Predicting Who Drops Out, and the Metric That Couldn't Tell",
    organization: "Independent",
    dates: "Aug 2026",
    description:
      "I built a model to predict which university students would drop out of a course. It was good at ranking them by risk, but the evaluation metric I'd committed to in advance couldn't tell the difference between my model and just flagging every single student. The project also showed that standard methods for detecting model drift would have failed, and my attempt at a causal analysis was invalidated by its own checks.",
    tags: ["Machine Learning", "Evaluation", "Pre-registration", "Causal Inference"],
    projectSlug: "oulad-early-warning",
  },
  {
    slug: "ofi-regime-tradability-research",
    title: "Does a Known Market Signal Survive the Cost of Trading It?",
    organization: "Independent",
    dates: "Aug 2026",
    description:
      "There's a signal traders use: when there are more buy orders than sell orders on an exchange, the price usually ticks up. I tested whether you can actually make money on it once you pay the trading fees. You can't. I wrote the whole method down before looking at any data, which is how I caught a result that looked real and turned out to be an accident of the maths.",
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
      "During my internship at Medanta Hospital I worked with clinicians on a telemedicine platform that had become essential almost overnight during the pandemic. I tested it and gathered feedback from doctors on what would make it work better for them and for patients. That turned into a published paper I wrote, Telemedicine — Is It Going to Stay in India?, on whether telemedicine would survive once the pandemic stopped forcing it. I used a year of the hospital's telemedicine data along with doctor and patient surveys, looking at effectiveness across specialties and at whether access reached beyond the major cities. The paper also covers the government's role in pushing it, including the Telemedicine Practice Guidelines.",
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
