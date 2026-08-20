import type { IncomingMessage, ServerResponse } from "http";

// Inlined to avoid cross-directory import resolution issues in Vercel bundler
const SYSTEM_PROMPT = `You are an AI assistant embedded on Arshin Sikka's portfolio website. Your job is to answer questions about Arshin's background, experience, skills, projects, and interests. Be conversational, warm, and concise — aim for 2-5 sentences unless the user asks for more detail. Speak as if you know Arshin well. Never make up information not provided below.

==============================
EDUCATION
==============================

National University of Singapore (NUS) — Aug 2023 to May 2027
- Bachelor of Computing in Computer Science
- Artificial Intelligence Focus Area with Certificate of Distinction (awarded to top students in the specialization)
- Minor in Psychology — chosen to understand how users think, feel, and behave, which informs his product and UX decisions
- Relevant coursework: Natural Language Processing, Computer Vision, AI Planning and Decision Making, Software Engineering, Data Structures and Algorithms, Product Design and Innovation

Teaching Assistant — IS1108: Digital and AI Ethics (Aug–Dec 2025)
- Facilitated weekly tutorials for ~30 undergraduates on AI governance, algorithmic bias, data privacy, and responsible AI development
- Led case-based discussions connecting technical AI systems to real-world ethical consequences
- Graded assignments and provided feedback on ethical reasoning in AI contexts

==============================
CURRENT ROLES
==============================

Data Science Intern — SP Digital (Data & AI Division) | Jan 2026 – Present | Singapore
- Building production-facing LLM systems with enterprise guardrails for safe internal deployment
- Engineered access control policies, grounding constraints, and retrieval boundaries to ensure AI systems operate within approved parameters
- Developed guardrail evaluation infrastructure with 400+ adversarial prompts spanning jailbreaks, prompt injections, and edge cases
- Reduced unsafe model responses by approximately 60% through systematic red-teaming and iterative guardrail refinement
- Built AI pipelines for cybersecurity and operations, including session log analysis and anomaly detection
- Developed a multi-modal assistant combining speech, document, and tabular retrieval for secure internal workflows
- Tech stack: Python, LangChain, internal LLM infrastructure, PostgreSQL

Co-Founder — Lecture AI | Mar 2025 – Present | Singapore
- Founded Lecture AI to solve a real problem: 72% of surveyed NUS students rewatch lectures because they miss key insights the first time
- Built an end-to-end pipeline that converts lecture recordings + slides into structured bilingual study notes — automatically, in under 15 minutes, for less than $1 per lecture
- Core features: Whisper-powered transcription, slide-context RAG for transcript correction, topic-wise summarization, key concept extraction, action item detection, full English-to-Mandarin translation, .docx export, .srt/.vtt caption generation
- Architecture: Sequential checkpoint-based pipeline where each step saves output as JSON, allowing independent reruns without reprocessing
- Tech decisions: Chose Gemini 2.0 Flash for its 1M token context window, Whisper API over self-hosted for speed-to-market, file-based state over database for MVP simplicity
- Recognition: VIP@SoC finalist, backed by NUS Enterprise BLOCK71 incubation program
- Website: lectureai.co | GitHub: github.com/arshinsikka/lectureai-mvp

Director of Human Resources — NUS Student Union (NUSSU) | Nov 2024 – Present
- Leading people operations for NUS's apex student body
- Designed and implemented onboarding systems for incoming executive committee members
- Created feedback and well-being check-in processes supporting 100+ student leaders

Operations Executive — NUS Entrepreneurship Society (NES) | May 2025 – Present
- Supporting CatalystX, NES's flagship incubation program for student founders
- Managing operations, logistics, and program coordination

==============================
PAST WORK EXPERIENCE
==============================

AI Labs Intern — KPMG | May 2025 – Aug 2025 | Gurugram, India
- Built an agentic RAG chatbot using LangChain and Azure OpenAI for search across hundreds of internal consulting documents
- Implemented source-PDF retrieval and structured Excel extraction workflows
- Reduced knowledge lookup time by ~40-50% for 12+ person teams
- Tech stack: Python, LangChain, Azure OpenAI, FAISS

SDE Intern — AlygnAI | Jun 2025 – Aug 2025 | Remote (California, US)
- Led migration from Bubble prototype to production FastAPI backend with JWT, refresh tokens, bcrypt, and 2FA
- Evaluated fine-tuning vs RAG tradeoffs for founding team's product architecture decisions
- Tech stack: Python, FastAPI, PostgreSQL, WeWeb, LLM APIs

SWE Intern — StatusNeo | May 2024 – Jul 2024 | Gurugram, India
- Developed REST APIs using Java Spring Boot with JWT authentication and RBAC for enterprise banking client
- Wrote JUnit tests in agile production environment
- Tech stack: Java, Spring Boot, PostgreSQL, JUnit

==============================
PROJECTS
==============================

Lecture AI (Flagship) — see Current Roles above

AI Architecture Strategy Engine — Mar 2026
- Multi-agent system helping AI product teams choose between prompting, RAG, fine-tuning under real constraints (budget, latency, quality)
- GitHub: github.com/arshinsikka/ai-architecture-strategy-engine

LLM Evaluation Framework — Mar 2026
- Modular framework for comparing LLMs across summarization, decision analysis, retrieval ranking
- Includes quality/cost/latency trade-off analysis
- GitHub: github.com/arshinsikka/llm-evaluation-framework

TrackUp — Java CLI app for contact/event management with TDD (NUS CS2103T)

Pediatric Tendon Stapler — NUS iDP | Jan–May 2025
- Co-designed ergonomic one-handed surgical stapler for pediatric tendon repair
- Worked with medical stakeholders, iterated prototypes, presented at NUS iDP showcase

MarkBind Contributions — Open source contributor to NUS documentation tool (Vue, Node.js)

Donation Nation — Founded grassroots donor-NGO platform during COVID-19

==============================
RESEARCH EXPERIENCE
==============================

Research Assistant (Cybersecurity) — Dr. Ming, NUS | Feb–Mar 2025
- LLM-driven cybersecurity: GNNs + FOL for causal graph extraction and anomaly detection from system logs

Research Intern & Author — Medanta Hospital | Dec 2021 – Nov 2022
- Telemedicine research during COVID-19; authored peer-reviewed paper "The Future of Telemedicine in India"

==============================
CHESS BACKGROUND
==============================

- Represented India at 2019 Commonwealth Chess Championship
- Runner-up in FIDE-rated tournament (693 participants)
- Best Player at IPSC U19 Championship (2022)
- Led NUS to Inter-Faculty Games chess victory
- 10+ years captaining school and university teams

==============================
TECHNICAL SKILLS
==============================

Languages: Python (primary), Java, SQL, JavaScript/TypeScript
AI/ML: LangChain, LangGraph, RAG, guardrails, FAISS, TensorFlow, PyTorch, Whisper, Gemini API, OpenAI API
Backend: FastAPI, Spring Boot, PostgreSQL, REST APIs, JWT/2FA
Frontend: React, Next.js, Tailwind CSS
Tools: Git/GitHub, CI/CD, Power BI, pandas, NumPy

==============================
WHAT ARSHIN IS LOOKING FOR
==============================

- Product, strategy, and AI/data science roles
- Open to internships and full-time opportunities
- Graduating May 2027
- Wants to build impactful AI systems, ship real products, work at the intersection of engineering and product thinking

==============================
PERSONALITY & WORKING STYLE
==============================

- Builder mindset: prefers shipping working products
- Product-oriented: always asks "what problem does this solve, and for whom?"
- User-focused: psychology minor reflects genuine interest in how users think
- Bias toward action: founded Lecture AI while still a student
- Competitive: chess shapes strategic thinking and comfort with pressure
- Originally from India, based in Singapore

==============================
CONTACT
==============================

- Email (preferred): arshin.sikka@u.nus.edu
- Personal: sikka.arshin@gmail.com
- Phone (SG): +65 80164894
- LinkedIn: linkedin.com/in/arshin-sikka
- GitHub: github.com/arshinsikka

==============================
RESPONSE GUIDELINES
==============================

- Be conversational and warm, as if you know Arshin well
- Keep responses concise (2-5 sentences) unless user asks for more detail
- Include specific tech details and metrics when discussing technical work
- If asked about something not covered above: "I don't have specific info on that, but you can reach Arshin directly at arshin.sikka@u.nus.edu"
- If asked who you are: "I'm an AI assistant on Arshin's portfolio — ask me anything about his background, experience, or projects."
- For scheduling/availability, direct to email
- Highlight what makes Arshin distinctive: AI technical depth + product thinking + Lecture AI startup + enterprise experience (KPMG, SP Digital) + professional chess`;

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

// THE ONE VALUE TO CHANGE WHEN THE CHAT BREAKS WITH A 404.
//
// Groq retires hosted models on roughly annual cycles and returns 404 for a
// decommissioned name — which is indistinguishable from an auth failure unless
// the log says otherwise (see logUpstreamFailure below). The previous value,
// llama-3.3-70b-versatile, was decommissioned on 16 August 2026.
// Current deprecation schedule: https://console.groq.com/docs/deprecations
const GROQ_MODEL = "openai/gpt-oss-120b";

// ── Request limits ───────────────────────────────────────────────────────────
const MAX_BODY_BYTES = 16 * 1024; // hard cap, enforced while streaming
const MAX_MESSAGES = 20; // conversation turns accepted per request
const MAX_MESSAGE_CHARS = 2000; // per individual message
const MAX_TOTAL_CHARS = 12000; // across the whole conversation
// Cap on the upstream completion. gpt-oss-120b is a *reasoning* model, unlike
// the Llama model it replaced: it emits reasoning tokens before the visible
// answer. Groq does not document whether those count against the completion
// budget, so this is set defensively — at 512 a medium-effort reasoning pass
// could consume the whole allowance and truncate the answer to nothing, which
// would surface as the "I couldn't generate a response" fallback. 1024 is also
// Groq's own documented default. The system prompt asks for 2-5 sentences, so
// the visible answer needs well under 200 of these.
const MAX_TOKENS = 1024;

// ── Origin allowlist ─────────────────────────────────────────────────────────
// Override in Vercel with ALLOWED_ORIGINS="https://a.com,https://b.com"
//
// `*.vercel.app` was removed: it matched every deployment on Vercel, including
// other people's, so any vercel.app site could call this endpoint and spend the
// Groq quota. Preview deploys are covered by selfOrigins() below instead, which
// trusts only the current deployment's own hostnames.
const DEFAULT_ALLOWED_ORIGINS = [
  "https://arshinsikka.com",
  "https://www.arshinsikka.com",
];

/**
 * The hostnames this very deployment is served from, supplied by Vercel:
 *   VERCEL_URL         the immutable per-deployment URL
 *   VERCEL_BRANCH_URL  the branch alias, e.g. portfolio-git-main-<scope>
 * Both are absent locally. Allowing them means every preview deploy can call
 * its own API with no configuration, while a different Vercel project still
 * cannot — which is the part `*.vercel.app` got wrong.
 */
function selfOrigins(): string[] {
  return [process.env.VERCEL_URL, process.env.VERCEL_BRANCH_URL]
    .filter((h): h is string => Boolean(h))
    .map((h) => `https://${h}`);
}

function allowlist(): string[] {
  const fromEnv = process.env.ALLOWED_ORIGINS;
  const base = fromEnv
    ? fromEnv
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : DEFAULT_ALLOWED_ORIGINS;
  // Self-origins are appended even when ALLOWED_ORIGINS is set, so overriding
  // the list can never accidentally lock a preview out of its own endpoint.
  return [...base, ...selfOrigins()];
}

function isOriginAllowed(origin: string | undefined): boolean {
  if (!origin) return false;
  let hostname: string;
  try {
    hostname = new URL(origin).hostname;
  } catch {
    return false;
  }
  return allowlist().some((rule) =>
    rule.startsWith("*.") ? hostname.endsWith(rule.slice(1)) : rule === origin,
  );
}

// ── Best-effort rate limit ───────────────────────────────────────────────────
// WARNING: this Map lives in one warm serverless instance. Vercel runs many
// instances concurrently and recycles them at will, so this is NOT a shared or
// durable counter. It raises the cost of casual abuse and nothing more. Real
// enforcement needs external state (Vercel KV / Upstash) or a WAF rule.
const RATE_LIMIT_MAX = 10;
const RATE_LIMIT_WINDOW_MS = 60_000;
const recentHits = new Map<string, number[]>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (recentHits.get(key) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS,
  );
  recent.push(now);
  recentHits.set(key, recent);
  if (recentHits.size > 5000) recentHits.clear(); // crude growth guard
  return recent.length > RATE_LIMIT_MAX;
}

/**
 * Classify an upstream failure in the server log.
 *
 * Every one of these used to print the same "Groq error: <status> <body>" line
 * and return the same 502, so a decommissioned model, a revoked key, and a
 * network blip were indistinguishable without opening the Vercel dashboard and
 * reading the raw provider payload. The client-visible response is unchanged —
 * only the log is louder.
 */
function logUpstreamFailure(status: number, detail: string) {
  const body = detail.slice(0, 500);

  if (status === 401 || status === 403) {
    console.error(
      `[chat] AUTH FAILURE — Groq rejected the credential (HTTP ${status}). ` +
        `GROQ_API_KEY is set but invalid, revoked, or lacks access. ` +
        `Fix: regenerate at https://console.groq.com/keys and update the Vercel env var. detail=${body}`,
    );
    return;
  }

  // A retired model name returns 404. This is the failure that cost a dashboard
  // trip in Aug 2026, so it names itself and the fix explicitly.
  const looksLikeUnknownModel =
    status === 404 ||
    /model_not_found|does not exist|decommission|deprecat/i.test(detail);
  if (looksLikeUnknownModel) {
    console.error(
      `[chat] UNKNOWN MODEL — Groq does not recognise "${GROQ_MODEL}" (HTTP ${status}). ` +
        `This is NOT an auth problem; the key is fine. Groq retires models on roughly ` +
        `annual cycles. Fix: check https://console.groq.com/docs/deprecations and update ` +
        `GROQ_MODEL in api/chat.ts. detail=${body}`,
    );
    return;
  }

  if (status === 429) {
    console.error(
      `[chat] RATE LIMITED — Groq returned 429. This is the upstream account quota, ` +
        `not the per-IP limiter in this handler. detail=${body}`,
    );
    return;
  }

  console.error(
    `[chat] UPSTREAM ERROR — unclassified failure from Groq. HTTP ${status}. ` +
      `model=${GROQ_MODEL} detail=${body}`,
  );
}

function sendJson(res: ServerResponse, status: number, body: unknown) {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(body));
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  const origin = req.headers.origin as string | undefined;
  const originOk = isOriginAllowed(origin);

  // Only ever echo an origin we actually trust — never "*".
  if (originOk && origin) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Vary", "Origin");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(originOk ? 204 : 403);
    res.end();
    return;
  }

  if (req.method !== "POST") {
    sendJson(res, 405, { error: "Method not allowed" });
    return;
  }

  if (!originOk) {
    sendJson(res, 403, { error: "Origin not allowed" });
    return;
  }

  const ip =
    String(req.headers["x-forwarded-for"] ?? "")
      .split(",")[0]
      .trim() || "unknown";
  if (isRateLimited(ip)) {
    sendJson(res, 429, { error: "Too many requests" });
    return;
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    // Distinct from AUTH FAILURE below: the variable is absent, not rejected.
    console.error(
      "[chat] MISSING API KEY — GROQ_API_KEY is not set in this environment. " +
        "Fix: add it in Vercel → Settings → Environment Variables, then redeploy " +
        "(env changes do not apply to existing deployments).",
    );
    sendJson(res, 500, { error: "API key not configured" });
    return;
  }

  // ── Read the body, aborting past MAX_BODY_BYTES ────────────────────────────
  let raw: string;
  try {
    raw = await new Promise<string>((resolve, reject) => {
      const preparsed = (req as unknown as { body?: unknown }).body;
      if (preparsed !== undefined && preparsed !== null) {
        resolve(
          typeof preparsed === "string" ? preparsed : JSON.stringify(preparsed),
        );
        return;
      }
      const chunks: Buffer[] = [];
      let total = 0;
      req.on("data", (chunk: Buffer) => {
        total += chunk.length;
        if (total > MAX_BODY_BYTES) {
          reject(new Error("payload_too_large"));
          req.destroy();
          return;
        }
        chunks.push(chunk);
      });
      req.on("end", () => resolve(Buffer.concat(chunks).toString()));
      req.on("error", reject);
    });
  } catch (err) {
    const tooLarge = err instanceof Error && err.message === "payload_too_large";
    sendJson(res, tooLarge ? 413 : 400, {
      error: tooLarge ? "Payload too large" : "Invalid request body",
    });
    return;
  }

  // ── Parse and validate ─────────────────────────────────────────────────────
  let messages: Array<{ role: "user" | "assistant"; content: string }>;
  try {
    const parsed = JSON.parse(raw) as unknown;
    const candidate = (parsed as { messages?: unknown })?.messages;
    if (!Array.isArray(candidate)) throw new Error("bad_shape");
    messages = candidate as Array<{ role: "user" | "assistant"; content: string }>;
  } catch {
    sendJson(res, 400, { error: "Invalid request body" });
    return;
  }

  if (messages.length === 0 || messages.length > MAX_MESSAGES) {
    sendJson(res, 400, { error: "Invalid message count" });
    return;
  }

  let totalChars = 0;
  for (const m of messages) {
    if (
      !m ||
      typeof m.content !== "string" ||
      (m.role !== "user" && m.role !== "assistant")
    ) {
      sendJson(res, 400, { error: "Invalid message format" });
      return;
    }
    if (m.content.length > MAX_MESSAGE_CHARS) {
      sendJson(res, 400, { error: "Message too long" });
      return;
    }
    totalChars += m.content.length;
  }
  if (totalChars > MAX_TOTAL_CHARS) {
    sendJson(res, 400, { error: "Conversation too long" });
    return;
  }

  // ── Upstream call ──────────────────────────────────────────────────────────
  try {
    const groqRes = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
        temperature: 0.7,
        // `max_tokens` is deprecated in Groq's API in favour of this.
        max_completion_tokens: MAX_TOKENS,
        // Reasoning-model controls. gpt-oss defaults to "medium" effort, which
        // buys nothing when answering CV questions from a system prompt and
        // costs latency and tokens on every turn.
        reasoning_effort: "low",
        // Keeps the response shape as plain `choices[0].message.content`. Left
        // on, reasoning can arrive in a separate field or inline in <think>
        // tags, and the widget renders content verbatim — so this is what stops
        // the model's scratchpad appearing in the chat bubble.
        include_reasoning: false,
      }),
    });

    if (!groqRes.ok) {
      // Log upstream detail server-side; do not leak provider payloads.
      logUpstreamFailure(groqRes.status, await groqRes.text());
      const status = groqRes.status === 429 ? 429 : 502;
      sendJson(res, status, {
        error: status === 429 ? "Too many requests" : "Upstream error",
      });
      return;
    }

    const data = (await groqRes.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const text =
      data.choices?.[0]?.message?.content ??
      "I couldn't generate a response. Please try again.";

    sendJson(res, 200, { text });
  } catch (err) {
    // Reached only when the request never produced a response — DNS, TLS,
    // timeout, or a throw in parsing. Groq returning an error status is handled
    // above and never lands here.
    console.error(
      `[chat] TRANSPORT/RUNTIME ERROR — the call to Groq did not complete. ` +
        `model=${GROQ_MODEL}`,
      err,
    );
    sendJson(res, 500, { error: "Internal server error" });
  }
}
