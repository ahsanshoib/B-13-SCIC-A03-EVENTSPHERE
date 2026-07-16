"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    router.push(`/events${query ? `?search=${encodeURIComponent(query)}` : ""}`);
  };

  return (

    <section className="relative overflow-hidden gradient-hero-animated min-h-[65vh] flex items-center">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-xs font-medium text-muted-foreground mb-6">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Bangladesh&apos;s Premier Events Platform
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Discover Events That <br></br> <span className="text-primary">Move You</span>
          </h1>

          <p className="text-lg text-muted-foreground mb-8 max-w-xl leading-relaxed">
            From tech summits in Dhaka to sunset concerts in Cox&apos;s Bazar —
            find and book unforgettable experiences happening across the country.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-lg">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search events, cities, categories..."
                className="pl-9 h-12"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <Button size="lg" className="h-12" onClick={handleSearch}>
              Search <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}