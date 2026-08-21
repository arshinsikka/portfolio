import { Block, IndexRow, Prose, TextLink } from "@/components/primitives";
import { roles } from "@/content/roles";
import { featuredProjects, standardProjects, projectBySlug } from "@/content/projects";
import { homeResearch } from "@/content/research";
import { sectionCopy } from "@/content/profile";

/**
 * How much of each list the homepage shows before handing off to the route that
 * owns it. Showing everything here is what made /work redundant: all five roles
 * were on the front page, so the section it links to had nothing further to say.
 *
 * Roles and projects are selected by recency, taking the order the content files
 * already declare; projects are under their cap already, so in practice only the
 * role list is actually truncated. Research is the exception: it is named record
 * by record in `homeResearch` rather than skimmed off the top, because which
 * research represents the work is an editorial call and recency kept answering
 * it by accident.
 */
const MAX_ROLES = 3;
const MAX_PROJECTS = 3;

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
      {/*
        Not an index row. `/projects` already lists these with their role, dates
        and tags; repeating that here made the homepage a worse copy of a page
        one click away. What the index cannot show is the summary line, which is
        the most persuasive copy on the site, so the homepage spends its space on
        exactly that and drops every other field.
      */}
      <Block label={sectionCopy.projects.homeHeading} labelHref="/projects">
        <ul className="space-y-s5">
          {indexProjects.map((project) => (
            <li key={project.slug}>
              <h3 className="text-org font-medium">
                <TextLink href={`/projects/${project.slug}`}>
                  {project.title}
                </TextLink>
              </h3>
              <Prose className="mt-s2">{project.summary}</Prose>
            </li>
          ))}
        </ul>
        <MoreLink href="/projects">All projects</MoreLink>
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

      {/*
        No selected research means no section — not an empty one. `Block` draws
        the hairline and rail label itself, so rendering it with nothing inside
        would leave a labelled void where the section used to be. The list is
        already filtered in the content file; this only declines to draw the
        furniture around an empty result.
      */}
      {homeResearch.length > 0 && (
        <Block label={sectionCopy.research.heading} labelHref="/research">
          <ul>
            {homeResearch.map((item) => (
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
      )}
    </>
  );
}
