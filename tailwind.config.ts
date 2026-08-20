import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // Every family is self-hosted; the fallbacks are only for the swap window.
      fontFamily: {
        display: ['"Newsreader"', "Georgia", "Times New Roman", "serif"],
        sans: ['"IBM Plex Sans"', "Helvetica Neue", "Helvetica", "sans-serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
      },

      // The type scale. Large display against small body, left-aligned.
      fontSize: {
        label: ["0.6875rem", { lineHeight: "1.3", letterSpacing: "0.09em" }],
        meta: ["0.8125rem", { lineHeight: "1.45" }],
        small: ["0.875rem", { lineHeight: "1.55" }],
        body: ["1rem", { lineHeight: "1.6" }],
        h3: ["1rem", { lineHeight: "1.4", letterSpacing: "-0.005em" }],
        h2: ["1.375rem", { lineHeight: "1.25", letterSpacing: "-0.01em" }],
        org: ["1.125rem", { lineHeight: "1.3", letterSpacing: "-0.006em" }],
        stat: ["clamp(2.25rem, 3.4vw, 3rem)", { lineHeight: "1", letterSpacing: "-0.03em" }],
        lead: ["clamp(1.25rem, 2.4vw, 1.75rem)", { lineHeight: "1.28", letterSpacing: "-0.011em" }],
        display: ["clamp(2.5rem, 6.5vw, 4rem)", { lineHeight: "1.02", letterSpacing: "-0.022em" }],
      },

      colors: {
        paper: "var(--paper)",
        ink: {
          DEFAULT: "var(--ink)",
          muted: "var(--ink-muted)",
        },
        rule: {
          DEFAULT: "var(--rule)",
          strong: "var(--rule-strong)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          hover: "var(--accent-hover)",
          foreground: "var(--on-accent)",
        },
        "on-ink": "var(--on-ink)",

        // shadcn compatibility, still resolving through the tokens above.
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: { DEFAULT: "var(--card)", foreground: "var(--card-foreground)" },
        popover: { DEFAULT: "var(--popover)", foreground: "var(--popover-foreground)" },
        primary: { DEFAULT: "var(--primary)", foreground: "var(--primary-foreground)" },
        secondary: { DEFAULT: "var(--secondary)", foreground: "var(--secondary-foreground)" },
        muted: { DEFAULT: "var(--muted)", foreground: "var(--muted-foreground)" },
        destructive: { DEFAULT: "var(--destructive)", foreground: "var(--destructive-foreground)" },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
      },

      // 4px base. Named so the rhythm is stated, not improvised per component.
      spacing: {
        s1: "0.25rem",
        s2: "0.5rem",
        s3: "0.75rem",
        s4: "1rem",
        s5: "1.5rem",
        s6: "2rem",
        s7: "3rem",
        s8: "4rem",
        s9: "6rem",
        rail: "var(--rail-w)",
        "rail-gap": "var(--rail-gap)",
        gutter: "var(--page-gutter)",
      },

      maxWidth: {
        measure: "var(--measure)",
        page: "var(--page-w)",
        /* The positioning line is display type set wide — it wants a longer
           line than body prose, but not the full 64rem column. */
        lead: "54rem",
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "var(--radius)",
        sm: "var(--radius)",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
