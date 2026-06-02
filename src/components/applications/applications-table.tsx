"use client";

import Link from "next/link";
import { Eye } from "lucide-react";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PROVIDER_TYPE_LABELS } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import type { Application } from "@/types";

interface ApplicationsTableProps {
  applications: Application[];
  getReviewerName: (app: Application) => string;
}

export function ApplicationsTable({
  applications,
  getReviewerName,
}: ApplicationsTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-soft">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              <TableHead className="whitespace-nowrap">Application ID</TableHead>
              <TableHead>Applicant</TableHead>
              <TableHead className="hidden md:table-cell">Provider Type</TableHead>
              <TableHead className="hidden sm:table-cell">Submitted</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden lg:table-cell">Reviewed By</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map((app) => {
              const reviewer = getReviewerName(app);
              const showReviewer =
                app.status === "verified" || app.status === "rejected";

              return (
                <TableRow key={app.id} className="group">
                  <TableCell className="font-mono text-xs font-medium text-primary sm:text-sm">
                    {app.id}
                  </TableCell>
                  <TableCell>
                    <p className="font-medium">{app.applicantName}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground md:hidden">
                      {PROVIDER_TYPE_LABELS[app.providerType]}
                    </p>
                  </TableCell>
                  <TableCell className="hidden text-muted-foreground md:table-cell">
                    {PROVIDER_TYPE_LABELS[app.providerType]}
                  </TableCell>
                  <TableCell className="hidden whitespace-nowrap text-muted-foreground sm:table-cell">
                    {formatDate(app.submissionDate)}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={app.status} />
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {showReviewer ? (
                      <span className="font-medium text-foreground">
                        {reviewer}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      asChild
                      className="rounded-lg opacity-80 transition-opacity group-hover:opacity-100"
                    >
                      <Link
                        href={`/applications/${encodeURIComponent(app.id)}`}
                      >
                        <Eye className="mr-1.5 h-4 w-4" />
                        View
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
