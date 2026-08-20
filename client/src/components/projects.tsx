import type { Project } from "@/content/types";
import { Block, IndexRow, Prose, TagList, TextLink } from "@/components/primitives";
import {
  featuredProjects,
  standardProjects,
  minorProjects,
} from "@/content/projects";
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

        {/* The featured tier carries no heading of its own in the content. */}
        <ul className="mt-s5">
          {featuredProjects.map((project) => (
            <ProjectRow key={project.slug} project={project} />
          ))}
        </ul>
      </Block>

      <Block label={sectionCopy.projects.standardHeading}>
        <ul>
          {standardProjects.map((project) => (
            <ProjectRow key={project.slug} project={project} />
          ))}
        </ul>
      </Block>

      <Block label={sectionCopy.projects.minorHeading}>
        <ul>
          {minorProjects.map((project) => (
            <ProjectRow key={project.slug} project={project} />
          ))}
        </ul>
      </Block>
    </>
  );
}
