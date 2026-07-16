import { Award, Landmark, TentTree, UtensilsCrossed } from "lucide-react";

const highlights = [
  {
    icon: Landmark,
    title: "Cultural Heritage",
    description:
      "From Jamdani weaving in Rajshahi to tea gardens in Sylhet, experience the traditions that define Bangladesh.",
  },
  {
    icon: UtensilsCrossed,
    title: "Culinary Journeys",
    description:
      "Taste iconic street food and regional delicacies at food carnivals hosted across the country's biggest cities.",
  },
  {
    icon: TentTree,
    title: "Outdoor Adventures",
    description:
      "Camp near national parks, walk the Sundarbans mangroves, or run along Cox's Bazar's endless coastline.",
  },
  {
    icon: Award,
    title: "Award-Winning Events",
    description:
      "Many of our listed events are recognized by local tourism boards for outstanding organization and impact.",
  },
];

export default function HighlightsSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-3">Highlights</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          What makes events on EventSphere worth traveling for.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {highlights.map((item) => (
          <div
            key={item.title}
            className="flex gap-4 p-5 rounded-xl border border-border/50 bg-card/50 hover:border-primary/50 transition-colors"
          >
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <item.icon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-1.5">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}