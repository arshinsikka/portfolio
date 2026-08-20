import type { Role } from "./types";

export const roles: Role[] = [
  {
    slug: "garuda-robotics-ai-engineer-intern",
    title: "AI Engineer Intern",
    company: "Garuda Robotics",
    location: "Singapore",
    dates: "Jul 2026 – Present",
    description:
      "Building the AI layer for autonomous drone operations — turning natural-language mission requests into executable, validated flight plans.",
    tags: ["Agentic AI", "LLMs", "Computer Vision", "LangGraph", "FastAPI"],
    isCurrent: true,
  },
  {
    slug: "sp-digital-data-science-intern",
    title: "Data Science Intern",
    company: "SP Digital",
    location: "Singapore",
    dates: "Jan 2026 – Jun 2026",
    description:
      "Engineered enterprise guardrails for production LLM systems, implementing access control policies, grounding constraints, and retrieval boundaries for safe deployment. Built evaluation infrastructure with 400+ adversarial prompts, reducing unsafe model responses by ~60%.",
    tags: ["LLM Systems", "Guardrails", "Enterprise AI", "Evaluation"],
  },
  {
    slug: "lecture-ai-co-founder",
    title: "Co-Founder",
    company: "Lecture AI",
    location: "Singapore",
    dates: "Mar 2025 – Present",
    description:
      "Built an end-to-end pipeline that converts lecture recordings into structured bilingual study notes in <15 minutes for <$1. Features Whisper transcription, slide-context RAG for correction, topic segmentation, and Mandarin translation. VIP@SoC finalist, backed by BLOCK71.",
    tags: ["AI", "NLP", "RAG", "Startup", "Product"],
    isCurrent: true,
    projectSlug: "lecture-ai",
    links: [
      {
        label: "View GitHub",
        url: "https://github.com/arshinsikka/lectureai-mvp",
        kind: "github",
      },
      {
        label: "Visit Website",
        url: "https://lectureai.co",
        kind: "website",
      },
    ],
  },
  {
    slug: "kpmg-ai-labs-intern",
    title: "AI Labs Intern",
    company: "KPMG",
    location: "Gurugram",
    dates: "May 2025 – Aug 2025",
    description:
      "Built an agentic RAG system using LangChain and Azure OpenAI for document retrieval across hundreds of internal consulting documents. Shipped source-PDF retrieval and structured Excel extraction workflows, reducing knowledge lookup time by ~40–50% for 12+ person teams.",
    tags: ["RAG", "LangChain", "Azure OpenAI", "Enterprise"],
  },
  {
    slug: "alygnai-sde-intern",
    title: "SDE Intern",
    company: "AlygnAI",
    location: "Remote (US)",
    dates: "Jun 2025 – Aug 2025",
    description:
      "Led migration from Bubble prototype to production FastAPI backend with JWT, refresh tokens, bcrypt, and 2FA. Evaluated fine-tuning vs RAG tradeoffs for the founding team's product architecture decisions.",
    tags: ["FastAPI", "Auth", "LLMs", "Startup"],
  },
  {
    slug: "statusneo-swe-intern",
    title: "SWE Intern",
    company: "StatusNeo",
    location: "Gurugram",
    dates: "May 2024 – Jul 2024",
    description:
      "Developed REST APIs in Spring Boot for enterprise banking client with JWT authentication and RBAC. Wrote JUnit tests in agile production environment.",
    tags: ["Java", "Spring Boot", "REST APIs", "Enterprise"],
  },
];
