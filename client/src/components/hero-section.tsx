import { Link } from "wouter";
import { Download, Mail, Github, ChevronDown } from "lucide-react";
import { hero, RESUME_URL } from "@/content/profile";

export default function HeroSection() {
  const handleResumeClick = () => {
    window.open(RESUME_URL, "_blank");
  };

  return (
    <section
      className="min-h-[calc(100vh-var(--nav-h))] bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-[var(--avatar-float)] relative"
    >
      <div className="max-w-4xl mx-auto text-center">

        {/* Profile avatar */}
        <div className="mb-8 animate-fade-in-down">
          <div className="relative inline-block">
            <div className="animate-float">
              <img
                src={hero.imageSrc}
                alt={hero.imageAlt}
                width={320}
                height={320}
                decoding="async"
                className="w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto object-cover shadow-xl ring-4 ring-white dark:ring-slate-800 avatar-glow"
              />
            </div>
            {/* Available indicator */}
            <div className="absolute bottom-1 right-1 md:bottom-1.5 md:right-1.5 w-5 h-5 md:w-6 md:h-6 bg-green-500 rounded-full border-[3px] border-white dark:border-slate-800 shadow-sm" title={hero.availabilityTitle} />
          </div>
        </div>

        {/* Name & tagline */}
        <div className="animate-fade-in-up mb-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 dark:text-white mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              {hero.name}
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 font-medium max-w-3xl mx-auto leading-relaxed">
            {hero.tagline}
          </p>
        </div>

        {/* Introduction */}
        <div className="animate-fade-in mb-12">
          <p className="text-base md:text-lg text-slate-700 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {hero.intro}
          </p>
        </div>

        {/* CTA buttons — primary large, secondaries smaller outlined */}
        <div className="animate-fade-in-up flex flex-col sm:flex-row gap-3 justify-center items-center">
          {/* Primary CTA */}
          <button
            onClick={handleResumeClick}
            className="inline-flex items-center justify-center w-full sm:w-auto px-10 py-4 text-base font-semibold rounded-xl bg-blue-600 text-white shadow-lg hover:bg-blue-700 hover:shadow-xl hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
          >
            <Download className="w-5 h-5 mr-2 shrink-0" />
            View Resume
          </button>

          {/* Secondary — Contact */}
          <Link
            href="/about"
            className="inline-flex items-center justify-center w-full sm:w-auto px-7 py-3 text-sm font-medium rounded-xl border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-slate-400 dark:hover:border-slate-500 hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
          >
            <Mail className="w-4 h-4 mr-2 shrink-0" />
            Contact Me
          </Link>

          {/* Secondary — GitHub */}
          <a
            href={hero.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-full sm:w-auto px-7 py-3 text-sm font-medium rounded-xl border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-slate-400 dark:hover:border-slate-500 hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
          >
            <Github className="w-4 h-4 mr-2 shrink-0" />
            GitHub
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-slate-400" />
        </div>
      </div>
    </section>
  );
}
