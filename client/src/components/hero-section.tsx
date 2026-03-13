import { Button } from "@/components/ui/button";
import { Download, Mail, Github, ChevronDown } from "lucide-react";
export default function HeroSection() {
  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Smooth scroll to contact section
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleResumeClick = () => {
    // Open resume PDF in new tab
    const resumeUrl = "/assets/Arshin_Sikka_Resume.pdf";
    window.open(resumeUrl, '_blank');
  };

  return (
    <section id="home" className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center px-4 sm:px-6 lg:px-8 relative pt-16">
      <div className="max-w-4xl mx-auto text-center">
        
        {/* Profile Image */}
        <div className="mb-8 animate-fade-in-down">
          <div className="relative inline-block">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600 shadow-xl ring-4 ring-white text-white text-4xl font-bold">
              AS
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white"></div>
          </div>
        </div>

        {/* Name and Title */}
        <div className="animate-fade-in-up mb-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 dark:text-white mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              Arshin Sikka
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 font-medium max-w-3xl mx-auto leading-relaxed">
            Building AI products — from BLOCK71-backed startup to enterprise LLM systems
          </p>
        </div>

        {/* Introduction Paragraph */}
        <div className="animate-fade-in mb-12">
          <p className="text-base md:text-lg text-slate-700 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Year 3 CS student at NUS. Currently shipping production AI systems at SP Digital. Previously built agentic RAG at KPMG and co-founded Lecture AI.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="animate-fade-in-up flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            onClick={handleResumeClick}
            className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 ease-out"
            size="lg"
          >
            <Download className="w-5 h-5 mr-2" />
            View Resume
          </Button>

          <Button
            onClick={handleContactClick}
            variant="ghost"
            className="inline-flex items-center px-8 py-3 text-slate-600 dark:text-slate-400 font-medium rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-200 transition-all duration-300 ease-out"
            size="lg"
          >
            <Mail className="w-5 h-5 mr-2" />
            Contact Me
          </Button>

          <Button
            asChild
            variant="ghost"
            className="inline-flex items-center px-8 py-3 text-slate-600 dark:text-slate-400 font-medium rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-200 transition-all duration-300 ease-out"
            size="lg"
          >
            <a
              href="https://github.com/arshinsikka"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-5 h-5 mr-2" />
              GitHub
            </a>
          </Button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-slate-400" />
        </div>
      </div>
    </section>
  );
}
