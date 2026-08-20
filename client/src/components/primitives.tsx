import type { ReactNode } from "react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";

/* ─── Link ────────────────────────────────────────────────────────────────────
   Underlined by default so it reads as a link without relying on colour alone,
   which also covers colour blindness.
   ─────────────────────────────────────────────────────────────────────────── */

const LINK_CLASS =
  "text-accent underline decoration-rule-strong underline-offset-[3px] " +
  "transition-colors duration-150 hover:text-accent-hover hover:decoration-accent";

export function TextLink({
  href,
  external,
  className,
  children,
}: {
  href: string;
  external?: boolean;
  className?: string;
  children: ReactNode;
}) {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(LINK_CLASS, className)}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cn(LINK_CLASS, className)}>
      {children}
    </Link>
  );
}

/* ─── Buttons ─────────────────────────────────────────────────────────────────
   Primary is an accent fill, so the accent is the single emphasis treatment on
   the page rather than competing with a near-black button beside blue links.
   ─────────────────────────────────────────────────────────────────────────── */

// The painted button is 38px tall, which is right for the type size but short
// of the 44px touch minimum. The pseudo-element adds 3px of hit area above and
// below without changing anything visible.
const BUTTON_BASE =
  "relative inline-flex items-center gap-s2 rounded-sm px-s4 py-s2 text-small font-medium " +
  "transition-colors duration-150 " +
  "after:absolute after:inset-x-0 after:-inset-y-[3px] after:content-['']";

export function ButtonLink({
  href,
  external,
  variant = "primary",
  className,
  children,
}: {
  href: string;
  external?: boolean;
  variant?: "primary" | "secondary";
  className?: string;
  children: ReactNode;
}) {
  const variants = {
    primary: "bg-accent text-accent-foreground hover:bg-accent-hover",
    secondary:
      "border border-rule-strong text-ink hover:border-ink hover:bg-ink hover:text-on-ink",
  };
  const cls = cn(BUTTON_BASE, variants[variant], className);

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

/* ─── Block ───────────────────────────────────────────────────────────────────
   THE SIGNATURE. A fixed-width mono rail in the left margin carries the
   structural label; content hangs to its right. A hairline opens every block,
   spanning rail and content together.

   The container is centred and wide. It was briefly left-anchored inside a
   centred shell, which put the whole page in one half of the viewport and read
   as broken rather than anchored. The width is now spent on the content column
   and the rail is narrow, so the page fills the screen without prose ever
   running past --measure.

   `mark` draws a change bar in the rail — the vertical rule that technical
   documentation and legal redlines use to flag the passage that needs
   attention.
   ─────────────────────────────────────────────────────────────────────────── */

export function Block({
  label,
  labelAs: Heading = "h2",
  labelHref,
  mark,
  rail,
  className,
  children,
}: {
  /** Rendered in the rail as the block's heading. */
  label?: string;
  /**
   * On an interior index page the rail label *is* the page title, so it needs
   * to be the h1. It stays visually identical — the rail label pattern is the
   * heading treatment site-wide, and a centred display h1 would break it.
   *
   * "p" is for a rail label that is not a heading at all: the homepage hero is
   * labelled with the person's name while its h1 is the positioning line, so
   * marking the name as a heading would put an h2 above the h1.
   */
  labelAs?: "h1" | "h2" | "p";
  /** Makes the label a link to the route this block indexes. */
  labelHref?: string;
  /** Draw the accent change bar. Use once per page. */
  mark?: boolean;
  /** Replaces the label with arbitrary rail content, e.g. the hero portrait. */
  rail?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  const labelClass = "font-mono text-label uppercase text-ink-muted";

  return (
    <section className={cn("border-t border-rule", className)}>
      <div className="mx-auto max-w-page px-gutter py-s6">
        <div
          className={cn(
            "md:grid md:grid-cols-[var(--rail-w)_1fr] md:gap-x-rail-gap",
            // The change bar brackets the whole passage, rail and content alike.
            // The negative margin has to cover the border as well as the padding,
            // or the bar pushes its own rail 2px right of every other rail item.
            mark && "-ml-[calc(1rem+2px)] border-l-2 border-accent pl-s4",
          )}
        >
          {/*
            The 0.3rem nudge optically centres an 11px mono label against the
            first line of content. Arbitrary rail content — the portrait — wants
            its true top edge instead, so it lines up with the name beside it.
          */}
          <div className={cn("mb-s3 md:mb-0", !rail && "md:pt-[0.3rem]")}>
            {rail}
            {label &&
              (labelHref ? (
                <Heading>
                  <Link
                    href={labelHref}
                    className={cn(
                      labelClass,
                      "transition-colors duration-150 hover:text-accent",
                    )}
                  >
                    {label}
                  </Link>
                </Heading>
              ) : (
                <Heading className={labelClass}>{label}</Heading>
              ))}
          </div>

          <div className="min-w-0">{children}</div>
        </div>
      </div>
    </section>
  );
}

/* ─── Tag ─────────────────────────────────────────────────────────────────────
   Mono, muted, no pill, no colour. Tags are metadata, not decoration.
   ─────────────────────────────────────────────────────────────────────────── */

export function TagList({ tags, className }: { tags: string[]; className?: string }) {
  if (tags.length === 0) return null;
  return (
    <ul className={cn("flex flex-wrap gap-x-s4 gap-y-s1", className)}>
      {tags.map((tag) => (
        <li key={tag} className="font-mono text-label uppercase text-ink-muted">
          {tag}
        </li>
      ))}
    </ul>
  );
}

/* ─── Index row ───────────────────────────────────────────────────────────────
   Replaces the card grid, and now a real three-column index rather than a title
   with a date pushed to the far edge.

   `primary` is the organisation or the artifact — SP Digital, KPMG, Lecture AI.
   That is the first thing a recruiter scans for, and it used to sit in 14px
   muted grey *below* the job title, subordinate to it. It is now the largest
   text in the row, in its own aligned column, so the left edge of the content
   column reads as a list of places. `secondary` carries the role and location
   that used to be the title.

   Hover — one pattern, only ever on rows that lead somewhere. A mono arrow
   slides into the left gutter and the row's own hairline promotes from --rule to
   --ink. Rows with no destination do not react at all, so the hover is what
   teaches which rows are clickable, rather than decorating all of them equally.
   ─────────────────────────────────────────────────────────────────────────── */

export function IndexRow({
  primary,
  secondary,
  date,
  href,
  tags,
  current,
  children,
}: {
  /** The organisation or artifact. The row's headline. */
  primary: string;
  /** Role, location — whatever qualifies the primary. */
  secondary?: string;
  date: string;
  /** Only set where a destination genuinely exists. */
  href?: string;
  tags?: string[];
  /** The one accent mark on the page: what I am doing now. */
  current?: boolean;
  /**
   * Description, links — whatever the interior pages carry and the homepage
   * index deliberately omits. Renders inside column two, so the organisation
   * column stays a clean scannable list on every page.
   */
  children?: ReactNode;
}) {
  const heading = (
    <h3
      className={cn(
        "text-org font-medium",
        current ? "text-accent" : "text-ink",
        href && "underline decoration-rule-strong underline-offset-[3px]",
        href && "transition-colors duration-150 group-hover:decoration-accent",
      )}
    >
      {primary}
    </h3>
  );

  return (
    <li
      className={cn(
        "group relative border-b border-rule py-s3 last:border-b-0",
        href && "transition-colors duration-150 hover:border-ink",
      )}
    >
      {href && (
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute left-[-1.25rem] top-s3 hidden font-mono text-meta text-ink-muted",
            "opacity-0 transition-opacity duration-150 group-hover:opacity-100 md:block",
          )}
        >
          →
        </span>
      )}

      {/*
        Three columns only from `lg`. At exactly `md` the content column is
        576px, which after a 15rem organisation column and the date would leave
        the middle column around 138px and wrap every role onto four lines.
        Below `lg` the row stacks instead.
      */}
      <div className="lg:grid lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)_auto] lg:items-baseline lg:gap-x-s5">
        {href ? (
          <Link href={href} className="block">
            {heading}
          </Link>
        ) : (
          heading
        )}

        <div className="min-w-0">
          {secondary && <p className="mt-s1 text-small text-ink-muted lg:mt-0">{secondary}</p>}
          {children && <div className="mt-s2 max-w-measure">{children}</div>}
          {tags && tags.length > 0 && <TagList tags={tags} className="mt-s2" />}
        </div>

        <span className="mt-s1 block shrink-0 font-mono text-meta text-ink-muted lg:mt-0 lg:text-right">
          {date}
        </span>
      </div>
    </li>
  );
}

/* ─── Impact strip ────────────────────────────────────────────────────────────
   Large numerals against small mono labels, in a horizontal band. The highest
   contrast available without photography: the figure carries at a glance, the
   label only has to be legible once the eye has already stopped.
   ─────────────────────────────────────────────────────────────────────────── */

export interface Stat {
  value: string;
  label: string;
  /** Renders as an obvious blank so unfilled slots cannot ship unnoticed. */
  placeholder?: boolean;
}

export function StatBand({ stats }: { stats: Stat[] }) {
  return (
    <ul className="grid grid-cols-2 gap-x-s5 gap-y-s5 md:grid-cols-4">
      {stats.map((s) => (
        <li key={s.label}>
          <p
            className={cn(
              "font-display text-stat",
              s.placeholder
                ? "border-b border-dashed border-rule-strong text-rule-strong"
                : "text-ink",
            )}
          >
            {s.value}
          </p>
          <p
            className={cn(
              "mt-s2 font-mono text-label uppercase",
              s.placeholder ? "text-rule-strong" : "text-ink-muted",
            )}
          >
            {s.label}
          </p>
        </li>
      ))}
    </ul>
  );
}

/* ─── Technical artifact ──────────────────────────────────────────────────────
   A code block or architecture diagram. Hairline border, mono type, a mono
   caption rule beneath. Scrolls inside itself so a wide diagram never widens
   the page.
   ─────────────────────────────────────────────────────────────────────────── */

export function Artifact({
  caption,
  children,
}: {
  caption?: string;
  children: ReactNode;
}) {
  return (
    <figure className="border border-rule-strong">
      <pre className="overflow-x-auto p-s4 font-mono text-meta leading-[1.6] text-ink">
        {children}
      </pre>
      {caption && (
        <figcaption className="border-t border-rule px-s4 py-s2 font-mono text-label uppercase text-ink-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/* ─── Placeholder ─────────────────────────────────────────────────────────────
   A slot whose content has not been written. Deliberately conspicuous: dashed
   hairline, mono, and the word PLACEHOLDER, so none of these reach production
   by being quietly forgettable.
   ─────────────────────────────────────────────────────────────────────────── */

export function Placeholder({ children }: { children: ReactNode }) {
  return (
    <p className="max-w-measure border border-dashed border-rule-strong px-s4 py-s3 font-mono text-meta text-ink-muted">
      <span className="text-rule-strong">PLACEHOLDER — </span>
      {children}
    </p>
  );
}

/* ─── Prose ───────────────────────────────────────────────────────────────────
   Body copy, capped at the reading measure regardless of how wide the content
   column gets.
   ─────────────────────────────────────────────────────────────────────────── */

export function Prose({ className, children }: { className?: string; children: ReactNode }) {
  return <p className={cn("max-w-measure text-body text-ink", className)}>{children}</p>;
}
