import { hero, RESUME_URL } from "@/content/profile";
import { Block, ButtonLink, Prose, TextLink } from "@/components/primitives";

/**
 * The opening statement.
 *
 * The positioning line is the headline; the name is the block's rail label.
 * The portrait that used to sit in the rail has been removed — with it gone the
 * hero stops being the one block whose rail holds something other than a label,
 * so every rail slot down the page is now the same kind of object.
 *
 * `labelAs="p"` because the h1 is the positioning line in the content column;
 * the name is an identifier, not a heading above it.
 *
 * Copy is unchanged. Only which string occupies which slot has moved.
 */
export default function HeroSection() {
  return (
    <Block className="border-t-0" label={hero.name} labelAs="p">
      <h1 className="max-w-lead font-display text-display text-ink">
        {hero.tagline}
      </h1>

      <Prose className="mt-s4">{hero.intro}</Prose>

      <div className="mt-s5 flex flex-wrap items-center gap-x-s5 gap-y-s3">
        <ButtonLink href={RESUME_URL} external>
          View Resume
        </ButtonLink>
        <TextLink href="/about" className="text-small">
          Contact Me
        </TextLink>
        <TextLink href={hero.githubUrl} external className="text-small">
          GitHub
        </TextLink>
      </div>
    </Block>
  );
}
