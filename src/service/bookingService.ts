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
  const index = bookings.findIndex((b) => b.id === id);
  if (index === -1) return false;
  bookings[index].status = "cancelled";
  saveAll(bookings);
  return true;
}

export function hasUserBookedEvent(email: string, eventId: string): boolean {
  return getAll().some(
    (b) =>
      b.userEmail === email && b.eventId === eventId && b.status === "confirmed"
  );
}