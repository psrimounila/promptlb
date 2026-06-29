
-- 1. Restrict profile reads to owner only (hides plan / pro_since from others)
DROP POLICY IF EXISTS "Profiles viewable by everyone" ON public.profiles;
CREATE POLICY "Users view own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

-- 2. Lock down SECURITY DEFINER functions: revoke broad EXECUTE, grant only where needed.

-- Trigger-only functions: nothing on the API surface should call these directly.
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.set_updated_at() FROM PUBLIC, anon, authenticated;

-- has_role: used inside RLS policies for authenticated users. Anon never hits it.
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;

-- is_pro: not used on the API surface; keep available only to service_role.
REVOKE EXECUTE ON FUNCTION public.is_pro(uuid) FROM PUBLIC, anon, authenticated;

-- increment_prompt_upvotes: called via RPC by signed-in users only.
REVOKE EXECUTE ON FUNCTION public.increment_prompt_upvotes(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.increment_prompt_upvotes(uuid) TO authenticated;
