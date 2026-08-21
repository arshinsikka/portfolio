import { Redirect, useParams } from "wouter";
import {
  Artifact,
  Block,
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
 * Every section now carries real copy, so nothing on this page is a placeholder
 * and no scaffolding survives here.
 *
 * Only projects flagged `hasDetailPage` have a page. Any other known slug sends
 * the visitor back to the index rather than showing an empty shell. An unknown
 * slug renders the 404 page in place, leaving the bad URL in the address bar
 * so it stays visible rather than being silently rewritten.
 */
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
