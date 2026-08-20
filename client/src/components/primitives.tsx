import type { ReactNode } from "react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";

/* ─── Link ────────────────────────────────────────────────────────────────────
   The accent's first of three jobs. Underlined by default so it reads as a
   link without relying on colour alone, which also covers colour blindness.
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
   Primary is an inverted ink fill, not the accent. Keeping the accent off
   buttons is what lets it stay rare enough to mean something.
   ─────────────────────────────────────────────────────────────────────────── */

const BUTTON_BASE =
  "inline-flex items-center gap-s2 rounded-sm px-s4 py-s2 text-small font-medium " +
  "transition-colors duration-150";

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
    primary: "bg-ink text-on-ink hover:bg-accent hover:text-accent-foreground",
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
   structural label; content hangs to its right at a fixed measure. A hairline
   opens every block, spanning rail and content together.

   `mark` draws a change bar in the rail — the vertical rule that technical
   documentation and legal redlines use to flag the passage that needs
   attention. It is the only non-text use of the accent on the page.
   ─────────────────────────────────────────────────────────────────────────── */

export function Block({
  label,
  labelHref,
  mark,
  rail,
  className,
  children,
}: {
  /** Rendered in the rail as the block's heading. */
  label?: string;
  /** Makes the label a link to the route this block indexes. */
  labelHref?: string;
  /** Draw the accent change bar. Use once per page. */
  mark?: boolean;
  /** Replaces the label with arbitrary rail content, e.g. the hero portrait. */
  rail?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  const labelClass =
    "font-mono text-label uppercase text-ink-muted";

  return (
    <section className={cn("border-t border-rule", className)}>
      <div className="mx-auto max-w-page px-s5 py-s7">
        <div
          className={cn(
            "md:grid md:grid-cols-[var(--rail-w)_1fr] md:gap-x-rail-gap",
            // The change bar brackets the whole passage, rail and content alike.
            mark && "-ml-s4 border-l-2 border-accent pl-s4",
          )}
        >
          <div className="mb-s4 md:mb-0 md:pt-[0.3rem]">
            {rail}
            {label &&
              (labelHref ? (
                <h2>
                  <Link
                    href={labelHref}
                    className={cn(
                      labelClass,
                      "transition-colors duration-150 hover:text-accent",
                    )}
                  >
                    {label}
                  </Link>
                </h2>
              ) : (
                <h2 className={labelClass}>{label}</h2>
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

/* ─── List row ────────────────────────────────────────────────────────────────
   Replaces the card grid. Title left, date right in tabular mono, hairline
   between rows. No radius, no shadow, no lift.
   ─────────────────────────────────────────────────────────────────────────── */

export function ListRow({
  title,
  href,
  meta,
  date,
  tags,
}: {
  title: string;
  /** Only set where a destination genuinely exists. */
  href?: string;
  meta?: string;
  date: string;
  tags?: string[];
}) {
  return (
    <li className="border-b border-rule py-s4 first:border-t-0 last:border-b-0">
      <div className="flex flex-col gap-x-s4 gap-y-s1 sm:flex-row sm:items-baseline sm:justify-between">
        <h3 className="text-h3 font-medium text-ink">
          {href ? (
            <Link
              href={href}
              className="underline decoration-rule-strong underline-offset-[3px] transition-colors duration-150 hover:text-accent hover:decoration-accent"
            >
              {title}
            </Link>
          ) : (
            title
          )}
        </h3>
        <span className="shrink-0 font-mono text-meta text-ink-muted">{date}</span>
      </div>

      {meta && <p className="mt-s1 text-small text-ink-muted">{meta}</p>}
      {tags && tags.length > 0 && <TagList tags={tags} className="mt-s2" />}
    </li>
  );
}
