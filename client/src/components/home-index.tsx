import { Block, IndexRow, StatBand, TextLink } from "@/components/primitives";
import { roles } from "@/content/roles";
import { featuredProjects, standardProjects, projectBySlug } from "@/content/projects";
import { research } from "@/content/research";
import { impact } from "@/content/impact";
import { sectionCopy } from "@/content/profile";

/**
 * How much of each list the homepage shows before handing off to the route that
 * owns it. Showing everything here is what made /work redundant: all five roles
 * were on the front page, so the section it links to had nothing further to say.
 *
 * Selection is by recency, taking the order the content files already declare.
 * Projects and research are under their caps already — the project index shows
 * the featured and standard tiers only, and there are just two research records
 * — so in practice only the role list is actually truncated.
 */
const MAX_ROLES = 3;
const MAX_PROJECTS = 3;
const MAX_RESEARCH = 2;

/** Only link a row where a destination actually exists. */
const detailHref = (slug?: string) =>
  slug && projectBySlug(slug)?.hasDetailPage ? `/projects/${slug}` : undefined;

const indexProjects = [...featuredProjects, ...standardProjects].slice(0, MAX_PROJECTS);
const indexRoles = roles.slice(0, MAX_ROLES);

/**
 * The single accent mark on the page. Two roles carry `isCurrent`, so the mark
 * goes to the most recent one only — colouring both would make it a category
 * rather than a pointer at what I am doing now.
 */
const currentRoleSlug = indexRoles.find((r) => r.isCurrent)?.slug;

/**
 * Closes the handoff the truncation opens. The rail label links to the same
 * route, but it sits at the top of the block and reads as a heading; a reader
 * who has just run out of rows needs the way forward at the point they stop.
 */
function MoreLink({ href, children }: { href: string; children: string }) {
  return (
    <p className="mt-s3">
      <TextLink href={href} className="text-small">
        {children}
      </TextLink>
    </p>
  );
}

/**
 * The homepage index. Organisations, dates, and tags only — the descriptions
 * stay on the pages the rail labels link to, so this reads as an index rather
 * than a second copy of the site.
 */
export default function HomeIndex() {
  return (
    <>
      <Block>
        <StatBand stats={impact} />
      </Block>

      <Block label={sectionCopy.work.heading} labelHref="/work">
        <ul>
          {indexRoles.map((role) => (
            <IndexRow
              key={role.slug}
              primary={role.company}
              secondary={`${role.title} · ${role.location}`}
              href={detailHref(role.projectSlug)}
              date={role.dates}
              tags={role.tags}
              current={role.slug === currentRoleSlug}
            />
          ))}
        </ul>
        <MoreLink href="/work">All work experience</MoreLink>
      </Block>

      <Block label={sectionCopy.projects.heading} labelHref="/projects">
        <ul>
          {indexProjects.map((project) => (
            <IndexRow
              key={project.slug}
              primary={project.title}
              secondary={project.role}
              href={detailHref(project.slug)}
              date={project.dates}
              tags={project.tags}
            />
          ))}
        </ul>
        <MoreLink href="/projects">All projects</MoreLink>
      </Block>

      <Block label={sectionCopy.research.heading} labelHref="/research">
        <ul>
          {research.slice(0, MAX_RESEARCH).map((item) => (
            <IndexRow
              key={item.slug}
              primary={item.organization}
              secondary={item.title}
              date={item.dates}
              tags={item.tags}
            />
          ))}
        </ul>
        <MoreLink href="/research">All research experience</MoreLink>
      </Block>
    </>
  );
}
