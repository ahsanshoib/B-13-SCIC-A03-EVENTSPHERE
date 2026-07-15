"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "How do I book an event on EventSphere?",
    a: "Browse the Explore page, open any event's detail page, and follow the booking prompt. You'll need an account to complete registration.",
  },
  {
    q: "Do I need to create an account to browse events?",
    a: "No — browsing and viewing event details is fully public. An account is only required to add events or manage your listings.",
  },
  {
    q: "Can I cancel or modify my event listing after posting?",
    a: "Yes, from the Manage Events page you can view and delete any event you've added.",
  },
  {
    q: "Is EventSphere available outside major cities?",
    a: "Yes, we list events across more than 10 districts in Bangladesh, from Dhaka to Cox's Bazar and beyond.",
  },
];

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-3">Frequently Asked Questions</h2>
        <p className="text-muted-foreground">
          Everything you need to know before getting started.
        </p>
      </div>
      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <div
            key={faq.q}
            className="rounded-lg border border-border/50 bg-card/50 overflow-hidden"
          >
            <button
              className="w-full flex items-center justify-between px-5 py-4 text-left"
              onClick={() => setOpen(open === i ? null : i)}
            >
              <span className="font-medium text-sm">{faq.q}</span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 text-muted-foreground transition-transform shrink-0 ml-4",
                  open === i && "rotate-180"
                )}
              />
            </button>
            {open === i && (
              <div className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}