import LeadershipCard from "@/components/leadership-card";
import { Section } from "@/components/section";
import { leadership } from "@/content/leadership";
import { sectionCopy } from "@/content/profile";

export default function Leadership() {
  return (
    <Section
      id="leadership"
      tone="light"
      width="wide"
      heading={sectionCopy.leadership.heading}
      subtitle={sectionCopy.leadership.subtitle}
    >
      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {leadership.map((item) => (
          <LeadershipCard key={item.slug} item={item} />
        ))}
      </div>
    </Section>
  );
}
