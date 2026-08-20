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
    group: "ventures",
    accolades: [
      { text: "BLOCK71-backed" },
      { text: "VIP@SoC Finalist" },
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
    group: "production",
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
];

export const featuredProjects = projects.filter((p) => p.tier === "featured");
export const standardProjects = projects.filter((p) => p.tier === "standard");

/**
 * The project index, in group order. A group with no records is dropped here
 * rather than filtered in the component, so "an empty group renders nothing at
 * all" is a property of the content model rather than of one page. Heading
 * copy lives in `sectionCopy.projects.groups`, with every other heading.
 */
export const projectGroups = (["production", "research", "ventures"] as const)
  .map((group) => ({ group, projects: projects.filter((p) => p.group === group) }))
  .filter((g) => g.projects.length > 0);

export const projectBySlug = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);
