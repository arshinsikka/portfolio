import { useDocumentMeta } from "@/hooks/use-document-meta";
import { sectionCopy } from "@/content/profile";
import ResearchExperience from "@/components/research-experience";

export default function Research() {
  useDocumentMeta({
    title: sectionCopy.research.heading,
    description: sectionCopy.research.subtitle,
  });
  return <ResearchExperience />;
}
