import type { Officer } from "@/types";

export const initialOfficers: Officer[] = [
  {
    id: "officer-1",
    firstName: "James",
    lastName: "Rodriguez",
    email: "officer@healverify.gov",
    password: "officer123",
    role: "officer",
    status: "active",
  },
  {
    id: "officer-2",
    firstName: "Emily",
    lastName: "Chen",
    email: "echen@healverify.gov",
    password: "officer123",
    role: "officer",
    status: "active",
  },
  {
    id: "officer-3",
    firstName: "Michael",
    lastName: "Thompson",
    email: "mthompson@healverify.gov",
    password: "officer123",
    role: "officer",
    status: "inactive",
  },
];
