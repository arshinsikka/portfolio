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

/** Colour of an accolade pill. Chosen per accolade, not by array position. */
export type AccoladeTone = "amber" | "purple";

export interface Accolade {
  text: string;
  tone: AccoladeTone;
}

export interface Project {
  slug: string;
  title: string;
  /** May be absent where the source copy never stated one (e.g. ChessPhere). */
  role?: string;
  dates: string;
  tier: ProjectTier;
  /** One paragraph, used on index cards. */
  summary: string;
  /** Full copy, used on a detail page. Empty where no long-form copy exists. */
  body: Paragraph[];
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
