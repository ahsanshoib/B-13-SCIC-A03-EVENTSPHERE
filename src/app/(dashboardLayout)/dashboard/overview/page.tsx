"use client";

import { useEffect, useState } from "react";
import { CalendarDays, DollarSign, Star, Tag } from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatsCard from "@/components/designs/StatsCard";
import { EventItem } from "@/types/event";
import { getAllEvents } from "@/service/eventService";
import { formatCurrency } from "@/lib/utils";

const COLORS = [
  "#f4d03f", // yellow
  "#f5b041", // yellow-orange
  "#f39c12", // orange
  "#e8674a", // red-orange
  "#e74c3c", // red
  "#c0392b", // red-violet
  "#9b59b6", // violet
  "#7d5ba6", // blue-violet
  "#5b6fd6", // blue
  "#48a9c5", // blue-green
  "#45b39d", // green
  "#7fc97f", // yellow-green
];

export default function DashboardOverviewPage() {
  const [events, setEvents] = useState<EventItem[]>([]);

  useEffect(() => {
    const loadEvents = async () => {
      const data = await getAllEvents();
      setEvents(data);
    };
    loadEvents();
  }, []);

  const totalRevenuePotential = events.reduce((sum, e) => sum + e.price, 0);
  const avgRating = events.length
    ? (events.reduce((sum, e) => sum + e.rating, 0) / events.length).toFixed(1)
    : "0.0";
  const categoryCount = new Set(events.map((e) => e.category)).size;

  const categoryData = Array.from(
    events.reduce((map, e) => {
      map.set(e.category, (map.get(e.category) ?? 0) + 1);
      return map;
    }, new Map<string, number>())
  ).map(([name, value]) => ({ name, value }));

  const priceByLocation = Array.from(
    events.reduce((map, e) => {
      map.set(e.location, (map.get(e.location) ?? 0) + e.price);
      return map;
    }, new Map<string, number>())
  ).map(([name, value]) => ({ name, value }));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-1">Dashboard Overview</h1>
        <p className="text-muted-foreground text-sm">
          A snapshot of all events currently listed on EventSphere
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total Events" value={String(events.length)} icon={CalendarDays} />
        <StatsCard
          title="Combined Value"
          value={formatCurrency(totalRevenuePotential)}
          icon={DollarSign}
        />
        <StatsCard title="Avg Rating" value={avgRating} icon={Star} />
        <StatsCard title="Categories" value={String(categoryCount)} icon={Tag} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-border/50 bg-card/50">
          <CardHeader>
            <CardTitle className="text-base">Events by Category</CardTitle>
          </CardHeader>
          <CardContent>

<ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  label={(entry) => entry.name}
                >
                  {categoryData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>



          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50">
          <CardHeader>
            <CardTitle className="text-base">Combined Price by Location</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={priceByLocation}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" />
                <YAxis tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="value" fill="#7c6cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}