import { Link } from "wouter";
import { Block, IndexRow, Prose, TextLink } from "@/components/primitives";
import { homeRoles } from "@/content/roles";
import { featuredProjects, standardProjects, projectBySlug } from "@/content/projects";
import { homeResearch } from "@/content/research";
import { sectionCopy } from "@/content/profile";
import { cn } from "@/lib/utils";

/**
 * How much of each list the homepage shows before handing off to the route that
 * owns it. Showing everything here is what made /work redundant: all five roles
 * were on the front page, so the section it links to had nothing further to say.
 *
 * Projects are still skimmed off the top, in the order the content file
 * declares, and are under their cap already. Roles and research are not: each
 * is named record by record, in `homeRoles` and `homeResearch`, because which
 * entries represent the work is an editorial call and recency kept answering it
 * by accident. Those two lists carry their own length, so there is no cap here
 * to keep in step with them.
 */
const MAX_PROJECTS = 3;

/** Only link a row where a destination actually exists. */
const detailHref = (slug?: string) =>
  slug && projectBySlug(slug)?.hasDetailPage ? `/projects/${slug}` : undefined;

const indexProjects = [...featuredProjects, ...standardProjects].slice(0, MAX_PROJECTS);

/**
 * The single accent mark on the page. Two roles carry `isCurrent`, so the mark
 * goes to the most recent one only — colouring both would make it a category
 * rather than a pointer at what I am doing now.
 */
const currentRoleSlug = homeRoles.find((r) => r.isCurrent)?.slug;

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
        <ul>
          {indexProjects.map((project) => (
            <li
              key={project.slug}
              className={cn(
                "group relative border-b border-rule py-s3 last:border-b-0",
                "transition-colors duration-150",
                "hover:border-ink focus-within:border-ink",
              )}
            >
              {/* The row hover arrow, unchanged from IndexRow. */}
              <span
                aria-hidden
                className={cn(
                  "pointer-events-none absolute left-[-1.25rem] top-s3 hidden font-mono text-meta text-ink-muted",
                  "opacity-0 transition-opacity duration-150 md:block",
                  "group-hover:opacity-100 group-focus-within:opacity-100",
                )}
              >
                →
              </span>

              {/*
                Ink with a rule-strong underline, not the accent TextLink these
                titles used to carry. That is IndexRow's linked-heading
                treatment, so the two lists now read as one system — and it
                leaves the accent free to mean something here.
              */}
              <h3 className="text-org font-medium text-ink">
                <Link
                  href={`/projects/${project.slug}`}
                  className={cn(
                    "underline decoration-rule-strong underline-offset-[3px]",
                    "transition-colors duration-150 group-hover:decoration-accent",
                  )}
                >
                  {project.title}
                </Link>
              </h3>

              <Prose className="mt-s2">{project.summary}</Prose>

              {/*
                Dates and the leading tag, revealed on hover or focus. It is
                always rendered and always occupies its line — only `opacity`
                moves — so the row's height is identical in both states and
                nothing below it reflows. Reserving the space this way rather
                than animating height is also what keeps it honest under
                prefers-reduced-motion, where the fade collapses to an instant
                swap and the layout still never moves.
              */}
              <p
                className={cn(
                  "mt-s2 font-mono text-label uppercase text-ink-muted",
                  "opacity-0 transition-opacity duration-150",
                  "group-hover:opacity-100 group-focus-within:opacity-100",
                )}
              >
                {[project.dates, project.tags?.[0]].filter(Boolean).join(" · ")}
              </p>
            </li>
          ))}
        </ul>
        <MoreLink href="/projects">All projects</MoreLink>
      </Block>

      <Block label={sectionCopy.work.heading} labelHref="/work">
        <ul>
          {homeRoles.map((role) => (
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
