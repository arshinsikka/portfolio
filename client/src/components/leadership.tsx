import { Block, IndexRow, Prose } from "@/components/primitives";
import { leadership } from "@/content/leadership";
import { sectionCopy } from "@/content/profile";

export default function Leadership() {
  return (
    <Block label={sectionCopy.leadership.heading}>
      <p className="max-w-lead font-display text-lead text-ink-muted">
        {sectionCopy.leadership.subtitle}
      </p>

      <ul className="mt-s5">
        {leadership.map((item) => (
          <IndexRow
            key={item.slug}
            primary={item.organization}
            secondary={
              item.location ? `${item.title} · ${item.location}` : item.title
            }
            date={item.dates}
            tags={item.tags}
          >
            {/* Absent where the canonical copy lives on the project record. */}
            {item.description && (
              <Prose className="text-small">{item.description}</Prose>
            )}
          </IndexRow>
        ))}
      </ul>
    </Block>
  );
}
