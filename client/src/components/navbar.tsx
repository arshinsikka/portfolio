import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { path: "/",          label: "Home"       },
  { path: "/about",     label: "About"      },
  { path: "/work",      label: "Experience" },
  { path: "/projects",  label: "Projects"   },
  { path: "/research",  label: "Research"   },
];

/**
 * "/" matches only itself; every other entry also owns its sub-routes, so
 * /projects/lecture-ai keeps the Projects tab lit.
 */
function isActive(path: string, location: string) {
  if (path === "/") return location === "/";
  return location === path || location.startsWith(`${path}/`);
}

/** Accent job 2 of 3: the active route. Inactive items are ink only. */
const navItemClass = (active: boolean) =>
  [
    "font-mono text-label uppercase transition-colors duration-150",
    active ? "text-accent" : "text-ink-muted hover:text-ink",
  ].join(" ");

// 36px painted, 44px touched: the pseudo-element extends the hit area by 4px on
// every side. The square, its hover fill, and its icon are unchanged.
const iconButtonClass =
  "relative grid h-9 w-9 place-items-center rounded-sm text-ink-muted transition-colors duration-150 hover:bg-rule hover:text-ink " +
  "after:absolute after:-inset-1 after:content-['']";

/**
 * The theme control, as a two-state mono label rather than a sun/moon glyph.
 *
 * A lucide icon in a 36px square was the one control on the page that belonged
 * to no part of this system — it carried an icon set the rest of the site does
 * not use, and it stated the state ambiguously (does the sun mean "you are in
 * light" or "switch to light"?). This is the same 11px tracked mono the nav
 * items use, and it borrows their active/inactive pair exactly: the current
 * theme is --ink, the other is --ink-muted. Reading it tells you where you are
 * and what the click will do.
 */
function ThemeToggle({ dark, onToggle }: { dark: boolean; onToggle: () => void }) {
  // 27px painted; 9px of hit area added above and below to clear 44px.
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      className="relative flex items-center gap-s2 rounded-sm border border-rule-strong px-s3 py-[0.35rem] font-mono text-label uppercase transition-colors duration-150 hover:border-ink after:absolute after:inset-x-0 after:-inset-y-[9px] after:content-['']"
    >
      <span className={dark ? "text-ink-muted" : "text-ink"}>Light</span>
      <span aria-hidden className="text-rule-strong">/</span>
      <span className={dark ? "text-ink" : "text-ink-muted"}>Dark</span>
    </button>
  );
}

export default function Navbar() {
  const [location]                  = useLocation();
  const [isOpen, setIsOpen]         = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const mobileMenuRef               = useRef<HTMLDivElement>(null);

  // ── Dark mode init ──────────────────────────────────────────────────────────
  // The blocking script in index.html has already resolved the theme and set the
  // class before first paint. Deciding it again here would repeat that work one
  // render too late — which is exactly what caused the flash of light theme. All
  // this does now is sync the toggle's icon to the decision already made.
  useEffect(() => {
    setIsDarkMode(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleDark = () => {
    const next = !isDarkMode;
    setIsDarkMode(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  // ── Close mobile menu on outside click ─────────────────────────────────────
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen]);

  // ── Close on resize to desktop ──────────────────────────────────────────────
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setIsOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-rule bg-paper">
      <div className="mx-auto max-w-page px-gutter">
        <div className="flex h-[var(--nav-row-h)] items-center justify-between">

          {/* Wordmark */}
          <Link
            href="/"
            className="font-display text-h3 text-ink transition-colors duration-150 hover:text-accent"
          >
            Arshin Sikka
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-s5 md:flex">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={navItemClass(isActive(item.path, location))}
                aria-current={isActive(item.path, location) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}

            <ThemeToggle dark={isDarkMode} onToggle={toggleDark} />
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-s2 md:hidden" ref={mobileMenuRef}>
            <ThemeToggle dark={isDarkMode} onToggle={toggleDark} />
            <button
              onClick={() => setIsOpen((o) => !o)}
              className={iconButtonClass}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu. Unmounted when closed, so it leaves the tab order. */}
      {isOpen && (
        <div className="border-t border-rule bg-paper md:hidden">
          <div className="mx-auto max-w-page px-gutter py-s2">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex min-h-[44px] items-center ${navItemClass(isActive(item.path, location))}`}
                aria-current={isActive(item.path, location) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
