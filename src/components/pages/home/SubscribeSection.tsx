"use client";

import { useState } from "react";
import { Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function SubscribeSection() {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (!email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    toast.success("Subscribed! You'll hear from us soon.");
    setEmail("");
  };

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="rounded-2xl gradient-hero border border-border/50 px-6 py-14 sm:px-16 text-center">
        <Mail className="h-8 w-8 text-primary mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-3">Never Miss an Event</h2>
        <p className="text-muted-foreground max-w-md mx-auto mb-8">
          Subscribe to get weekly updates on new events across Bangladesh
          delivered straight to your inbox.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="you@example.com"
            className="h-12"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
          />
          <Button size="lg" className="h-12" onClick={handleSubscribe}>
            Subscribe <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}