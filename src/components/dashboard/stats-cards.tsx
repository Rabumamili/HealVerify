"use client";

import {
  CheckCircle2,
  ClipboardList,
  Clock,
  TrendingUp,
  Users,
  XCircle,
} from "lucide-react";
import { useApp } from "@/context/app-context";
import { cn } from "@/lib/utils";

const cards = [
  {
    key: "total" as const,
    label: "Total Applications",
    icon: ClipboardList,
    gradient: "from-slate-600 to-slate-800",
    iconBg: "bg-slate-500/15",
    iconColor: "text-slate-600",
    ring: "group-hover:ring-slate-200",
  },
  {
    key: "pending" as const,
    label: "Pending Review",
    icon: Clock,
    gradient: "from-amber-500 to-orange-600",
    iconBg: "bg-pending/15",
    iconColor: "text-pending",
    ring: "group-hover:ring-amber-200",
  },
  {
    key: "verified" as const,
    label: "Verified",
    icon: CheckCircle2,
    gradient: "from-emerald-500 to-teal-600",
    iconBg: "bg-verified/15",
    iconColor: "text-verified",
    ring: "group-hover:ring-emerald-200",
  },
  {
    key: "rejected" as const,
    label: "Rejected",
    icon: XCircle,
    gradient: "from-rose-500 to-red-600",
    iconBg: "bg-destructive/15",
    iconColor: "text-destructive",
    ring: "group-hover:ring-rose-200",
  },
  {
    key: "activeOfficers" as const,
    label: "Active Officers",
    icon: Users,
    gradient: "from-primary to-cyan-600",
    iconBg: "bg-primary/15",
    iconColor: "text-primary",
    ring: "group-hover:ring-primary/30",
  },
];

export function StatsCards() {
  const { getStats, user } = useApp();
  const stats = getStats();
  const showOfficers = user?.role === "super_admin";

  const visibleCards = cards.filter(
    (c) => c.key !== "activeOfficers" || showOfficers
  );

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5">
      {visibleCards.map((card, index) => {
        const Icon = card.icon;
        const value = stats[card.key];
        return (
          <div
            key={card.key}
            className={cn(
              "group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card animate-fade-up",
              card.ring,
              "hover:ring-2"
            )}
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <div
              className={cn(
                "pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br opacity-10 blur-2xl transition-opacity group-hover:opacity-20",
                card.gradient
              )}
            />
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {card.label}
                </p>
                <p className="mt-2 animate-count text-3xl font-bold tracking-tight">
                  {value}
                </p>
              </div>
              <div
                className={cn(
                  "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110",
                  card.iconBg
                )}
              >
                <Icon className={cn("h-5 w-5", card.iconColor)} />
              </div>
            </div>
            {card.key === "verified" && stats.verified > 0 && (
              <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-verified">
                <TrendingUp className="h-3.5 w-3.5" />
                <span>On track this period</span>
              </div>
            )}
            <div
              className={cn(
                "absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r transition-all duration-500 group-hover:w-full",
                card.gradient
              )}
            />
          </div>
        );
      })}
    </div>
  );
}
