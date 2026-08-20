import { Block, IndexRow, Prose, TextLink } from "@/components/primitives";
import { roles } from "@/content/roles";
import { sectionCopy } from "@/content/profile";
import { projectBySlug } from "@/content/projects";

/** Only link a row where a destination actually exists. */
const detailHref = (slug?: string) =>
  slug && projectBySlug(slug)?.hasDetailPage ? `/projects/${slug}` : undefined;

/** The one accent mark on this page: the role I hold now. */
const currentRoleSlug = roles.find((r) => r.isCurrent)?.slug;

export default function WorkExperience() {
  return (
    <Block className="border-t-0" label={sectionCopy.work.heading} labelAs="h1">
      <p className="max-w-lead font-display text-lead text-ink-muted">
        {sectionCopy.work.subtitle}
      </p>

      <ul className="mt-s5">
        {roles.map((role) => (
          <IndexRow
            key={role.slug}
            primary={role.company}
            secondary={`${role.title} · ${role.location}`}
            href={detailHref(role.projectSlug)}
            date={role.dates}
            tags={role.tags}
            current={role.slug === currentRoleSlug}
          >
            <Prose className="text-small">{role.description}</Prose>
            {role.links && role.links.length > 0 && (
              <ul className="mt-s2 flex flex-wrap gap-x-s5 gap-y-s1">
                {role.links.map((link) => (
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
