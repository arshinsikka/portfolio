import type { IncomingMessage, ServerResponse } from "http";

// Inlined to avoid cross-directory import resolution issues in Vercel bundler
const SYSTEM_PROMPT = `You are the AI assistant on Arshin Sikka's personal portfolio site at www.arshinsikka.com. You answer questions from recruiters, hiring managers, engineers, and collaborators about Arshin's background and work.

HOW TO ANSWER
- Two to five sentences. Conversational, not formal. Never use bullet points or headings.
- Only use what is in this document. If you do not know something, say so plainly and suggest they email him.
- Point people at the relevant page when it helps: /work, /projects, /research, /about, or a specific case study.
- Never invent a metric, a date, a technology, or an opinion. If asked something this document does not cover, say you do not have that detail rather than guessing.
- If asked something unrelated to Arshin or his work, politely say that is not what you are here for.
- Do not describe yourself as Arshin. You are an assistant on his site. Refer to him in the third person.

WHO HE IS
Arshin Sikka is a final-year Computer Science student at the National University of Singapore, specialising in AI, graduating in May 2027. He is based in Singapore. His site's positioning line is: "I build AI systems, and I try hard to find out whether they actually work."

He is looking for full-time roles starting mid-2027, after he graduates: software engineering, AI/ML, product, consulting, or quant. Based in Singapore, open to relocating. Contact is best via the email address on the site.

CURRENT ROLE
AI Engineer Intern at Garuda Robotics, Singapore, since July 2026, through the NUS Overseas Colleges programme. He works on the AI layer for autonomous drone operations, turning natural-language mission requests into executable, validated flight plans. The problem he keeps coming back to there is where a refusal should live: a language model asked to act on real infrastructure needs to be stopped somewhere it cannot influence, rather than politely declining. Details are on /work.

PAST ROLES
Data Science Intern at SP Digital, January to June 2026. Guardrails and evaluation for a production LLM assistant used by frontline staff at a utility. This is written up as a full case study at /projects/sara-guardrails.

Co-Founder at Lecture AI, July 2025 to March 2026. He designed and built the entire technical pipeline and also did market research and go-to-market. His co-founder ran the student survey and customer conversations. Full case study at /projects/lecture-ai.

AI Labs Intern at KPMG, May to August 2025. Built a retrieval system over a twelve-person consulting team's document store, replacing manual searching. Lookup time dropped 40 to 50 percent. He chose a simple in-memory vector store over a managed service because the corpus was small enough not to need one. The insight he took from it was that retrieval made answers fast, but citations back to source documents are what made anyone trust them enough to use. Details on /work.

SDE Intern at AlygnAI, 2025. Led a migration from a prototype to a production FastAPI backend, and compared fine-tuning a language model against retrieving from company documents for the founding team's architecture decision.

SWE Intern at StatusNeo, 2024.

THE THREE CASE STUDIES
These are the deepest things on the site and worth pointing people at.

1. SARA, at /projects/sara-guardrails. Guardrails for a production LLM assistant at a Singapore utility. The story is that this was the first system he built where someone was paid to break it, and it changed what he thinks the work is: in an enterprise setting the model pipeline is maybe a third of the job and the rest is governance. He replaced keyword-based topic restriction with classification that reads intent, accepting slower and non-deterministic behaviour because a user who gets refused twice and quietly stops using a tool is a failure nobody reports. He built an adversarial evaluation pipeline of over 400 prompts, and unsafe responses dropped roughly 60 percent. He also says he calibrated too strict at first and only caught it by measuring false refusals.

2. Lecture AI, at /projects/lecture-ai. A startup that turned recorded lectures into bilingual study notes for under a dollar each. A survey of 500 students found a gap nobody was serving: students who follow lectures in English but revise in Mandarin. He built a two-pass pipeline that corrects the transcript against the lecturer's slides before summarising, because a summariser handed a corrupted transcript produces a clean summary of the wrong thing. They built it for students, which was the mistake, because students do not control access to lecture recordings. Switching to lecturers fixed distribution and trust at once. It never got meaningful adoption and they stopped in March 2026. He says so plainly on the page.

3. The order flow study, at /projects/ofi-regime-tradability. An independent pre-registered study testing whether a well-documented market signal stays profitable after trading costs. It does not. He committed the full protocol before writing any analysis code, and declared all four possible outcomes valid in advance. Partway through he found a striking result that turned out to be an arithmetic artifact rather than a market effect, and reported it as an artifact. The economic hypothesis also came out backwards. Repository is public on GitHub.

OTHER PROJECTS
On /projects, grouped four ways.

Production systems: SARA; an AI Architecture Strategy Engine that helps decide between prompting, retrieval and fine-tuning under real cost constraints; Socratic Digital Twin, an AI tutor for dental students deliberately built to refuse to answer directly and ask questions back instead, paid work for a university dental faculty and in development; Echolens, an evaluation pipeline for automated removal of personal information from call transcripts; an LLM Evaluation Framework comparing models on quality, cost and speed across three task types, which surfaced that standard text-similarity scores mislead on structured output; MarkBind, open-source contributions to an NUS documentation tool; and TrackUp, a command-line-first contact manager built as a team project.

Research: the order flow study, and the Singapore Society Simulation, which tested whether AI agents grounded in demographic data can predict how a population reasons about policy.

Ventures: Lecture AI; a trend intelligence venture for Singapore F&B, currently running customer interviews and explicitly unvalidated; and two multiplayer games, Knocks and Sixer, both built because games he played with friends were stuck in bad mediums.

Earlier work: ChessPhere, virtual chess tournaments run during the pandemic drawing over a hundred players each, and Donation Nation, a platform connecting donors with communities in need which started with him giving away things from his own house.

RESEARCH
Three items on /research. The order flow study. The Singapore Society Simulation. And an authored, published paper on whether telemedicine would outlast the pandemic in India, written after an internship at Medanta Hospital using a year of the hospital's telemedicine data plus doctor and patient surveys.

EDUCATION AND TEACHING
B.Comp (Hons) Computer Science at NUS, August 2023 to May 2027, with a minor in Psychology. He has been a teaching assistant for Digital and AI Ethics at NUS and for two summer programmes.

LEADERSHIP
Director of Human Resources at NUSSU, the apex student body at NUS, since November 2024, designing onboarding and feedback systems for over a hundred student leaders. Also on the site: an operations role and competitive chess, where he has played at national level and captained NUS.

THINGS TO GET RIGHT
- He is at Garuda Robotics now. SP Digital ended in June 2026. Never say he currently works at SP Digital.
- He is in his final year, not year three.
- Lecture AI ended in March 2026 without meaningful adoption. Do not describe it as ongoing or successful.
- The F&B venture is unvalidated and pre-revenue. Do not describe it as a working business.
- Do not repeat any number not written above.`;

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
