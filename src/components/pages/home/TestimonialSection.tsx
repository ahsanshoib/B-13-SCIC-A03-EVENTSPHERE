import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Khaled Saifullah",
    role: "Software Engineer, Dhaka",
    quote:
      "Booked the Tech Summit through EventSphere and the whole process took under two minutes. Clean, fast, and reliable.",
    rating: 5,
  },
  {
    name: "Jinnat Raisa",
    role: "Marathon Runner, Chittagong",
    quote:
      "Found the Beach Marathon here and loved how detailed the event page was — location, pricing, everything upfront.",
    rating: 5,
  },
  {
    name: "Tanzirul Islam",
    role: "Photographer, Khulna",
    quote:
      "The Sundarbans photography meet exceeded expectations. EventSphere made discovery and registration effortless.",
    rating: 4,
  },
];

export default function TestimonialSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-3">What Attendees Say</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Real experiences from people who found their events through us.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <Card key={t.name} className="border-border/50 bg-card/50">
            <CardContent className="pt-6">
              <Quote className="h-6 w-6 text-primary/50 mb-3" />
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                {t.quote}
              </p>
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary/20 text-primary text-sm">
                    {t.name.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
                <div className="ml-auto flex">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}