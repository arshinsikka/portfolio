import { GraduationCap, Globe, FlaskConical, Rocket, Bot, Trophy, BookOpen } from "lucide-react";

export default function AboutMe() {
  const highlights = [
    {
      icon: GraduationCap,
      text: "Computer Science @ NUS, Minor in Psychology"
    },
    {
      icon: Globe,
      text: "Based in Singapore & India"
    },
    {
      icon: FlaskConical,
      text: "Research: LLMs, Cybersecurity, Human-AI Interfaces"
    },
    {
      icon: Rocket,
      text: "Co-founded Lecture AI (BLOCK71-backed, VIP@SoC Finalist)"
    },
    {
      icon: Bot,
      text: "Built AI systems at SP Digital, KPMG, AlygnAI"
    },
    {
      icon: Trophy,
      text: "International Chess Player with 10+ Years Competitive Experience"
    }
  ];

  return (
    <section id="about" className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
            About Me
          </h2>
        </div>

        {/* Main Content Section */}
        <div className="mb-16">
          <div className="space-y-6 text-base md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto">
            <p>
              I'm a CS student at NUS specializing in AI, currently building production LLM systems at SP Digital. I co-founded Lecture AI (BLOCK71-backed) and previously shipped agentic RAG systems at KPMG.
            </p>
            <p>
              I approach technology through a product lens — what problem does this solve, and for whom? My minor in Psychology keeps me grounded in how users actually think and behave.
            </p>
          </div>
        </div>

        {/* Education */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-slate-800 dark:text-white mb-6 text-center">
            Education
          </h3>
          <div className="max-w-3xl mx-auto bg-slate-50 dark:bg-slate-800 rounded-lg p-6 border border-slate-100 dark:border-slate-700">
            <div className="flex items-start gap-4">
              <GraduationCap className="w-6 h-6 text-blue-600 dark:text-blue-400 mt-1 shrink-0" />
              <div>
                <p className="font-semibold text-slate-800 dark:text-white">
                  B.Comp (Hons) Computer Science — National University of Singapore
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">Aug 2023 – May 2027 · Minor in Psychology</p>
                <ul className="space-y-1 text-sm text-slate-700 dark:text-slate-300 list-none">
                  <li className="flex items-start gap-2">
                    <BookOpen className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                    <span>Teaching Assistant, Digital &amp; AI Ethics (IS1108) — Aug 2025 – Dec 2025. Supported student learning on ethical implications of AI, graded assignments, and facilitated seminar discussions on responsible AI development.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Highlights */}
        <div>
          <h3 className="text-2xl font-semibold text-slate-800 dark:text-white mb-8 text-center">
            Quick Highlights
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlights.map((highlight, index) => {
              const IconComponent = highlight.icon;
              return (
                <div 
                  key={index}
                  className="flex items-start space-x-4 p-6 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 hover:shadow-md transition-all duration-300 ease-out hover:-translate-y-1"
                >
                  <div className="flex-shrink-0">
                    <IconComponent className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 text-sm md:text-base leading-relaxed">
                    {highlight.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}