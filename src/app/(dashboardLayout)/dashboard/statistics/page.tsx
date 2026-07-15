"use client";

import { useEffect, useState } from "react";
import { Ticket, DollarSign, Users, Eye } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatsCard from "@/components/designs/StatsCard";
import { getBookingStats, getAllBookings } from "@/service/bookingService";
import { getTotalViews } from "@/service/viewService";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Booking } from "@/types/booking";

export default function DashboardStatisticsPage() {
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    uniqueUsers: 0,
    topEvents: [] as { title: string; count: number }[],
  });
  const [totalViews, setTotalViews] = useState(0);
  const [recentBookings, setRecentBookings] = useState<Booking[]>([]);

  useEffect(() => {
    setStats(getBookingStats());
    setTotalViews(getTotalViews());
    setRecentBookings(getAllBookings().slice(0, 8));
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-1">Statistics</h1>
        <p className="text-muted-foreground text-sm">
          Booking activity and engagement overview across EventSphere
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Bookings"
          value={String(stats.totalBookings)}
          icon={Ticket}
        />
        <StatsCard
          title="Total Revenue"
          value={formatCurrency(stats.totalRevenue)}
          icon={DollarSign}
        />
        <StatsCard
          title="Unique Customers"
          value={String(stats.uniqueUsers)}
          icon={Users}
        />
        <StatsCard title="Total Page Views" value={String(totalViews)} icon={Eye} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-border/50 bg-card/50">
          <CardHeader>
            <CardTitle className="text-base">Most Booked Events</CardTitle>
          </CardHeader>
          <CardContent>
            {stats.topEvents.length === 0 ? (
              <p className="text-sm text-muted-foreground py-8 text-center">
                No bookings yet.
              </p>
            ) : (
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={stats.topEvents} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis type="number" tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" />
                  <YAxis
                    type="category"
                    dataKey="title"
                    width={140}
                    tick={{ fontSize: 11 }}
                    stroke="var(--muted-foreground)"
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="count" fill="#7c6cf6" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50">
          <CardHeader>
            <CardTitle className="text-base">Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            {recentBookings.length === 0 ? (
              <p className="text-sm text-muted-foreground py-8 text-center">
                No bookings yet.
              </p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead>Event</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentBookings.map((b) => (
                    <TableRow key={b.id}>
                      <TableCell className="text-sm font-medium line-clamp-1">
                        {b.eventTitle}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {b.userEmail}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {formatDate(b.eventDate)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}