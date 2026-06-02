"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { initialApplications } from "@/data/applications";
import { initialOfficers } from "@/data/officers";
import { mockUsers } from "@/data/users";
import { APP_STORAGE_KEY, AUTH_STORAGE_KEY } from "@/lib/constants";
import type {
  Application,
  ApplicationStatus,
  Officer,
  User,
} from "@/types";

interface AppState {
  applications: Application[];
  officers: Officer[];
}

interface AppContextValue {
  user: User | null;
  applications: Application[];
  officers: Officer[];
  isHydrated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  verifyApplication: (id: string) => void;
  rejectApplication: (id: string, reason: string) => void;
  getApplicationById: (id: string) => Application | undefined;
  createOfficer: (officer: Omit<Officer, "id" | "status">) => void;
  updateOfficer: (id: string, data: Partial<Officer>) => void;
  toggleOfficerStatus: (id: string) => void;
  getOfficerName: (id: string | null) => string;
  getReviewerName: (app: Application) => string;
  getStats: () => {
    total: number;
    pending: number;
    verified: number;
    rejected: number;
    activeOfficers: number;
  };
}

const AppContext = createContext<AppContextValue | null>(null);

function loadState(): AppState {
  if (typeof window === "undefined") {
    return { applications: initialApplications, officers: initialOfficers };
  }
  try {
    const raw = localStorage.getItem(APP_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw) as AppState;
    }
  } catch {
    /* use defaults */
  }
  return { applications: initialApplications, officers: initialOfficers };
}

function loadUser(): User | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (raw) return JSON.parse(raw) as User;
  } catch {
    /* ignore */
  }
  return null;
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [applications, setApplications] = useState<Application[]>(initialApplications);
  const [officers, setOfficers] = useState<Officer[]>(initialOfficers);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const state = loadState();
    setApplications(state.applications);
    setOfficers(state.officers);
    setUser(loadUser());
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    localStorage.setItem(
      APP_STORAGE_KEY,
      JSON.stringify({ applications, officers })
    );
  }, [applications, officers, isHydrated]);

  const login = useCallback((email: string, password: string) => {
    const found = mockUsers.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!found) return false;
    const sessionUser = { ...found };
    setUser(sessionUser);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(sessionUser));
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }, []);

  const resolveReviewer = useCallback(
    (currentUser: User | null) => {
      if (!currentUser) return {};
      if (currentUser.role === "super_admin") {
        return {
          reviewedByOfficerId: null,
          reviewedByName: `${currentUser.firstName} ${currentUser.lastName}`,
        };
      }
      const officer = officers.find(
        (o) => o.email.toLowerCase() === currentUser.email.toLowerCase()
      );
      return {
        reviewedByOfficerId: officer?.id ?? null,
        reviewedByName: undefined,
      };
    },
    [officers]
  );

  const verifyApplication = useCallback(
    (id: string) => {
      const review = resolveReviewer(user);
      setApplications((prev) =>
        prev.map((app) =>
          app.id === id
            ? {
                ...app,
                status: "verified" as ApplicationStatus,
                rejectionReason: undefined,
                ...review,
              }
            : app
        )
      );
    },
    [user, resolveReviewer]
  );

  const rejectApplication = useCallback(
    (id: string, reason: string) => {
      const review = resolveReviewer(user);
      setApplications((prev) =>
        prev.map((app) =>
          app.id === id
            ? {
                ...app,
                status: "rejected" as ApplicationStatus,
                rejectionReason: reason,
                ...review,
              }
            : app
        )
      );
    },
    [user, resolveReviewer]
  );

  const getApplicationById = useCallback(
    (id: string) => applications.find((a) => a.id === id),
    [applications]
  );

  const createOfficer = useCallback(
    (data: Omit<Officer, "id" | "status">) => {
      const newOfficer: Officer = {
        ...data,
        id: `officer-${Date.now()}`,
        status: "active",
      };
      setOfficers((prev) => [...prev, newOfficer]);
    },
    []
  );

  const updateOfficer = useCallback((id: string, data: Partial<Officer>) => {
    setOfficers((prev) =>
      prev.map((o) => (o.id === id ? { ...o, ...data } : o))
    );
  }, []);

  const toggleOfficerStatus = useCallback((id: string) => {
    setOfficers((prev) =>
      prev.map((o) =>
        o.id === id
          ? { ...o, status: o.status === "active" ? "inactive" : "active" }
          : o
      )
    );
  }, []);

  const getOfficerName = useCallback(
    (id: string | null) => {
      if (!id) return "Unassigned";
      const officer = officers.find((o) => o.id === id);
      return officer ? `${officer.firstName} ${officer.lastName}` : "Unknown";
    },
    [officers]
  );

  const getReviewerName = useCallback(
    (app: Application) => {
      if (app.status === "pending") return "—";
      if (app.reviewedByName) return app.reviewedByName;
      if (app.reviewedByOfficerId) {
        return getOfficerName(app.reviewedByOfficerId);
      }
      return "—";
    },
    [getOfficerName]
  );

  const getStats = useCallback(() => {
    const pending = applications.filter((a) => a.status === "pending").length;
    const verified = applications.filter((a) => a.status === "verified").length;
    const rejected = applications.filter((a) => a.status === "rejected").length;
    const activeOfficers = officers.filter((o) => o.status === "active").length;
    return {
      total: applications.length,
      pending,
      verified,
      rejected,
      activeOfficers,
    };
  }, [applications, officers]);

  const value = useMemo(
    () => ({
      user,
      applications,
      officers,
      isHydrated,
      login,
      logout,
      verifyApplication,
      rejectApplication,
      getApplicationById,
      createOfficer,
      updateOfficer,
      toggleOfficerStatus,
      getOfficerName,
      getReviewerName,
      getStats,
    }),
    [
      user,
      applications,
      officers,
      isHydrated,
      login,
      logout,
      verifyApplication,
      rejectApplication,
      getApplicationById,
      createOfficer,
      updateOfficer,
      toggleOfficerStatus,
      getOfficerName,
      getReviewerName,
      getStats,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
