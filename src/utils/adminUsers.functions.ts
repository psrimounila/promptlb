import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const getRegisteredUsers = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: isAdmin } = await supabaseAdmin.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (!isAdmin) {
      return { users: [], error: "Forbidden" as string | null };
    }


    const { data, error } = await supabaseAdmin.auth.admin.listUsers({
      page: 1,
      perPage: 200,
    });
    if (error) {
      return { users: [], error: error.message };
    }
    const users = data.users.map((u) => ({
      id: u.id,
      email: u.email ?? "",
      name:
        (u.user_metadata as { display_name?: string; name?: string } | null)?.display_name ??
        (u.user_metadata as { name?: string } | null)?.name ??
        (u.email ? u.email.split("@")[0] : ""),
      createdAt: u.created_at,
    }));
    return { users, error: null as string | null };
  });

export type AdminUserRow = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  lastLoginAt: string | null;
  enhancedCount: number;
  runsCount: number;
  savedCount: number;
  submittedCount: number;
  lastActivityAt: string | null;
};

export type AdminOverview = {
  error: string | null;
  stats: {
    totalUsers: number;
    totalEnhancements: number;
    totalSaved: number;
    totalCommunityPrompts: number;
  };
  users: AdminUserRow[];
};

export const getAdminOverview = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<AdminOverview> => {
    const empty: AdminOverview = {
      error: null,
      stats: { totalUsers: 0, totalEnhancements: 0, totalSaved: 0, totalCommunityPrompts: 0 },
      users: [],
    };

    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const { data: isAdmin } = await supabaseAdmin.rpc("has_role", {
        _user_id: context.userId,
        _role: "admin",
      });
      if (!isAdmin) return { ...empty, error: "Forbidden" };


      const usersRes = await supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 1000 });
      const usersData = usersRes.data ?? { users: [] };
      const usersErr = usersRes.error;

      const [historyRes, savedRes, promptsRes] = await Promise.all([
        supabaseAdmin.from("prompt_history").select("user_id, created_at"),
        supabaseAdmin.from("collection_prompts").select("user_id, created_at"),
        supabaseAdmin.from("prompts").select("user_id, created_at, is_public"),
      ]);

      const history = historyRes.data ?? [];
      const saved = savedRes.data ?? [];
      const prompts = promptsRes.data ?? [];

      const byUser = new Map<string, { enh: number; saved: number; submitted: number; last: string | null }>();
      const bump = (uid: string, key: "enh" | "saved" | "submitted", at: string) => {
        const cur = byUser.get(uid) ?? { enh: 0, saved: 0, submitted: 0, last: null };
        cur[key] += 1;
        if (!cur.last || at > cur.last) cur.last = at;
        byUser.set(uid, cur);
      };
      for (const r of history) if (r.user_id) bump(r.user_id, "enh", r.created_at);
      for (const r of saved) if (r.user_id) bump(r.user_id, "saved", r.created_at);
      for (const r of prompts) if (r.user_id) bump(r.user_id, "submitted", r.created_at);

      const users: AdminUserRow[] = (usersData.users ?? [])
        .map((u) => {
          const meta = (u.user_metadata as { display_name?: string; name?: string } | null) ?? {};
          const agg = byUser.get(u.id) ?? { enh: 0, saved: 0, submitted: 0, last: null };
          return {
            id: u.id,
            email: u.email ?? "",
            name: meta.display_name ?? meta.name ?? (u.email ? u.email.split("@")[0] : ""),
            createdAt: u.created_at,
            lastLoginAt: u.last_sign_in_at ?? null,
            enhancedCount: agg.enh,
            runsCount: agg.enh,
            savedCount: agg.saved,
            submittedCount: agg.submitted,
            lastActivityAt: agg.last,
          };
        })
        .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));

      return {
        error: usersErr ? usersErr.message : null,
        stats: {
          totalUsers: usersData.users?.length ?? 0,
          totalEnhancements: history.length,
          totalSaved: saved.length,
          totalCommunityPrompts: prompts.filter((p) => p.is_public).length,
        },
        users,
      };
    } catch (e) {
      return { ...empty, error: e instanceof Error ? e.message : "Failed to load admin data" };
    }
  });


export const getIsAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    return { isAdmin: Boolean(data) };
  });
