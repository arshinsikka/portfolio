import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, Download, Star } from "lucide-react";
import type { ContentLink, Project } from "@/content/types";

/** Per-kind icon and button styling for the featured card's link row. */
const LINK_STYLE: Record<ContentLink["kind"], string> = {
  github:
    "bg-slate-900 dark:bg-slate-700 text-white hover:bg-slate-700 dark:hover:bg-slate-600",
  website:
    "bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600",
  download:
    "bg-purple-600 dark:bg-purple-500 text-white hover:bg-purple-700 dark:hover:bg-purple-600",
  paper:
    "bg-slate-900 dark:bg-slate-700 text-white hover:bg-slate-700 dark:hover:bg-slate-600",
};

function LinkIcon({ kind }: { kind: ContentLink["kind"] }) {
  if (kind === "github") return <Github className="w-4 h-4 mr-2" />;
  if (kind === "download") return <Download className="w-4 h-4 mr-2" />;
  return <ExternalLink className="w-4 h-4 mr-2" />;
}

/**
 * Accolade pills are toned by position: the first is amber, the rest purple.
 * That reproduces the original hardcoded pair exactly. If a project ever needs
 * a different combination, give ContentLink-style `tone` to the accolade type.
 */
const ACCOLADE_TONE = [
  "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800",
  "bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-400 border border-purple-200 dark:border-purple-800",
];

function FeaturedCard({ project }: { project: Project }) {
  return (
    <div className="mb-16">
      <div className="relative bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl p-1 shadow-2xl">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 md:p-10">
          {/* Header row */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-3 flex-wrap mb-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wide bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-sm">
                  <Star className="w-3 h-3" />
                  Featured Project
                </span>
                {project.accolades?.map((accolade, i) => (
                  <span
                    key={accolade}
                    className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold ${
                      ACCOLADE_TONE[Math.min(i, ACCOLADE_TONE.length - 1)]
                    }`}
                  >
                    {accolade}
                  </span>
                ))}
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">
                {project.title}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                {project.role} &nbsp;·&nbsp; {project.dates}
              </p>
            </div>
          </div>

          {/* Description paragraphs */}
          <div className="space-y-3 text-slate-700 dark:text-slate-300 leading-relaxed mb-6 text-sm md:text-base">
            {project.body.map((para, i) => (
              <p key={i}>
                {para.label && (
                  <>
                    <span className="font-semibold text-slate-800 dark:text-white">
                      {para.label}
                    </span>{" "}
                  </>
                )}
                {para.text}
              </p>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3 mb-6">
            {project.links.map((link) =>
              link.kind === "download" ? (
                <a
                  key={link.url}
                  href={link.url}
                  download={link.url.split("/").pop()}
                  className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors shadow-sm ${LINK_STYLE[link.kind]}`}
                >
                  <LinkIcon kind={link.kind} />
                  {link.label}
                </a>
              ) : (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors shadow-sm ${LINK_STYLE[link.kind]}`}
                >
                  <LinkIcon kind={link.kind} />
                  {link.label}
                </a>
              ),
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
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

function StandardCard({ project }: { project: Project }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-100 dark:border-slate-700 p-7 flex flex-col">
      <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-1">
        {project.title}
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
        {project.role} &nbsp;·&nbsp; {project.dates}
      </p>
      <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm mb-5 flex-1">
        {project.summary}
      </p>
      <div className="flex flex-wrap gap-2 mb-5">
        {project.tags.map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 text-xs"
          >
            {tag}
          </Badge>
        ))}
      </div>
      {project.links.map((link) => (
        <a
          key={link.url}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 bg-slate-900 dark:bg-slate-700 text-white text-sm font-medium rounded-lg hover:bg-slate-700 dark:hover:bg-slate-600 transition-colors shadow-sm w-fit"
        >
          <LinkIcon kind={link.kind} />
          {link.label}
        </a>
      ))}
    </div>
  );
}

function MinorCard({ project }: { project: Project }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 border border-slate-100 dark:border-slate-700 p-6">
      <h3 className="text-base font-semibold text-slate-800 dark:text-white mb-1">
        {project.title}
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
        {project.role ? (
          <>
            {project.role} &nbsp;·&nbsp; {project.dates}
          </>
        ) : (
          project.dates
        )}
      </p>
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-xs mb-4">
        {project.summary}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 text-xs"
          >
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
}

export default function ProjectCard({ project }: { project: Project }) {
  if (project.tier === "featured") return <FeaturedCard project={project} />;
  if (project.tier === "standard") return <StandardCard project={project} />;
  return <MinorCard project={project} />;
}
