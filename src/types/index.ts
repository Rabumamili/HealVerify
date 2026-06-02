export type UserRole = "super_admin" | "officer";

export type ApplicationStatus = "pending" | "verified" | "rejected";

export type ProviderType = "doctor" | "clinic" | "diagnostic_center";

export interface User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}

export interface Officer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "officer";
  status: "active" | "inactive";
}

export interface Document {
  id: string;
  name: string;
  type: string;
  url: string;
  uploadedAt: string;
}

export interface Application {
  id: string;
  applicantName: string;
  email: string;
  phone: string;
  providerType: ProviderType;
  submissionDate: string;
  status: ApplicationStatus;
  assignedOfficerId: string | null;
  reviewedByOfficerId?: string | null;
  reviewedByName?: string;
  rejectionReason?: string;
  documents: Document[];
}

export type ApplicationFilter =
  | "all"
  | "pending"
  | "verified"
  | "rejected"
  | "doctor"
  | "clinic"
  | "diagnostic_center";
