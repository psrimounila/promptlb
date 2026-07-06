import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const UpvoteSchema = z.object({ promptId: z.string().uuid() });

export const upvotePrompt = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => UpvoteSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: count, error } = await supabaseAdmin.rpc("increment_prompt_upvotes", {
      _prompt_id: data.promptId,
    });
    if (error) return { upvotes: null as number | null, error: error.message };
    return { upvotes: (count as number) ?? 0, error: null as string | null };
  });
