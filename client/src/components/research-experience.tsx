import ResearchCard from "@/components/research-card";
import { Section } from "@/components/section";
import { research } from "@/content/research";
import { sectionCopy } from "@/content/profile";

export default function ResearchExperience() {
  return (
    <Section
      tone="tinted"
      width="wide"
      heading={sectionCopy.research.heading}
      subtitle={sectionCopy.research.subtitle}
    >
      {/* Two-column grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {research.map((item) => (
          <ResearchCard key={item.slug} item={item} />
        ))}
      </div>
    </Section>
  );
}
