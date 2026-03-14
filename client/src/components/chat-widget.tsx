import { useState, useRef, useEffect } from "react";
import { X, Send, Sparkles } from "lucide-react";

// ─── System prompt ────────────────────────────────────────────────────────────

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

// ─── Types ────────────────────────────────────────────────────────────────────

interface Message {
  role: "user" | "model";
  text: string;
}

const STARTER_CHIPS = [
  "What's Arshin working on now?",
  "Tell me about his AI experience",
  "What are his key projects?",
  "What makes him unique?",
];

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "llama-3.3-70b-versatile";

// ─── Typing indicator ─────────────────────────────────────────────────────────

function TypingIndicator() {
  return (
    <div className="flex gap-2 items-end">
      <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
        <Sparkles className="w-3.5 h-3.5 text-white" />
      </div>
      <div className="bg-slate-800 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1 items-center">
        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0ms]" />
        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:150ms]" />
        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:300ms]" />
      </div>
    </div>
  );
}

// ─── Main widget ──────────────────────────────────────────────────────────────

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCoolingDown, setIsCoolingDown] = useState(false);
  const [showNudge, setShowNudge] = useState(false);
  const cooldownTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom on new content
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => inputRef.current?.focus(), 120);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // "Try me!" nudge — show once per session, 2 s after load, auto-dismiss after 5 s
  useEffect(() => {
    if (sessionStorage.getItem("chatNudgeSeen")) return;

    const show = setTimeout(() => {
      setShowNudge(true);
      sessionStorage.setItem("chatNudgeSeen", "1");
    }, 2000);

    return () => clearTimeout(show);
  }, []);

  useEffect(() => {
    if (!showNudge) return;
    const hide = setTimeout(() => setShowNudge(false), 5000);
    const dismiss = () => setShowNudge(false);
    document.addEventListener("click", dismiss, { once: true });
    return () => {
      clearTimeout(hide);
      document.removeEventListener("click", dismiss);
    };
  }, [showNudge]);

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading || isCoolingDown) return;

    const userMsg: Message = { role: "user", text: trimmed };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    const attempt = async (): Promise<string> => {
      const apiKey = import.meta.env.VITE_GROQ_API_KEY;
      console.log("API Key exists:", !!apiKey);

      const body = JSON.stringify({
        model: GROQ_MODEL,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...nextMessages.map((m) => ({
            role: m.role === "model" ? "assistant" : "user",
            content: m.text,
          })),
        ],
        temperature: 0.7,
        max_tokens: 1024,
      });

      const res = await fetch(GROQ_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body,
      });

      console.log("Response status:", res.status);

      if (!res.ok) {
        const errText = await res.text();
        console.error("Error body:", errText);
        if (res.status === 429) {
          // Rate limited — retry once after 2 s
          await new Promise((r) => setTimeout(r, 2000));
          const retry = await fetch(GROQ_URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${apiKey}`,
            },
            body,
          });
          console.log("Retry status:", retry.status);
          if (!retry.ok) {
            const retryErr = await retry.text();
            console.error("Retry error body:", retryErr);
            throw new Error("rate_limited");
          }
          const retryData = await retry.json();
          return (
            retryData.choices?.[0]?.message?.content ??
            "I couldn't generate a response. Please try again."
          );
        }
        throw new Error(`${res.status}`);
      }

      const data = await res.json();
      return (
        data.choices?.[0]?.message?.content ??
        "I couldn't generate a response. Please try again."
      );
    };

    try {
      const aiText = await attempt();
      setMessages([...nextMessages, { role: "model", text: aiText }]);
    } catch (err) {
      console.error("API Error:", err);
      const isRateLimited = err instanceof Error && err.message === "rate_limited";
      setMessages([
        ...nextMessages,
        {
          role: "model",
          text: isRateLimited
            ? "I'm getting a lot of questions right now. Please try again in a minute!"
            : "Sorry, I couldn't process that. Try again or reach out directly at arshin.sikka@u.nus.edu",
        },
      ]);
    } finally {
      setIsLoading(false);
      // 2-second cooldown after every request to prevent rapid-fire sends
      setIsCoolingDown(true);
      if (cooldownTimer.current) clearTimeout(cooldownTimer.current);
      cooldownTimer.current = setTimeout(() => setIsCoolingDown(false), 2000);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const showChips = messages.length === 0 && !isLoading;

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Chat panel */}
      {isOpen && (
        <div className="fixed z-50 inset-0 md:inset-auto md:bottom-[88px] md:right-6 flex flex-col bg-slate-900 md:w-[400px] md:h-[520px] md:rounded-2xl shadow-2xl border border-slate-700 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 shrink-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-white/90" />
                <span className="font-semibold text-white text-sm tracking-tight">
                  Chat with ArshinAI ✨
                </span>
              </div>
              <span className="text-xs text-white/70 mt-0.5 pl-6">
                Powered by AI · Knows everything about my work
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/70 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/10"
              aria-label="Close chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 min-h-0">
            {/* Welcome message */}
            <div className="flex gap-2 items-end">
              <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                <Sparkles className="w-3.5 h-3.5 text-white" />
              </div>
              <div className="bg-slate-800 text-slate-200 rounded-2xl rounded-bl-sm px-4 py-2.5 text-sm max-w-[85%] leading-relaxed">
                Hi! I'm an AI assistant on Arshin's portfolio. Ask me anything
                about his experience, projects, or background.
              </div>
            </div>

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-2 items-end ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                {msg.role === "model" && (
                  <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                  </div>
                )}
                <div
                  className={`rounded-2xl px-4 py-2.5 text-sm max-w-[80%] leading-relaxed whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white rounded-br-sm"
                      : "bg-slate-800 text-slate-200 rounded-bl-sm"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isLoading && <TypingIndicator />}

            <div ref={messagesEndRef} />
          </div>

          {/* Starter chips */}
          {showChips && (
            <div className="px-4 pb-3 flex flex-wrap gap-2 shrink-0">
              {STARTER_CHIPS.map((chip) => (
                <button
                  key={chip}
                  onClick={() => sendMessage(chip)}
                  className="text-xs px-3 py-1.5 rounded-full border border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                >
                  {chip}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="px-4 pb-5 pt-2 border-t border-slate-700 shrink-0">
            <div className="flex gap-2 items-center bg-slate-800 rounded-xl px-3 py-2.5">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={isLoading ? "Thinking…" : isCoolingDown ? "Just a moment…" : "Ask something…"}
                className="flex-1 bg-transparent text-sm text-white placeholder-slate-400 outline-none"
                disabled={isLoading || isCoolingDown}
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || isLoading || isCoolingDown}
                className="text-blue-400 hover:text-blue-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors p-0.5"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating toggle button */}
      <div className="fixed bottom-6 right-6 z-50 group">
        {/* "Try me!" nudge bubble */}
        {showNudge && !isOpen && (
          <div className="animate-nudge-in absolute bottom-full right-0 mb-3 pointer-events-none">
            <div className="px-3.5 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-medium rounded-2xl rounded-br-sm whitespace-nowrap shadow-xl border border-slate-700 dark:border-slate-200">
              Try me! 👋
            </div>
            {/* Caret */}
            <div className="absolute top-full right-5 border-[6px] border-transparent border-t-slate-900 dark:border-t-white" />
          </div>
        )}

        {/* Hover tooltip (only when nudge is not showing) */}
        {!showNudge && !isOpen && (
          <div className="absolute bottom-full right-0 mb-2.5 px-3 py-1.5 bg-slate-900 text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg">
            Ask my AI anything!
            <div className="absolute top-full right-4 border-4 border-transparent border-t-slate-900" />
          </div>
        )}

        <button
          onClick={() => setIsOpen((o) => !o)}
          className={`w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 hover:from-blue-400 hover:via-indigo-500 hover:to-purple-500 active:scale-95 text-white flex items-center justify-center transition-colors duration-200 chat-btn-hover ${!isOpen ? "animate-pulse-glow" : "shadow-xl"}`}
          aria-label={isOpen ? "Close AI chat" : "Open AI chat"}
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Sparkles className="w-6 h-6" />
          )}
        </button>
      </div>
    </>
  );
}
