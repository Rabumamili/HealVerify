"use client";

import { useMemo, useState } from "react";
import { ITEMS_PER_PAGE } from "@/lib/constants";
import type { Application, ApplicationFilter } from "@/types";

export function useApplicationsFilter(applications: Application[]) {
  const [filter, setFilter] = useState<ApplicationFilter>("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let result = [...applications];

    if (filter === "pending" || filter === "verified" || filter === "rejected") {
      result = result.filter((a) => a.status === filter);
    } else if (
      filter === "doctor" ||
      filter === "clinic" ||
      filter === "diagnostic_center"
    ) {
      result = result.filter((a) => a.providerType === filter);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (a) =>
          a.applicantName.toLowerCase().includes(q) ||
          a.id.toLowerCase().includes(q)
      );
    }

    return result.sort(
      (a, b) =>
        new Date(b.submissionDate).getTime() -
        new Date(a.submissionDate).getTime()
    );
  }, [applications, filter, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, currentPage]);

  const setFilterAndReset = (f: ApplicationFilter) => {
    setFilter(f);
    setPage(1);
  };

  const setSearchAndReset = (s: string) => {
    setSearch(s);
    setPage(1);
  };

  return {
    filter,
    setFilter: setFilterAndReset,
    search,
    setSearch: setSearchAndReset,
    page: currentPage,
    setPage,
    filtered,
    paginated,
    totalPages,
  };
}
