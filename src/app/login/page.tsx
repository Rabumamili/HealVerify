"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useApp } from "@/context/app-context";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, user, isHydrated } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (isHydrated && user) {
      router.replace("/dashboard");
    }
  }, [isHydrated, user, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const success = login(email, password);
    setLoading(false);
    if (success) {
      toast.success("Welcome back!");
      router.push("/dashboard");
    } else {
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col lg:flex-row">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden
      >
        <div className="absolute left-0 top-0 h-full w-1/2 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
      </div>

      <div className="relative hidden flex-1 flex-col justify-between overflow-hidden bg-sidebar p-10 text-white lg:flex xl:p-14">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(187_72%_42%/_0.35),_transparent_55%)]" />
        <div className="relative z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-sidebar-muted transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
        </div>
        <div className="relative z-10 max-w-md space-y-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sidebar-accent shadow-glow">
            <ShieldCheck className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold leading-tight xl:text-4xl">
            Healthcare license verification, reimagined
          </h1>
          <p className="text-lg leading-relaxed text-sidebar-muted">
            Review provider credentials, validate documentation, and maintain
            compliance from a single secure workspace.
          </p>
          <ul className="space-y-3 text-sm text-sidebar-muted">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-sidebar-accent" />
              End-to-end application lifecycle tracking
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-sidebar-accent" />
              Real-time status dashboards and analytics
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-sidebar-accent" />
              Role-based access for officers and administrators
            </li>
          </ul>
        </div>
        <p className="relative z-10 text-sm text-sidebar-muted">
          © {new Date().getFullYear()} HealVerify Government Portal
        </p>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-4 py-12 sm:px-8">
        <div className="mb-8 w-full max-w-md lg:hidden">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Home
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <span className="text-2xl font-bold">HealVerify</span>
          </div>
        </div>

        <div className="w-full max-w-md animate-fade-up">
          <div className="mb-8 hidden lg:block">
            <h2 className="text-2xl font-bold tracking-tight">Welcome back</h2>
            <p className="mt-2 text-muted-foreground">
              Sign in with your authorized credentials
            </p>
          </div>
          <div className="mb-6 lg:hidden">
            <h2 className="text-2xl font-bold tracking-tight">Sign in</h2>
            <p className="mt-1 text-muted-foreground">
              Access the verification portal
            </p>
          </div>

          <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-card sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email">Work email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@healverify.gov"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="h-11 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="h-11 rounded-xl"
                />
              </div>
              <Button
                type="submit"
                className="h-11 w-full rounded-xl text-base shadow-glow"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign in"}
              </Button>
            </form>
          </div>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Authorized personnel only. Activity may be monitored for compliance.
          </p>
        </div>
      </div>
    </div>
  );
}
