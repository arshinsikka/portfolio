import { useDocumentMeta } from "@/hooks/use-document-meta";
import { about } from "@/content/profile";
import AboutMe from "@/components/about-me";
import Leadership from "@/components/leadership";
import Contact from "@/components/contact";

export default function About() {
  // BORROWED, NOT PURPOSE-WRITTEN: about.paragraphs[0] is first-person prose,
  // not a search snippet. See the handover note.
  useDocumentMeta({
    title: about.heading,
    description: about.paragraphs[0],
  });

  return (
    <>
      <AboutMe />
      <Leadership />
      <Contact />
    </>
  );
}
