export interface Booking {
  id: string;
  eventId: string;
  eventTitle: string;
  eventImage: string;
  eventDate: string;
  eventLocation: string;
  price: number;
  userEmail: string;
  bookedAt: string;
  status: "confirmed" | "cancelled";
}