import RoleCard from "@/components/role-card";
import { Section } from "@/components/section";
import { roles } from "@/content/roles";
import { sectionCopy } from "@/content/profile";

export default function WorkExperience() {
  return (
    <Section
      tone="tinted"
      width="narrow"
      heading={sectionCopy.work.heading}
      subtitle={sectionCopy.work.subtitle}
    >
      {/* Timeline */}
      <div className="relative">
        {roles.map((role, index) => (
          <RoleCard
            key={role.slug}
            role={role}
            isLast={index === roles.length - 1}
          />
        ))}
      </div>
    </Section>
  );
}
