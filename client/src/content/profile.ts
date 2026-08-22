/**
 * Singleton copy: hero, about, education, contact, social links.
 *
 * Icon choices stay in the components — putting lucide-react imports in a
 * content file would defeat the point of separating copy from rendering.
 * Where a component needs an icon per item, the item carries a stable `icon`
 * key that the component maps to a concrete component.
 */

/**
 * The production origin. THE ONLY PLACE THE DOMAIN IS WRITTEN.
 *
 * client/index.html holds `__SITE_URL__` placeholders rather than a literal;
 * vite.config.ts imports this constant and substitutes them at transform time,
 * in dev and in build alike. The runtime meta hook reads it too.
 *
 * Because vite.config.ts imports this file directly, THIS FILE MUST STAY FREE
 * OF `@/` ALIAS IMPORTS — the Vite config is bundled before aliases exist.
 */
export const SITE_URL = "https://www.arshinsikka.com";

export const RESUME_URL = "/assets/Arshin_Sikka_Resume.pdf";

export const hero = {
  name: "Arshin Sikka",
  imageSrc: "/assets/arshin-portrait.webp",
  /**
   * Deliberately empty. The portrait sits directly beside the name in text —
   * above it on mobile, next to it on desktop — so alt text naming the person
   * makes a screen reader say "Arshin Sikka" twice in a row. An image that
   * adds nothing the adjacent text does not already say is decorative, and the
   * correct markup for decorative is an empty alt, not a missing one.
   */
  imageAlt: "",
  tagline:
    "I build AI systems and then try to break them.",
  intro:
    "Final year at NUS, studying CS. I've spent the last two years building AI things and finding out which parts of them survive contact with real users.",
  /**
   * The one line that answers "what is he doing right now". Kept as a single
   * string so it can be edited in one place — it is the copy on the page most
   * likely to go stale.
   */
  currently:
    "Currently at Garuda Robotics through NUS Overseas Colleges, building an AI tool for drone operations end to end.",
  /**
   * The rail fact block under the portrait: one line each, in the order they
   * are read. Deliberately not a sentence — this is the machine-set metadata
   * the rail carries everywhere else on the site, applied to the person.
   */
  facts: ["NUS · CS, final year", "Garuda Robotics", "Singapore"],
  /**
   * The phrase inside `tagline` that becomes the interactive cue. It is not a
   * second copy of the copy: the component finds this substring inside
   * `tagline` and splits around it, so the rendered sentence is always exactly
   * `tagline` and the two can never drift. If the tagline is ever rewritten
   * without this phrase in it, the cue quietly disappears and the headline
   * renders as plain text.
   */
  taglineCue: "try to break them",
  /**
   * What the cue does, for screen readers. Composed with `taglineCue` into the
   * button's accessible name, so the heading still reads as its own sentence
   * instead of being interrupted by a bare instruction.
   */
  taglineCueHint: "highlight my case studies",
  githubUrl: "https://github.com/arshinsikka",
};

export const lookingFor = {
  leadIn: "Open to opportunities.",
  body: "Looking for full-time roles starting mid-2027, after I graduate. Software engineering, AI/ML, product, consulting, or quant. I want to work on things that change a very large number of people's lives. That's not a modest goal and I'd rather say it than pretend otherwise. Based in Singapore, open to relocating.",
  ctaLabel: "View Resume",
};

export const about = {
  heading: "About Me",
  paragraphs: [
    "I'm in my final year of Computer Science at NUS, specialising in AI. Right now I'm at Garuda Robotics through NUS Overseas Colleges, where I own an AI tool for drone operations end to end — the app a pilot talks to, everything behind it, and the part that decides whether the system is allowed to act on what it just worked out.",
    "What I want next is a specific kind of problem rather than a specific job title. I want to build the thing and also help decide what gets built. The work I've enjoyed most is where those two are the same conversation, and where a wrong call shows up in the real world rather than in a dashboard.",
    "Eventually I want to be the one starting those companies. I'm not there yet, and the fastest way to get there is to keep finding out what I'm bad at.",
  ],
};

export const education = {
  heading: "Education",
  degree: "B.Comp (Hons) Computer Science — National University of Singapore",
  meta: "Aug 2023 – May 2027 · AI specialisation · Certificate of Distinction",
  notes: [
    "Selected for the NUS Overseas Colleges programme, which is how I ended up at Garuda Robotics.",
    "Teaching Assistant for Digital & AI Ethics (IS1108), and for two summer CS courses.",
  ],
};

export const contact = {
  heading: "Let's Connect",
  subtitle:
    "Building something exciting? Looking to collaborate? I'd love to hear from you.",
  phone: {
    heading: "Phone",
    label: "Singapore",
    display: "+65 80164894",
    href: "tel:+6580164894",
  },
  email: {
    heading: "Email",
    primary: {
      label: "NUS (preferred)",
      address: "arshin.sikka@u.nus.edu",
      href: "mailto:arshin.sikka@u.nus.edu",
    },
    secondary: {
      label: "Personal",
      address: "sikka.arshin@gmail.com",
      href: "mailto:sikka.arshin@gmail.com",
    },
  },
};

/** `icon` maps to a concrete icon component in footer.tsx. */
export type SocialIcon = "github" | "linkedin" | "instagram" | "telegram";

export const socialLinks: Array<{
  name: string;
  url: string;
  icon: SocialIcon;
  tooltip: string;
}> = [
  {
    name: "GitHub",
    url: "https://github.com/arshinsikka",
    icon: "github",
    tooltip: "View my GitHub",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/arshin-sikka",
    icon: "linkedin",
    tooltip: "Connect on LinkedIn",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/arshinsikka",
    icon: "instagram",
    tooltip: "Follow on Instagram",
  },
  {
    name: "Telegram",
    url: "https://t.me/arshinsikka",
    icon: "telegram",
    tooltip: "Message on Telegram",
  },
];

export const footerCopyright = "© 2026 Arshin Sikka. All rights reserved.";

/** Section headings and subtitles, kept beside the copy they introduce. */
export const sectionCopy = {
  work: {
    heading: "Work Experience",
    subtitle:
      "Professional experience across AI systems, full-stack engineering, and product development",
  },
  projects: {
    heading: "Projects",
    /**
     * The homepage's label for the same records. It is a different promise —
     * three hand-weighted entries rather than the full index — so it gets its
     * own string instead of reusing `heading`, which also titles /projects and
     * that page's metadata.
     */
    homeHeading: "Selected work",
    subtitle:
      "Things I've built, studies I've run, and ventures I've tried to get off the ground.",
    /**
     * Marks a row that leads to a case study. Stored in sentence case and
     * uppercased by the mono label class, exactly as tags are, so the casing
     * stays a rendering decision rather than something baked into the copy.
     */
    caseStudyLabel: "Case study",
    /** Keyed by `ProjectGroup`. A group with no records never renders. */
    groups: {
      production: "Production systems",
      research: "Research",
      ventures: "Ventures",
      earlier: "Earlier work",
    },
  },
  research: {
    heading: "Research Experience",
    subtitle:
      "Studies I've run, across markets, social systems, and healthcare.",
  },
  leadership: {
    heading: "Leadership & Involvement",
    subtitle:
      "Student governance, competitive chess, entrepreneurship, and social impact",
  },
};
