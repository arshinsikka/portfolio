import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar } from "lucide-react";

interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  dates: string;
  description: string;
  tags: string[];
}

interface ExperienceCardProps {
  experience: ExperienceItem;
  index: number;
}

function ExperienceCard({ experience, index }: ExperienceCardProps) {
  return (
    <div className="relative">
      {/* Timeline dot */}
      <div className="absolute left-0 top-6 w-3 h-3 bg-blue-600 rounded-full border-4 border-white shadow-lg z-10"></div>
      
      {/* Timeline line */}
      {index !== 4 && (
        <div className="absolute left-1.5 top-9 w-0.5 h-full bg-slate-200"></div>
      )}
      
      {/* Content card */}
      <div className="ml-8 pb-12">
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-slate-100">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-800 mb-1">
                {experience.title}
              </h3>
              <div className="flex items-center text-slate-600 mb-2">
                <span className="font-medium">{experience.company}</span>
                <MapPin className="w-4 h-4 mx-2 text-slate-400" />
                <span className="text-sm">{experience.location}</span>
              </div>
            </div>
            <div className="flex items-center text-slate-500 text-sm mt-2 sm:mt-0">
              <Calendar className="w-4 h-4 mr-2" />
              {experience.dates}
            </div>
          </div>
          
          <p className="text-slate-700 leading-relaxed mb-4">
            {experience.description}
          </p>
          
          <div className="flex flex-wrap gap-2">
            {experience.tags.map((tag, tagIndex) => (
              <Badge 
                key={tagIndex}
                variant="secondary"
                className="bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs"
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
      title: "AI Labs Intern",
      company: "KPMG",
      location: "Gurugram",
      dates: "May 2025 – Aug 2025",
      description: "Built a Retrieval-Augmented Generation (RAG) chatbot using Azure OpenAI and LangChain to streamline document intelligence for consultants. Improved internal knowledge access across teams using secure, agentic workflows.",
      tags: ["AI", "Chatbot", "RAG", "Azure OpenAI"]
    },
    {
      title: "SDE Intern",
      company: "AlygnAI",
      location: "Remote (US)",
      dates: "Jun 2025 – Present",
      description: "Worked on core product features for an enterprise-focused LLM platform. Built dynamic frontend components in WeWeb and contributed to research on fine-tuning strategies to improve model adaptability.",
      tags: ["LLMs", "Frontend Dev", "WeWeb", "Product"]
    },
    {
      title: "SWE Intern",
      company: "StatusNeo",
      location: "Gurugram",
      dates: "May 2024 – Jul 2024",
      description: "Developed scalable Spring Boot web apps for enterprise banking clients. Contributed to backend logic, REST APIs, and deployment pipelines in a high-performance agile environment.",
      tags: ["Java", "Spring Boot", "REST APIs", "Enterprise Software"]
    },
    {
      title: "GenAI Intern",
      company: "PharynxAI Technologies",
      location: "Gurugram",
      dates: "Dec 2024 – Jan 2025",
      description: "Tested GenAI virtual try-on features on Genie (flagship platform) and scraped commercial datasets for business intelligence and performance benchmarking.",
      tags: ["Generative AI", "Image Generation", "Web Testing", "Data Scraping"]
    },
    {
      title: "Data Analytics Intern",
      company: "Lagozon Technologies",
      location: "New Delhi",
      dates: "May 2022 – Jun 2022",
      description: "Built Power BI dashboards and SQL-based models to analyze sales performance. Created a business intelligence report to support better decision-making in cross-functional teams.",
      tags: ["Power BI", "SQL", "Data Analytics", "Reporting"]
    }
  ];

  return (
    <section id="experience" className="py-20 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Work Experience
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Professional internships and work experience across AI, software development, 
            and data analytics
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {experiences.map((experience, index) => (
            <ExperienceCard 
              key={index}
              experience={experience}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}