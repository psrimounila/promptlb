import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { getRegisteredUsers } from "@/utils/adminUsers.functions";
import { Loader2, ShieldAlert, Users } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/users")({
  head: () => ({ meta: [{ title: "Registered Users · PromptLB Admin" }] }),
  component: AdminUsersPage,
});

type Row = { id: string; email: string; name: string; createdAt: string };

function AdminUsersPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const fetchUsers = useServerFn(getRegisteredUsers);
  const [rows, setRows] = useState<Row[] | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(true);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate({ to: "/auth", search: { mode: "signin" } });
      return;
    }
    (async () => {
      try {
        const res = await fetchUsers({ data: undefined as never });
        if (res.error) setErr(res.error);
        else setRows(res.users);
      } catch (e) {
        setErr(e instanceof Error ? e.message : "Failed to load");
      } finally {
        setBusy(false);
      }
    })();
  }, [user, loading, fetchUsers, navigate]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 pt-24 pb-16 sm:px-6 sm:pt-28">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">Registered Users</h1>
            <p className="text-sm text-muted-foreground">Admin-only view of everyone who signed up.</p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-border bg-card p-4 shadow-soft sm:p-6">
          {busy ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" /> Loading users…
            </div>
          ) : err === "Forbidden" ? (
            <div className="flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm">
              <ShieldAlert className="h-5 w-5 shrink-0 text-destructive" />
              <div>
                <div className="font-semibold">Admins only</div>
                <p className="mt-1 text-muted-foreground">
                  Your account doesn't have the admin role. Assign it in the backend and reload.
                </p>
              </div>
            </div>
          ) : err ? (
            <div className="text-sm text-destructive">{err}</div>
          ) : rows && rows.length ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="text-xs uppercase tracking-wider text-muted-foreground">
                  <tr className="border-b border-border">
                    <th className="py-2 pr-4 font-medium">Name</th>
                    <th className="py-2 pr-4 font-medium">Email</th>
                    <th className="py-2 pr-4 font-medium">Signup Date</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.id} className="border-b border-border/60">
                      <td className="py-3 pr-4 font-medium">{r.name || "—"}</td>
                      <td className="py-3 pr-4 text-muted-foreground">{r.email}</td>
                      <td className="py-3 pr-4 text-muted-foreground">
                        {new Date(r.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-3 text-xs text-muted-foreground">Total: {rows.length}</div>
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">No users yet.</div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
