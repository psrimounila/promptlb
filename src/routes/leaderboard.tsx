import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  Trophy,
  Play,
  Copy,
  ArrowUp,
  Crown,
  Loader2,
  Medal,
} from "lucide-react";

export const Route = createFileRoute("/leaderboard")({
  head: () => ({
    meta: [
      { title: "Prompt Leaderboard · PromptLB" },
      {
        name: "description",
        content:
          "The most upvoted AI prompts of all time. See what works best across Marketing, UI/UX, Coding, Business, and Content Creation.",
      },
    ],
  }),
  component: LeaderboardPage,
});

const CATEGORIES = [
  "All",
  "Marketing",
  "UI/UX",
  "Coding",
  "Business",
  "Content Creation",
  "Image & Design",
];

type Prompt = {
  id: string;
  title: string;
  description: string | null;
  content: string;
  category: string;
  model: string;
  tags: string[];
  upvotes: number;
};

function LeaderboardPage() {
  const navigate = useNavigate();
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("All");

  const load = async () => {
    setLoading(true);
    let query = supabase
      .from("prompts")
      .select("*")
      .eq("is_public", true)
      .order("upvotes", { ascending: false })
      .limit(50);
    if (category !== "All") query = query.eq("category", category);
    const { data, error } = await query;
    if (error) toast.error(error.message);
    setPrompts((data as Prompt[]) || []);
    setLoading(false);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const upvote = async (p: Prompt) => {
    const { data, error } = await (
      supabase.rpc as unknown as (
        fn: string,
        args: Record<string, unknown>,
      ) => Promise<{ data: number | null; error: { message: string } | null }>
    )("increment_prompt_upvotes", { _prompt_id: p.id });
    if (error) {
      toast.error(error.message);
      return;
    }
    const next = typeof data === "number" ? data : p.upvotes + 1;
    setPrompts((arr) =>
      arr
        .map((x) => (x.id === p.id ? { ...x, upvotes: next } : x))
        .sort((a, b) => b.upvotes - a.upvotes),
    );
    toast.success("Upvoted!");
  };

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const run = (p: Prompt) => {
    navigate({
      to: "/playground",
      search: { prompt: p.content, model: p.model, title: p.title },
    });
  };

  const rankColor = (i: number) => {
    if (i === 0) return "text-yellow-400";
    if (i === 1) return "text-zinc-300";
    if (i === 2) return "text-amber-600";
    return "text-muted-foreground";
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-24 pb-20 sm:pt-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="text-center sm:text-left">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-accent">
              <Trophy className="h-3.5 w-3.5" /> Leaderboard
            </span>
            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-5xl">
              Top prompts,{" "}
              <span className="text-gradient-primary">ranked by you</span>
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
              The most upvoted prompts across the community. Updated in real
              time as people vote.
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-1.5">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                    category === c
                      ? "border-primary/50 bg-primary/10 text-foreground"
                      : "border-border bg-surface/60 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="hidden w-44 sm:flex">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-32">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <div className="mt-8 space-y-3">
              {prompts.map((p, i) => (
                <Card
                  key={p.id}
                  className="glass group overflow-hidden transition-all hover:border-primary/40"
                >
                  <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:p-5">
                    {/* Rank */}
                    <div className="flex items-center gap-3 sm:w-16 sm:flex-col sm:items-center sm:justify-center">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-elevated text-lg font-bold ${rankColor(
                          i,
                        )}`}
                      >
                        {i === 0 ? (
                          <Crown className="h-5 w-5" />
                        ) : i < 3 ? (
                          <Medal className="h-5 w-5" />
                        ) : (
                          `#${i + 1}`
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <Badge variant="secondary" className="text-[10px]">
                          {p.model}
                        </Badge>
                        <Badge variant="outline" className="text-[10px]">
                          {p.category}
                        </Badge>
                      </div>
                      <h3 className="mt-2 line-clamp-1 font-semibold">
                        {p.title}
                      </h3>
                      {p.description && (
                        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                          {p.description}
                        </p>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 sm:flex-col sm:items-end">
                      <button
                        onClick={() => upvote(p)}
                        className="flex items-center gap-1.5 rounded-full border border-border bg-surface/60 px-3 py-1.5 text-sm font-semibold transition-colors hover:border-accent/50 hover:bg-accent/10 hover:text-accent"
                      >
                        <ArrowUp className="h-3.5 w-3.5" />
                        {p.upvotes}
                      </button>
                      <div className="flex gap-1.5">
                        <Button
                          size="sm"
                          variant="hero"
                          onClick={() => run(p)}
                          className="h-8"
                        >
                          <Play className="h-3 w-3" /> Run
                        </Button>
                        <Button
                          size="sm"
                          variant="glass"
                          onClick={() => copy(p.content)}
                          className="h-8"
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
