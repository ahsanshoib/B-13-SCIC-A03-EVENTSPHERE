"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, DollarSign, ImageIcon, Loader2, MapPin, Tag, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addEvent } from "@/service/eventService";
import { useAuth } from "@/hooks/useAuth";
import { eventCategories } from "@/types/event";
import { toast } from "sonner";

interface FormState {
  title: string;
  shortDescription: string;
  fullDescription: string;
  price: string;
  date: string;
  priority: "low" | "medium" | "high";
  location: string;
  category: string;
  imageUrl: string;
}

const initialState: FormState = {
  title: "",
  shortDescription: "",
  fullDescription: "",
  price: "",
  date: "",
  priority: "medium",
  location: "",
  category: "",
  imageUrl: "",
};

export default function AddEventPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormState, string>> = {};
    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.shortDescription.trim())
      newErrors.shortDescription = "Short description is required";
    if (!form.fullDescription.trim())
      newErrors.fullDescription = "Full description is required";
    if (!form.price || Number(form.price) <= 0)
      newErrors.price = "Enter a valid price";
    if (!form.date) newErrors.date = "Date is required";
    if (!form.location.trim()) newErrors.location = "Location is required";
    if (!form.category.trim()) newErrors.category = "Category is required";
    if (!form.imageUrl.trim()) newErrors.imageUrl = "Image URL is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await addEvent({
        title: form.title,
        shortDescription: form.shortDescription,
        fullDescription: form.fullDescription,
        price: Number(form.price),
        date: form.date,
        rating: 0,
        location: form.location,
        category: form.category,
        imageUrl: form.imageUrl,
        priority: form.priority,
        createdBy: user?.email ?? undefined,
      });
      toast.success("Event added successfully!");
      router.push("/items/manage");
    } catch {
      toast.error("Failed to add event. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-12">
      <Button
        variant="ghost"
        size="sm"
        className="mb-6"
        onClick={() => router.back()}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Add New Event</h1>
        <p className="text-muted-foreground">
          Fill in the details below to publish a new event listing
        </p>
      </div>

      <Card className="border-border/50 bg-card/50">
        <CardHeader />
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="title">Event Title</Label>
              <Input
                id="title"
                placeholder="e.g. Dhaka Tech Summit 2026"
                value={form.title}
                onChange={(e) => handleChange("title", e.target.value)}
              />
              {errors.title && <p className="text-xs text-destructive">{errors.title}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="shortDescription">Short Description</Label>
              <Input
                id="shortDescription"
                placeholder="A brief one-line summary"
                value={form.shortDescription}
                onChange={(e) => handleChange("shortDescription", e.target.value)}
              />
              {errors.shortDescription && (
                <p className="text-xs text-destructive">{errors.shortDescription}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="fullDescription">Full Description</Label>
              <Textarea
                id="fullDescription"
                placeholder="Detailed description of the event"
                rows={5}
                value={form.fullDescription}
                onChange={(e) => handleChange("fullDescription", e.target.value)}
              />
              {errors.fullDescription && (
                <p className="text-xs text-destructive">{errors.fullDescription}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="price">Price (BDT)</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="price"
                    type="number"
                    placeholder="1500"
                    className="pl-9"
                    value={form.price}
                    onChange={(e) => handleChange("price", e.target.value)}
                  />
                </div>
                {errors.price && <p className="text-xs text-destructive">{errors.price}</p>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="date">Event Date</Label>
                <div className="relative">
                  <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="date"
                    type="date"
                    className="pl-9"
                    value={form.date}
                    onChange={(e) => handleChange("date", e.target.value)}
                  />
                </div>
                {errors.date && <p className="text-xs text-destructive">{errors.date}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="location">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="location"
                    placeholder="e.g. Dhaka"
                    className="pl-9"
                    value={form.location}
                    onChange={(e) => handleChange("location", e.target.value)}
                  />
                </div>
                {errors.location && (
                  <p className="text-xs text-destructive">{errors.location}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="category">Category</Label>
                <div className="relative">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
                  <Input
                    id="category"
                    placeholder="e.g. Technology"
                    className="pl-9"
                    value={form.category}
                    onChange={(e) => handleChange("category", e.target.value)}
                    list="category-suggestions"
                  />
                  <datalist id="category-suggestions">
                    {eventCategories.map((cat) => (
                      <option key={cat} value={cat} />
                    ))}
                  </datalist>
                </div>
                {errors.category && (
                  <p className="text-xs text-destructive">{errors.category}</p>
                )}
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={form.priority}
                onValueChange={(v) => handleChange("priority", v ?? "medium")}
              >
                <SelectTrigger id="priority" className="w-full">
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
              <Label htmlFor="imageUrl">Image URL</Label>
              <div className="relative">
                <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="imageUrl"
                  placeholder="/event-1.jpg or https://..."
                  className="pl-9"
                  value={form.imageUrl}
                  onChange={(e) => handleChange("imageUrl", e.target.value)}
                />
              </div>
              {errors.imageUrl && (
                <p className="text-xs text-destructive">{errors.imageUrl}</p>
              )}
            </div>

            <Button type="submit" className="w-full h-11" disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Publish Event"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}