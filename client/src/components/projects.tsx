import type { Project } from "@/content/types";
import { Block, IndexRow, Prose, TagList, TextLink } from "@/components/primitives";
import { projectGroups } from "@/content/projects";
import { sectionCopy } from "@/content/profile";

/** Only link a row where a destination actually exists. */
const detailHref = (p: Project) =>
  p.hasDetailPage ? `/projects/${p.slug}` : undefined;

function ProjectRow({ project }: { project: Project }) {
  return (
    <IndexRow
      primary={project.title}
      secondary={project.role}
      href={detailHref(project)}
      date={project.dates}
      tags={project.tags}
      /*
        Four of sixteen rows on this page lead anywhere. Without a resting
        label the only signals are the title's underline and a hover arrow,
        and neither survives a glance down the list — the arrow does not exist
        on touch at all.
      */
      marker={
        project.hasDetailPage ? sectionCopy.projects.caseStudyLabel : undefined
      }
    >
      <Prose className="text-small">{project.summary}</Prose>

      {/* Accolades were coloured pills; they are metadata, same as tags. */}
      {project.accolades && project.accolades.length > 0 && (
        <TagList
          tags={project.accolades.map((a) => a.text)}
          className="mt-s2"
        />
      )}

      {project.links.length > 0 && (
        <ul className="mt-s2 flex flex-wrap gap-x-s5 gap-y-s1">
          {project.links.map((link) => (
            <li key={link.url}>
              <TextLink
                href={link.url}
                external={!link.url.startsWith("/")}
                className="text-small"
              >
                {link.label}
              </TextLink>
            </li>
          ))}
        </ul>
      )}
    </IndexRow>
  );
}

/**
 * The project index, grouped.
 *
 * Each group is an ordinary `Block`, so its heading is the same rail label
 * every other section heading on the site uses — a group heading is not a new
 * treatment, it is the existing one applied three times. No filter chips: the
 * groups are the whole navigation, and with this few records a control that
 * hides rows would cost more than it saves.
 *
 * `projectGroups` has already dropped any group with no records, so an empty
 * group contributes no heading and no hairline. A group holding a single entry
 * is not special-cased — it renders exactly like a full one, because a heading
 * over one row still says what kind of thing that row is, and suppressing it
 * would make the page's structure depend on how much happens to be in it.
 */
export default function Projects() {
  return (
    <>
      <Block
        className="border-t-0"
        label={sectionCopy.projects.heading}
        labelAs="h1"
      >
        <p className="max-w-lead font-display text-lead text-ink-muted">
          {sectionCopy.projects.subtitle}
        </p>
      </Block>

      {projectGroups.map(({ group, projects }) => (
        <Block key={group} label={sectionCopy.projects.groups[group]}>
          <ul>
            {projects.map((project) => (
              <ProjectRow key={project.slug} project={project} />
            ))}
          </ul>
        </Block>
      ))}
    </>
  );
}
