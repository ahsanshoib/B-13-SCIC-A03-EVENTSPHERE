"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EventItem } from "@/types/event";
import { getAllEvents } from "@/service/eventService";
import { formatCurrency } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export default function EventsSection() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setEvents(getAllEvents().slice(0, 4));
    setLoading(false);
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex items-end justify-between mb-10">
        <div>
          <h2 className="text-3xl font-bold mb-2">Featured Events</h2>
          <p className="text-muted-foreground">
            Handpicked experiences happening soon
          </p>
        </div>

        <Button variant="ghost" render={<Link href="/events" />}
        nativeButton={false}
        className="hidden sm:flex">
  View All <ArrowRight className="ml-2 h-4 w-4" />
</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-80 rounded-xl" />
            ))
          : events.map((event) => (
              <Card
                key={event.id}
                className="overflow-hidden border-border/50 bg-card/50 hover:border-primary/50 transition-colors pt-0 flex flex-col"
              >
                <div className="relative h-40 w-full bg-secondary">
                  <Image
                    src={event.imageUrl}
                    alt={event.title}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                  <Badge className="absolute top-3 left-3">{event.category}</Badge>
                </div>
                <CardContent className="flex-1">
                  <h3 className="font-semibold line-clamp-1 mb-1">{event.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {event.shortDescription}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5" /> {event.location}
                    </span>
                    <span className="flex items-center gap-1 text-yellow-500">
                      <Star className="h-3.5 w-3.5 fill-yellow-500" /> {event.rating}
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between border-t border-border/50 pt-4">
                  <span className="font-bold text-primary">
                    {formatCurrency(event.price)}
                  </span>
                <Button size="sm" render={<Link href={`/events/${event.id}`} />}nativeButton={false}>
  View Details
</Button>
                </CardFooter>
              </Card>
            ))}
      </div>
    </section>
  );
}