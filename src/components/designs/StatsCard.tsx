import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: string;
}

export default function StatsCard({ title, value, icon: Icon, trend }: StatsCardProps) {
  return (
    <Card className="border-border/50 bg-card/50">
      <CardContent className="pt-6 flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
          {trend && <p className="text-xs text-accent mt-1">{trend}</p>}
        </div>
        <div className="h-11 w-11 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="h-5 w-5 text-primary" />
        </div>
      </CardContent>
    </Card>
  );
}