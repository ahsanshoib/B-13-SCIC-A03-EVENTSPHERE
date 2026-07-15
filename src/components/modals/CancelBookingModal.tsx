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
import { Booking } from "@/types/booking";

interface CancelBookingModalProps {
  booking: Booking | null;
  onClose: () => void;
  onConfirm: () => void;
}

export default function CancelBookingModal({
  booking,
  onClose,
  onConfirm,
}: CancelBookingModalProps) {
  return (
    <Dialog open={!!booking} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cancel Booking</DialogTitle>
          <DialogDescription>
            Are you sure you want to cancel your booking for{" "}
            <span className="font-semibold text-foreground">
              {booking?.eventTitle}
            </span>
            ? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Keep Booking
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Cancel Booking
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}