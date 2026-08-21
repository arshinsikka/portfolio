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
  imageSrc: "/assets/arshin-profile.webp",
  imageAlt: "Arshin Sikka",
  tagline:
    "Building AI products — from BLOCK71-backed startup to enterprise LLM systems",
  intro:
    "Final-year CS student at NUS. Currently at Garuda Robotics through NUS Overseas Colleges, building agentic systems for drone operations. Previously: guardrails and evaluation for a production LLM system at SP Digital, retrieval at KPMG, and co-founder of Lecture AI.",
  githubUrl: "https://github.com/arshinsikka",
};

export const lookingFor = {
  leadIn: "Open to opportunities.",
  body: "Looking for full-time roles starting mid-2027, after I graduate. Software engineering, AI/ML, product, consulting, or quant — the common thread is work where the technical decisions have real consequences. Based in Singapore, open to relocating.",
  ctaLabel: "View Resume",
};

export const about = {
  heading: "About Me",
  paragraphs: [
    "I'm a CS student at NUS specializing in AI, currently building production LLM systems at SP Digital. I co-founded Lecture AI (BLOCK71-backed) and previously shipped agentic RAG systems at KPMG.",
    "I approach technology through a product lens — what problem does this solve, and for whom? My minor in Psychology keeps me grounded in how users actually think and behave.",
  ],
};

export const education = {
  heading: "Education",
  degree: "B.Comp (Hons) Computer Science — National University of Singapore",
  meta: "Aug 2023 – May 2027 · Minor in Psychology",
  notes: [
    "Teaching Assistant, Digital & AI Ethics (IS1108) — Aug 2025 – Dec 2025. Supported student learning on ethical implications of AI, graded assignments, and facilitated seminar discussions on responsible AI development.",
  ],
};

/** `icon` maps to a lucide component in about-me.tsx. */
export type HighlightIcon =
  | "graduation"
  | "globe"
  | "flask"
  | "rocket"
  | "bot"
  | "trophy";

export const highlightsHeading = "Quick Highlights";

export const highlights: Array<{ icon: HighlightIcon; text: string }> = [
  { icon: "graduation", text: "Computer Science @ NUS, Minor in Psychology" },
  { icon: "globe", text: "Based in Singapore & India" },
  {
    icon: "flask",
    text: "Research: LLMs, Human-AI Interfaces",
  },
  {
    icon: "rocket",
    text: "Co-founded Lecture AI (BLOCK71-backed, VIP@SoC Finalist)",
  },
  { icon: "bot", text: "Built AI systems at SP Digital, KPMG, AlygnAI" },
  {
    icon: "trophy",
    text: "International Chess Player with 10+ Years Competitive Experience",
  },
];

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
    subtitle:
      "Things I've built, studies I've run, and ventures I've tried to get off the ground.",
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
