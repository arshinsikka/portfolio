import { Block, Prose, TextLink } from "@/components/primitives";
import { useDocumentMeta } from "@/hooks/use-document-meta";

/**
 * The body copy previously read "Did you forget to add the page to the router?"
 * — developer template text addressed to the developer, shown to visitors. The
 * replacement below is the one approved copy change in this pass. The heading
 * is the original string, restyled.
 */
export default function NotFound() {
  useDocumentMeta({
    title: "404 Page Not Found",
    description: "This page doesn\u2019t exist, or it has moved.",
  });

  return (
    <Block className="border-t-0" label="Error">
      <h1 className="max-w-lead font-display text-display text-ink">
        404 Page Not Found
      </h1>

      <Prose className="mt-s4">
        This page doesn&rsquo;t exist, or it has moved.
      </Prose>

      <p className="mt-s4">
        <TextLink href="/" className="text-small">
          Go to the homepage
        </TextLink>
      </p>
    </Block>
  );
}
