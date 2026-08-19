import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, ExternalLink, Github } from "lucide-react";
import type { Role } from "@/content/types";

export default function RoleCard({
  role,
  isLast,
}: {
  role: Role;
  isLast: boolean;
}) {
  return (
    <div className="relative">
      {/* Timeline dot */}
      <div
        className={`absolute left-0 top-6 w-3 h-3 rounded-full border-4 border-white shadow-lg z-10 ${role.isCurrent ? "bg-green-500" : "bg-blue-600"}`}
      ></div>

      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-1.5 top-9 w-0.5 h-full bg-slate-200 dark:bg-slate-700"></div>
      )}

      {/* Content card */}
      <div className="ml-8 pb-12">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-slate-100 dark:border-slate-700">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
                  {role.title}
                </h3>
                {role.isCurrent && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 border border-green-200 dark:border-green-800">
                    Current
                  </span>
                )}
              </div>
              <div className="flex items-center text-slate-600 dark:text-slate-400 mb-2">
                <span className="font-medium">{role.company}</span>
                <MapPin className="w-4 h-4 mx-2 text-slate-400" />
                <span className="text-sm">{role.location}</span>
              </div>
            </div>
            <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm mt-2 sm:mt-0 shrink-0">
              <Calendar className="w-4 h-4 mr-2" />
              {role.dates}
            </div>
          </div>

          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            {role.description}
          </p>

          {role.links && role.links.length > 0 && (
            <div className="flex flex-wrap gap-3 mb-4">
              {role.links.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-1.5 text-sm font-medium rounded-lg border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  {link.kind === "github" ? (
                    <Github className="w-4 h-4 mr-2" />
                  ) : (
                    <ExternalLink className="w-4 h-4 mr-2" />
                  )}
                  {link.label}
                </a>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            {role.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900 text-xs"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
