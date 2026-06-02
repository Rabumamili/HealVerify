import type { User } from "@/types";

export const mockUsers: User[] = [
  {
    id: "user-1",
    email: "admin@healverify.gov",
    password: "admin123",
    firstName: "Sarah",
    lastName: "Mitchell",
    role: "super_admin",
  },
  {
    id: "user-2",
    email: "officer@healverify.gov",
    password: "officer123",
    firstName: "James",
    lastName: "Rodriguez",
    role: "officer",
  },
];
