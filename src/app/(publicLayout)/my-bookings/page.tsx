"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, MapPin, CalendarDays, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuthGuard } from "@/hooks/authGuard";
import { useRouter } from "next/navigation";
import { Booking } from "@/types/booking";
import { getUserBookings, cancelBooking } from "@/service/bookingService";
import { formatCurrency, formatDate } from "@/lib/utils";
import CancelBookingModal from "@/components/modals/CancelBookingModal";
import { toast } from "sonner";
import Spinner from "@/components/elements/Spinner";
import { Skeleton } from "@/components/ui/skeleton";

export default function MyBookingsPage() {
  const { user, loading } = useAuthGuard();
  const router = useRouter();

const [bookings, setBookings] = useState<Booking[]>([]);
  const [cancelTarget, setCancelTarget] = useState<Booking | null>(null);
  const [dataLoading, setDataLoading] = useState(true);

 useEffect(() => {
    if (user?.email) {
      setBookings(getUserBookings(user.email));
      setDataLoading(false);
    }
  }, [user]);

  if (loading || !user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const handleCancelConfirm = () => {
    if (!cancelTarget) return;
    const success = cancelBooking(cancelTarget.id);
    if (success && user.email) {
      setBookings(getUserBookings(user.email));
      toast.success("Booking cancelled successfully");
    } else {
      toast.error("Failed to cancel booking");
    }
    setCancelTarget(null);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <Button
        variant="ghost"
        size="sm"
        className="mb-6"
        onClick={() => router.back()}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Bookings</h1>
        <p className="text-muted-foreground">
          {bookings.length} booking{bookings.length !== 1 ? "s" : ""} found
        </p>
      </div>

     {dataLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-xl" />
          ))}
        </div>
      ) : bookings.length === 0 ? (

        <div className="text-center py-20">
          <Ticket className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground mb-6">
            You haven&apos;t booked any events yet.
          </p>
          <Button render={<Link href="/events" />} nativeButton={false}>
            Explore Events
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <Card key={booking.id} className="border-border/50 bg-card/50">
              <CardContent className="pt-6 flex flex-col sm:flex-row gap-4">
                <div className="relative h-24 w-full sm:w-36 rounded-lg overflow-hidden bg-secondary shrink-0">
                  <Image
                    src={booking.eventImage}
                    alt={booking.eventTitle}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1">

                 <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold">{booking.eventTitle}</h3>
                    <Badge>Confirmed</Badge>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                    <span className="flex items-center gap-1.5">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {formatDate(booking.eventDate)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5" />
                      {booking.eventLocation}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-primary">
                      {formatCurrency(booking.price)}
                    </span>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        render={<Link href={`/events/${booking.eventId}`} />}
                        nativeButton={false}
                      >
                        View Event
                      </Button>
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => setCancelTarget(booking)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <CancelBookingModal
        booking={cancelTarget}
        onClose={() => setCancelTarget(null)}
        onConfirm={handleCancelConfirm}
      />
    </div>
  );
}