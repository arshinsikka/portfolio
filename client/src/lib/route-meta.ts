import { about, hero, sectionCopy } from "@/content/profile";
import { projects, projectBySlug } from "@/content/projects";

/**
 * One source of truth for per-route metadata.
 *
 * Both the running app and the build-time prerender read this, so a route's
 * title and description are identical whether they were baked into the static
 * HTML or set by `useDocumentMeta` after a client-side navigation.
 *
 * Nothing here is new copy — every string is an existing content constant.
 */
export interface RouteMeta {
  /** Page name. The site name is appended by `composeTitle`. */
  title?: string;
  description?: string;
}

/**
 * "<page> — <name>", not "<page> — <full site title>": the site title is itself
 * "Arshin Sikka — AI Product Builder", so appending it whole gives a
 * triple-barrelled title that truncates in search results. An empty page title
 * means the homepage, which keeps index.html's own title verbatim.
 */
export function composeTitle(pageTitle: string | undefined, siteTitle: string) {
  return pageTitle ? `${pageTitle} — ${hero.name}` : siteTitle;
}

/** Routes with no dynamic segment. `/` intentionally has no overrides. */
const STATIC_ROUTE_META: Record<string, RouteMeta> = {
  "/": {},
  "/work": {
    title: sectionCopy.work.heading,
    description: sectionCopy.work.subtitle,
  },
  "/projects": {
    title: sectionCopy.projects.heading,
    description: sectionCopy.projects.subtitle,
  },
  "/research": {
    title: sectionCopy.research.heading,
    description: sectionCopy.research.subtitle,
  },
  "/about": {
    // BORROWED, NOT PURPOSE-WRITTEN: first-person prose, not a search snippet.
    title: about.heading,
    description: about.paragraphs[0],
  },
};

export const NOT_FOUND_META: RouteMeta = {
  title: "404 Page Not Found",
  description: "This page doesn’t exist, or it has moved.",
};

export function metaForPath(path: string): RouteMeta {
  const staticMeta = STATIC_ROUTE_META[path];
  if (staticMeta) return staticMeta;

  const slug = path.startsWith("/projects/") ? path.slice("/projects/".length) : undefined;
  const project = slug ? projectBySlug(slug) : undefined;
  if (project?.hasDetailPage) {
    return { title: project.title, description: project.summary };
  }

  return NOT_FOUND_META;
}

/**
 * Every route the build writes a static HTML file for.
 *
 * Detail routes are derived from the project records, so adding a case study
 * adds its page automatically. The static list must be kept in step with the
 * routes in App.tsx by hand — a route missing here has no prerendered file and
 * will 404 in production rather than silently falling back to the SPA shell.
 */
export function prerenderRoutes(): string[] {
  return [
    ...Object.keys(STATIC_ROUTE_META),
    ...projects.filter((p) => p.hasDetailPage).map((p) => `/projects/${p.slug}`),
  ];
}
