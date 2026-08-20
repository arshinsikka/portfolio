import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { SITE_URL } from "./client/src/content/profile";

/**
 * One source of truth for the domain.
 *
 * client/index.html is static — it is never rendered by React, so it cannot
 * import anything. Left to itself the domain has to be written there literally,
 * which is a second copy that silently drifts from SITE_URL (it already had: the
 * HTML pointed at a bare apex that was not resolving while SITE_URL pointed at
 * vercel.app).
 *
 * This substitutes `__SITE_URL__` in the HTML from the constant, in dev and in
 * build alike, so profile.ts is the only place the domain appears. Requires
 * profile.ts to stay free of `@/` alias imports — the config is bundled before
 * aliases exist.
 */
function injectSiteUrl(): Plugin {
  return {
    name: "inject-site-url",
    transformIndexHtml(html) {
      return html.replaceAll("__SITE_URL__", SITE_URL);
    },
  };
}

export default defineConfig({
  plugins: [react(), injectSiteUrl()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    fs: {
      deny: ["**/.*"],
    },
  },
});
