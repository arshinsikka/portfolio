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
    body: [],
    // Migrated verbatim out of `body` and the detail page's hardcoded section
    // list. Not one word changed: the three paragraphs that were in `body` are
    // the three that carry copy here, under the headings the page already used,
    // in the order the page already read. The empty sections are the slots
    // whose copy has never been written — they still render their conspicuous
    // placeholder.
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          {
            text: "AI-powered lecture notes in minutes. An end-to-end pipeline that ingests lecture audio + slides and produces structured bilingual study notes — automatically, in <15 minutes, for <$1 per lecture.",
          },
        ],
      },
      { heading: "The challenge", paragraphs: [] },
      { heading: "My role", paragraphs: [] },
      {
        heading: "Key decisions",
        paragraphs: [
          {
            label: "Built with:",
            text: "Whisper API for transcription, Gemini 2.0 Flash for correction/summarization/translation, slide-context RAG (no vector DB needed at this scale), FastAPI backend, python-docx for output generation.",
          },
        ],
      },
      // No copy of its own: the section exists to hold the architecture
      // artifact, which is still the placeholder rendered by the detail page.
      { heading: "Architecture", paragraphs: [] },
      {
        heading: "Results",
        paragraphs: [
          {
            label: "Key stats:",
            text: "72% of surveyed NUS students rewatch lectures due to missed content. LectureAI addresses this with topic-wise notes, key concept extraction, action item detection, and full Mandarin translation.",
          },
        ],
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
    slug: "sara-guardrails",
    title: "SARA — Guardrails for a Production LLM Assistant",
    role: "Data Science Intern, SP Digital",
    dates: "Jan 2026 – Jun 2026",
    tier: "featured",
    group: "production",
    summary:
      "Before this I'd built AI apps that worked. This was the first one where someone was paid to break it, and it changed what I think the job is.",
    body: [],
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          {
            text: "SARA is an internal assistant at a Singapore utility. Two groups use it: fieldworkers doing physical work on the grid, and operations admins handling the paperwork behind energising and de-energising equipment. Same assistant, different permissions, and one group can see things the other shouldn't.",
          },
          {
            text: "I spent six months there, almost all of it on the guardrails layer. That's the part deciding what the system will answer, what it won't, and how you know either way.",
          },
        ],
      },
      {
        heading: "What made this different",
        paragraphs: [
          {
            text: "Everything I'd built before belonged to me. Lecture AI, coursework, side projects. If someone found a weird edge case they'd shrug and move on. If the model said something strange, that was a bug for next week.",
          },
          {
            text: "Here the users are working on live electrical infrastructure, and the company pays an external team to attack the system on purpose.",
          },
          {
            text: "That reframed the whole thing for me. I'd been treating AI applications as pipelines. Input, model, output, make the output good. What I hadn't understood is that in an enterprise the pipeline is maybe a third of the work. The rest is governance: what this system is allowed to say, to whom, how you demonstrate that, and how you know it's still true after the next change. I'd assumed that part was paperwork someone else did. It isn't. It's the actual engineering, and it's the difference between something that demos well and something you can put in front of a hundred people who have real jobs.",
          },
        ],
      },
      {
        heading: "What I actually built",
        paragraphs: [
          {
            text: "Input controls that decide whether a request should be answered at all. Output controls that catch what shouldn't leave. A local safety classifier layered in alongside the model's own refusals. An adversarial evaluation pipeline to test all of it. And I closed the findings from a third-party penetration test, which is the only assessment of this work I didn't write myself.",
          },
        ],
      },
      {
        heading: "The decision I keep coming back to",
        paragraphs: [
          {
            text: "Topic restriction started as keyword matching. It blocked things, so at a glance it worked. What it actually did was block the wrong things. A fieldworker asking a reasonable operational question that happened to contain a flagged word got refused. Anyone who phrased a request around the keyword list got straight through.",
          },
          {
            text: "The problem is structural. Keyword matching can't tell asking about a system from asking a system to do something. Those are often the same words.",
          },
          {
            text: "So I replaced it with classification that reads what the request is for. That costs something real: it's slower than a string comparison, it's non-deterministic, and it puts a model call in front of every request. I took the trade because of which failure worried me more. A leak is loud. Someone notices, it gets escalated, it gets fixed. A fieldworker who asks two reasonable questions, gets refused twice, and quietly stops opening the tool is a failure nobody ever files. That one shows up months later as an adoption number nobody can explain.",
          },
        ],
      },
      {
        heading: "Measuring it",
        paragraphs: [
          {
            text: "I spent my first stretch making guardrails better without being able to tell you whether they were better. I'd try a bypass, watch it get blocked, and feel good. That's an anecdote.",
          },
          {
            text: "So I built an adversarial evaluation pipeline in Langfuse: over 400 prompts across several regression sets, covering injection attempts, persona-bypass jailbreaks, and probes trying to get the system to describe its own configuration. Unsafe responses dropped roughly 60% across internal deployments. I only know that number because there was something to measure against.",
          },
          {
            text: "If I could tell myself one thing at the start, it would be to build the evaluation first. It feels like a detour when you want to be fixing things. It's what makes every later change legible.",
          },
        ],
      },
      {
        heading: "What I got wrong",
        paragraphs: [
          {
            text: "I calibrated toward strict, because strict felt safe. Every guardrail I tightened felt like progress and had no cost I could see.",
          },
          {
            text: "The cost was false positives, and they're invisible by nature. A blocked legitimate question doesn't raise an error or a ticket. It just makes someone decide the tool isn't worth the trouble.",
          },
          {
            text: "What fixed it was writing a set of probes for questions a real fieldworker would genuinely ask, then treating a block on one of those as a defect worth the same as a successful attack. Once both failure modes had numbers, the tradeoff stopped being a feeling and became something I could look at.",
          },
          {
            text: "I don't think I'd have got there from first principles. It came from watching what the keyword filter had actually been doing to people.",
          },
        ],
      },
      {
        heading: "Where it landed",
        paragraphs: [
          {
            text: "Roughly 60% fewer unsafe responses, measured against a fixed suite rather than my own judgement. Penetration test findings closed. A topic restriction that reads intent rather than vocabulary, which cut refusals of legitimate questions substantially.",
          },
          {
            text: "The number isn't the part I'd talk about in an interview. I went in thinking my job was to make a model behave. I came out thinking the job is making a system's behaviour provable. Everything I've built since starts with how I'm going to test it.",
          },
        ],
      },
    ],
    tags: ["LLM Safety", "Guardrails", "Evaluation", "Langfuse", "LangGraph"],
    links: [],
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
