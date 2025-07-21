import { GraduationCap, Globe, FlaskConical, Rocket, Bot, Trophy, Sprout } from "lucide-react";

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
      text: "Built Lecture AI (BLOCK71), TrackUp, and ChessPhere"
    },
    {
      icon: Bot,
      text: "Internships at KPMG, AlygnAI, StatusNeo, PharynxAI"
    },
    {
      icon: Trophy,
      text: "International Chess Player with 10+ Years Competitive Experience"
    },
    {
      icon: Sprout,
      text: "Passionate about education, AI for good, and thoughtful design"
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            About Me
          </h2>
        </div>

        {/* Intro Paragraph */}
        <div className="mb-16">
          <p className="text-lg md:text-xl text-slate-700 leading-relaxed text-center max-w-3xl mx-auto">
            Hi, I'm Arshin — a penultimate year Computer Science student at NUS with a minor in Psychology, 
            a curious mind, and a big heart for building things that matter. I'm fascinated 
            by how technology can change lives, and I'm driven by the idea that the right tools, 
            built with care, can create real impact at scale.
          </p>
        </div>

        {/* Main Content Section */}
        <div className="mb-16">
          <div className="space-y-6 text-base md:text-lg text-slate-700 leading-relaxed max-w-3xl mx-auto">
            <p>
              I chose to study Computer Science because I wanted to be part of the solution — using 
              technology to address real problems and give back to society. My minor in Psychology 
              helps me stay grounded in the people I'm building for. Understanding how users think, 
              feel, and behave has shaped the way I approach everything — from designing lecture 
              summarization tools to mentoring underprivileged students.
            </p>
            <p>
              Whether I'm prototyping a surgical device, contributing to open source, or building 
              a startup, I'm always asking: How can this make someone's life better?
            </p>
          </div>
        </div>

        {/* Quick Highlights */}
        <div>
          <h3 className="text-2xl font-semibold text-slate-800 mb-8 text-center">
            Quick Highlights
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlights.map((highlight, index) => {
              const IconComponent = highlight.icon;
              return (
                <div 
                  key={index}
                  className="flex items-start space-x-4 p-6 rounded-lg bg-slate-50 hover:bg-slate-100 hover:shadow-md transition-all duration-300 ease-out hover:-translate-y-1"
                >
                  <div className="flex-shrink-0">
                    <IconComponent className="w-6 h-6 text-blue-600" />
                  </div>
                  <p className="text-slate-700 text-sm md:text-base leading-relaxed">
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