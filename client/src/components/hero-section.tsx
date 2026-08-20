import { hero, RESUME_URL } from "@/content/profile";
import { Block, ButtonLink, TextLink } from "@/components/primitives";

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
      <h1 className="font-display text-display text-ink">{hero.name}</h1>

      <p className="mt-s4 max-w-measure font-display text-lead text-ink-muted">
        {hero.tagline}
      </p>

      <p className="mt-s5 max-w-measure text-body text-ink">{hero.intro}</p>

      <div className="mt-s6 flex flex-wrap items-center gap-x-s5 gap-y-s3">
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
