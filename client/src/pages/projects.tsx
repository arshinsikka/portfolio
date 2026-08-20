import { useDocumentMeta } from "@/hooks/use-document-meta";
import { sectionCopy } from "@/content/profile";
import Projects from "@/components/projects";

export default function ProjectsPage() {
  useDocumentMeta({
    title: sectionCopy.projects.heading,
    description: sectionCopy.projects.subtitle,
  });
  return <Projects />;
}
