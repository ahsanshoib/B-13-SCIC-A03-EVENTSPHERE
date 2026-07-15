"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Eye, Trash2, Plus,Pencil, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EventItem } from "@/types/event";
import { getAllEvents, deleteEvent,updateEvent } from "@/service/eventService";
import { formatCurrency, formatDate } from "@/lib/utils";
import DeleteEventModal from "@/components/modals/DeleteEventModal";
import updateEventModal from "@/components/modals/UpdateEventModal";
import { toast } from "sonner";
import UpdateEventModal from "@/components/modals/UpdateEventModal";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";


export default function ManageEventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<EventItem | null>(null);
  const [editTarget, setEditTarget] = useState<EventItem | null>(null);
  const {isAdmin} = useAuth();

  useEffect(() => {
    setEvents(getAllEvents());
    setLoading(false);
  }, []);

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;
    const success = deleteEvent(deleteTarget.id);
    if (success) {
      setEvents((prev) => prev.filter((e) => e.id !== deleteTarget.id));
      toast.success("Event deleted successfully");
    } else {
      toast.error("Failed to delete event");
    }
    setDeleteTarget(null);
  };

  const handleUpdateConfirm = (id: string, updates: Partial<EventItem>) => {
    const updated = updateEvent(id, updates);
    if (updated) {
      setEvents((prev) => prev.map((e) => (e.id === id ? updated : e)));
      toast.success("Event updated successfully");
    } else {
      toast.error("Failed to update event");
    }
    setEditTarget(null);
  };

return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <Button
        variant="ghost"
        size="sm"
        className="mb-6"
        onClick={() => router.back()}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">


        <div>
          <h1 className="text-3xl font-bold mb-2">Manage Events</h1>
          <p className="text-muted-foreground">
            {loading ? "Loading..." : `${events.length} events listed`}
          </p>
        </div>
      <Button render={<Link href="/items/add" />} nativeButton={false}>
  <Plus className="mr-2 h-4 w-4" /> Add Event
</Button>
      </div>

      <div className="rounded-xl border border-border/50 bg-card/50 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Event</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                  Loading events...
                </TableCell>
              </TableRow>
            ) : events.length === 0 ? (
              <TableRow>

                <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                  No events yet. Add your first event to get started.
                </TableCell>
              </TableRow>
            ) : (
              events.map((event) => (
                <TableRow key={event.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-14 rounded-md overflow-hidden bg-secondary shrink-0">
                        <Image
                          src={event.imageUrl}
                          alt={event.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="font-medium text-sm line-clamp-1">
                        {event.title}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{event.category}</Badge>
                  </TableCell>

                  <TableCell className="text-sm text-muted-foreground">
  {formatDate(event.date)}
</TableCell>

                  <TableCell className="text-sm text-muted-foreground">
                    {event.location}
                  </TableCell>
                  <TableCell className="text-sm font-semibold text-primary">
                    {formatCurrency(event.price)}
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" render={<Link href={`/events/${event.id}`} />} nativeButton={false}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setEditTarget(event)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>

             <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        onClick={() => setDeleteTarget(event)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>

                    </div>
                  </TableCell>



                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <DeleteEventModal
        event={deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
      />


        <UpdateEventModal
        event={editTarget}
        onClose={() => setEditTarget(null)}
        onConfirm={handleUpdateConfirm}
      />

    </div>
  );
}