import { cn } from "@/lib/utils";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: "h-5 w-5 border-2",
  md: "h-9 w-9 border-[3px]",
  lg: "h-14 w-14 border-4",
};

export default function Spinner({ size = "md", className }: SpinnerProps) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn(
        "animate-spin rounded-full border-primary/20 border-t-primary",
        sizeMap[size],
        className
      )}
    />
  );
}