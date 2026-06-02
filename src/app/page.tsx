import Link from "next/link";
import {
  ArrowRight,
  FileCheck2,
  Lock,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: FileCheck2,
    title: "Streamlined review",
    description:
      "Officers review credentials, documents, and provider details in one unified workflow.",
  },
  {
    icon: Lock,
    title: "Government-grade security",
    description:
      "Role-based access and audit-ready records protect sensitive healthcare data.",
  },
  {
    icon: Users,
    title: "Team oversight",
    description:
      "Administrators monitor throughput, assign workloads, and manage verification staff.",
  },
];

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden
      >
        <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -right-24 top-1/3 h-80 w-80 rounded-full bg-emerald-400/15 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-64 w-[40rem] -translate-x-1/2 rounded-full bg-teal-300/10 blur-3xl" />
      </div>

      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Logo size="sm" />
          <div className="flex items-center gap-2 sm:gap-3">
            <Button variant="ghost" asChild className="hidden sm:inline-flex">
              <Link href="/login">Sign in</Link>
            </Button>
            <Button asChild className="rounded-full shadow-glow">
              <Link href="/login">
                Access portal
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main>
        <section className="mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 sm:pt-24 lg:px-8 lg:pt-28">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              Trusted healthcare credential verification
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Verify licenses with{" "}
              <span className="text-gradient">confidence and clarity</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground sm:text-xl">
              HealVerify empowers regulatory teams to validate doctors, clinics,
              and diagnostic centers through a modern, secure portal built for
              public health compliance.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                asChild
                className="h-12 rounded-full px-8 text-base shadow-glow"
              >
                <Link href="/login">
                  Get started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="h-12 rounded-full px-8 text-base"
              >
                <Link href="/login">Sign in to workspace</Link>
              </Button>
            </div>
          </div>

          <div className="relative mx-auto mt-16 max-w-4xl sm:mt-20">
            <div className="glass-panel overflow-hidden rounded-2xl shadow-card">
              <div className="border-b border-border/60 bg-gradient-to-r from-primary/5 to-emerald-500/5 px-6 py-4">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-400/80" />
                  <div className="h-3 w-3 rounded-full bg-amber-400/80" />
                  <div className="h-3 w-3 rounded-full bg-emerald-400/80" />
                </div>
              </div>
              <div className="grid gap-6 p-6 sm:grid-cols-3 sm:p-8">
                {[
                  { label: "Pending", value: "24", tone: "text-pending" },
                  { label: "Verified", value: "156", tone: "text-verified" },
                  { label: "This month", value: "+18%", tone: "text-primary" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-border/60 bg-muted/30 p-4 text-center sm:text-left"
                  >
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className={`mt-1 text-3xl font-bold ${stat.tone}`}>
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 hidden rounded-2xl border border-verified/20 bg-verified/10 p-4 shadow-card sm:block">
              <div className="flex items-center gap-2 text-verified">
                <ShieldCheck className="h-5 w-5" />
                <span className="text-sm font-semibold">Audit-ready records</span>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-border/60 bg-card/50 py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Built for regulatory excellence
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
                Everything your verification team needs—without the clutter.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <article
                    key={feature.title}
                    className="animate-fade-up rounded-2xl border border-border/60 bg-card p-6 shadow-soft transition-shadow hover:shadow-card"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-semibold">{feature.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {feature.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/60 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-sm text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
          <Logo size="sm" showText={false} />
          <p>© {new Date().getFullYear()} HealVerify. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
