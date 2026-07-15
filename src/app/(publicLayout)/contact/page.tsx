"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export default function ContactPage() {
  const router = useRouter();
  const [form, setForm] = useState<ContactForm>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Partial<ContactForm>>({});
  const [loading, setLoading] = useState(false);

  const validate = (): boolean => {
    const newErrors: Partial<ContactForm> = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!form.message.trim() || form.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setTimeout(() => {
      toast.success("Message sent! We'll get back to you shortly.");
      setForm({ name: "", email: "", message: "" });
      setLoading(false);
    }, 800);
  };

return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
      <Button
        variant="ghost"
        size="sm"
        className="mb-6"
        onClick={() => router.back()}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>

      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>

        <p className="text-muted-foreground max-w-xl mx-auto">
          Have a question, partnership idea, or feedback? We&apos;d love to hear from you.
        </p>
      </div>
      

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-4">
          <Card className="border-border/50 bg-card/50">
            <CardContent className="pt-6 flex items-start gap-3">
              <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sm mb-1">Location</p>
                <p className="text-sm text-muted-foreground">
                  Chittagong, Bangladesh
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/50 bg-card/50">
            <CardContent className="pt-6 flex items-start gap-3">
              <Phone className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sm mb-1">Phone</p>
                <p className="text-sm text-muted-foreground">+880 1XXX-XXXXXX</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/50 bg-card/50">
            <CardContent className="pt-6 flex items-start gap-3">
              <Mail className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sm mb-1">Email</p>
                <p className="text-sm text-muted-foreground">hello@eventsphere.com</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="border-border/50 bg-card/50">
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                    {errors.name && (
                      <p className="text-xs text-destructive">{errors.name}</p>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                    {errors.email && (
                      <p className="text-xs text-destructive">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us how we can help..."
                    rows={6}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                  {errors.message && (
                    <p className="text-xs text-destructive">{errors.message}</p>
                  )}
                </div>

                <Button type="submit" className="w-full sm:w-auto h-11" disabled={loading}>
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" /> Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}