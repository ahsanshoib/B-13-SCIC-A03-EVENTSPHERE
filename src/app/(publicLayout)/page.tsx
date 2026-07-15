import HeroSection from "@/components/pages/home/heroSection";
import ServiceSection from "@/components/pages/home/ServiceSection";
import EventsSection from "@/components/pages/home/EventsSection";
import StatisticsSection from "@/components/pages/home/StatisticsSection";
import TestimonialSection from "@/components/pages/home/TestimonialSection";
import FaqSection from "@/components/pages/home/FaqSection";
import SubscribeSection from "@/components/pages/home/SubscribeSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServiceSection />
      <EventsSection />
      <StatisticsSection />
      <TestimonialSection />
      <FaqSection />
      <SubscribeSection />
    </>
  );
}