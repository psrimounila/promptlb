import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Loader2,
  Plus,
  Sparkles,
  Trash2,
  TrendingUp,
  History,
  Play,
  Copy,
  BookOpen,
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

type HistoryItem = {
  id: string;
  title: string | null;
  prompt: string;
  model: string;
  output: string | null;
  created_at: string;
};

function DashboardPage() {
  const { user, profile, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) navigate({ to: "/auth", search: { mode: "signin" } });
  }, [authLoading, user, navigate]);

  const load = async () => {
    if (!user) return;
    setLoading(true);
    const [promptsRes, historyRes] = await Promise.all([
      supabase
        .from("prompts")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false }),
      supabase
        .from("prompt_history")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(30),
    ]);
    setPrompts((promptsRes.data as Prompt[]) || []);
    setHistory((historyRes.data as HistoryItem[]) || []);
    setLoading(false);
  };

  useEffect(() => {
    if (user) load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const removePrompt = async (id: string) => {
    const { error } = await supabase.from("prompts").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Prompt deleted");
    setPrompts((p) => p.filter((x) => x.id !== id));
  };

  const removeHistory = async (id: string) => {
    const { error } = await supabase.from("prompt_history").delete().eq("id", id);
    if (error) return toast.error(error.message);
    setHistory((h) => h.filter((x) => x.id !== id));
  };

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied");
  };

  const reuse = (h: HistoryItem) => {
    navigate({
      to: "/playground",
      search: {
        prompt: h.prompt,
        model: h.model,
        title: h.title ?? undefined,
      },
    });
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
      <main className="pt-24 pb-20 sm:pt-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight sm:text-4xl">
                Welcome back,{" "}
                <span className="text-gradient-primary">
                  {profile?.display_name || "creator"}
                </span>
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Your prompts, history and saves all in one place.
              </p>
            </div>
            <Button variant="hero" onClick={() => navigate({ to: "/playground" })}>
              <Play className="h-4 w-4" /> Compare Prompts
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatCard label="My prompts" value={prompts.length} icon={Sparkles} />
            <StatCard label="Total upvotes" value={totalUpvotes} icon={TrendingUp} />
            <StatCard label="Runs saved" value={history.length} icon={History} />
            <StatCard label="Explore Prompts" value="Browse" icon={BookOpen} />
          </div>

          {/* History */}
          <section className="mt-10">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-xl font-bold sm:text-2xl">
                <History className="h-5 w-5 text-accent" /> Recent runs
              </h2>
              <Button
                variant="glass"
                size="sm"
                onClick={() => navigate({ to: "/playground" })}
              >
                <Play className="h-4 w-4" /> New run
              </Button>
            </div>

            {loading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : history.length === 0 ? (
              <div className="mt-6 rounded-2xl border border-dashed border-border p-10 text-center">
                <History className="mx-auto h-8 w-8 text-muted-foreground" />
                <p className="mt-3 font-medium">No runs yet</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Run your first prompt in Compare Prompts.
                </p>
                <Button
                  className="mt-4"
                  variant="hero"
                  onClick={() => navigate({ to: "/playground" })}
                >
                  Compare Prompts
                </Button>
              </div>
            ) : (
              <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
                {history.map((h) => (
                  <Card key={h.id} className="glass">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-[10px]">
                            {h.model}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {new Date(h.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <button
                          onClick={() => removeHistory(h.id)}
                          aria-label="Delete run"
                          className="text-muted-foreground transition-colors hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <CardTitle className="mt-2 text-base">
                        {h.title ?? h.prompt.slice(0, 70)}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="line-clamp-3 font-mono text-xs text-muted-foreground">
                        {h.output ?? h.prompt}
                      </p>
                      <div className="mt-3 flex gap-2">
                        <Button
                          size="sm"
                          variant="hero"
                          className="flex-1"
                          onClick={() => reuse(h)}
                        >
                          <Play className="h-3 w-3" /> Reuse
                        </Button>
                        <Button
                          size="sm"
                          variant="glass"
                          onClick={() => copy(h.output ?? h.prompt)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </section>

          {/* My prompts */}
          <section className="mt-10">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold sm:text-2xl">My prompts</h2>
              <Button variant="hero" size="sm" onClick={() => navigate({ to: "/library" })}>
                <Plus className="h-4 w-4" /> New prompt
              </Button>
            </div>

            {loading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : prompts.length === 0 ? (
              <div className="mt-6 rounded-2xl border border-dashed border-border p-10 text-center">
                <Sparkles className="mx-auto h-8 w-8 text-muted-foreground" />
                <p className="mt-3 font-medium">No prompts yet</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Submit your first prompt from the Explore Prompts page.
                </p>
                <Button
                  className="mt-4"
                  variant="hero"
                  onClick={() => navigate({ to: "/library" })}
                >
                  Go to Explore Prompts
                </Button>
              </div>
            ) : (
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {prompts.map((p) => (
                  <Card key={p.id} className="glass">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2">
                        <Badge variant="secondary" className="text-[10px]">
                          {p.model}
                        </Badge>
                        <button
                          onClick={() => removePrompt(p.id)}
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
                      <div className="mt-3 flex gap-2">
                        <Button
                          size="sm"
                          variant="hero"
                          className="flex-1"
                          onClick={() =>
                            navigate({
                              to: "/playground",
                              search: {
                                prompt: p.content,
                                model: p.model,
                                title: p.title,
                              },
                            })
                          }
                        >
                          <Play className="h-3 w-3" /> Run
                        </Button>
                        <Button
                          size="sm"
                          variant="glass"
                          onClick={() => copy(p.content)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
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
}: {
  label: string;
  value: string | number;
  icon: typeof Sparkles;
}) {
  return (
    <div className="glass rounded-xl p-4">
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="mt-2 text-2xl font-bold">{value}</div>
    </div>
  );
}
