import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import AboutMe from "@/components/about-me";
import LookingFor from "@/components/looking-for";
import WorkExperience from "@/components/work-experience";
import Projects from "@/components/projects";
import ResearchExperience from "@/components/research-experience";
import Leadership from "@/components/leadership";
import Contact from "@/components/contact";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutMe />
      <LookingFor />
      <WorkExperience />
      <Projects />
      <ResearchExperience />
      <Leadership />
      <Contact />
      <Footer />
    </div>
  );
}
