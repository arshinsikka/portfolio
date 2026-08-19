import { GraduationCap, Globe, FlaskConical, Rocket, Bot, Trophy, BookOpen } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Section } from "@/components/section";
import { about, education, highlights, type HighlightIcon } from "@/content/profile";

const ICONS: Record<HighlightIcon, LucideIcon> = {
  graduation: GraduationCap,
  globe: Globe,
  flask: FlaskConical,
  rocket: Rocket,
  bot: Bot,
  trophy: Trophy,
};

export default function AboutMe() {
  return (
    <Section id="about" tone="light" width="narrow" heading={about.heading}>

      {/* Main Content Section */}
      <div className="mb-16">
        <div className="space-y-6 text-base md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto">
          {about.paragraphs.map((paragraph, index) => (
            <p key={index}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="mb-16">
        <h3 className="text-2xl font-semibold text-slate-800 dark:text-white mb-6 text-center">
          {education.heading}
        </h3>
        <div className="max-w-3xl mx-auto bg-slate-50 dark:bg-slate-800 rounded-lg p-6 border border-slate-100 dark:border-slate-700">
          <div className="flex items-start gap-4">
            <GraduationCap className="w-6 h-6 text-blue-600 dark:text-blue-400 mt-1 shrink-0" />
            <div>
              <p className="font-semibold text-slate-800 dark:text-white">
                {education.degree}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">{education.meta}</p>
              <ul className="space-y-1 text-sm text-slate-700 dark:text-slate-300 list-none">
                {education.notes.map((note, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <BookOpen className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                    <span>{note}</span>
                  </li>
                ))}
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
            const IconComponent = ICONS[highlight.icon];
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
    </Section>
  );
}
