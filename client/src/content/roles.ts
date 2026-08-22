import type { Role } from "./types";

export const roles: Role[] = [
  {
    slug: "garuda-robotics-ai-engineer-intern",
    title: "AI Engineer Intern",
    company: "Garuda Robotics",
    location: "Singapore",
    dates: "Jul 2026 – Present",
    description:
      "Building an AI tool for drone operations end to end. A pilot asks for something in plain English and the system works out what they mean, checks whether they're allowed to do it, and either does it or refuses.",
    body: [
      {
        text: "I own this one end to end: the app a pilot uses, everything running behind it, and the part that decides whether a request is allowed to happen at all. A pilot types a question in plain English, a language model works out what they're asking for, and the system either does it or refuses. Before this, approving a single flight meant a person cross-checking five different screens by hand.",
      },
      {
        text: "The interesting part has been working out where a refusal has to live when the thing on the other end is hardware and there's no undo. I've written that up properly as a case study.",
      },
    ],
    tags: ["Agentic AI", "LLMs", "Computer Vision", "LangGraph", "FastAPI"],
    projectSlug: "garuda-refusal-layer",
    links: [
      {
        label: "Read the case study",
        url: "/projects/garuda-refusal-layer",
        kind: "website",
      },
    ],
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
    body: [
      {
        text: "Six months on an internal assistant used by people doing physical work on electrical infrastructure, almost all of it spent on the layer that decides what the system will and won't answer.",
      },
      {
        text: "This was the first thing I'd built where someone was paid to break it, and it changed what I think the work is. I've written that up properly as a case study.",
      },
    ],
    tags: ["LLM Systems", "Guardrails", "Enterprise AI", "Evaluation"],
    projectSlug: "sara-guardrails",
    links: [
      {
        label: "Read the case study",
        url: "/projects/sara-guardrails",
        kind: "website",
      },
    ],
  },
  {
    slug: "lecture-ai-co-founder",
    title: "Co-Founder",
    company: "Lecture AI",
    location: "Singapore",
    dates: "Jul 2025 – Mar 2026",
    description:
      "The one where I spent months building for the wrong customer. We surveyed 500 students, found a gap nobody was serving, and then discovered students don't control access to the thing our product needed.",
    tags: ["AI", "NLP", "RAG", "Startup", "Product"],
    projectSlug: "lecture-ai",
    links: [
      {
        label: "Read the case study",
        url: "/projects/lecture-ai",
        kind: "website",
      },
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
    body: [
      {
        text: "A twelve-person consulting team kept everything it knew in a shared document store. Hundreds of files, findable only if you already knew roughly what you were looking for and what someone had called it. The cost wasn't dramatic. A few minutes lost, several times a day, across everyone, plus the invisible cost of redoing work because you couldn't find the thing that already existed.",
      },
      {
        text: "I built a system that let them ask a question instead of searching. It reads the documents, finds the relevant parts, and answers from them.",
      },
      {
        text: "The decision I'd defend hardest is the boring one. I used FAISS, a library that holds the search index in memory inside the same process, rather than a managed vector database running as its own service. At a few hundred documents the whole collection fits in memory on the machine that's already running. A managed service would have meant provisioning it, depending on it, managing who can reach it, and paying for it monthly, in exchange for the ability to scale to a size we were nowhere near. At a different order of magnitude I'd choose differently. At this one the simpler thing was correct, and I think people reach for infrastructure because it feels more serious rather than because the problem asks for it.",
      },
      {
        text: "What I underestimated was that finding the answer wasn't the hard part. An answer a consultant can't verify is an answer they won't use, and reasonably so, because what they produce goes to a client with their name on it. So I added the part that shows where each answer came from: a link back to the specific source document, and proper handling of spreadsheets so numbers came back as numbers rather than as mangled text.",
      },
      {
        text: "Retrieval made the answers fast. Being able to check them is what made anyone use them. Lookup time dropped by 40 to 50 percent.",
      },
    ],
    tags: ["RAG", "LangChain", "Azure OpenAI", "Enterprise"],
  },
  {
    slug: "alygnai-sde-intern",
    title: "SDE Intern",
    company: "AlygnAI",
    location: "Remote (US)",
    dates: "Jun 2025 – Aug 2025",
    description:
      "A remote internship with a Bay Area startup, run alongside a full-time one in India. Same summer, two jobs.",
    body: [
      {
        text: "I ran this alongside KPMG. Same summer, one in person and full time, this one remote. I don't recommend it, but I wanted it badly enough to try.",
      },
      {
        text: "The reason was specific. I'd read a lot about how Bay Area startups work and I wanted to find out whether the version in my head matched the real thing. So I spent that spring cold-applying to American startups from the other side of the world, which is a slower and more discouraging process than it sounds, and eventually got one.",
      },
      {
        text: "What I found was mostly what I'd hoped for. The team was small and moved quickly, and nobody had time to hand me a scoped task and check on it. I ended up owning a migration from a prototype built on a no-code tool to a real backend, start to finish. That's more ownership than I'd have got anywhere with more people in it, and it's the thing I'd point at from that summer. I also compared two ways of adapting a language model to their domain, fine-tuning it on their data against retrieving from their documents at query time, and wrote up the tradeoff for the founding team's architecture decision.",
      },
      {
        text: "The double summer was probably one summer too many. It was also the only way I was going to find out what I wanted to know.",
      },
    ],
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
