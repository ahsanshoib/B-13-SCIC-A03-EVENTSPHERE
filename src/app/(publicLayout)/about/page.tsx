"use client";

import { useRouter } from "next/navigation";
import { Users, Target, Award, Heart, ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";



const values = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "To connect every corner of Bangladesh through accessible, well-organized, and memorable events.",
  },
  {
    icon: Users,
    title: "Our Community",
    description:
      "Thousands of attendees and organizers trust EventSphere to discover and host experiences that matter.",
  },
  {
    icon: Award,
    title: "Our Standard",
    description:
      "Every event listed is reviewed for quality, accuracy, and authenticity before it goes live.",
  },
  {
    icon: Heart,
    title: "Our Passion",
    description:
      "We believe great events build stronger communities — that belief drives everything we build.",
  },
];

export default function AboutPage() {
  const router = useRouter();

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

      <div className="text-center mb-16">

  <h1 className="text-4xl sm:text-2xl lg:text-2xl font-bold tracking-tight mb-6">
            Our Mission  <span className="text-primary">and Vision</span>
          </h1>

        <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          EventSphere was founded with one goal: make it effortless to
          discover and attend the best events happening across Bangladesh —
          from tech summits in Dhaka to sunset concerts on Cox&apos;s Bazar
          beach. What started as a small directory has grown into a trusted
          platform for organizers and attendees alike.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
        {values.map((value) => (
          <Card key={value.title} className="border-border/50 bg-card/50">
            <CardContent className="pt-6">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <value.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{value.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {value.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="rounded-2xl gradient-hero border border-border/50 px-6 py-12 text-center">
        <h2 className="text-2xl font-bold mb-3">Join the Movement</h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Whether you&apos;re looking to attend your next favorite event or
          host one yourself, EventSphere is built for you.
        </p>
      </div>
    </div>
  );
}