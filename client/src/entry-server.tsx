import { renderToString } from "react-dom/server";
import App from "./App";
import { composeTitle, metaForPath, prerenderRoutes } from "@/lib/route-meta";

/**
 * Server entry for the prerender build.
 *
 * Compiled by `vite build --ssr` into dist/server, then driven by
 * scripts/prerender.mjs. It is never part of the browser bundle.
 *
 * Note the deliberate absence of `./index.css` — styles are already linked by
 * the built client template, and importing CSS here would only make the SSR
 * bundle bigger for no effect.
 */
export function render(url: string): string {
  return renderToString(<App ssrPath={url} />);
}

/** Re-exported so the build script needs no separate TypeScript compile. */
export { composeTitle, metaForPath, prerenderRoutes };
