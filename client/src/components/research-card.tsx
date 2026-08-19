import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import type { ResearchItem } from "@/content/types";

export default function ResearchCard({ item }: { item: ResearchItem }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-100 dark:border-slate-700 p-8 flex flex-col">
      <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-1">
        {item.title}
      </h3>

      <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm mb-4">
        <span className="font-medium text-slate-600 dark:text-slate-300">
          {item.organization}
        </span>
        <span className="text-slate-400 dark:text-slate-500">·</span>
        <span className="text-slate-500 dark:text-slate-400">{item.dates}</span>
      </div>

      <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm mb-6 flex-1">
        {item.description}
      </p>

      {item.links && item.links.length > 0 && (
        <div className="mb-5">
          {item.links.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              {link.label}
            </a>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {item.tags.map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 text-xs"
          >
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
}
