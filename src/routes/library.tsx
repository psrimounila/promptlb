import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { Search, Plus, Copy, Loader2, Sparkles, Play, ArrowUp } from "lucide-react";
import { PromptThumb } from "@/components/PromptThumb";

const searchSchema = z.object({
  q: z.string().optional().catch(undefined),
  category: z.string().optional().catch(undefined),
  model: z.string().optional().catch(undefined),
  submit: z.string().optional().catch(undefined),
});

export const Route = createFileRoute("/library")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Explore Prompts · PromptLB" },
      {
        name: "description",
        content:
          "Browse thousands of verified, free AI prompts. Filter by category and model, then run any prompt instantly.",
      },
    ],
  }),
  component: LibraryPage,
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

const MODELS = ["All", "ChatGPT", "Claude", "Gemini", "Midjourney", "DALL·E", "Stable Diffusion"];

type Prompt = {
  id: string;
  user_id: string;
  title: string;
  content: string;
  description: string | null;
  category: string;
  model: string;
  tags: string[];
  upvotes: number;
  is_public: boolean;
  created_at: string;
};

function LibraryPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const initial = Route.useSearch();
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(initial.q ?? "");
  const [category, setCategory] = useState(initial.category ?? "All");
  const [model, setModel] = useState(initial.model ?? "All");
  const [createOpen, setCreateOpen] = useState(false);
  const [viewing, setViewing] = useState<Prompt | null>(null);

  const loadPrompts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("prompts")
      .select("*")
      .order("upvotes", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(500);
    if (error) toast.error(error.message);
    setPrompts((data as Prompt[]) || []);
    setLoading(false);
  };

  useEffect(() => {
    loadPrompts();
  }, []);

  useEffect(() => {
    if (initial.submit === "1" && user) {
      setCreateOpen(true);
    }
  }, [initial.submit, user]);


  const filtered = prompts.filter((p) => {
    if (category !== "All" && p.category !== category) return false;
    if (model !== "All" && p.model !== model) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.content.toLowerCase().includes(q) ||
        (p.description ?? "").toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const upvote = async (p: Prompt, e: React.MouseEvent) => {
    e.stopPropagation();
    const { upvotePrompt } = await import("@/utils/prompts.functions");
    const res = await upvotePrompt({ data: { promptId: p.id } });
    if (res.error) {
      toast.error(res.error);
      return;
    }
    const next = typeof res.upvotes === "number" ? res.upvotes : p.upvotes + 1;
    setPrompts((arr) =>
      arr.map((x) => (x.id === p.id ? { ...x, upvotes: next } : x)),
    );
    toast.success("Upvoted!");
  };

  const runInPlayground = (p: Prompt) => {
    navigate({
      to: "/playground",
      search: { prompt: p.content, model: p.model, title: p.title },
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-24 pb-20 sm:pt-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-accent">
                Explore Prompts
              </span>
              <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-5xl">
                Browse <span className="text-gradient-primary">verified prompts</span>
              </h1>
              <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                {filtered.length} prompts · curated by the community
              </p>
            </div>
            {user && (
              <Dialog open={createOpen} onOpenChange={setCreateOpen}>
                <DialogTrigger asChild>
                  <Button variant="hero">
                    <Plus className="h-4 w-4" /> Submit a prompt
                  </Button>
                </DialogTrigger>
                <CreatePromptDialog
                  onCreated={() => {
                    setCreateOpen(false);
                    loadPrompts();
                  }}
                />
              </Dialog>
            )}
          </div>

          {/* Filters */}
          <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by keyword, tag, or description..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="sm:w-56">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={model} onValueChange={setModel}>
              <SelectTrigger className="sm:w-44">
                <SelectValue placeholder="Model" />
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

          {loading ? (
            <div className="flex items-center justify-center py-32">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="mt-16 rounded-2xl border border-dashed border-border p-12 text-center">
              <Sparkles className="mx-auto h-8 w-8 text-muted-foreground" />
              <p className="mt-3 font-medium">No prompts match your filters</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Try a different keyword or clear your filters.
              </p>
              <Button
                variant="glass"
                size="sm"
                className="mt-4"
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                  setModel("All");
                }}
              >
                Clear filters
              </Button>
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p) => (
                <Card
                  key={p.id}
                  className="glass group relative cursor-pointer overflow-hidden transition-all hover:-translate-y-0.5 hover:border-primary/40"
                  onClick={() => setViewing(p)}
                >
                  <PromptThumb category={p.category} model={p.model} />
                  <CardHeader className="pr-24">
                    <div className="flex items-start justify-between gap-2">
                      <Badge variant="secondary" className="text-[10px]">
                        {p.model}
                      </Badge>
                      <button
                        onClick={(e) => upvote(p, e)}
                        className="relative z-20 flex items-center gap-1 rounded-full border border-border bg-surface px-2 py-0.5 text-[11px] font-semibold text-muted-foreground transition-colors hover:border-accent/50 hover:text-accent"
                      >
                        <ArrowUp className="h-3 w-3" />
                        {p.upvotes}
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
                    <div className="mt-3 flex flex-wrap gap-1">
                      {p.tags.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="rounded-md bg-surface px-1.5 py-0.5 text-[10px] text-muted-foreground"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                    <div className="mt-3 flex gap-2" onClick={(e) => e.stopPropagation()}>
                      <Button
                        size="sm"
                        variant="hero"
                        className="flex-1"
                        onClick={() => runInPlayground(p)}
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
        </div>
      </main>

      <Dialog open={!!viewing} onOpenChange={(o) => !o && setViewing(null)}>
        {viewing && (
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary">{viewing.model}</Badge>
                <Badge variant="outline">{viewing.category}</Badge>
              </div>
              <DialogTitle className="mt-2 text-2xl">{viewing.title}</DialogTitle>
              {viewing.description && (
                <DialogDescription>{viewing.description}</DialogDescription>
              )}
            </DialogHeader>
            <div className="rounded-xl border border-border bg-surface/60 p-4">
              <p className="whitespace-pre-wrap font-mono text-sm leading-relaxed">
                {viewing.content}
              </p>
            </div>
            <div className="flex flex-wrap gap-1">
              {viewing.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-md bg-surface px-2 py-0.5 text-xs text-muted-foreground"
                >
                  #{t}
                </span>
              ))}
            </div>
            <DialogFooter className="flex-col gap-2 sm:flex-row sm:gap-2">
              <Button variant="glass" onClick={() => copy(viewing.content)}>
                <Copy className="h-4 w-4" /> Copy prompt
              </Button>
              <Button
                variant="hero"
                onClick={() => {
                  runInPlayground(viewing);
                  setViewing(null);
                }}
              >
                <Play className="h-4 w-4" /> Test Prompts
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
      <Footer />
    </div>
  );
}

function CreatePromptDialog({ onCreated }: { onCreated: () => void }) {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Marketing");
  const [model, setModel] = useState("ChatGPT");
  const [tags, setTags] = useState("");
  const [saving, setSaving] = useState(false);

  const submit = async () => {
    if (!user) return;
    setSaving(true);
    const tagArr = tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const { error } = await supabase.from("prompts").insert({
      user_id: user.id,
      title,
      content,
      description: description || null,
      category,
      model,
      tags: tagArr,
      is_public: true,
    });
    setSaving(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Prompt published!");
    setTitle("");
    setContent("");
    setDescription("");
    setTags("");
    onCreated();
  };

  return (
    <DialogContent className="max-w-xl">
      <DialogHeader>
        <DialogTitle>Submit a prompt</DialogTitle>
        <DialogDescription>
          Share your best prompt with the community. Free for everyone.
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Cinematic Midjourney portrait"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="desc">Short description</Label>
          <Input
            id="desc"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What does this prompt do?"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label>Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.filter((c) => c !== "All").map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>Model</Label>
            <Select value={model} onValueChange={setModel}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {MODELS.filter((m) => m !== "All").map((m) => (
                  <SelectItem key={m} value={m}>
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="content">Prompt content</Label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your prompt here..."
            rows={6}
            className="font-mono text-sm"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="tags">Tags (comma separated)</Label>
          <Input
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="portrait, cinematic, lighting"
          />
        </div>
      </div>
      <DialogFooter>
        <Button
          variant="hero"
          disabled={!title || !content || saving}
          onClick={submit}
        >
          {saving && <Loader2 className="h-4 w-4 animate-spin" />}
          Publish prompt
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
