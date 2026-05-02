import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { runPrompt } from "@/utils/runPrompt.functions";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  Play,
  Copy,
  Loader2,
  Sparkles,
  History,
  Trash2,
  Wand2,
} from "lucide-react";
import { z } from "zod";

const search = z.object({
  prompt: z.string().optional(),
  model: z.string().optional(),
  title: z.string().optional(),
});

export const Route = createFileRoute("/playground")({
  validateSearch: search,
  head: () => ({
    meta: [
      { title: "Prompt Playground · PromptLB" },
      {
        name: "description",
        content:
          "Run any prompt against your favorite AI model and see the output instantly. Free, fast, and saved to your history.",
      },
    ],
  }),
  component: PlaygroundPage,
});

const MODELS = ["ChatGPT", "GPT-5", "Claude", "Gemini", "Gemini Pro", "Midjourney"];

const STARTER_PROMPTS = [
  {
    title: "Viral LinkedIn Hook",
    model: "ChatGPT",
    prompt:
      "Write a scroll-stopping LinkedIn post about why most product launches fail. 200 words, punchy first line, one contrarian insight, end with a question.",
  },
  {
    title: "Cinematic Image Brief",
    model: "Midjourney",
    prompt:
      "cinematic portrait of a young inventor in a neon-lit workshop, volumetric light, shot on Arri Alexa, 35mm, ultra detailed, 8k --ar 16:9 --style raw",
  },
  {
    title: "Code Review",
    model: "Claude",
    prompt:
      "Review this Python function and suggest improvements:\n\ndef fib(n):\n  if n <= 1: return n\n  return fib(n-1) + fib(n-2)",
  },
];

type HistoryItem = {
  id: string;
  title: string | null;
  prompt: string;
  model: string;
  output: string | null;
  created_at: string;
};

function PlaygroundPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const initial = Route.useSearch();
  const runPromptFn = useServerFn(runPrompt);

  const [prompt, setPrompt] = useState(initial.prompt ?? "");
  const [model, setModel] = useState(initial.model ?? "ChatGPT");
  const [title, setTitle] = useState(initial.title ?? "");
  const [output, setOutput] = useState("");
  const [outputType, setOutputType] = useState<"text" | "image">("text");
  const [running, setRunning] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const loadHistory = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("prompt_history")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(20);
    setHistory((data as HistoryItem[]) ?? []);
  };

  useEffect(() => {
    loadHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const handleRun = async () => {
    if (!prompt.trim()) {
      toast.error("Type a prompt first");
      return;
    }
    setRunning(true);
    setOutput("");
    setOutputType("text");
    try {
      const res = await runPromptFn({ data: { prompt, model } });
      if (res.error) {
        toast.error(res.error);
        return;
      }
      setOutput(res.output);
      setOutputType(res.outputType ?? "text");

      if (user && res.output) {
        await supabase.from("prompt_history").insert({
          user_id: user.id,
          prompt,
          model,
          output: res.output,
          title: title || prompt.slice(0, 60),
        });
        loadHistory();
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to run prompt";
      toast.error(msg);
    } finally {
      setRunning(false);
    }
  };

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const useHistoryItem = (h: HistoryItem) => {
    setPrompt(h.prompt);
    setModel(h.model);
    const out = h.output ?? "";
    setOutput(out);
    setOutputType(out.startsWith("data:image") || out.startsWith("http") ? "image" : "text");
    setTitle(h.title ?? "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const removeHistory = async (id: string) => {
    await supabase.from("prompt_history").delete().eq("id", id);
    setHistory((h) => h.filter((x) => x.id !== id));
    toast.success("Removed");
  };

  const useStarter = (s: (typeof STARTER_PROMPTS)[number]) => {
    setPrompt(s.prompt);
    setModel(s.model);
    setTitle(s.title);
    setOutput("");
    setOutputType("text");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-24 pb-20 sm:pt-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center sm:text-left">
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">
              Playground
            </span>
            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-5xl">
              Run any prompt.{" "}
              <span className="text-gradient-primary">See real output.</span>
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
              Free for everyone. Sign in to save your prompt history and reuse
              your best results.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Left: editor */}
            <div className="lg:col-span-2 space-y-4">
              <div className="glass-strong rounded-2xl p-4 sm:p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <Wand2 className="h-4 w-4 text-accent" />
                  <span className="text-sm font-semibold">Your prompt</span>
                  <div className="ml-auto">
                    <Select value={model} onValueChange={setModel}>
                      <SelectTrigger className="h-8 w-40 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {MODELS.map((m) => (
                          <SelectItem key={m} value={m}>
                            {m}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Textarea
                  rows={10}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Write a cold email to a SaaS founder offering a 15-min call..."
                  className="mt-3 font-mono text-sm"
                />
                <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                  <Button
                    variant="hero"
                    className="flex-1"
                    onClick={handleRun}
                    disabled={running || !prompt.trim()}
                  >
                    {running ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                    Run prompt
                  </Button>
                  <Button
                    variant="glass"
                    onClick={() => copy(prompt)}
                    disabled={!prompt}
                  >
                    <Copy className="h-4 w-4" /> Copy prompt
                  </Button>
                </div>
                {!user && (
                  <p className="mt-3 text-xs text-muted-foreground">
                    <button
                      className="text-accent underline"
                      onClick={() =>
                        navigate({
                          to: "/auth",
                          search: { mode: "signup" },
                        })
                      }
                    >
                      Create a free account
                    </button>{" "}
                    to save your run history.
                  </p>
                )}
              </div>

              {/* Output */}
              <div className="glass-strong rounded-2xl p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-accent" />
                    <span className="text-sm font-semibold">Output preview</span>
                    <Badge variant="secondary" className="text-[10px]">
                      {model}
                    </Badge>
                  </div>
                  {output && outputType === "text" && (
                    <Button
                      size="sm"
                      variant="glass"
                      onClick={() => copy(output)}
                    >
                      <Copy className="h-3.5 w-3.5" /> Copy
                    </Button>
                  )}
                  {output && outputType === "image" && (
                    <Button
                      size="sm"
                      variant="glass"
                      asChild
                    >
                      <a href={output} download={`${title || "image"}.png`}>
                        <Copy className="h-3.5 w-3.5" /> Download
                      </a>
                    </Button>
                  )}
                </div>
                <div className="mt-3 min-h-[220px] rounded-xl border border-border bg-surface/40 p-4 font-mono text-sm leading-relaxed whitespace-pre-wrap">
                  {running ? (
                    <span className="inline-flex items-center gap-2 text-muted-foreground">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Generating with {model}...
                    </span>
                  ) : output ? (
                    outputType === "image" ? (
                      <img
                        src={output}
                        alt={title || prompt.slice(0, 80)}
                        className="mx-auto max-h-[520px] w-auto rounded-lg"
                      />
                    ) : (
                      output
                    )
                  ) : (
                    <span className="text-muted-foreground">
                      Output will appear here. Hit Run to see your AI response.
                    </span>
                  )}
                </div>
              </div>

              {/* Starter prompts */}
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Try a starter prompt
                </p>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                  {STARTER_PROMPTS.map((s) => (
                    <button
                      key={s.title}
                      onClick={() => useStarter(s)}
                      className="glass rounded-xl p-3 text-left transition-all hover:-translate-y-0.5 hover:border-primary/40"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold">{s.title}</span>
                        <Badge variant="secondary" className="text-[10px]">
                          {s.model}
                        </Badge>
                      </div>
                      <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                        {s.prompt}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: history */}
            <aside className="space-y-3">
              <div className="flex items-center gap-2">
                <History className="h-4 w-4 text-accent" />
                <h2 className="text-sm font-semibold uppercase tracking-widest">
                  Your history
                </h2>
              </div>

              {!user ? (
                <div className="glass rounded-2xl p-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    Sign in to save and reuse every prompt you run.
                  </p>
                  <Button
                    variant="hero"
                    size="sm"
                    className="mt-4 w-full"
                    onClick={() =>
                      navigate({ to: "/auth", search: { mode: "signup" } })
                    }
                  >
                    Create free account
                  </Button>
                </div>
              ) : history.length === 0 ? (
                <div className="glass rounded-2xl p-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    No runs yet. Run your first prompt to save it here.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {history.map((h) => (
                    <div
                      key={h.id}
                      className="glass group rounded-xl p-3 transition-all hover:border-primary/40"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <button
                          onClick={() => useHistoryItem(h)}
                          className="min-w-0 flex-1 text-left"
                        >
                          <div className="flex items-center gap-1.5">
                            <Badge
                              variant="secondary"
                              className="text-[10px]"
                            >
                              {h.model}
                            </Badge>
                            <span className="truncate text-xs text-muted-foreground">
                              {new Date(h.created_at).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="mt-1.5 line-clamp-2 text-sm font-medium">
                            {h.title ?? h.prompt.slice(0, 60)}
                          </p>
                        </button>
                        <button
                          onClick={() => removeHistory(h.id)}
                          aria-label="Remove from history"
                          className="text-muted-foreground opacity-0 transition-opacity hover:text-destructive group-hover:opacity-100"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
