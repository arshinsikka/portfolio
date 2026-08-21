/**
 * Content model for the portfolio.
 *
 * Everything in this directory is *copy*, not application data. Components read
 * from here; nothing here imports from a component. Icons deliberately live in
 * the rendering layer, not in the data, so content files stay free of JSX.
 */

/** Where a link points. Drives both the icon and the button style. */
export type LinkKind = "github" | "website" | "download" | "paper";

export interface ContentLink {
  label: string;
  url: string;
  kind: LinkKind;
}

/**
 * A paragraph of body copy. `label` renders as the bold lead-in
 * ("Built with:", "Key stats:") ahead of `text` on the same line.
 */
export interface Paragraph {
  label?: string;
  text: string;
}

/** Drives card size and whether the entry gets its own detail route. */
export type ProjectTier = "featured" | "standard" | "minor";

/**
 * Which headed group the entry sits under on the project index.
 *
 * Orthogonal to `tier`: `tier` says how much weight an entry carries and
 * whether it earns a detail route, `group` says what kind of thing it is. A
 * group with no members renders nothing at all — no heading, no gap — so the
 * page never shows an empty section while the content is being filled in.
 */
export type ProjectGroup = "production" | "research" | "ventures";

export interface Accolade {
  text: string;
}

/**
 * One headed section of a case study.
 *
 * Case studies do not share a fixed skeleton: the sections a project needs
 * depend on what the project was. So the headings are data, in the order they
 * are meant to be read, rather than a run of hardcoded blocks that every
 * project has to be squeezed into.
 */
export interface CaseStudySection {
  heading: string;
  paragraphs: Paragraph[];
  /**
   * A monospace diagram or code excerpt, rendered after the section's prose.
   * It hangs off the section rather than off the project so that a case study
   * decides *where* its artifact belongs — mid-argument, next to the decision
   * it illustrates — instead of always after the last section.
   */
  artifact?: {
    content: string;
    caption?: string;
  };
}

export interface Project {
  slug: string;
  title: string;
  /** May be absent where the source copy never stated one. */
  role?: string;
  dates: string;
  tier: ProjectTier;
  group: ProjectGroup;
  /** One paragraph, used on index cards. */
  summary: string;
  /** Full copy, used on a detail page. Empty where no long-form copy exists. */
  body: Paragraph[];
  /**
   * The case study, section by section, in reading order. Only meaningful
   * alongside `hasDetailPage`. Absent on projects that have no detail page.
   */
  sections?: CaseStudySection[];
  tags: string[];
  links: ContentLink[];
  /** Short award/status pills, e.g. "BLOCK71-backed". */
  accolades?: Accolade[];
  /** Whether `/projects/:slug` resolves to a detail page for this project. */
  hasDetailPage?: boolean;
}

export interface Role {
  slug: string;
  title: string;
  company: string;
  location: string;
  dates: string;
  description: string;
  /**
   * Long-form copy, rendered inline beneath the role's index row. Roles have
   * no detail page, so this is where the depth goes. Optional: most roles
   * carry only `description`, and a role without a body renders exactly as it
   * did before this field existed.
   */
  body?: Paragraph[];
  tags: string[];
  isCurrent?: boolean;
  links?: ContentLink[];
  /** Cross-reference to the canonical Project record, where one exists. */
  projectSlug?: string;
}

export interface ResearchItem {
  slug: string;
  title: string;
  organization: string;
  dates: string;
  description: string;
  tags: string[];
  links?: ContentLink[];
}

export interface LeadershipItem {
  slug: string;
  title: string;
  organization: string;
  location?: string;
  dates: string;
  /**
   * Absent where the canonical description lives on the referenced Project,
   * so the same copy is never stated twice.
   */
  description?: string;
  tags: string[];
  isCurrent?: boolean;
  projectSlug?: string;
}
