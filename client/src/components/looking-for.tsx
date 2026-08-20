import { lookingFor, RESUME_URL } from "@/content/profile";
import { Block, TextLink } from "@/components/primitives";

export default function LookingFor() {
  return (
    <Block label={lookingFor.leadIn} mark>
      <p className="max-w-measure text-body text-ink">{lookingFor.body}</p>
      <p className="mt-s4">
        <TextLink href={RESUME_URL} external className="text-small">
          {lookingFor.ctaLabel}
        </TextLink>
      </p>
    </Block>
  );
}
