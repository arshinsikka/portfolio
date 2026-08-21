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
    body: [
      {
        text: "I'm building the part of a drone operations tool that decides whether a request is allowed to happen at all. A pilot types a question in plain English, a language model works out what they're asking for, and the system either does it or refuses. Before this, approving a single flight meant a person cross-checking five different screens by hand.",
      },
      {
        text: "The thing I keep coming back to is where the refusal lives. You could ask the model to decline politely when someone asks for something outside their approval. Models are good at that, and they comply most of the time. Most of the time is the problem. A model that usually refuses is not a control, it's a habit.",
      },
      {
        text: "So the refusal happens somewhere the model can't reach, and what the pilot sees on screen is drawn from that stop rather than from the model's description of it. Working out where \"somewhere\" is took longer than building it. Not the pilot's own laptop, because anyone can edit their copy of an app running on their own machine, and a limit enforced by the thing being limited isn't a limit. Not the layer that checks credentials either: it knows who is asking and what they're asking for, but not the specific values in the request, and an approval limit is entirely about values. Whether a coordinate is inside someone's approved area is a question about the numbers. So it has to happen at the first point that both sees the numbers and sits outside the user's control. That's not a convenient answer, it's the only correct one.",
      },
      {
        text: "The most useful thing I've found so far was an accident. Running the tool with an old conversation still on screen, the model answered from what it had said earlier instead of actually checking anything. The answer was word perfect: right limits, right conclusion, stated confidently. Nothing had been checked and nothing had been refused. The only way to tell was that no check appeared on screen, which is a very weak signal for anyone glancing at it.",
      },
      {
        text: "That reframed what I think the risk is with tools like this. It isn't that the model says something obviously wrong, because people catch that. It's that it says something fluent and reassuring that nobody verified. Which means the interface has a job too: an answer that came from a real check has to look different from one that didn't.",
      },
      {
        text: "Some of this is still unfinished and I'd rather say so. Approval limits are currently the same for everyone rather than per person, because the layer enforcing them can't see who's asking, and the record of what got refused can't name who did it for the same reason. Both come down to the same missing piece, and that's the next thing.",
      },
    ],
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
    body: [
      {
        text: "A twelve-person consulting team kept everything it knew in a shared document store. Hundreds of files, findable only if you already knew roughly what you were looking for and what someone had called it. The cost wasn't dramatic. A few minutes lost, several times a day, across everyone, plus the invisible cost of redoing work because you couldn't find the thing that already existed.",
      },
      {
        text: "I built a system that let them ask a question instead of searching. It reads the documents, finds the relevant parts, and answers from them.",
      },
      {
        text: "The decision I'd defend hardest is the boring one. There's a whole category of managed services for the storage layer this needs, and I didn't use one. At a few hundred documents, the entire collection fits in memory on the machine already running. Bringing in a managed service would have meant setting it up, depending on it, managing who can access it, and paying for it monthly, in exchange for the ability to scale to a size we were nowhere near. At a different order of magnitude I'd choose differently. At this one, the simpler thing was correct, and I think people reach for infrastructure because it feels more serious rather than because the problem asks for it.",
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
      "Led migration from a Bubble prototype to a production FastAPI backend with JWT, refresh tokens, bcrypt, and 2FA. Compared two ways of adapting a language model to the company's domain — fine-tuning it on their data versus retrieving from their documents at query time — and set out the tradeoff behind the founding team's architecture decision.",
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
