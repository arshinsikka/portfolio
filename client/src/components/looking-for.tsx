import { Briefcase } from "lucide-react";

export default function LookingFor() {
  const handleResumeClick = () => {
    window.open("/assets/Arshin_Sikka_Resume.pdf", "_blank");
  };

  return (
    <div className="bg-white dark:bg-slate-900 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 px-5 py-4 rounded-xl border border-blue-100 dark:border-blue-900 bg-blue-50/60 dark:bg-blue-950/30">
          <Briefcase className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed flex-1">
            <span className="font-semibold text-slate-800 dark:text-white">Open to opportunities.</span>
            {" "}Seeking product, strategy, and AI/data science roles where I can build impactful systems and ship real products. Open to internships (Summer 2026) and full-time opportunities post-graduation (May 2027).
          </p>
          <button
            onClick={handleResumeClick}
            className="shrink-0 inline-flex items-center px-4 py-1.5 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm"
          >
            View Resume
          </button>
        </div>
      </div>
    </div>
  );
}
