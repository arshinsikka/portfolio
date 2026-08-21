import { Block, IndexRow, Prose, TextLink } from "@/components/primitives";
import { research } from "@/content/research";
import { sectionCopy } from "@/content/profile";
import { projectBySlug } from "@/content/projects";

/**
 * Only link a row where a destination actually exists — identical to the helper
 * `/work` uses. An entry can name a `projectSlug` whose project has no detail
 * page yet; that records the relationship without promising the reader a page
 * that would only bounce them back to the index.
 */
const detailHref = (slug?: string) =>
  slug && projectBySlug(slug)?.hasDetailPage ? `/projects/${slug}` : undefined;

export default function ResearchExperience() {
  return (
    <Block
      className="border-t-0"
      label={sectionCopy.research.heading}
      labelAs="h1"
    >
      <p className="max-w-lead font-display text-lead text-ink-muted">
        {sectionCopy.research.subtitle}
      </p>

      <ul className="mt-s5">
        {research.map((item) => (
          <IndexRow
            key={item.slug}
            primary={item.organization}
            secondary={item.title}
            href={detailHref(item.projectSlug)}
            date={item.dates}
            tags={item.tags}
          >
            <Prose className="text-small">{item.description}</Prose>
            {item.links && item.links.length > 0 && (
              <ul className="mt-s2 flex flex-wrap gap-x-s5 gap-y-s1">
                {item.links.map((link) => (
                  <li key={link.url}>
                    <TextLink href={link.url} external className="text-small">
                      {link.label}
                    </TextLink>
                  </li>
                ))}
              </ul>
            )}
          </IndexRow>
        ))}
      </ul>
    </Block>
  );
}
