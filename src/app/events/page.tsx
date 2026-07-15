"use client";

import { useEffect, useState, useMemo, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, MapPin, Star, SlidersHorizontal, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EventItem, eventCategories, eventLocations } from "@/types/event";
import { getAllEvents } from "@/service/eventService";
import { formatCurrency } from "@/lib/utils";

type SortOption = "date-asc" | "price-asc" | "price-desc" | "rating-desc";
const sortLabels: Record<SortOption, string> = {
  "date-asc": "Date: Upcoming",
  "price-asc": "Price: Low to High",
  "price-desc": "Price: High to Low",
  "rating-desc": "Rating: Highest",
};

const PAGE_SIZE = 8;

function EventsPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const [category, setCategory] = useState(searchParams.get("category") ?? "all");
  const [location, setLocation] = useState("all");
  const [sort, setSort] = useState<SortOption>("date-asc");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setEvents(getAllEvents());
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const filtered = useMemo(() => {
    let result = [...events];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.location.toLowerCase().includes(q) ||
          e.category.toLowerCase().includes(q)
      );
    }

    if (category !== "all") {
      result = result.filter((e) => e.category === category);
    }

    if (location !== "all") {
      result = result.filter((e) => e.location === location);
    }

    switch (sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating-desc":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        result.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
    }

    return result;
  }, [events, search, category, location, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search, category, location, sort]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <Button
        variant="ghost"
        size="sm"
        className="mb-4"
        onClick={() => router.back()}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Explore Events</h1>
        <p className="text-muted-foreground">
          {loading ? "Loading events..." : `${filtered.length} events found`}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 mb-10">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by title, city, or category..."
            className="pl-9 h-11"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <Select value={category} onValueChange={(v) => setCategory(v ?? "all")}>
          <SelectTrigger className="h-11 w-full lg:w-48">
            <SelectValue placeholder="Category">
              {category === "all" ? "All Categories" : category}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {eventCategories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={location} onValueChange={(v) => setLocation(v ?? "all")}>
          <SelectTrigger className="h-11 w-full lg:w-48">
            <SelectValue placeholder="Location">
              {location === "all" ? "All Locations" : location}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            {eventLocations.map((loc) => (
              <SelectItem key={loc} value={loc}>
                {loc}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sort} onValueChange={(v) => setSort(v as SortOption)}>
          <SelectTrigger className="h-11 w-full lg:w-52">
            <SlidersHorizontal className="h-4 w-4 mr-1" />
            <SelectValue placeholder="Sort by">{sortLabels[sort]}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date-asc">Date: Upcoming</SelectItem>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
            <SelectItem value="rating-desc">Rating: Highest</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-80 rounded-xl" />
          ))
        ) : filtered.length === 0 ? (
          <div className="col-span-full text-center py-16 text-muted-foreground">
            No events match your filters. Try adjusting your search.
          </div>
        ) : (
          paginated.map((event) => (
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
                <Button
                  size="sm"
                  render={<Link href={`/events/${event.id}`} />}
                  nativeButton={false}
                >
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>

      {!loading && filtered.length > 0 && totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-10">
          <Button
            variant="outline"
            size="icon"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {Array.from({ length: totalPages }).map((_, i) => (
            <Button
              key={i}
              variant={currentPage === i + 1 ? "default" : "outline"}
              size="icon"
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </Button>
          ))}

          <Button
            variant="outline"
            size="icon"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}

export default function EventsPage() {
  return (
    <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
      <EventsPageContent />
    </Suspense>
  );
}