import { useState, useEffect, useRef } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";

const NAV_ITEMS = [
  { id: "home",       label: "Home",       href: "#home" },
  { id: "about",      label: "About",      href: "#about" },
  { id: "experience", label: "Experience", href: "#experience" },
  { id: "projects",   label: "Projects",   href: "#projects" },
  { id: "research",   label: "Research",   href: "#research" },
  { id: "leadership", label: "Leadership", href: "#leadership" },
  { id: "contact",    label: "Contact",    href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen]           = useState(false);
  const [activeSection, setActive]    = useState("home");
  const [isDarkMode, setIsDarkMode]   = useState(false);
  const [scrollPct, setScrollPct]     = useState(0);
  const mobileMenuRef                 = useRef<HTMLDivElement>(null);

  // ── Dark mode init ──────────────────────────────────────────────────────────
  useEffect(() => {
    const saved     = localStorage.getItem("theme");
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

  // ── Active section + scroll progress ───────────────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      // Progress
      const docH   = document.documentElement.scrollHeight - window.innerHeight;
      const pct    = docH > 0 ? (window.scrollY / docH) * 100 : 0;
      setScrollPct(pct);

      // Active section
      const offset = window.scrollY + 120;
      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV_ITEMS[i].id);
        if (el && el.offsetTop <= offset) {
          setActive(NAV_ITEMS[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <>
      {/* Scroll progress bar */}
      <div
        id="scroll-progress"
        style={{ width: `${scrollPct}%` }}
        aria-hidden="true"
      />

      <nav className="fixed top-0 left-0 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            {/* Logo */}
            <button
              onClick={() => scrollTo("#home")}
              className="text-xl font-bold text-slate-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Arshin Sikka
            </button>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-6">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.href)}
                  className={`text-sm font-medium pb-1 transition-colors ${
                    activeSection === item.id
                      ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {item.label}
                </button>
              ))}

              <button
                onClick={toggleDark}
                className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>

            {/* Mobile controls */}
            <div className="md:hidden flex items-center gap-1" ref={mobileMenuRef}>
              <button
                onClick={toggleDark}
                className="p-2.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setIsOpen((o) => !o)}
                className="p-2.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile dropdown */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-[480px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 pt-2 pb-4 space-y-1 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.href)}
                className={`flex w-full items-center min-h-[44px] px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  activeSection === item.id
                    ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}
