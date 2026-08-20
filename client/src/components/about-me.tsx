import { Block, Prose } from "@/components/primitives";
import {
  about,
  education,
  highlights,
  highlightsHeading,
} from "@/content/profile";

/**
 * About, Education, and Quick Highlights.
 *
 * About and Education share one block as a two-column band. Alone, each filled
 * roughly half the content column — prose at `--measure` with ~480px of void to
 * its right — while Quick Highlights and Leadership below them filled it
 * completely, so the page read as two different pages stacked. Pairing them
 * fills the top half without widening a single line of prose: the left column is
 * exactly `--measure`, and Education takes the surplus. That is the standing
 * "prose at measure, structure takes the surplus" rule applied, not bent.
 *
 * The cost is one rail label. A block has one rail, so Education's heading moves
 * inline into its own column as the same 11px mono label the rail would have
 * used — /about carries four rail labels for five sections.
 *
 * Neither Education nor Quick Highlights is a list of records, so neither uses
 * IndexRow; both borrow the row's type hierarchy without its grid:
 *
 * Education is a single record whose `meta` string fuses the dates and the minor
 * in one sentence, so splitting it into a date column would be a copy edit. The
 * degree is set at `text-org` like an organisation, the metadata in mono like a
 * date, and the notes are hairline rows beneath.
 *
 * Quick Highlights are six standalone sentences with no organisation, date, or
 * role — nothing to put in three columns. They keep the hairline row rhythm in a
 * two-column grid. Each item takes `border-t`, not `border-b`, because a top
 * border aligns across each grid row regardless of how the text wraps.
 */
export default function AboutMe() {
  return (
    <>
      <Block className="border-t-0" label={about.heading} labelAs="h1">
        <div className="grid gap-y-s6 lg:grid-cols-[var(--measure)_minmax(0,1fr)] lg:gap-x-s6">
          {/* Left: the prose, at measure. */}
          <div>
            {about.paragraphs.map((paragraph, i) => (
              <Prose key={i} className={i > 0 ? "mt-s4" : undefined}>
                {paragraph}
              </Prose>
            ))}
          </div>

          {/* Right: Education, carrying its own inline label. */}
          <section>
            <h2 className="font-mono text-label uppercase text-ink-muted">
              {education.heading}
            </h2>

            <p className="mt-s3 text-org font-medium text-ink">
              {education.degree}
            </p>
            <p className="mt-s1 font-mono text-meta text-ink-muted">
              {education.meta}
            </p>

            {/*
              Capped at the measure so the hairline stops where the text stops
              instead of running on into empty space, whatever width the column
              happens to be.
            */}
            <ul className="mt-s3 max-w-measure">
              {education.notes.map((note, i) => (
                <li key={i} className="border-t border-rule py-s3">
                  <Prose className="text-small">{note}</Prose>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </Block>

      <Block label={highlightsHeading}>
        <ul className="grid gap-x-s6 md:grid-cols-2">
          {highlights.map((highlight) => (
            <li
              key={highlight.text}
              className="border-t border-rule py-s3 text-body text-ink"
            >
              {highlight.text}
            </li>
          ))}
        </ul>
      </Block>
    </>
  );
}
