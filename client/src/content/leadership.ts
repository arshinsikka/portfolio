import type { LeadershipItem } from "./types";

export const leadership: LeadershipItem[] = [
  {
    slug: "nussu-director-hr",
    title: "Director of Human Resources",
    organization: "NUS Student Union (NUSSU)",
    dates: "Nov 2024 – Present",
    description:
      "Leading people operations for NUS's apex student body. Designed onboarding and feedback systems supporting 100+ student leaders across cross-functional teams. Facilitated well-being check-ins and engagement initiatives to strengthen organizational culture.",
    tags: ["Student Governance", "HR", "Community Building"],
    isCurrent: true,
  },
  {
    slug: "nes-operations-executive",
    title: "Operations Executive",
    organization: "NUS Entrepreneurship Society (NES)",
    dates: "May 2025 – Present",
    description:
      "Supporting CatalystX, NES's flagship incubation program, by managing operations, logistics, and program coordination. Helping student founders turn ideas into impact within a vibrant innovation community.",
    tags: ["Student Leadership", "Startup Ecosystem", "Event Ops"],
    isCurrent: true,
  },
  {
    slug: "chess-player-captain",
    title: "Professional Chess Player & Team Captain",
    organization: "India / NUS",
    dates: "Apr 2013 – Present",
    description:
      "Represented India at 2019 Commonwealth Chess Championship. Runner-up in FIDE-rated tournament with 693 participants. Best Player at IPSC U19 Championship (2022). Captained school and NUS university teams for 10+ years, leading NUS to Inter-Faculty Games victory.",
    tags: ["Chess", "Competition", "Leadership", "Strategy"],
    isCurrent: true,
  },
  {
    // Canonical description lives on the Donation Nation project record.
    slug: "donation-nation-founder",
    title: "Founder",
    organization: "Donation Nation",
    location: "New Delhi",
    dates: "Oct 2020 – Jan 2022",
    tags: ["Social Impact", "Logistics", "Operations"],
    projectSlug: "donation-nation",
  },
  {
    // Canonical description lives on the Pediatric Tendon Stapler project record.
    slug: "pediatric-tendon-stapler-designer",
    title: "Product Designer",
    organization: "Pediatric Tendon Stapler · NUS iDP",
    dates: "Jan 2025 – May 2025",
    tags: ["Medical Device", "UX Design", "Hardware Prototyping"],
    projectSlug: "pediatric-tendon-stapler",
  },
];
