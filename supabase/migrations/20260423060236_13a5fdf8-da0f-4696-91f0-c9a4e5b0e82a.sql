CREATE OR REPLACE FUNCTION public.increment_prompt_upvotes(_prompt_id uuid)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_count integer;
BEGIN
  UPDATE public.prompts
  SET upvotes = upvotes + 1
  WHERE id = _prompt_id AND is_public = true
  RETURNING upvotes INTO new_count;
  RETURN COALESCE(new_count, 0);
END;
$$;

GRANT EXECUTE ON FUNCTION public.increment_prompt_upvotes(uuid) TO anon, authenticated;