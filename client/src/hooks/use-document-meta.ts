import { useEffect } from "react";
import { useLocation } from "wouter";
import { SITE_URL } from "@/content/profile";
import { composeTitle } from "@/lib/route-meta";

/**
 * Per-route document metadata, set on mount and on every route change.
 *
 * WHAT THIS FIXES: browser tab titles, bookmark and history entries, the page
 * name screen readers announce on navigation, and — because Googlebot renders
 * JavaScript — most likely what Google indexes per route.
 *
 * WHAT THIS DOES NOT FIX: social link previews. Every unfurler that matters
 * (Slack, LinkedIn, X, WhatsApp, Discord, iMessage, Facebook) fetches the raw
 * HTML and does NOT execute JavaScript. They will therefore always see the
 * static tags in client/index.html, which describe the homepage. Sharing a link
 * to /work or /projects/lecture-ai will preview as the site homepage no matter
 * what this hook sets. Fixing that needs prerendering, SSR, or an edge function
 * that rewrites the HTML per path — none of which exist here.
 *
 * Site-level defaults are read from the DOM once at module load rather than
 * duplicated in TypeScript. index.html is authored with the homepage's title and
 * description, so those literals stay in exactly one place.
 */

const readMeta = (selector: string) =>
  document.head.querySelector<HTMLMetaElement>(selector)?.content ?? "";

/**
 * index.html's own title and description, captured before any route overwrites
 * them, and cached on `window` so the first capture is the only one that counts.
 *
 * Without the cache this would re-read a DOM that later routes mutate — fine in
 * production, where it is read once against a pristine head, but wrong under HMR,
 * which re-evaluates after the head has been rewritten and would capture another
 * route's metadata as the site default.
 *
 * Called lazily from inside the effect rather than at module scope: the
 * prerender build imports this module under Node, where `window` and `document`
 * do not exist. Effects never run on the server, so nothing here executes there.
 */
function siteDefaults(): { title: string; description: string } {
  const cache = window as unknown as {
    __siteMetaDefaults?: { title: string; description: string };
  };
  return (cache.__siteMetaDefaults ??= {
    title: document.title,
    description: readMeta('meta[name="description"]'),
  });
}

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  const selector = `meta[${attr}="${key}"]`;
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export interface DocumentMeta {
  /**
   * The page's own name. The site name is appended automatically, so pass
   * "Work Experience", not "Work Experience — Arshin Sikka".
   * Omit entirely on the homepage to keep index.html's title verbatim.
   */
  title?: string;
  description?: string;
}

export function useDocumentMeta({ title, description }: DocumentMeta) {
  const [location] = useLocation();

  useEffect(() => {
    const defaults = siteDefaults();
    // Title composition lives in lib/route-meta so the prerender build and the
    // client produce byte-identical titles for the same route.
    const fullTitle = composeTitle(title, defaults.title);
    const desc = description || defaults.description;
    const url = location === "/" ? SITE_URL : `${SITE_URL}${location}`;

    document.title = fullTitle;
    upsertMeta("name", "description", desc);
    upsertCanonical(url);

    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:description", desc);
    upsertMeta("property", "og:url", url);

    upsertMeta("name", "twitter:title", fullTitle);
    upsertMeta("name", "twitter:description", desc);
  }, [title, description, location]);
}
