import Link from "next/link";
import { CalendarDays, Home, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center gradient-hero px-4">
      <div className="text-center max-w-md">
        <div className="flex items-center justify-center gap-2 mb-8">
          <CalendarDays className="h-7 w-7 text-primary" />
          <span className="font-bold text-xl">EventSphere</span>
        </div>

        <p className="text-8xl font-bold text-primary/20 mb-2">404</p>
        <h1 className="text-2xl font-bold mb-3">Page Not Found</h1>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or may have
          been moved. Let&apos;s get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button render={<Link href="/" />} nativeButton={false}>
            <Home className="mr-2 h-4 w-4" /> Back to Home
          </Button>
          <Button
            variant="outline"
            render={<Link href="/events" />}
            nativeButton={false}
          >
            <Search className="mr-2 h-4 w-4" /> Explore Events
          </Button>
        </div>
      </div>
    </div>
  );
}