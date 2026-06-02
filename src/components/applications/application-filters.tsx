"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { ApplicationFilter } from "@/types";

const filters: { value: ApplicationFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "verified", label: "Verified" },
  { value: "rejected", label: "Rejected" },
  { value: "doctor", label: "Doctors" },
  { value: "clinic", label: "Clinics" },
  { value: "diagnostic_center", label: "Diagnostic" },
];

interface ApplicationFiltersProps {
  activeFilter: ApplicationFilter;
  onFilterChange: (filter: ApplicationFilter) => void;
  search: string;
  onSearchChange: (value: string) => void;
}

export function ApplicationFilters({
  activeFilter,
  onFilterChange,
  search,
  onSearchChange,
}: ApplicationFiltersProps) {
  return (
    <div className="space-y-4 rounded-2xl border border-border/60 bg-card/60 p-4 shadow-soft sm:p-5">
      <div className="relative max-w-lg">
        <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by name or application ID..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="h-11 rounded-xl border-border/80 bg-background pl-10"
          aria-label="Search applications"
        />
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {filters.map((filter) => (
          <button
            key={filter.value}
            type="button"
            onClick={() => onFilterChange(filter.value)}
            className={cn(
              "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
              activeFilter === filter.value
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-muted/80 text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
}
