import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Copy, Check, Target, Users, Palette, LayoutList, TrendingUp, ArrowLeft, Brain } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/breakdown")({
  head: () => ({
    meta: [
      { title: "Prompt Breakdown · PromptLB" },
      {
        name: "description",
        content: "Learn why your enhanced prompt works — goal, audience, tone, format, and the key improvements applied.",
      },
    ],
  }),
  component: BreakdownPage,
});

type Payload = { original: string; enhanced: string; outputType: "text" | "image" | "code" };

function extractSection(text: string, emoji: string): string | null {
  const re = new RegExp(`\\*\\*${emoji}[^*]*\\*\\*\\s*([\\s\\S]*?)(?=\\n\\*\\*|$)`);
  const m = text.match(re);
  return m ? m[1].trim() : null;
}

function BreakdownPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [payload, setPayload] = useState<Payload | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      toast.info("Sign in to unlock the prompt breakdown");
      navigate({ to: "/auth", search: { mode: "signup" } });
      return;
    }
    try {
      const raw = sessionStorage.getItem("promptlb:breakdown");
      if (raw) setPayload(JSON.parse(raw));
      sessionStorage.removeItem("promptlb:post-auth-redirect");
    } catch {}
  }, [user, loading, navigate]);

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 text-center text-sm text-muted-foreground">Loading…</div>
      </div>
    );
  }

  if (!payload) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="mx-auto max-w-2xl px-4 pt-32 pb-16 text-center">
          <Brain className="mx-auto h-10 w-10 text-primary" />
          <h1 className="mt-4 text-2xl font-bold">No prompt to break down yet</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Generate an enhanced prompt first, then click "Learn Why This Prompt Works".
          </p>
          <Button asChild className="mt-6 bg-primary text-primary-foreground hover:bg-primary/90">
            <Link to="/">Try Prompt Enhancer</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const goal = extractSection(payload.enhanced, "🎯") ?? "Defines what you want the AI to accomplish.";
  const audience = extractSection(payload.enhanced, "👥") ?? "Describes who the response is for.";
  const tone = extractSection(payload.enhanced, "🎨") ?? "Sets the voice and register.";
  const format = extractSection(payload.enhanced, "📋") ?? "Specifies output structure and length.";

  const copyPrompt = () => {
    navigator.clipboard.writeText(payload.enhanced);
    setCopied(true);
    toast.success("Prompt copied");
    setTimeout(() => setCopied(false), 2000);
  };

  const improvements = [
    "Added a clear, single-sentence goal so the model knows exactly what to produce.",
    "Named the target audience so vocabulary, examples, and depth match real readers.",
    "Locked tone and style to avoid generic, buzzword-heavy AI output.",
    "Specified format (length, structure, sections) to make results paste-ready.",
    "Turned a one-liner into a role + context + task + constraints prompt.",
  ];

  const sections = [
    { icon: Target, title: "Goal", body: goal, why: "A clear goal keeps the model on-task and prevents rambling generic answers." },
    { icon: Users, title: "Audience", body: audience, why: "Audience context controls vocabulary, examples, and depth — outputs feel written for a real person." },
    { icon: Palette, title: "Tone", body: tone, why: "Explicit tone stops the model from defaulting to a neutral corporate voice." },
    { icon: LayoutList, title: "Format", body: format, why: "Specifying format (headings, bullets, length) makes results structured and paste-ready." },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 pt-24 pb-16 sm:px-6 sm:pt-28">
        <Button variant="ghost" size="sm" onClick={() => navigate({ to: "/" })}>
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>

        <div className="mt-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Brain className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">Learn Why This Prompt Works</h1>
            <p className="text-sm text-muted-foreground">A guided breakdown of every element in your enhanced prompt.</p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* LEFT: Enhanced prompt */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-widest text-primary">Enhanced Prompt</span>
                <Button size="sm" onClick={copyPrompt} className="bg-primary text-primary-foreground hover:bg-primary/90">
                  {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? "Copied!" : "Copy Prompt"}
                </Button>
              </div>
              <pre className="max-h-[520px] overflow-auto whitespace-pre-wrap rounded-lg border border-border bg-surface p-4 font-sans text-xs leading-relaxed text-foreground sm:text-sm">
                {payload.enhanced}
              </pre>
              {payload.original && (
                <div className="mt-4">
                  <div className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Your original idea</div>
                  <div className="mt-1.5 rounded-lg border border-dashed border-border bg-surface/60 p-3 font-mono text-xs text-muted-foreground">
                    {payload.original}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: Breakdown */}
          <div className="space-y-4">
            {sections.map(({ icon: Icon, title, body, why }) => (
              <div key={title} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                <div className="mb-2 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-4 w-4" />
                  </div>
                  <h3 className="text-base font-semibold">{title}</h3>
                </div>
                <p className="text-sm text-foreground/90">{body}</p>
                <p className="mt-2 text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">Why it matters: </span>
                  {why}
                </p>
              </div>
            ))}

            <div className="rounded-2xl border border-primary/30 bg-card p-5 shadow-elegant">
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <TrendingUp className="h-4 w-4" />
                </div>
                <h3 className="text-base font-semibold">Key Improvements Made</h3>
              </div>
              <ul className="space-y-2">
                {improvements.map((i) => (
                  <li key={i} className="flex gap-2 text-sm text-foreground/90">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
