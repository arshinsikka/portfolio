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
 * Two of these are not plain lists, so neither uses IndexRow:
 *
 * Education is a single record — one degree, one metadata line, and a list of
 * notes. Forcing it into a three-column index row would need the `meta` string
 * split into a date and a minor, which is a copy edit. It instead borrows the
 * row's *type* hierarchy without its grid: the degree at `text-org` like an
 * organisation, the metadata in mono like a date, and the notes as hairline
 * rows beneath.
 *
 * Quick Highlights are six standalone sentences with no organisation, date, or
 * role — nothing to put in three columns. They keep the hairline row rhythm in
 * a two-column grid. A `border-t` on each item aligns across each grid row
 * regardless of how the text wraps, which a `border-b` would not.
 */
export default function AboutMe() {
  return (
    <>
      <Block className="border-t-0" label={about.heading} labelAs="h1">
        {about.paragraphs.map((paragraph, i) => (
          <Prose key={i} className={i > 0 ? "mt-s4" : undefined}>
            {paragraph}
          </Prose>
        ))}
      </Block>

      <Block label={education.heading}>
        <p className="text-org font-medium text-ink">{education.degree}</p>
        <p className="mt-s1 font-mono text-meta text-ink-muted">{education.meta}</p>

        <ul className="mt-s3">
          {education.notes.map((note, i) => (
            <li key={i} className="border-t border-rule py-s3">
              <Prose className="text-small">{note}</Prose>
            </li>
          ))}
        </ul>
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
