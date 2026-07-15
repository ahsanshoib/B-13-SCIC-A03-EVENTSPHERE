import { Booking } from "@/types/booking";

const STORAGE_KEY = "eventsphere_bookings";

function getAll(): Booking[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? (JSON.parse(raw) as Booking[]) : [];
}

function saveAll(bookings: Booking[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
}

export function getUserBookings(email: string): Booking[] {
  return getAll()
    .filter((b) => b.userEmail === email)
    .sort(
      (a, b) => new Date(b.bookedAt).getTime() - new Date(a.bookedAt).getTime()
    );
}

export function createBooking(
  data: Omit<Booking, "id" | "bookedAt" | "status">
): Booking {
  const bookings = getAll();
  const newBooking: Booking = {
    ...data,
    id: Date.now().toString(),
    bookedAt: new Date().toISOString(),
    status: "confirmed",
  };
  saveAll([newBooking, ...bookings]);
  return newBooking;
}

export function cancelBooking(id: string): boolean {
  const bookings = getAll();
  const filtered = bookings.filter((b) => b.id !== id);
  if (filtered.length === bookings.length) return false;
  saveAll(filtered);
  return true;
}

export function hasUserBookedEvent(email: string, eventId: string): boolean {
  return getAll().some(
    (b) =>
      b.userEmail === email && b.eventId === eventId && b.status === "confirmed"
  );
}

export function getAllBookings(): Booking[] {
  return getAll();
}

export function getBookingStats() {
  const bookings = getAll();
  const totalBookings = bookings.length;
  const totalRevenue = bookings.reduce((sum, b) => sum + b.price, 0);
  const uniqueUsers = new Set(bookings.map((b) => b.userEmail)).size;

  const eventCounts = new Map<string, { title: string; count: number }>();
  bookings.forEach((b) => {
    const existing = eventCounts.get(b.eventId);
    if (existing) {
      existing.count += 1;
    } else {
      eventCounts.set(b.eventId, { title: b.eventTitle, count: 1 });
    }
  });

  const topEvents = Array.from(eventCounts.values())
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return { totalBookings, totalRevenue, uniqueUsers, topEvents };
}