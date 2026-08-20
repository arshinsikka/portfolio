import type { Paragraph } from "@/content/types";
import { Block, IndexRow, Prose, TextLink } from "@/components/primitives";
import { roles } from "@/content/roles";
import { sectionCopy } from "@/content/profile";
import { projectBySlug } from "@/content/projects";

/** Only link a row where a destination actually exists. */
const detailHref = (slug?: string) =>
  slug && projectBySlug(slug)?.hasDetailPage ? `/projects/${slug}` : undefined;

/** The one accent mark on this page: the role I hold now. */
const currentRoleSlug = roles.find((r) => r.isCurrent)?.slug;

/**
 * A role's long-form copy, rendered inline beneath its index row.
 *
 * Roles have no detail page, so a body has nowhere else to go. The treatment is
 * the one a project's body already gets: `Prose` at the reading measure, with
 * `label` as a bold lead-in on the same line as its text. It sits at
 * `text-small` to match the description directly above it — the body is more of
 * that paragraph, not a second voice.
 *
 * Renders nothing when a role has no body, so those rows are byte-identical to
 * what they were before the field existed.
 */
function RoleBody({ body }: { body?: Paragraph[] }) {
  if (!body || body.length === 0) return null;

  return (
    <div className="mt-s3 space-y-s2">
      {body.map((para) => (
        <Prose key={para.text} className="text-small">
          {para.label && <span className="font-medium">{para.label} </span>}
          {para.text}
        </Prose>
      ))}
    </div>
  );
}

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
            <RoleBody body={role.body} />
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
