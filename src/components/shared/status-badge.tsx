import { Badge } from "@/components/ui/badge";
import type { ApplicationStatus } from "@/types";

const variantMap: Record<
  ApplicationStatus,
  "pending" | "verified" | "rejected"
> = {
  pending: "pending",
  verified: "verified",
  rejected: "rejected",
};

const labelMap: Record<ApplicationStatus, string> = {
  pending: "Pending",
  verified: "Verified",
  rejected: "Rejected",
};

export function StatusBadge({ status }: { status: ApplicationStatus }) {
  return <Badge variant={variantMap[status]}>{labelMap[status]}</Badge>;
}
