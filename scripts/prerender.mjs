import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

/**
 * Writes a real static HTML file per route.
 *
 * Runs third in `npm run build`, after the client build (which produces the
 * template and hashed assets) and the SSR build (which produces the renderer).
 * For each route it renders the app to a string, injects that into the template's
 * #root, rewrites the head for that route, and writes dist/public/<route>/index.html.
 *
 * The result is that a crawler fetching /work gets the actual work history in the
 * HTML body and /work's own title in the head, rather than an empty div and the
 * homepage's metadata. Users still get the SPA: the client bundle hydrates the
 * markup and takes over routing from the first click.
 */

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "dist/public");
const templatePath = join(outDir, "index.html");

const { render, metaForPath, composeTitle, prerenderRoutes } = await import(
  pathToFileURL(join(root, "dist/server/entry-server.js")).href
);

const template = readFileSync(templatePath, "utf8");

/** The site-level defaults, read from the built template — one source of truth. */
const siteTitle = template.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? "";
const siteDescription =
  template.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "";
const siteUrl =
  template.match(/<link rel="canonical" href="([^"]*)"/)?.[1] ?? "";

const escapeAttr = (s) =>
  s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

/** Replace an existing tag's content attribute, matching on its key. */
function setMeta(html, attr, key, value) {
  const re = new RegExp(`(<meta ${attr}="${key}" content=")[^"]*(")`);
  return re.test(html)
    ? html.replace(re, `$1${escapeAttr(value)}$2`)
    : html.replace("</head>", `  <meta ${attr}="${key}" content="${escapeAttr(value)}" />\n  </head>`);
}

function buildPage(route, appHtml, { canonical = true } = {}) {
  const meta = metaForPath(route);
  const title = composeTitle(meta.title, siteTitle);
  const description = meta.description || siteDescription;
  const url = route === "/" ? siteUrl : `${siteUrl}${route}`;

  let html = template;
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeAttr(title)}</title>`);
  if (canonical) {
    html = html.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${escapeAttr(url)}$2`);
    html = setMeta(html, "property", "og:url", url);
  } else {
    // A 404 has no canonical URL and no shareable address — it is served at
    // whatever path was wrong. Declaring either would be a lie.
    html = html.replace(/\s*<link rel="canonical" href="[^"]*" \/>/, "");
    html = html.replace(/\s*<meta property="og:url" content="[^"]*" \/>/, "");
  }
  html = setMeta(html, "name", "description", description);
  html = setMeta(html, "property", "og:title", title);
  html = setMeta(html, "property", "og:description", description);
  html = setMeta(html, "name", "twitter:title", title);
  html = setMeta(html, "name", "twitter:description", description);

  // The template's #root is empty; give it the rendered markup to hydrate.
  return html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
}

function writePage(relPath, html) {
  const file = join(outDir, relPath);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
  return `${relPath.padEnd(38)} ${(Buffer.byteLength(html) / 1024).toFixed(2)} kB`;
}

const routes = prerenderRoutes();
const lines = [];

for (const route of routes) {
  const appHtml = render(route);
  const relPath = route === "/" ? "index.html" : `${route.slice(1)}/index.html`;
  lines.push(writePage(relPath, buildPage(route, appHtml)));
}

// Vercel serves a top-level 404.html for any unmatched path, with a real 404
// status — so an unknown URL returns actual page content instead of the SPA
// shell. Rendered at a path no route matches, which is what NotFound handles.
lines.push(
  writePage("404.html", buildPage("/__not_found__", render("/__not_found__"), { canonical: false })),
);

console.log(`\nprerendered ${routes.length + 1} pages:`);
for (const l of lines) console.log("  " + l);
