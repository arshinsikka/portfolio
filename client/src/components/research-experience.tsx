import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

interface ResearchItem {
  title: string;
  organization: string;
  dates: string;
  description: string;
  tags: string[];
  paperUrl?: string;
}

function ResearchCard({ research }: { research: ResearchItem }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-100 dark:border-slate-700 p-8 flex flex-col">
      <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-1">
        {research.title}
      </h3>

      <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm mb-4">
        <span className="font-medium text-slate-600 dark:text-slate-300">{research.organization}</span>
        <span className="text-slate-400 dark:text-slate-500">·</span>
        <span className="text-slate-500 dark:text-slate-400">{research.dates}</span>
      </div>

      <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm mb-6 flex-1">
        {research.description}
      </p>

      {research.paperUrl && (
        <div className="mb-5">
          <a
            href={research.paperUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            View Paper
          </a>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {research.tags.map((tag, i) => (
          <Badge
            key={i}
            variant="secondary"
            className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 text-xs"
          >
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
}

export default function ResearchExperience() {
  const researchItems: ResearchItem[] = [
    {
      title: "Research Assistant (Cybersecurity)",
      organization: "Dr. Ming, NUS",
      dates: "Feb 2025 – Mar 2025",
      description:
        "Researched LLM-driven cybersecurity techniques using Graph Neural Networks (GNNs) and First-Order Logic (FOL) to enhance causal graph extraction and anomaly detection. Designed invariant extraction pipelines to improve log interpretation.",
      tags: ["AI Security", "LLMs", "GNNs", "FOL", "Log Analysis"],
    },
    {
      title: "Research Intern & Author",
      organization: "Medanta Hospital, Gurugram",
      dates: "Dec 2021 – Nov 2022",
      description:
        "Contributed to telemedicine research during the COVID-19 pandemic by testing early prototypes with clinicians and collecting user feedback. Authored peer-reviewed paper titled \"The Future of Telemedicine in India.\"",
      tags: ["Healthcare", "UX Research", "Writing", "Telemedicine"],
    },
  ];

  return (
    <section id="research" className="py-20 bg-slate-50 dark:bg-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
            Research Experience
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Academic and clinical research contributions across cybersecurity,
            AI systems, and healthcare technology
          </p>
        </div>

        {/* Two-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {researchItems.map((research, index) => (
            <ResearchCard key={index} research={research} />
          ))}
        </div>
      </div>
    </section>
  );
}
