"use client";

import { DashboardCharts } from "@/components/dashboard/charts";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { PageHeader } from "@/components/shared/page-header";
import { useApp } from "@/context/app-context";

export default function DashboardPage() {
  const { user } = useApp();

  return (
    <div className="space-y-8">
      <PageHeader
        title="Dashboard"
        description={`Welcome back, ${user?.firstName}. Here's an overview of license verification activity.`}
      />
      <StatsCards />
      <DashboardCharts />
    </div>
  );
}
