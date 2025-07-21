import { Badge } from "@/components/ui/badge";
import { Calendar, User } from "lucide-react";

interface ProjectItem {
  title: string;
  role: string;
  dates: string;
  description: string;
  tags: string[];
  emoji: string;
  imagePlaceholder?: string;
}

interface ProjectCardProps {
  project: ProjectItem;
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-100 overflow-hidden">
      {/* Image placeholder - ready for future images */}
      <div className="h-32 bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center">
        <span className="text-4xl">{project.emoji}</span>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-slate-800 mb-3">
          {project.title}
        </h3>
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-2">
          <div className="flex items-center text-slate-600 text-sm">
            <User className="w-4 h-4 mr-2" />
            {project.role}
          </div>
          <div className="flex items-center text-slate-500 text-sm">
            <Calendar className="w-4 h-4 mr-2" />
            {project.dates}
          </div>
        </div>
        
        <p className="text-slate-700 leading-relaxed mb-4 text-sm">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag, index) => (
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
    </div>
  );
}

export default function Projects() {
  const projects: ProjectItem[] = [
    {
      title: "Lecture AI",
      role: "Co-Founder",
      dates: "Mar 2025 – Present",
      description: "An AI-powered tool for summarizing university lectures using automatic transcription, topic segmentation, and intelligent structuring. Backed by BLOCK71's incubation program and currently in MVP stage.",
      tags: ["AI", "NLP", "Startup", "Entrepreneurship"],
      emoji: "🧠"
    },
    {
      title: "TrackUp",
      role: "Developer",
      dates: "Mar 2025 – May 2025",
      description: "A command-line Java application for managing contacts and events with smart parsing, category filtering, and robust test-driven backend logic.",
      tags: ["Java", "CLI", "TDD", "Software Engineering"],
      emoji: "📇"
    },
    {
      title: "Pediatric Tendon Stapler",
      role: "Product Designer",
      dates: "Jan 2025 – May 2025",
      description: "Designed a one-handed ergonomic surgical stapler for pediatric tendon repair under NUS's Innovation & Design Programme. Focused on user research and compatibility with bioabsorbable staples.",
      tags: ["Medical Device", "UX Design", "Hardware Prototyping"],
      emoji: "🩺"
    },
    {
      title: "ChessPhere",
      role: "Co-Founder",
      dates: "Dec 2020 – May 2021",
      description: "An online platform built during the pandemic to support chess communities with virtual tournaments, workshops, and resources.",
      tags: ["Community", "Chess", "Web Platform", "Leadership"],
      emoji: "♟️"
    },
    {
      title: "Donation-Nation",
      role: "Co-Founder",
      dates: "Oct 2020 – Jan 2022",
      description: "A grassroots platform created during COVID-19 to connect donors with NGOs and streamline donation drives across India.",
      tags: ["Social Impact", "Web", "Logistics", "Operations"],
      emoji: "🌐"
    },
    {
      title: "MarkBind Contributions",
      role: "Open Source Contributor",
      dates: "Jun 2025 – Present",
      description: "Contributed to the NUS MarkBind open-source project through issue resolution, feature development, and collaborative workflows as part of CP3108B.",
      tags: ["Open Source", "Vue", "Node.js", "GitHub Workflow"],
      emoji: "🔧"
    }
  ];

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Projects
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            A collection of projects spanning AI innovation, software development, 
            medical device design, and social impact initiatives
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard 
              key={index}
              project={project}
            />
          ))}
        </div>
      </div>
    </section>
  );
}