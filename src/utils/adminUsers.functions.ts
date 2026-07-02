import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const getRegisteredUsers = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data: isAdmin } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (!isAdmin) {
      return { users: [], error: "Forbidden" as string | null };
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
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
