import { Block, ListRow } from "@/components/primitives";
import { roles } from "@/content/roles";
import { featuredProjects, standardProjects, projectBySlug } from "@/content/projects";
import { research } from "@/content/research";
import { sectionCopy } from "@/content/profile";

/** Only link a row where a destination actually exists. */
const detailHref = (slug?: string) =>
  slug && projectBySlug(slug)?.hasDetailPage ? `/projects/${slug}` : undefined;

/**
 * The homepage index. Titles, dates, and tags only — the descriptions stay on
 * the pages the rail labels link to, so this reads as an index rather than a
 * second copy of the site.
 */
export default function HomeIndex() {
  return (
    <>
      <Block label={sectionCopy.work.heading} labelHref="/work">
        <ul>
          {roles.map((role) => (
            <ListRow
              key={role.slug}
              title={role.title}
              href={detailHref(role.projectSlug)}
              meta={`${role.company} · ${role.location}`}
              date={role.dates}
              tags={role.tags}
            />
          ))}
        </ul>
      </Block>

      <Block label={sectionCopy.projects.heading} labelHref="/projects">
        <ul>
          {[...featuredProjects, ...standardProjects].map((project) => (
            <ListRow
              key={project.slug}
              title={project.title}
              href={detailHref(project.slug)}
              meta={project.role}
              date={project.dates}
              tags={project.tags}
            />
          ))}
        </ul>
      </Block>

      <Block label={sectionCopy.research.heading} labelHref="/research">
        <ul>
          {research.map((item) => (
            <ListRow
              key={item.slug}
              title={item.title}
              meta={item.organization}
              date={item.dates}
              tags={item.tags}
            />
          ))}
        </ul>
      </Block>
    </>
  );
}
