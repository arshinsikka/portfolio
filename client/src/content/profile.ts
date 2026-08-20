/**
 * Singleton copy: hero, about, education, contact, social links.
 *
 * Icon choices stay in the components — putting lucide-react imports in a
 * content file would defeat the point of separating copy from rendering.
 * Where a component needs an icon per item, the item carries a stable `icon`
 * key that the component maps to a concrete component.
 */

/**
 * PROVISIONAL. arshinsikka.com does not currently resolve in public DNS, so
 * this points at the Vercel deployment that does. Swap this one constant once
 * the stable production domain is confirmed. Not yet applied to index.html —
 * that happens with the metadata work in the routing phase.
 */
export const SITE_URL = "https://portfolio-one-nu-1wnt8d6uz5.vercel.app";

export const RESUME_URL = "/assets/Arshin_Sikka_Resume.pdf";

export const hero = {
  name: "Arshin Sikka",
  imageSrc: "/assets/arshin-profile.webp",
  imageAlt: "Arshin Sikka",
  availabilityTitle: "Available for opportunities",
  tagline:
    "Building AI products — from BLOCK71-backed startup to enterprise LLM systems",
  intro:
    "Year 3 CS student at NUS. Currently shipping production AI systems at SP Digital. Previously built agentic RAG at KPMG and co-founded Lecture AI.",
  githubUrl: "https://github.com/arshinsikka",
};

export const lookingFor = {
  leadIn: "Open to opportunities.",
  body: "Seeking product, strategy, and AI/data science roles where I can build impactful systems and ship real products. Open to internships (Summer 2026) and full-time opportunities post-graduation (May 2027).",
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
    text: "Research: LLMs, Cybersecurity, Human-AI Interfaces",
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
      "From AI pipelines to open-source contributions and medical device design",
    standardHeading: "AI Tools & Frameworks",
    minorHeading: "Other Projects",
  },
  research: {
    heading: "Research Experience",
    subtitle:
      "Academic and clinical research contributions across cybersecurity, AI systems, and healthcare technology",
  },
  leadership: {
    heading: "Leadership & Involvement",
    subtitle:
      "Student governance, competitive chess, entrepreneurship, and social impact",
  },
};
