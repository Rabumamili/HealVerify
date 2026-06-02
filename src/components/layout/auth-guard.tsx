"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useApp } from "@/context/app-context";
import { DashboardSkeleton } from "@/components/layout/dashboard-skeleton";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, isHydrated } = useApp();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isHydrated) return;
    if (!user) {
      router.replace("/login");
    }
  }, [user, isHydrated, router]);

  useEffect(() => {
    if (!isHydrated || !user) return;
    if (pathname === "/officers" && user.role !== "super_admin") {
      router.replace("/dashboard");
    }
  }, [user, isHydrated, pathname, router]);

  if (!isHydrated || !user) {
    return <DashboardSkeleton />;
  }

  return <>{children}</>;
}
