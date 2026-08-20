import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge only knows Tailwind's stock scales. Our type scale uses custom
 * keys (`text-body`, `text-label`, …), and without this it classifies every one
 * of them as a *text colour* — so `cn("text-label", "text-ink-muted")` silently
 * drops the size. Declaring the scale here keeps size and colour in separate
 * conflict groups, which is the only reason cn() is safe to use on our classes.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        { text: ["label", "meta", "small", "body", "h3", "h2", "lead", "display"] },
      ],
      "font-family": [{ font: ["display", "sans", "mono"] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
