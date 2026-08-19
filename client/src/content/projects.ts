import type { Project } from "./types";

/**
 * Canonical project records.
 *
 * `<` characters below were written as `&lt;` in the original JSX. As plain
 * strings React escapes them on output, so the rendered text is unchanged.
 */
export const projects: Project[] = [
  {
    slug: "lecture-ai",
    title: "Lecture AI",
    role: "Co-Founder",
    dates: "Mar 2025 – Present",
    tier: "featured",
    accolades: [
      { text: "BLOCK71-backed", tone: "amber" },
      { text: "VIP@SoC Finalist", tone: "purple" },
    ],
    summary:
      "AI-powered lecture notes in minutes. An end-to-end pipeline that ingests lecture audio + slides and produces structured bilingual study notes — automatically, in <15 minutes, for <$1 per lecture.",
    body: [
      {
        text: "AI-powered lecture notes in minutes. An end-to-end pipeline that ingests lecture audio + slides and produces structured bilingual study notes — automatically, in <15 minutes, for <$1 per lecture.",
      },
      {
        label: "Built with:",
        text: "Whisper API for transcription, Gemini 2.0 Flash for correction/summarization/translation, slide-context RAG (no vector DB needed at this scale), FastAPI backend, python-docx for output generation.",
      },
      {
        label: "Key stats:",
        text: "72% of surveyed NUS students rewatch lectures due to missed content. LectureAI addresses this with topic-wise notes, key concept extraction, action item detection, and full Mandarin translation.",
      },
    ],
    tags: ["Python", "FastAPI", "Whisper", "Gemini", "RAG", "NLP"],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/arshinsikka/lectureai-mvp",
        kind: "github",
      },
      { label: "Website", url: "https://lectureai.co", kind: "website" },
      {
        label: "Pitch Deck",
        url: "/assets/Lecture_AI_Pitch_Deck.pdf",
        kind: "download",
      },
    ],
    hasDetailPage: true,
  },
  {
    slug: "ai-architecture-strategy-engine",
    title: "AI Architecture Strategy Engine",
    role: "Developer",
    dates: "Mar 2026",
    tier: "standard",
    summary:
      "Multi-agent system that helps teams choose between AI architectures (prompting, RAG, fine-tuning) under real constraints like budget, latency, and quality. Implements structured decision frameworks for AI product teams.",
    body: [],
    tags: ["Python", "Multi-Agent", "LLMs", "System Design"],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/arshinsikka/ai-architecture-strategy-engine",
        kind: "github",
      },
    ],
    hasDetailPage: false,
  },
  {
    slug: "llm-evaluation-framework",
    title: "LLM Evaluation Framework",
    role: "Developer",
    dates: "Mar 2026",
    tier: "standard",
    summary:
      "Modular evaluation framework for comparing LLMs across diverse tasks (summarization, decision analysis, retrieval ranking) with rigorous quality/cost/latency trade-off analysis.",
    body: [],
    tags: ["Python", "LLM Evaluation", "Benchmarking", "ML"],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/arshinsikka/llm-evaluation-framework",
        kind: "github",
      },
    ],
    hasDetailPage: false,
  },
  {
    slug: "trackup",
    title: "TrackUp",
    role: "Developer",
    dates: "Mar 2025 – May 2025",
    tier: "minor",
    summary:
      "Command-line Java application for managing contacts and events with smart parsing, category filtering, and robust test-driven backend logic.",
    body: [],
    tags: ["Java", "CLI", "TDD", "Software Engineering"],
    links: [],
    hasDetailPage: false,
  },
  {
    slug: "pediatric-tendon-stapler",
    title: "Pediatric Tendon Stapler",
    role: "Product Designer",
    dates: "Jan 2025 – May 2025",
    tier: "minor",
    summary:
      "Co-designed and prototyped an ergonomic one-handed surgical stapler for pediatric tendon repair. Translated clinical user needs into design constraints, iterated with medical stakeholders, and presented final prototype at NUS iDP showcase.",
    body: [],
    tags: ["Medical Device", "UX Design", "Hardware Prototyping"],
    links: [],
    hasDetailPage: false,
  },
  {
    slug: "markbind-contributions",
    title: "MarkBind Contributions",
    role: "Open Source Contributor",
    dates: "Jun 2025 – Present",
    tier: "minor",
    summary:
      "Contributed to the NUS MarkBind open-source project through issue resolution, feature development, and collaborative workflows as part of CP3108B.",
    body: [],
    tags: ["Open Source", "Vue", "Node.js", "GitHub Workflow"],
    links: [],
    hasDetailPage: false,
  },
  {
    slug: "donation-nation",
    title: "Donation Nation",
    role: "Founder",
    dates: "Oct 2020 – Jan 2022",
    tier: "minor",
    summary:
      "Founded a grassroots donation platform during COVID-19 to connect donors directly with NGOs. Coordinated logistics partners across multiple drives to deliver essential supplies to underserved communities across India.",
    body: [],
    tags: ["Social Impact", "Logistics", "Operations"],
    links: [],
    hasDetailPage: false,
  },
  {
    // Promoted from the "Earlier work" sentence, which supplied the only copy
    // that exists for this project: no role and no tags were stated, so both
    // are omitted rather than invented.
    slug: "chessphere",
    title: "ChessPhere",
    dates: "2020",
    tier: "minor",
    summary: "chess community platform",
    body: [],
    tags: [],
    links: [],
    hasDetailPage: false,
  },
];

export const featuredProjects = projects.filter((p) => p.tier === "featured");
export const standardProjects = projects.filter((p) => p.tier === "standard");
export const minorProjects = projects.filter((p) => p.tier === "minor");

export const projectBySlug = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);
