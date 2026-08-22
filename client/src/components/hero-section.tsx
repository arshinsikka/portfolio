import { hero, RESUME_URL } from "@/content/profile";
import { Block, ButtonLink, Prose, TextLink } from "@/components/primitives";
import { cn } from "@/lib/utils";

/**
 * The opening statement.
 *
 * Two columns, both of them the page's own. The rail carries the portrait and a
 * mono fact block; the content column carries the name as a label, then the
 * positioning line as the h1, then the intro, the currently-line, and the links.
 *
 * The hero is the one block on the site whose rail holds something other than a
 * label, which is the reason `Block` takes a `rail` prop at all. The rail is
 * also wider here than anywhere else — see `--rail-w-home` in index.css —
 * because a portrait sized for an 11px label is a thumbnail.
 *
 * The name is not a heading. It sits in the rail label's treatment because that
 * is what a block's identifier looks like site-wide, but the h1 is the
 * positioning line in the content column, so marking the name up as a heading
 * would put an h2 above the h1.
 *
 * Copy is unchanged. `hero.currently` and `hero.facts` are new; nothing
 * existing was reworded.
 */

/** The rail label treatment, which the name borrows in both its positions. */
const NAME_CLASS = "font-mono text-label uppercase text-ink-muted";

function HeroRail() {
  return (
    // `.hero-rail-offset` drops the photo's top edge onto the cap height of the
    // h1's first line. It carries its own `md` media query in index.css — it is
    // not a Tailwind utility, so a `md:` variant on it would compile to nothing.
    <div className="hero-rail-offset">
      {/*
        Mobile only. Stacked, the rail lands above the content, which put the
        name directly under the three fact lines — four consecutive lines of
        mono uppercase reading as one four-item list. Moving the name above the
        portrait puts the image between the two mono blocks so they read as two
        things. It is `display:none` from `md` up, so it costs no height and is
        not exposed to assistive tech there; the desktop copy below takes over.
      */}
      <p className={cn(NAME_CLASS, "mb-s3 md:hidden")}>{hero.name}</p>

      <img
        src={hero.imageSrc}
        alt={hero.imageAlt}
        width={448}
        height={448}
        // Above the fold and the largest paint on the page: never lazy.
        loading="eager"
        // Lowercase, and spread rather than written as an attribute. React 18
        // does not recognise the camelCase `fetchPriority`: it warns on every
        // render and then drops the attribute, so the hint never reached the
        // browser. The lowercase spelling is passed straight through to the
        // DOM. It has to be spread because @types/react 18 declares only the
        // camelCase name — the one spelling that does not work — so writing
        // `fetchpriority` as a plain attribute is a type error. React 19
        // supports the camelCase form and this can go back to being an
        // ordinary prop then.
        {...{ fetchpriority: "high" }}
        decoding="async"
        className="aspect-square w-[9rem] rounded-sm object-cover md:w-full"
      />

      {/*
        The machine-set metadata the rail carries on every other block, applied
        to the person. One item per line, in the order they are read.
      */}
      <ul className="mt-s4 space-y-s1">
        {hero.facts.map((fact) => (
          <li key={fact} className="font-mono text-label uppercase text-ink-muted">
            {fact}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function HeroSection() {
  return (
    <Block className="border-t-0" rail={<HeroRail />}>
      {/* Desktop only; the mobile copy lives above the portrait in the rail. */}
      <p className={cn(NAME_CLASS, "hidden md:block")}>{hero.name}</p>

      <h1 className="mt-s3 max-w-lead font-display text-display text-ink">
        {hero.tagline}
      </h1>

      <Prose className="mt-s5">{hero.intro}</Prose>

      {/*
        The one line that answers "what is he doing right now". Rendered inline
        rather than under a mono CURRENTLY label: the string already opens with
        the word, and a rail-style label here would be the third mono block in a
        hero that already has two.
      */}
      <p className="mt-s3 max-w-measure text-small text-ink-muted">
        {hero.currently}
      </p>

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
