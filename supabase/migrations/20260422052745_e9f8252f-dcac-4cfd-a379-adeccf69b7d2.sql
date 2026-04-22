CREATE TABLE public.prompt_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  prompt_id UUID,
  title TEXT,
  prompt TEXT NOT NULL,
  model TEXT NOT NULL DEFAULT 'ChatGPT',
  output TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.prompt_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own history" ON public.prompt_history
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users insert own history" ON public.prompt_history
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users delete own history" ON public.prompt_history
  FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX idx_prompt_history_user_created ON public.prompt_history (user_id, created_at DESC);