import { Badge } from "@/components/ui/badge";

interface LeadershipItem {
  title: string;
  organization: string;
  dates: string;
  description: string;
  tags: string[];
}

interface LeadershipCardProps {
  leadership: LeadershipItem;
}

function LeadershipCard({ leadership }: LeadershipCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-100 p-8">
      <h3 className="text-xl font-bold text-slate-800 mb-3">
        {leadership.title}
      </h3>
      
      <div className="mb-4">
        <span className="text-slate-600 text-sm font-medium">{leadership.organization}</span>
        <span className="text-slate-400 text-sm mx-2">•</span>
        <span className="text-slate-500 text-sm">{leadership.dates}</span>
      </div>
      
      <p className="text-slate-700 leading-relaxed mb-6 text-sm">
        {leadership.description}
      </p>
      
      <div className="flex flex-wrap gap-2">
        {leadership.tags.map((tag, index) => (
          <Badge 
            key={index}
            variant="secondary"
            className="bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs"
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
      title: "Operations Executive",
      organization: "NUS Entrepreneurship Society (NES)",
      dates: "May 2025 – Present",
      description: "Supporting CatalystX, NES's flagship incubation program, by managing operations, logistics, and program coordination. Helping student founders turn ideas into impact within a vibrant innovation community.",
      tags: ["Student Leadership", "Startup Ecosystem", "Event Ops"]
    },
    {
      title: "Human Resource Associate",
      organization: "NUS Student Union (NUSSU)",
      dates: "Nov 2024 – Present",
      description: "Contributed significantly to the hiring and onboarding process for the next executive committee. Facilitated well-being check-ins and engagement initiatives across the university's apex student body.",
      tags: ["Student Governance", "HR", "Community Building"]
    },
    {
      title: "Mentor",
      organization: "Teach Singapore",
      dates: "Sep 2024 – Dec 2024",
      description: "Mentored underprivileged students through academic support and enrichment activities, leading to improved confidence and learning outcomes in underserved communities.",
      tags: ["Mentorship", "Education", "Community Service"]
    }
  ];

  return (
    <section id="leadership" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Student Leadership & Involvement
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Leadership roles and community involvement focused on student development, 
            entrepreneurship, and social impact
          </p>
        </div>

        {/* Leadership Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {leadershipItems.map((leadership, index) => (
            <LeadershipCard 
              key={index}
              leadership={leadership}
            />
          ))}
        </div>
      </div>
    </section>
  );
}