import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  Crown,
  Loader2,
  Plus,
  Sparkles,
  Trash2,
  TrendingUp,
  Wand2,
  Bookmark,
} from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [{ title: "Dashboard · PromptLB" }],
  }),
  component: DashboardPage,
});

type Prompt = {
  id: string;
  title: string;
  content: string;
  description: string | null;
  category: string;
  model: string;
  tags: string[];
  upvotes: number;
  created_at: string;
};

function DashboardPage() {
  const { user, profile, isPro, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);

  // Optimizer state
  const [optimizerInput, setOptimizerInput] = useState("");
  const [optimizerModel, setOptimizerModel] = useState("ChatGPT");
  const [optimizerOutput, setOptimizerOutput] = useState("");
  const [optimizing, setOptimizing] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) navigate({ to: "/auth", search: { mode: "signin" } });
  }, [authLoading, user, navigate]);

  const load = async () => {
    if (!user) return;
    setLoading(true);
    const { data } = await supabase
      .from("prompts")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    setPrompts((data as Prompt[]) || []);
    setLoading(false);
  };

  useEffect(() => {
    if (user) load();
  }, [user]);

  const remove = async (id: string) => {
    const { error } = await supabase.from("prompts").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Prompt deleted");
    setPrompts((p) => p.filter((x) => x.id !== id));
  };

  const optimize = async () => {
    if (!isPro) {
      toast.info("Upgrade to Pro to use the AI optimizer");
      navigate({ to: "/pricing" });
      return;
    }
    if (!optimizerInput.trim()) return;
    setOptimizing(true);
    setOptimizerOutput("");
    try {
      const { data, error } = await supabase.functions.invoke("optimize-prompt", {
        body: { prompt: optimizerInput, model: optimizerModel },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setOptimizerOutput(data.optimized || "");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to optimize";
      toast.error(msg);
    } finally {
      setOptimizing(false);
    }
  };

  if (authLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  const totalUpvotes = prompts.reduce((acc, p) => acc + p.upvotes, 0);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Welcome back,{" "}
                <span className="text-gradient-primary">
                  {profile?.display_name || "creator"}
                </span>
              </h1>
              <p className="mt-1 text-muted-foreground">
                {isPro ? (
                  <span className="inline-flex items-center gap-1.5">
                    <Crown className="h-3.5 w-3.5 text-amber-400" />
                    Pro plan · Unlimited everything
                  </span>
                ) : (
                  "Free plan · 5 prompts · Upgrade for more"
                )}
              </p>
            </div>
            {!isPro && (
              <Button
                className="bg-gradient-pro text-amber-950 hover:opacity-90"
                onClick={() => navigate({ to: "/pricing" })}
              >
                <Crown className="h-4 w-4" /> Upgrade to Pro
              </Button>
            )}
          </div>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
            <StatCard label="My prompts" value={prompts.length} icon={Sparkles} />
            <StatCard label="Total upvotes" value={totalUpvotes} icon={TrendingUp} />
            <StatCard label="Plan" value={isPro ? "PRO" : "FREE"} icon={Crown} highlight={isPro} />
            <StatCard
              label="Limit"
              value={isPro ? "∞" : `${prompts.length}/5`}
              icon={Bookmark}
            />
          </div>

          {/* AI Optimizer */}
          <section className="mt-10">
            <div className="glass-strong relative overflow-hidden rounded-2xl p-6 sm:p-8">
              {!isPro && (
                <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-pro opacity-20 blur-3xl" />
              )}
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <Wand2 className="h-5 w-5 text-accent" />
                    <h2 className="text-xl font-bold">AI Prompt Optimizer</h2>
                    {!isPro && (
                      <Badge className="bg-gradient-pro text-amber-950">PRO</Badge>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Paste any prompt and get a sharper, model-tuned version.
                  </p>
                </div>
                <Select value={optimizerModel} onValueChange={setOptimizerModel}>
                  <SelectTrigger className="w-44">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {["ChatGPT", "Claude", "Gemini", "Midjourney", "DALL·E"].map((m) => (
                      <SelectItem key={m} value={m}>
                        {m}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
                <div>
                  <label className="text-xs font-medium text-muted-foreground">
                    Your prompt
                  </label>
                  <Textarea
                    rows={8}
                    value={optimizerInput}
                    onChange={(e) => setOptimizerInput(e.target.value)}
                    placeholder="Write a blog post about AI…"
                    className="mt-1.5 font-mono text-sm"
                  />
                  <Button
                    variant="hero"
                    className="mt-3 w-full"
                    onClick={optimize}
                    disabled={optimizing || !optimizerInput.trim()}
                  >
                    {optimizing ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Wand2 className="h-4 w-4" />
                    )}
                    {isPro ? "Optimize prompt" : "Try optimizer (Pro)"}
                  </Button>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">
                    Optimized output
                  </label>
                  <div className="mt-1.5 min-h-[200px] rounded-md border border-input bg-surface/40 p-3 font-mono text-sm">
                    {optimizing ? (
                      <span className="text-muted-foreground">Optimizing…</span>
                    ) : optimizerOutput ? (
                      <p className="whitespace-pre-wrap">{optimizerOutput}</p>
                    ) : (
                      <span className="text-muted-foreground">
                        Optimized prompt will appear here.
                      </span>
                    )}
                  </div>
                  {optimizerOutput && (
                    <Button
                      variant="glass"
                      className="mt-3 w-full"
                      onClick={() => {
                        navigator.clipboard.writeText(optimizerOutput);
                        toast.success("Copied!");
                      }}
                    >
                      Copy result
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* My prompts */}
          <section className="mt-10">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">My prompts</h2>
              <Button variant="hero" size="sm" onClick={() => navigate({ to: "/library" })}>
                <Plus className="h-4 w-4" /> New prompt
              </Button>
            </div>

            {loading ? (
              <div className="flex justify-center py-16">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : prompts.length === 0 ? (
              <div className="mt-6 rounded-2xl border border-dashed border-border p-12 text-center">
                <Sparkles className="mx-auto h-8 w-8 text-muted-foreground" />
                <p className="mt-3 font-medium">No prompts yet</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Submit your first prompt from the Library page.
                </p>
                <Button
                  className="mt-4"
                  variant="hero"
                  onClick={() => navigate({ to: "/library" })}
                >
                  Go to Library
                </Button>
              </div>
            ) : (
              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {prompts.map((p) => (
                  <Card key={p.id} className="glass">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2">
                        <Badge variant="secondary" className="text-[10px]">
                          {p.model}
                        </Badge>
                        <button
                          onClick={() => remove(p.id)}
                          className="text-muted-foreground transition-colors hover:text-destructive"
                          aria-label="Delete prompt"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <CardTitle className="mt-2 text-base">{p.title}</CardTitle>
                      {p.description && (
                        <CardDescription className="line-clamp-2">
                          {p.description}
                        </CardDescription>
                      )}
                    </CardHeader>
                    <CardContent>
                      <p className="line-clamp-3 font-mono text-xs text-muted-foreground">
                        {p.content}
                      </p>
                      <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                        <span>{p.category}</span>
                        <span>▲ {p.upvotes}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  highlight,
}: {
  label: string;
  value: string | number;
  icon: typeof Sparkles;
  highlight?: boolean;
}) {
  return (
    <div
      className={`glass rounded-xl p-4 ${
        highlight ? "border-accent/40" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
        <Icon className={`h-4 w-4 ${highlight ? "text-accent" : "text-muted-foreground"}`} />
      </div>
      <div className="mt-2 text-2xl font-bold">{value}</div>
    </div>
  );
}
