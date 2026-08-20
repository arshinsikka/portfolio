import { useDocumentMeta } from "@/hooks/use-document-meta";
import { sectionCopy } from "@/content/profile";
import WorkExperience from "@/components/work-experience";

export default function Work() {
  useDocumentMeta({
    title: sectionCopy.work.heading,
    description: sectionCopy.work.subtitle,
  });
  return <WorkExperience />;
}
