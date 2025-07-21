import HeroSection from "@/components/hero-section";
import AboutMe from "@/components/about-me";
import WorkExperience from "@/components/work-experience";
import Projects from "@/components/projects";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <AboutMe />
      <WorkExperience />
      <Projects />
    </div>
  );
}
