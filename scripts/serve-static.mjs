import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { join, extname, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Serves dist/public the way Vercel serves a static output directory, which
 * `vite preview` does NOT: preview applies an SPA fallback and returns the root
 * index.html for every path, so it reports success even when prerendering is
 * broken. This resolves a real file, then <path>/index.html, then 404.html with
 * a real 404 status — which is what production does.
 */
const root = resolve(dirname(fileURLToPath(import.meta.url)), "../dist/public");
const port = Number(process.argv[2] ?? 4173);

const TYPES = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css",
  ".woff2": "font/woff2", ".webp": "image/webp", ".pdf": "application/pdf",
  ".svg": "image/svg+xml", ".png": "image/png", ".json": "application/json",
};

const tryFile = async (p) => {
  try { return (await stat(p)).isFile() ? p : null; } catch { return null; }
};

createServer(async (req, res) => {
  const path = decodeURIComponent(new URL(req.url, "http://x").pathname);
  const hit =
    (await tryFile(join(root, path))) ??
    (await tryFile(join(root, path, "index.html")));

  if (hit) {
    res.writeHead(200, { "Content-Type": TYPES[extname(hit)] ?? "application/octet-stream" });
    res.end(await readFile(hit));
    return;
  }
  res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
  res.end(await readFile(join(root, "404.html")));
}).listen(port, () => console.log(`serving dist/public on http://127.0.0.1:${port}`));
