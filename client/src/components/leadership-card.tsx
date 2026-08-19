import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import type { LeadershipItem } from "@/content/types";

export default function LeadershipCard({ item }: { item: LeadershipItem }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-100 dark:border-slate-700 p-7 flex flex-col">
      {/* Title + Current badge */}
      <div className="flex items-start gap-2 flex-wrap mb-1">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white leading-snug">
          {item.title}
        </h3>
        {item.isCurrent && (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 border border-green-200 dark:border-green-800 shrink-0 mt-0.5">
            Current
          </span>
        )}
      </div>

      {/* Org + location + dates */}
      <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm mb-4">
        <span className="font-medium text-slate-600 dark:text-slate-300">
          {item.organization}
        </span>
        {item.location && (
          <>
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-slate-500 dark:text-slate-400">
              {item.location}
            </span>
          </>
        )}
        <span className="text-slate-400 dark:text-slate-500">·</span>
        <span className="text-slate-500 dark:text-slate-400">{item.dates}</span>
      </div>

      {item.description && (
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm mb-5 flex-1">
          {item.description}
        </p>
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
