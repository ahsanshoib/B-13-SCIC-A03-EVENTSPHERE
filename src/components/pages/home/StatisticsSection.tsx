import { CalendarDays, Users, MapPin, Star } from "lucide-react";

const stats = [
  { icon: CalendarDays, value: "12+", label: "Events Listed" },
  { icon: Users, value: "3,200+", label: "Attendees Served" },
  { icon: MapPin, value: "10+", label: "Cities Covered" },
  { icon: Star, value: "4.7", label: "Average Rating" },
];

export default function StatisticsSection() {
  return (
    <section className="border-y border-border/50 bg-card/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <stat.icon className="h-6 w-6 text-primary mx-auto mb-3" />
            <p className="text-3xl font-bold">{stat.value}</p>
            <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}