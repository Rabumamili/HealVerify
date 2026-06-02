"use client";

import { ClipboardList } from "lucide-react";
import { ApplicationFilters } from "@/components/applications/application-filters";
import { ApplicationsTable } from "@/components/applications/applications-table";
import { Pagination } from "@/components/applications/pagination";
import { EmptyState } from "@/components/shared/empty-state";
import { PageHeader } from "@/components/shared/page-header";
import { ITEMS_PER_PAGE } from "@/lib/constants";
import { useApp } from "@/context/app-context";
import { useApplicationsFilter } from "@/hooks/use-applications-filter";

export default function ApplicationsPage() {
  const { applications, getReviewerName } = useApp();
  const {
    filter,
    setFilter,
    search,
    setSearch,
    page,
    setPage,
    filtered,
    paginated,
    totalPages,
  } = useApplicationsFilter(applications);

  return (
    <div>
      <PageHeader
        title="Applications"
        description="Review and manage healthcare provider license applications."
      />
      <ApplicationFilters
        activeFilter={filter}
        onFilterChange={setFilter}
        search={search}
        onSearchChange={setSearch}
      />
      <div className="mt-6">
        {paginated.length === 0 ? (
          <EmptyState
            icon={ClipboardList}
            title="No applications found"
            description="Try adjusting your filters or search query."
          />
        ) : (
          <>
            <ApplicationsTable
              applications={paginated}
              getReviewerName={getReviewerName}
            />
            <div className="mt-4">
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
                totalItems={filtered.length}
                itemsPerPage={ITEMS_PER_PAGE}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
