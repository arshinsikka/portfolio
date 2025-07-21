import { Badge } from "@/components/ui/badge";

interface ResearchItem {
  title: string;
  organization: string;
  dates: string;
  description: string;
  tags: string[];
}

interface ResearchCardProps {
  research: ResearchItem;
}

function ResearchCard({ research }: ResearchCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-100 p-8">
      <h3 className="text-xl font-bold text-slate-800 mb-3">
        {research.title}
      </h3>
      
      <div className="mb-4">
        <span className="text-slate-600 text-sm font-medium">{research.organization}</span>
        <span className="text-slate-400 text-sm mx-2">•</span>
        <span className="text-slate-500 text-sm">{research.dates}</span>
      </div>
      
      <p className="text-slate-700 leading-relaxed mb-6 text-sm">
        {research.description}
      </p>
      
      <div className="flex flex-wrap gap-2">
        {research.tags.map((tag, index) => (
          <Badge 
            key={index}
            variant="secondary"
            className="bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs"
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
      description: "Researched LLM-driven cybersecurity techniques, using Graph Neural Networks (GNNs) and First-Order Logic (FOL) to enhance causal graph extraction and anomaly detection. Designed invariant extraction pipelines to improve log interpretation.",
      tags: ["AI Security", "LLMs", "GNNs", "FOL", "Log Analysis"]
    },
    {
      title: "Research Intern & Author",
      organization: "Medanta Hospital, Gurugram",
      dates: "Dec 2021 – Nov 2022",
      description: "Contributed to research on telemedicine during the COVID-19 pandemic by testing early prototypes with clinicians and collecting user feedback. Authored a peer-reviewed paper titled \"The Future of Telemedicine in India.\"",
      tags: ["Healthcare", "UX Research", "Writing", "Telemedicine"]
    }
  ];

  return (
    <section id="research" className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Research Experience
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Academic and clinical research contributions across cybersecurity, 
            AI systems, and healthcare technology
          </p>
        </div>

        {/* Research Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {researchItems.map((research, index) => (
            <ResearchCard 
              key={index}
              research={research}
            />
          ))}
        </div>
      </div>
    </section>
  );
}