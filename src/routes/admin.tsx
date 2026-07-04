import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { getAdminOverview, type AdminOverview, type AdminUserRow } from "@/utils/adminUsers.functions";
import { Input } from "@/components/ui/input";
import {
  Loader2,
  ShieldAlert,
  Shield,
  Users,
  Wand2,
  Bookmark,
  Globe2,
  Search,
} from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin Dashboard · PromptLB" }] }),
  component: AdminDashboardPage,
});

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number | string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
          <div className="text-2xl font-bold">{value}</div>
        </div>
      </div>
    </div>
  );
}

function fmt(d: string | null) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function AdminDashboardPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const fetchOverview = useServerFn(getAdminOverview);
  const [data, setData] = useState<AdminOverview | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(true);
  const [q, setQ] = useState("");

  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate({ to: "/auth", search: { mode: "signin" } });
      return;
    }
    (async () => {
      try {
        const res = await fetchOverview({ data: undefined as never });
        if (res.error) setErr(res.error);
        else setData(res);
      } catch (e) {
        setErr(e instanceof Error ? e.message : "Failed to load");
      } finally {
        setBusy(false);
      }
    })();
  }, [user, loading, fetchOverview, navigate]);

  const filtered = useMemo<AdminUserRow[]>(() => {
    if (!data) return [];
    const s = q.trim().toLowerCase();
    if (!s) return data.users;
    return data.users.filter(
      (u) =>
        u.email.toLowerCase().includes(s) ||
        (u.name ?? "").toLowerCase().includes(s),
    );
  }, [data, q]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 pt-24 pb-16 sm:px-6 sm:pt-28">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Platform statistics, user information, and activity — admin only.
            </p>
          </div>
        </div>

        {busy ? (
          <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" /> Loading admin data…
          </div>
        ) : err === "Forbidden" ? (
          <div className="mt-8 flex items-start gap-3 rounded-2xl border border-destructive/30 bg-destructive/5 p-6">
            <ShieldAlert className="h-5 w-5 shrink-0 text-destructive" />
            <div>
              <div className="font-semibold">Admins only</div>
              <p className="mt-1 text-sm text-muted-foreground">
                Your account doesn't have the admin role.
              </p>
            </div>
          </div>
        ) : err ? (
          <div className="mt-8 text-sm text-destructive">{err}</div>
        ) : data ? (
          <>
            <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard icon={Users} label="Registered Users" value={data.stats.totalUsers} />
              <StatCard icon={Wand2} label="Prompt Enhancements" value={data.stats.totalEnhancements} />
              <StatCard icon={Bookmark} label="Saved Prompts" value={data.stats.totalSaved} />
              <StatCard icon={Globe2} label="Community Prompts" value={data.stats.totalCommunityPrompts} />
            </section>

            <section className="mt-8 rounded-2xl border border-border bg-card p-4 shadow-soft sm:p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-semibold">Users</h2>
                  <p className="text-xs text-muted-foreground">
                    Newest first · showing {filtered.length} of {data.users.length}
                  </p>
                </div>
                <div className="relative w-full sm:w-72">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Search name or email…"
                    className="pl-9"
                  />
                </div>
              </div>

              <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[900px] text-left text-sm">
                  <thead className="text-xs uppercase tracking-wider text-muted-foreground">
                    <tr className="border-b border-border">
                      <th className="py-2 pr-4 font-medium">Name</th>
                      <th className="py-2 pr-4 font-medium">Email</th>
                      <th className="py-2 pr-4 font-medium">Signup</th>
                      <th className="py-2 pr-4 font-medium">Last Login</th>
                      <th className="py-2 pr-4 text-right font-medium">Enhanced</th>
                      <th className="py-2 pr-4 text-right font-medium">Runs</th>
                      <th className="py-2 pr-4 text-right font-medium">Saved</th>
                      <th className="py-2 pr-4 text-right font-medium">Submitted</th>
                      <th className="py-2 pr-4 font-medium">Last Activity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((u) => (
                      <tr key={u.id} className="border-b border-border/60 hover:bg-muted/30">
                        <td className="py-3 pr-4 font-medium">{u.name || "—"}</td>
                        <td className="py-3 pr-4 text-muted-foreground">{u.email}</td>
                        <td className="py-3 pr-4 text-muted-foreground">{fmt(u.createdAt)}</td>
                        <td className="py-3 pr-4 text-muted-foreground">{fmt(u.lastLoginAt)}</td>
                        <td className="py-3 pr-4 text-right tabular-nums">{u.enhancedCount}</td>
                        <td className="py-3 pr-4 text-right tabular-nums">{u.runsCount}</td>
                        <td className="py-3 pr-4 text-right tabular-nums">{u.savedCount}</td>
                        <td className="py-3 pr-4 text-right tabular-nums">{u.submittedCount}</td>
                        <td className="py-3 pr-4 text-muted-foreground">{fmt(u.lastActivityAt)}</td>
                      </tr>
                    ))}
                    {filtered.length === 0 && (
                      <tr>
                        <td colSpan={9} className="py-8 text-center text-sm text-muted-foreground">
                          No users match your search.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        ) : null}
      </main>
      <Footer />
    </div>
  );
}
