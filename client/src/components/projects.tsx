import ProjectCard from "@/components/project-card";
import { Section } from "@/components/section";
import {
  featuredProjects,
  standardProjects,
  minorProjects,
} from "@/content/projects";
import { sectionCopy } from "@/content/profile";

export default function Projects() {
  return (
    <Section
      tone="light"
      width="wide"
      heading={sectionCopy.projects.heading}
      subtitle={sectionCopy.projects.subtitle}
    >
      {/* Featured */}
      {featuredProjects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}

      {/* AI Projects */}
      <div className="mb-14">
        <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-200 mb-6">
          {sectionCopy.projects.standardHeading}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {standardProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>

      {/* Other Projects */}
      <div className="mb-10">
        <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-200 mb-6">
          {sectionCopy.projects.minorHeading}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {minorProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </Section>
  );
}
