"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EventItem, eventCategories } from "@/types/event";
import { Loader2 } from "lucide-react";

interface UpdateEventModalProps {
  event: EventItem | null;
  onClose: () => void;
  onConfirm: (id: string, updates: Partial<EventItem>) => void;
}

export default function UpdateEventModal({
  event,
  onClose,
  onConfirm,
}: UpdateEventModalProps) {
  const [form, setForm] = useState({
    title: "",
    shortDescription: "",
    price: "",
    date: "",
    location: "",
    category: "",
    imageUrl: "",
    priority: "medium" as "low" | "medium" | "high",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (event) {
      setForm({
        title: event.title,
        shortDescription: event.shortDescription,
        price: String(event.price),
        date: event.date,
        location: event.location,
        category: event.category,
        imageUrl: event.imageUrl,
        priority: event.priority ?? "medium",
      });
    }
  }, [event]);

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!event) return;
    setSaving(true);
    onConfirm(event.id, {
      title: form.title,
      shortDescription: form.shortDescription,
      price: Number(form.price),
      date: form.date,
      location: form.location,
      category: form.category,
      imageUrl: form.imageUrl,
      priority: form.priority,
    });
    setSaving(false);
  };

  return (
    <Dialog open={!!event} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Update Event</DialogTitle>
          <DialogDescription>
            Edit the details for{" "}
            <span className="font-semibold text-foreground">{event?.title}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label htmlFor="edit-title">Title</Label>
            <Input
              id="edit-title"
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="edit-shortDescription">Short Description</Label>
            <Textarea
              id="edit-shortDescription"
              rows={3}
              value={form.shortDescription}
              onChange={(e) => handleChange("shortDescription", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="edit-price">Price (BDT)</Label>
              <Input
                id="edit-price"
                type="number"
                value={form.price}
                onChange={(e) => handleChange("price", e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="edit-date">Date</Label>
              <Input
                id="edit-date"
                type="date"
                value={form.date}
                onChange={(e) => handleChange("date", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="edit-location">Location</Label>
              <Input
                id="edit-location"
                value={form.location}
                onChange={(e) => handleChange("location", e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="edit-category">Category</Label>
              <Input
                id="edit-category"
                value={form.category}
                onChange={(e) => handleChange("category", e.target.value)}
                list="edit-cat-suggestions"
              />
              <datalist id="edit-cat-suggestions">
                {eventCategories.map((cat) => (
                  <option key={cat} value={cat} />
                ))}
              </datalist>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="edit-priority">Priority</Label>
            <Select
              value={form.priority}
              onValueChange={(v) => handleChange("priority", v ?? "medium")}
            >
              <SelectTrigger id="edit-priority" className="w-full">
                <SelectValue>{form.priority}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="edit-imageUrl">Image URL</Label>
            <Input
              id="edit-imageUrl"
              value={form.imageUrl}
              onChange={(e) => handleChange("imageUrl", e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}