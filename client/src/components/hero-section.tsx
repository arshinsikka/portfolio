import { hero, RESUME_URL } from "@/content/profile";
import { Block, ButtonLink, Prose, TextLink } from "@/components/primitives";

/**
 * The opening statement.
 *
 * The page used to lead with the name at display size, then the positioning
 * line, then a paragraph — so the largest thing on the page was a fact the
 * navbar already states twice. The positioning line is now the headline and the
 * name is an eyebrow above it, set in the same mono label the rail uses for
 * every other block: the hero's label happens to be the person's name.
 *
 * Copy is unchanged. Only which string occupies which slot has moved.
 */
export default function HeroSection() {
  return (
    <Block
      className="border-t-0"
      rail={
        <img
          src={hero.imageSrc}
          alt={hero.imageAlt}
          width={320}
          height={320}
          decoding="async"
          className="h-20 w-20 border border-rule object-cover md:h-rail md:w-rail"
        />
      }
    >
      <p className="font-mono text-label uppercase text-ink-muted">{hero.name}</p>

      <h1 className="mt-s2 max-w-lead font-display text-display text-ink">
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
