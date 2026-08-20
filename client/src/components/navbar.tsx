import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Sun, Moon } from "lucide-react";

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

const iconButtonClass =
  "grid h-9 w-9 place-items-center rounded-sm text-ink-muted transition-colors duration-150 hover:bg-rule hover:text-ink";

export default function Navbar() {
  const [location]                  = useLocation();
  const [isOpen, setIsOpen]         = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const mobileMenuRef               = useRef<HTMLDivElement>(null);

  // ── Dark mode init ──────────────────────────────────────────────────────────
  useEffect(() => {
    const saved       = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (saved === "dark" || (!saved && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
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
      <div className="mx-auto max-w-page px-s5">
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

            <button onClick={toggleDark} className={iconButtonClass} aria-label="Toggle dark mode">
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-s1 md:hidden" ref={mobileMenuRef}>
            <button onClick={toggleDark} className={iconButtonClass} aria-label="Toggle dark mode">
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
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
          <div className="mx-auto max-w-page px-s5 py-s2">
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
