"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Star,
  CalendarDays,
  Tag,
  ArrowLeft,
  Users,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { EventItem } from "@/types/event";
import { getEventById, getRelatedEvents } from "@/service/eventService";
import { formatCurrency, formatDate } from "@/lib/utils";
import { toast } from "sonner";
import { Search, SlidersHorizontal, ChevronLeft, ChevronRight } from "lucide-react";

import { useAuth } from "@/hooks/useAuth";
import { createBooking, hasUserBookedEvent } from "@/service/bookingService";
import BookingConfirmModal from "@/components/modals/BookingConfirmModal";

const reviews = [
  {
    name: "Sadia Islam",
    rating: 5,
    comment: "Absolutely worth it. Well organized and great atmosphere throughout.",
  },
  {
    name: "Rakib Hossain",
    rating: 4,
    comment: "Good experience overall, though check-in took a bit longer than expected.",
  },
  {
    name: "Mahin Chowdhury",
    rating: 5,
    comment: "One of the best events I've attended this year. Highly recommend.",
  },
];

export default function EventDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

 const { user } = useAuth();
  const [event, setEvent] = useState<EventItem | null | undefined>(undefined);
  const [related, setRelated] = useState<EventItem[]>([]);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);

const [alreadyBooked, setAlreadyBooked] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

useEffect(() => {
    const found = getEventById(id);
    setEvent(found ?? null);
    setActiveImage(0);
    if (found) {
      setRelated(getRelatedEvents(found.id, found.category));
      if (user?.email) {
        setAlreadyBooked(hasUserBookedEvent(user.email, found.id));
      }
    }
  }, [id, user]);

  const handleBookNowClick = () => {
    if (!user) {
      toast.error("Please login to book this event");
      router.push("/login");
      return;
    }
    setShowBookingModal(true);
  };

  const handleConfirmBooking = () => {
    if (!user?.email || !event) return;
    setBookingLoading(true);
    createBooking({
      eventId: event.id,
      eventTitle: event.title,
      eventImage: event.imageUrl,
      eventDate: event.date,
      eventLocation: event.location,
      price: event.price,
      userEmail: user.email,
    });
    setBookingLoading(false);
    setShowBookingModal(false);
    setAlreadyBooked(true);
    toast.success("Booking confirmed! View it in My Bookings.");
  };

  if (event === undefined) {
    return (
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-72 w-full rounded-xl" />
        <Skeleton className="h-32 w-full rounded-xl" />
      </div>
    );
  }

  if (event === null) {
    return (
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h1 className="text-2xl font-bold mb-3">Event Not Found</h1>
        <p className="text-muted-foreground mb-6">
          This event may have been removed or doesn&apos;t exist.
        </p>
     <Button render={<Link href="/events" />} nativeButton={false}>
  Back to Explore
</Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
      <Button
        variant="ghost"
        size="sm"
        className="mb-6"
        onClick={() => router.back()}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>

     <div className="mb-8">
        <div className="relative h-64 sm:h-96 w-full rounded-xl overflow-hidden bg-secondary">
          <Image
            src={(event.imageGallery ?? [event.imageUrl])[activeImage]}
            alt={event.title}
            fill
            className="object-cover"
          />
          <Badge className="absolute top-4 left-4">{event.category}</Badge>
        </div>

        {event.imageGallery && event.imageGallery.length > 1 && (
          <div className="flex gap-3 mt-3">
            {event.imageGallery.map((img, index) => (
              <button
                key={img}
                onClick={() => setActiveImage(index)}
                className={`relative h-16 w-24 sm:h-20 sm:w-28 rounded-lg overflow-hidden bg-secondary shrink-0 border-2 transition-colors ${
                  activeImage === index
                    ? "border-primary"
                    : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <Image
                  src={img}
                  alt={`${event.title} photo ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h1 className="text-3xl font-bold mb-3">{event.title}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-primary" /> {event.location}
              </span>
              <span className="flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4 text-primary" /> {formatDate(event.date)}
              </span>
              <span className="flex items-center gap-1.5">
                <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" /> {event.rating} rating
              </span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              {event.fullDescription ?? event.shortDescription}
            </p>
          </div>

          <Separator />

          <div>
            <h2 className="text-xl font-semibold mb-4">Key Details</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Card className="bg-card/50 border-border/50">
                <CardContent className="pt-6 text-center">
                  <Tag className="h-5 w-5 text-primary mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground mb-1">Category</p>
                  <p className="font-semibold text-sm">{event.category}</p>
                </CardContent>
              </Card>
              <Card className="bg-card/50 border-border/50">
                <CardContent className="pt-6 text-center">
                  <Users className="h-5 w-5 text-primary mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground mb-1">Priority</p>
                  <p className="font-semibold text-sm capitalize">
                    {event.priority ?? "medium"}
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-card/50 border-border/50">
                <CardContent className="pt-6 text-center">
                  <Clock className="h-5 w-5 text-primary mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground mb-1">Date</p>
                  <p className="font-semibold text-sm">{formatDate(event.date)}</p>
                </CardContent>
              </Card>
              <Card className="bg-card/50 border-border/50">
                <CardContent className="pt-6 text-center">
                  <MapPin className="h-5 w-5 text-primary mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground mb-1">Location</p>
                  <p className="font-semibold text-sm">{event.location}</p>
                </CardContent>
              </Card>
            </div>
          </div>

          <Separator />

          <div>
            <h2 className="text-xl font-semibold mb-4">
              Ratings & Reviews
            </h2>
            <div className="space-y-4">
              {reviews.map((r) => (
                <Card key={r.name} className="bg-card/50 border-border/50">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-2">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className="bg-primary/20 text-primary text-xs">
                          {r.name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-semibold">{r.name}</p>
                        <div className="flex">
                          {Array.from({ length: r.rating }).map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{r.comment}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div>
          <Card className="sticky top-24 border-border/50 bg-card/50">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-1">Price per ticket</p>
              <p className="text-3xl font-bold text-primary mb-6">
                {formatCurrency(event.price)}
              </p>
          <Button
                className="w-full h-11 mb-3"
                onClick={handleBookNowClick}
                disabled={alreadyBooked}
              >
                {alreadyBooked ? "Already Booked" : "Book Now"}
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                Free cancellation up to 48 hours before the event
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {related.length > 0 && (

        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Related Events</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {related.map((r) => (
              <Link key={r.id} href={`/events/${r.id}`}>
                <Card className="overflow-hidden border-border/50 bg-card/50 hover:border-primary/50 transition-colors pt-0">
                  <div className="relative h-36 w-full bg-secondary">
                    <Image src={r.imageUrl} alt={r.title} fill className="object-cover" />
                  </div>
                  <CardContent className="pt-4">
                    <h3 className="font-semibold text-sm line-clamp-1 mb-1">
                      {r.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">{r.location}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}

<BookingConfirmModal
        event={showBookingModal ? event : null}
        onClose={() => setShowBookingModal(false)}
        onConfirm={handleConfirmBooking}
        loading={bookingLoading}
      />
    </div>
  );
}

    