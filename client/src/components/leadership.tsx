import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";

interface LeadershipItem {
  title: string;
  organization: string;
  location?: string;
  dates: string;
  description: string;
  tags: string[];
  isCurrent?: boolean;
}

function LeadershipCard({ leadership }: { leadership: LeadershipItem }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-100 dark:border-slate-700 p-7 flex flex-col">
      {/* Title + Current badge */}
      <div className="flex items-start gap-2 flex-wrap mb-1">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white leading-snug">
          {leadership.title}
        </h3>
        {leadership.isCurrent && (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 border border-green-200 dark:border-green-800 shrink-0 mt-0.5">
            Current
          </span>
        )}
      </div>

      {/* Org + location + dates */}
      <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm mb-4">
        <span className="font-medium text-slate-600 dark:text-slate-300">{leadership.organization}</span>
        {leadership.location && (
          <>
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-slate-500 dark:text-slate-400">{leadership.location}</span>
          </>
        )}
        <span className="text-slate-400 dark:text-slate-500">·</span>
        <span className="text-slate-500 dark:text-slate-400">{leadership.dates}</span>
      </div>

      <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm mb-5 flex-1">
        {leadership.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {leadership.tags.map((tag, i) => (
          <Badge
            key={i}
            variant="secondary"
            className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 text-xs"
          >
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
}

export default function Leadership() {
  const leadershipItems: LeadershipItem[] = [
    {
      title: "Director of Human Resources",
      organization: "NUS Student Union (NUSSU)",
      dates: "Nov 2024 – Present",
      description:
        "Leading people operations for NUS's apex student body. Designed onboarding and feedback systems supporting 100+ student leaders across cross-functional teams. Facilitated well-being check-ins and engagement initiatives to strengthen organizational culture.",
      tags: ["Student Governance", "HR", "Community Building"],
      isCurrent: true,
    },
    {
      title: "Operations Executive",
      organization: "NUS Entrepreneurship Society (NES)",
      dates: "May 2025 – Present",
      description:
        "Supporting CatalystX, NES's flagship incubation program, by managing operations, logistics, and program coordination. Helping student founders turn ideas into impact within a vibrant innovation community.",
      tags: ["Student Leadership", "Startup Ecosystem", "Event Ops"],
      isCurrent: true,
    },
    {
      title: "Professional Chess Player & Team Captain",
      organization: "India / NUS",
      dates: "Apr 2013 – Present",
      description:
        "Represented India at 2019 Commonwealth Chess Championship. Runner-up in FIDE-rated tournament with 693 participants. Best Player at IPSC U19 Championship (2022). Captained school and NUS university teams for 10+ years, leading NUS to Inter-Faculty Games victory.",
      tags: ["Chess", "Competition", "Leadership", "Strategy"],
      isCurrent: true,
    },
    {
      title: "Founder",
      organization: "Donation Nation",
      location: "New Delhi",
      dates: "Oct 2020 – Jan 2022",
      description:
        "Founded a grassroots donation platform during COVID-19 to connect donors directly with NGOs. Coordinated logistics partners across multiple drives to deliver essential supplies to underserved communities across India.",
      tags: ["Social Impact", "Logistics", "Operations"],
    },
    {
      title: "Product Designer",
      organization: "Pediatric Tendon Stapler · NUS iDP",
      dates: "Jan 2025 – May 2025",
      description:
        "Co-designed and prototyped an ergonomic one-handed surgical stapler for pediatric tendon repair. Translated clinical user needs into design constraints, iterated with medical stakeholders, and presented final prototype at NUS iDP showcase.",
      tags: ["Medical Device", "UX Design", "Hardware Prototyping"],
    },
  ];

  return (
    <section id="leadership" className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
            Leadership &amp; Involvement
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Student governance, competitive chess, entrepreneurship, and social impact
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {leadershipItems.map((item, index) => (
            <LeadershipCard key={index} leadership={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
