import type { Stat } from "@/components/primitives";

/**
 * The homepage impact strip.
 *
 * EVERY ENTRY IS A PLACEHOLDER. Figures do exist inside the role and project
 * descriptions, but lifting them out needs a short label that no existing
 * sentence supplies verbatim, and writing one would be inventing copy about
 * work I cannot verify. The candidates and their exact source sentences are
 * listed in the handover notes; fill `value` and `label` here and drop the
 * `placeholder` flag, and the strip renders in the live style with no other
 * change required.
 *
 * Keep this to three or four entries — the band is a four-column grid and a
 * fifth would wrap into a second row and lose the horizontal read.
 */
export const impact: Stat[] = [
  { value: "000", label: "Placeholder metric 1", placeholder: true },
  { value: "000", label: "Placeholder metric 2", placeholder: true },
  { value: "000", label: "Placeholder metric 3", placeholder: true },
  { value: "000", label: "Placeholder metric 4", placeholder: true },
];
