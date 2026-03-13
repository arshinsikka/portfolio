import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, ExternalLink, Github } from "lucide-react";

interface ExperienceLink {
  label: string;
  url: string;
  icon: "github" | "external";
}

interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  dates: string;
  description: string;
  tags: string[];
  isCurrent?: boolean;
  links?: ExperienceLink[];
}

interface ExperienceCardProps {
  experience: ExperienceItem;
  index: number;
  isLast: boolean;
}

function ExperienceCard({ experience, index, isLast }: ExperienceCardProps) {
  return (
    <div className="relative">
      {/* Timeline dot */}
      <div className={`absolute left-0 top-6 w-3 h-3 rounded-full border-4 border-white shadow-lg z-10 ${experience.isCurrent ? "bg-green-500" : "bg-blue-600"}`}></div>

      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-1.5 top-9 w-0.5 h-full bg-slate-200 dark:bg-slate-700"></div>
      )}

      {/* Content card */}
      <div className="ml-8 pb-12">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-slate-100 dark:border-slate-700">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
                  {experience.title}
                </h3>
                {experience.isCurrent && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 border border-green-200 dark:border-green-800">
                    Current
                  </span>
                )}
              </div>
              <div className="flex items-center text-slate-600 dark:text-slate-400 mb-2">
                <span className="font-medium">{experience.company}</span>
                <MapPin className="w-4 h-4 mx-2 text-slate-400" />
                <span className="text-sm">{experience.location}</span>
              </div>
            </div>
            <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm mt-2 sm:mt-0 shrink-0">
              <Calendar className="w-4 h-4 mr-2" />
              {experience.dates}
            </div>
          </div>

          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            {experience.description}
          </p>

          {experience.links && experience.links.length > 0 && (
            <div className="flex flex-wrap gap-3 mb-4">
              {experience.links.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-1.5 text-sm font-medium rounded-lg border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  {link.icon === "github" ? (
                    <Github className="w-4 h-4 mr-2" />
                  ) : (
                    <ExternalLink className="w-4 h-4 mr-2" />
                  )}
                  {link.label}
                </a>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            {experience.tags.map((tag, tagIndex) => (
              <Badge
                key={tagIndex}
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

export default function WorkExperience() {
  const experiences: ExperienceItem[] = [
    {
      title: "Data Science Intern",
      company: "SP Digital",
      location: "Singapore",
      dates: "Jan 2026 – Present",
      description:
        "Engineered enterprise guardrails for production LLM systems, implementing access control policies, grounding constraints, and retrieval boundaries for safe deployment. Built evaluation infrastructure with 400+ adversarial prompts, reducing unsafe model responses by ~60%.",
      tags: ["LLM Systems", "Guardrails", "Enterprise AI", "Evaluation"],
      isCurrent: true,
    },
    {
      title: "Co-Founder",
      company: "Lecture AI",
      location: "Singapore",
      dates: "Mar 2025 – Present",
      description:
        "Built an end-to-end pipeline that converts lecture recordings into structured bilingual study notes in <15 minutes for <$1. Features Whisper transcription, slide-context RAG for correction, topic segmentation, and Mandarin translation. VIP@SoC finalist, backed by BLOCK71.",
      tags: ["AI", "NLP", "RAG", "Startup", "Product"],
      isCurrent: true,
      links: [
        {
          label: "View GitHub",
          url: "https://github.com/arshinsikka/lectureai-mvp",
          icon: "github",
        },
        {
          label: "Visit Website",
          url: "https://lectureai.co",
          icon: "external",
        },
      ],
    },
    {
      title: "AI Labs Intern",
      company: "KPMG",
      location: "Gurugram",
      dates: "May 2025 – Aug 2025",
      description:
        "Built an agentic RAG system using LangChain and Azure OpenAI for document retrieval across hundreds of internal consulting documents. Shipped source-PDF retrieval and structured Excel extraction workflows, reducing knowledge lookup time by ~40–50% for 12+ person teams.",
      tags: ["RAG", "LangChain", "Azure OpenAI", "Enterprise"],
    },
    {
      title: "SDE Intern",
      company: "AlygnAI",
      location: "Remote (US)",
      dates: "Jun 2025 – Aug 2025",
      description:
        "Led migration from Bubble prototype to production FastAPI backend with JWT, refresh tokens, bcrypt, and 2FA. Evaluated fine-tuning vs RAG tradeoffs for the founding team's product architecture decisions.",
      tags: ["FastAPI", "Auth", "LLMs", "Startup"],
    },
    {
      title: "SWE Intern",
      company: "StatusNeo",
      location: "Gurugram",
      dates: "May 2024 – Jul 2024",
      description:
        "Developed REST APIs in Spring Boot for enterprise banking client with JWT authentication and RBAC. Wrote JUnit tests in agile production environment.",
      tags: ["Java", "Spring Boot", "REST APIs", "Enterprise"],
    },
  ];

  return (
    <section id="experience" className="py-20 bg-slate-50 dark:bg-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
            Work Experience
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Professional experience across AI systems, full-stack engineering, and product development
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={index}
              experience={experience}
              index={index}
              isLast={index === experiences.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
