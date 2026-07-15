"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { EventItem } from "@/types/event";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface BookingConfirmModalProps {
  event: EventItem | null;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
}

export default function BookingConfirmModal({
  event,
  onClose,
  onConfirm,
  loading,
}: BookingConfirmModalProps) {
  return (
    <Dialog open={!!event} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Booking</DialogTitle>
          <DialogDescription>
            You&apos;re about to book{" "}
            <span className="font-semibold text-foreground">{event?.title}</span>{" "}
            on {event ? formatDate(event.date) : ""} for{" "}
            <span className="font-semibold text-foreground">
              {event ? formatCurrency(event.price) : ""}
            </span>
            .
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onConfirm} disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Confirm Booking"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}