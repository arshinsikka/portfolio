import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Page background band. */
export type SectionTone = "light" | "tinted";
/** Content column width. */
export type SectionWidth = "narrow" | "wide";

const TONE: Record<SectionTone, string> = {
  light: "bg-white dark:bg-slate-900",
  tinted: "bg-slate-50 dark:bg-slate-800",
};

const WIDTH: Record<SectionWidth, string> = {
  narrow: "max-w-4xl",
  wide: "max-w-6xl",
};

export function Container({
  width = "wide",
  className,
  children,
}: {
  width?: SectionWidth;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn(WIDTH[width], "mx-auto px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}

export function SectionHeading({
  heading,
  subtitle,
}: {
  heading: string;
  subtitle?: string;
}) {
  return (
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
        {heading}
      </h2>
      {subtitle && (
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export function Section({
  id,
  tone = "light",
  width = "wide",
  heading,
  subtitle,
  children,
}: {
  /** Optional in-page anchor. Routing replaced the old scroll anchors. */
  id?: string;
  tone?: SectionTone;
  width?: SectionWidth;
  heading: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={cn("py-20", TONE[tone])}>
      <Container width={width}>
        <SectionHeading heading={heading} subtitle={subtitle} />
        {children}
      </Container>
    </section>
  );
}
