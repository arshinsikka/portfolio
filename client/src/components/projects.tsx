import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, Download, Star } from "lucide-react";

// ─── Featured Project ────────────────────────────────────────────────────────

function FeaturedProject() {
  return (
    <div className="mb-16">
      <div className="relative bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl p-1 shadow-2xl">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 md:p-10">
          {/* Header row */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-3 flex-wrap mb-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wide bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-sm">
                  <Star className="w-3 h-3" />
                  Featured Project
                </span>
                <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                  BLOCK71-backed
                </span>
                <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-400 border border-purple-200 dark:border-purple-800">
                  VIP@SoC Finalist
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">
                Lecture AI
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Co-Founder &nbsp;·&nbsp; Mar 2025 – Present
              </p>
            </div>
          </div>

          {/* Description paragraphs */}
          <div className="space-y-3 text-slate-700 dark:text-slate-300 leading-relaxed mb-6 text-sm md:text-base">
            <p>
              AI-powered lecture notes in minutes. An end-to-end pipeline that ingests lecture audio + slides and produces structured bilingual study notes — automatically, in &lt;15 minutes, for &lt;$1 per lecture.
            </p>
            <p>
              <span className="font-semibold text-slate-800 dark:text-white">Built with:</span> Whisper API for transcription, Gemini 2.0 Flash for correction/summarization/translation, slide-context RAG (no vector DB needed at this scale), FastAPI backend, python-docx for output generation.
            </p>
            <p>
              <span className="font-semibold text-slate-800 dark:text-white">Key stats:</span> 72% of surveyed NUS students rewatch lectures due to missed content. LectureAI addresses this with topic-wise notes, key concept extraction, action item detection, and full Mandarin translation.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3 mb-6">
            <a
              href="https://github.com/arshinsikka/lectureai-mvp"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-slate-900 dark:bg-slate-700 text-white text-sm font-medium rounded-lg hover:bg-slate-700 dark:hover:bg-slate-600 transition-colors shadow-sm"
            >
              <Github className="w-4 h-4 mr-2" />
              GitHub
            </a>
            <a
              href="https://lectureai.co"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors shadow-sm"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Website
            </a>
            <a
              href="/assets/Lecture_AI_Pitch_Deck.pdf"
              download="Lecture_AI_Pitch_Deck.pdf"
              className="inline-flex items-center px-4 py-2 bg-purple-600 dark:bg-purple-500 text-white text-sm font-medium rounded-lg hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors shadow-sm"
            >
              <Download className="w-4 h-4 mr-2" />
              Pitch Deck
            </a>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {["Python", "FastAPI", "Whisper", "Gemini", "RAG", "NLP"].map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900 text-xs"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── AI Projects (medium cards) ──────────────────────────────────────────────

interface AIProject {
  title: string;
  dates: string;
  description: string;
  tags: string[];
  githubUrl: string;
}

function AIProjectCard({ project }: { project: AIProject }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-100 dark:border-slate-700 p-7 flex flex-col">
      <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-1">
        {project.title}
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
        Developer &nbsp;·&nbsp; {project.dates}
      </p>
      <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm mb-5 flex-1">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2 mb-5">
        {project.tags.map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 text-xs"
          >
            {tag}
          </Badge>
        ))}
      </div>
      <a
        href={project.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center px-4 py-2 bg-slate-900 dark:bg-slate-700 text-white text-sm font-medium rounded-lg hover:bg-slate-700 dark:hover:bg-slate-600 transition-colors shadow-sm w-fit"
      >
        <Github className="w-4 h-4 mr-2" />
        GitHub
      </a>
    </div>
  );
}

// ─── Other Projects (smaller cards) ─────────────────────────────────────────

interface OtherProject {
  title: string;
  role: string;
  dates: string;
  description: string;
  tags: string[];
}

function OtherProjectCard({ project }: { project: OtherProject }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 border border-slate-100 dark:border-slate-700 p-6">
      <h3 className="text-base font-semibold text-slate-800 dark:text-white mb-1">
        {project.title}
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
        {project.role} &nbsp;·&nbsp; {project.dates}
      </p>
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-xs mb-4">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 text-xs"
          >
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Projects() {
  const aiProjects: AIProject[] = [
    {
      title: "AI Architecture Strategy Engine",
      dates: "Mar 2026",
      description:
        "Multi-agent system that helps teams choose between AI architectures (prompting, RAG, fine-tuning) under real constraints like budget, latency, and quality. Implements structured decision frameworks for AI product teams.",
      tags: ["Python", "Multi-Agent", "LLMs", "System Design"],
      githubUrl: "https://github.com/arshinsikka/ai-architecture-strategy-engine",
    },
    {
      title: "LLM Evaluation Framework",
      dates: "Mar 2026",
      description:
        "Modular evaluation framework for comparing LLMs across diverse tasks (summarization, decision analysis, retrieval ranking) with rigorous quality/cost/latency trade-off analysis.",
      tags: ["Python", "LLM Evaluation", "Benchmarking", "ML"],
      githubUrl: "https://github.com/arshinsikka/llm-evaluation-framework",
    },
  ];

  const otherProjects: OtherProject[] = [
    {
      title: "TrackUp",
      role: "Developer",
      dates: "Mar 2025 – May 2025",
      description:
        "Command-line Java application for managing contacts and events with smart parsing, category filtering, and robust test-driven backend logic.",
      tags: ["Java", "CLI", "TDD", "Software Engineering"],
    },
    {
      title: "Pediatric Tendon Stapler",
      role: "Product Designer",
      dates: "Jan 2025 – May 2025",
      description:
        "Designed a one-handed ergonomic surgical stapler for pediatric tendon repair under NUS's Innovation & Design Programme. User research, prototyping, and bioabsorbable staple compatibility.",
      tags: ["Medical Device", "UX Design", "Hardware Prototyping"],
    },
    {
      title: "MarkBind Contributions",
      role: "Open Source Contributor",
      dates: "Jun 2025 – Present",
      description:
        "Contributed to the NUS MarkBind open-source project through issue resolution, feature development, and collaborative workflows as part of CP3108B.",
      tags: ["Open Source", "Vue", "Node.js", "GitHub Workflow"],
    },
  ];

  return (
    <section id="projects" className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
            Projects
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            From AI pipelines to open-source contributions and medical device design
          </p>
        </div>

        {/* Featured */}
        <FeaturedProject />

        {/* AI Projects */}
        <div className="mb-14">
          <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-200 mb-6">
            AI Tools &amp; Frameworks
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {aiProjects.map((project) => (
              <AIProjectCard key={project.title} project={project} />
            ))}
          </div>
        </div>

        {/* Other Projects */}
        <div className="mb-10">
          <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-200 mb-6">
            Other Projects
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {otherProjects.map((project) => (
              <OtherProjectCard key={project.title} project={project} />
            ))}
          </div>
        </div>

        {/* Earlier Work */}
        <p className="text-sm text-slate-400 dark:text-slate-500 text-center">
          Earlier work:{" "}
          <span className="text-slate-500 dark:text-slate-400">ChessPhere</span>
          {" "}(chess community platform, 2020)
          {" "}·{" "}
          <span className="text-slate-500 dark:text-slate-400">Donation-Nation</span>
          {" "}(COVID-19 donor-NGO platform, 2020–2022)
        </p>
      </div>
    </section>
  );
}
