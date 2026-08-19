import { Redirect, useParams } from "wouter";
import ProjectCard from "@/components/project-card";
import { Container } from "@/components/section";
import { projectBySlug } from "@/content/projects";
import NotFound from "@/pages/not-found";

/**
 * Detail page for a single project.
 *
 * Only projects flagged `hasDetailPage` have one. Any other known slug sends
 * the visitor back to the index rather than showing an empty shell. An unknown
 * slug renders the 404 page in place, leaving the bad URL in the address bar
 * so it stays visible rather than being silently rewritten.
 */
export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = projectBySlug(slug);

  if (!project) return <NotFound />;
  if (!project.hasDetailPage) return <Redirect to="/projects" replace />;

  return (
    <section className="py-20 bg-white dark:bg-slate-900">
      <Container width="wide">
        <ProjectCard project={project} />
      </Container>
    </section>
  );
}
