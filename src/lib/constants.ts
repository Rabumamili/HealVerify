import type { ApplicationStatus, ProviderType } from "@/types";

export const PROVIDER_TYPE_LABELS: Record<ProviderType, string> = {
  doctor: "Doctor",
  clinic: "Clinic",
  diagnostic_center: "Diagnostic Center",
};

export const STATUS_LABELS: Record<ApplicationStatus, string> = {
  pending: "Pending",
  verified: "Verified",
  rejected: "Rejected",
};

export const AUTH_STORAGE_KEY = "healverify_auth";
export const APP_STORAGE_KEY = "healverify_app_state";

export const ITEMS_PER_PAGE = 8;
