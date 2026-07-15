import { Ticket, ShieldCheck, MapPinned, BellRing } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    icon: Ticket,
    title: "Easy Booking",
    description: "Reserve your spot in seconds with a streamlined checkout flow.",
  },
  {
    icon: ShieldCheck,
    title: "Verified Events",
    description: "Every listing is reviewed to ensure authenticity and quality.",
  },
  {
    icon: MapPinned,
    title: "Nationwide Coverage",
    description: "Events across all major cities and districts in Bangladesh.",
  },
  {
    icon: BellRing,
    title: "Live Updates",
    description: "Get notified instantly about schedule changes or new events.",
  },
];

export default function ServiceSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-3">Why Choose EventSphere</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Everything you need to find, evaluate, and attend the best events near you.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service) => (
          <Card key={service.title} className="border-border/50 bg-card/50 hover:border-primary/50 transition-colors">
            <CardContent className="pt-6">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <service.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{service.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}