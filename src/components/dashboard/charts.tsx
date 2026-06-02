"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useApp } from "@/context/app-context";
import { monthlyVerificationData } from "@/data/applications";

const STATUS_COLORS = {
  pending: "hsl(var(--pending))",
  verified: "hsl(var(--verified))",
  rejected: "hsl(var(--destructive))",
};

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { name: string; value: number; color: string }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-border/80 bg-card px-4 py-3 shadow-card">
      {label && (
        <p className="mb-2 text-xs font-medium text-muted-foreground">{label}</p>
      )}
      <ul className="space-y-1.5">
        {payload.map((entry) => (
          <li
            key={entry.name}
            className="flex items-center justify-between gap-6 text-sm"
          >
            <span className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              {entry.name}
            </span>
            <span className="font-semibold tabular-nums">{entry.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function DashboardCharts() {
  const { getStats } = useApp();
  const stats = getStats();

  const statusData = [
    { name: "Pending", value: stats.pending, color: STATUS_COLORS.pending },
    { name: "Verified", value: stats.verified, color: STATUS_COLORS.verified },
    { name: "Rejected", value: stats.rejected, color: STATUS_COLORS.rejected },
  ].filter((d) => d.value > 0);

  const pieData =
    statusData.length > 0
      ? statusData
      : [{ name: "No data", value: 1, color: "#94a3b8" }];

  const total = pieData.reduce((s, d) => s + d.value, 0);

  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-2">
      <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-soft">
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Status distribution</h3>
          <p className="text-sm text-muted-foreground">
            Breakdown of all applications in the system
          </p>
        </div>
        <div className="relative h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={72}
                outerRadius={108}
                paddingAngle={3}
                dataKey="value"
                nameKey="name"
                strokeWidth={0}
                animationBegin={0}
                animationDuration={800}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<ChartTooltip />} />
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value) => (
                  <span className="text-sm text-muted-foreground">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 text-center">
            <p className="text-3xl font-bold tabular-nums">{total}</p>
            <p className="text-xs text-muted-foreground">Total</p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-soft">
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Monthly overview</h3>
          <p className="text-sm text-muted-foreground">
            Verified vs rejected applications by month
          </p>
        </div>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={monthlyVerificationData}
              margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
              barGap={4}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="hsl(var(--border))"
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              />
              <Tooltip content={<ChartTooltip />} />
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value) => (
                  <span className="text-sm text-muted-foreground">{value}</span>
                )}
              />
              <Bar
                dataKey="verified"
                name="Verified"
                fill={STATUS_COLORS.verified}
                radius={[6, 6, 0, 0]}
                maxBarSize={40}
                animationDuration={900}
              />
              <Bar
                dataKey="rejected"
                name="Rejected"
                fill={STATUS_COLORS.rejected}
                radius={[6, 6, 0, 0]}
                maxBarSize={40}
                animationDuration={900}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
