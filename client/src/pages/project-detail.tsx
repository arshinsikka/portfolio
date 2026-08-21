import type { ReactNode } from "react";
import { Redirect, useParams } from "wouter";
import {
  Artifact,
  Block,
  Placeholder,
  Prose,
  TagList,
  TextLink,
} from "@/components/primitives";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { projectBySlug } from "@/content/projects";
import NotFound from "@/pages/not-found";

/**
 * Detail page for a single project, structured as a case study.
 *
 * The section list is no longer a fixed skeleton. `project.sections` supplies
 * the headings and their copy in reading order, so a case study can carry the
 * sections its own subject needs rather than the seven this file used to
 * hardcode. An artifact hangs off whichever section it belongs to, so a diagram
 * can sit mid-argument. Only the links stay fixed after the sections, being
 * page furniture rather than copy.
 *
 * Only projects flagged `hasDetailPage` have a page. Any other known slug sends
 * the visitor back to the index rather than showing an empty shell. An unknown
 * slug renders the 404 page in place, leaving the bad URL in the address bar
 * so it stays visible rather than being silently rewritten.
 */

/**
 * SCAFFOLDING — DELETE PER ENTRY AS THE COPY LANDS.
 *
 * Keyed by section heading. A `CaseStudySection` carries only real content,
 * which is right: a placeholder is not content, it is a note about content that
 * does not exist yet. Keeping these here rather than in the content file means
 * the day a section's copy is written, its `paragraphs` or `artifact` fill in
 * and its entry below is deleted — and nothing that ships ever had a
 * placeholder in the data.
 *
 * Renders last within a section, so a section can carry real copy and an
 * outstanding note at the same time (Key decisions does today).
 */
const SCAFFOLDING: Record<string, ReactNode> = {
  "The challenge": (
    <Placeholder>
      The problem this project set out to solve, in two or three sentences. See
      handover note C1 — the opening sentence of the &ldquo;Key stats&rdquo;
      paragraph is a candidate if you want it split out.
    </Placeholder>
  ),
  "My role": (
    <Placeholder>
      What you personally owned versus what the team owned. See handover note
      C2.
    </Placeholder>
  ),
  "Key decisions": (
    <div className="mt-s4">
      <Placeholder>
        Why each of those was chosen over the alternative — the tradeoff, not the
        list. See handover note C3.
      </Placeholder>
    </div>
  ),
  // A section with a real `artifact` renders that instead of ever reaching
  // here; this is the stand-in for the one that has not been drawn yet.
  Architecture: (
    <Artifact caption="Placeholder — see handover note C4">
{`  ┌──────────────┐      ┌──────────────┐      ┌──────────────┐
  │  PLACEHOLDER │─────▶│  PLACEHOLDER │─────▶│  PLACEHOLDER │
  └──────────────┘      └──────────────┘      └──────────────┘

  Replace with the real pipeline diagram or a representative code
  excerpt. Monospace, plain text — it scrolls inside its own box, so
  a wide diagram will not widen the page.`}
    </Artifact>
  ),
};

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = projectBySlug(slug);

  // Called before the early returns so hook order stays stable across renders;
  // an unknown slug simply falls back to the site defaults.
  useDocumentMeta({
    title: project?.title,
    description: project?.summary,
  });

  if (!project) return <NotFound />;
  if (!project.hasDetailPage) return <Redirect to="/projects" replace />;

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

      {/* ── The case study, section by section ──────────────────────────── */}
      {project.sections?.map((section) => (
        <Block key={section.heading} label={section.heading}>
          {/*
            "My role" states the role itself above its copy. It comes from the
            project record rather than from the section, which is why it is not
            just another paragraph.
          */}
          {section.heading === "My role" && project.role && (
            <p className="text-org font-medium text-ink">{project.role}</p>
          )}

          {section.paragraphs.map((para, i) => (
            // Spacing hangs off the paragraph rather than a wrapper, so a
            // single-paragraph section renders exactly the bare <Prose> the
            // hardcoded version did.
            <Prose key={para.text} className={i > 0 ? "mt-s3" : undefined}>
              {para.label && <span className="font-medium">{para.label} </span>}
              {para.text}
            </Prose>
          ))}

          {section.artifact && (
            <div className={section.paragraphs.length > 0 ? "mt-s4" : undefined}>
              <Artifact caption={section.artifact.caption}>
                {section.artifact.content}
              </Artifact>
            </div>
          )}

          {SCAFFOLDING[section.heading]}
        </Block>
      ))}

      {/* ── Links ───────────────────────────────────────────────────────── */}
      <Block label="Links">
        {/*
          A project with no external links still gets the block, because "All
          projects" is the way back out. The list itself is dropped rather than
          rendered empty, so the back-link sits directly under the label.
        */}
        {project.links.length > 0 && (
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
        )}

        <p className={project.links.length > 0 ? "mt-s4" : undefined}>
          <TextLink href="/projects" className="text-small">
            All projects
          </TextLink>
        </p>
      </Block>
    </>
  );
}
