import { lookingFor, RESUME_URL } from "@/content/profile";
import { Block, Prose, TextLink } from "@/components/primitives";

export default function LookingFor() {
  return (
    <Block label={lookingFor.leadIn} mark>
      <Prose>{lookingFor.body}</Prose>
      <p className="mt-s3">
        <TextLink href={RESUME_URL} external className="text-small">
          {lookingFor.ctaLabel}
        </TextLink>
      </p>
    </Block>
  );
}
