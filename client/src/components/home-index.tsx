import { Link } from "wouter";
import { Block, IndexRow, Prose, TextLink } from "@/components/primitives";
import { roles } from "@/content/roles";
import { featuredProjects, standardProjects, projectBySlug } from "@/content/projects";
import { homeResearch } from "@/content/research";
import { sectionCopy } from "@/content/profile";
import { cn } from "@/lib/utils";

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
export default function HomeIndex({ cued = false }: { cued?: boolean }) {
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
                // The tagline cue. The hairline is the half of this that reads
                // from the top of the page: three near-invisible --rule lines
                // across ~900px becoming three accent ones is a large-area
                // change, where the title colour is a small-area one. Colour
                // only — promoting the border's *width* would shift layout.
                cued && "border-accent",
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
              <h3
                className={cn(
                  "text-org font-medium transition-colors duration-150",
                  // Accent already means "this is the one being pointed at" in
                  // this system — it is what IndexRow's `current` role uses. At
                  // rest these titles are --ink like every other linked index
                  // heading, so the unity with IndexRow is a resting state and
                  // this transient mark does not break it.
                  cued ? "text-accent" : "text-ink",
                )}
              >
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
