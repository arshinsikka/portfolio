import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

interface ProjectItem {
  title: string;
  role: string;
  dates: string;
  description: string;
  tags: string[];
  websiteUrl?: string;
}

interface ProjectCardProps {
  project: ProjectItem;
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-100 dark:border-slate-700 p-8">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-xl font-bold text-slate-800 dark:text-white">
          {project.title}
        </h3>
        {project.websiteUrl && (
          <a 
            href={project.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors ml-2"
            title="Visit Website"
          >
            <ExternalLink className="w-5 h-5" />
          </a>
        )}
      </div>
      
      <div className="mb-4">
        <span className="text-slate-600 dark:text-slate-300 text-sm font-medium">{project.role}</span>
        <span className="text-slate-400 dark:text-slate-500 text-sm mx-2">•</span>
        <span className="text-slate-500 dark:text-slate-400 text-sm">{project.dates}</span>
      </div>
      
      <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6 text-sm">
        {project.description}
      </p>
      
      {/* Action Buttons for Lecture AI */}
      {project.title === "Lecture AI" && (
        <div className="mb-4 flex gap-3 flex-wrap">
          {project.websiteUrl && (
            <a
              href={project.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors shadow-sm"
            >
              Visit Website
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          )}
          <a
            href="/attached_assets/Lecture AI - Pitch Deck_1753120443469.pdf"
            download="Lecture_AI_Pitch_Deck.pdf"
            className="inline-flex items-center px-4 py-2 bg-purple-600 dark:bg-purple-500 text-white text-sm font-medium rounded-lg hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors shadow-sm"
          >
            Download Pitch Deck
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </a>
        </div>
      )}
      
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag, index) => (
          <Badge 
            key={index}
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

export default function Projects() {
  const projects: ProjectItem[] = [
    {
      title: "Lecture AI",
      role: "Co-Founder",
      dates: "Mar 2025 – Present",
      description: "An AI-powered tool for summarizing university lectures using automatic transcription, topic segmentation, and intelligent structuring. Backed by BLOCK71's incubation program and currently in MVP stage.",
      tags: ["AI", "NLP", "Startup", "Entrepreneurship"],
      websiteUrl: "https://lectureai.vercel.app"
    },
    {
      title: "TrackUp",
      role: "Developer",
      dates: "Mar 2025 – May 2025",
      description: "A command-line Java application for managing contacts and events with smart parsing, category filtering, and robust test-driven backend logic.",
      tags: ["Java", "CLI", "TDD", "Software Engineering"]
    },
    {
      title: "Pediatric Tendon Stapler",
      role: "Product Designer",
      dates: "Jan 2025 – May 2025",
      description: "Designed a one-handed ergonomic surgical stapler for pediatric tendon repair under NUS's Innovation & Design Programme. Focused on user research and compatibility with bioabsorbable staples.",
      tags: ["Medical Device", "UX Design", "Hardware Prototyping"]
    },
    {
      title: "ChessPhere",
      role: "Co-Founder",
      dates: "Dec 2020 – May 2021",
      description: "An online platform built during the pandemic to support chess communities with virtual tournaments, workshops, and resources.",
      tags: ["Community", "Chess", "Web Platform", "Leadership"]
    },
    {
      title: "Donation-Nation",
      role: "Co-Founder",
      dates: "Oct 2020 – Jan 2022",
      description: "A grassroots platform created during COVID-19 to connect donors with NGOs and streamline donation drives across India.",
      tags: ["Social Impact", "Web", "Logistics", "Operations"]
    },
    {
      title: "MarkBind Contributions",
      role: "Open Source Contributor",
      dates: "Jun 2025 – Present",
      description: "Contributed to the NUS MarkBind open-source project through issue resolution, feature development, and collaborative workflows as part of CP3108B.",
      tags: ["Open Source", "Vue", "Node.js", "GitHub Workflow"]
    }
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