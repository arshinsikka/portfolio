import { Redirect, useParams } from "wouter";
import {
  Artifact,
  Block,
  Placeholder,
  Prose,
  TagList,
  TextLink,
} from "@/components/primitives";
import { projectBySlug } from "@/content/projects";
import NotFound from "@/pages/not-found";

/**
 * Detail page for a single project, structured as a case study:
 * overview → the challenge → my role → key decisions → results → links.
 *
 * Only projects flagged `hasDetailPage` have one. Any other known slug sends
 * the visitor back to the index rather than showing an empty shell. An unknown
 * slug renders the 404 page in place, leaving the bad URL in the address bar
 * so it stays visible rather than being silently rewritten.
 *
 * The section skeleton is fixed; what fills it comes from the project record.
 * Where the record has no copy for a section the slot renders a Placeholder
 * rather than borrowing a sentence written for something else — every one of
 * those is listed in the handover notes.
 */
export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = projectBySlug(slug);

  if (!project) return <NotFound />;
  if (!project.hasDetailPage) return <Redirect to="/projects" replace />;

  /** `body[0]` restates `summary` verbatim, so the overview uses one of them. */
  const [, ...supporting] = project.body;
  const decisions = supporting.find((p) => p.label === "Built with:");
  const stats = supporting.find((p) => p.label === "Key stats:");

  return (
    <>
      {/* ── Masthead ────────────────────────────────────────────────────── */}
      <Block className="border-t-0" label={project.dates}>
        <h1 className="max-w-lead font-display text-display text-ink">
          {project.title}
        </h1>

        {project.accolades && project.accolades.length > 0 && (
          <TagList
            tags={project.accolades.map((a) => a.text)}
            className="mt-s3"
          />
        )}
      </Block>

      {/* ── Overview ────────────────────────────────────────────────────── */}
      <Block label="Overview">
        <Prose>{project.summary}</Prose>
      </Block>

      {/* ── The challenge ───────────────────────────────────────────────── */}
      <Block label="The challenge">
        <Placeholder>
          The problem this project set out to solve, in two or three sentences.
          See handover note C1 — the opening sentence of the &ldquo;Key
          stats&rdquo; paragraph is a candidate if you want it split out.
        </Placeholder>
      </Block>

      {/* ── My role ─────────────────────────────────────────────────────── */}
      <Block label="My role">
        <p className="text-org font-medium text-ink">{project.role}</p>
        <Placeholder>
          What you personally owned versus what the team owned. See handover
          note C2.
        </Placeholder>
      </Block>

      {/* ── Key decisions ───────────────────────────────────────────────── */}
      <Block label="Key decisions">
        {decisions && (
          <Prose>
            <span className="font-medium">{decisions.label} </span>
            {decisions.text}
          </Prose>
        )}
        <div className="mt-s4">
          <Placeholder>
            Why each of those was chosen over the alternative — the tradeoff, not
            the list. See handover note C3.
          </Placeholder>
        </div>
      </Block>

      {/* ── Technical artifact ──────────────────────────────────────────── */}
      <Block label="Architecture">
        <Artifact caption="Placeholder — see handover note C4">
{`  ┌──────────────┐      ┌──────────────┐      ┌──────────────┐
  │  PLACEHOLDER │─────▶│  PLACEHOLDER │─────▶│  PLACEHOLDER │
  └──────────────┘      └──────────────┘      └──────────────┘

  Replace with the real pipeline diagram or a representative code
  excerpt. Monospace, plain text — it scrolls inside its own box, so
  a wide diagram will not widen the page.`}
        </Artifact>
      </Block>

      {/* ── Results ─────────────────────────────────────────────────────── */}
      <Block label="Results">
        {stats ? (
          <Prose>
            <span className="font-medium">{stats.label} </span>
            {stats.text}
          </Prose>
        ) : (
          <Placeholder>Outcomes and measurements. See handover note C5.</Placeholder>
        )}
      </Block>

      {/* ── Links ───────────────────────────────────────────────────────── */}
      <Block label="Links">
        <ul className="flex flex-wrap gap-x-s5 gap-y-s2">
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

        <p className="mt-s4">
          <TextLink href="/projects" className="text-small">
            All projects
          </TextLink>
        </p>
      </Block>
    </>
  );
}
