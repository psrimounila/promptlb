import { Button } from "@/components/ui/button";
import { ArrowRight, XCircle, CheckCircle2, Copy, Play, Plus, Check } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { HeroEnhancer } from "./HeroEnhancer";
import {
  ChatGPTLogo,
  ClaudeLogo,
  GeminiLogo,
  MidjourneyLogo,
  DalleLogo,
  StableDiffusionLogo,
} from "@/components/AIModelLogos";

const AI_MODELS = [
  { name: "ChatGPT", Logo: ChatGPTLogo },
  { name: "Claude", Logo: ClaudeLogo },
  { name: "Gemini", Logo: GeminiLogo },
  { name: "Midjourney", Logo: MidjourneyLogo },
  { name: "DALL·E", Logo: DalleLogo },
  { name: "Stable Diffusion", Logo: StableDiffusionLogo },
];

const ENHANCED_LINES = [
  "🎯 Goal: Write a professional LinkedIn post on AI's impact on B2B founders.",
  "👥 Audience: SaaS founders and product leaders shipping AI features.",
  "🎨 Tone: Confident, contrarian, conversational. No buzzwords.",
  "📋 Format: 4-line hook + 3 concrete insights + 1 question CTA.",
];

export function Hero() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const BEFORE_TEXT = "Write a LinkedIn post about AI";
  const AFTER_TEXT = ENHANCED_LINES.join("\n");

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    toast.success("Prompt copied");
    setTimeout(() => setCopiedKey((k) => (k === key ? null : k)), 1500);
  };

  const runInTestPrompts = (text: string, title: string) => {
    navigate({
      to: "/playground",
      search: { prompt: text, model: "ChatGPT", title },
    });
  };

  const openSubmit = () => {
    if (!user) {
      navigate({ to: "/auth", search: { mode: "signup" } });
      return;
    }
    navigate({ to: "/library", search: { submit: "1" } });
  };

  return (
    <section className="relative pt-20 pb-8 sm:pt-28 sm:pb-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header block */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
            <span className="text-xs font-medium text-muted-foreground">
              AI Prompt Enhancement Platform
            </span>
          </div>

          <h1
            className="animate-fade-up mt-4 text-balance text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl md:text-5xl"
            style={{ animationDelay: "0.05s" }}
          >
            Turn Rough Ideas Into{" "}
            <span className="text-gradient-primary">Smarter AI Prompts</span>
          </h1>

          <p
            className="animate-fade-up mx-auto mt-3 max-w-2xl text-balance text-sm text-muted-foreground sm:text-base"
            style={{ animationDelay: "0.1s" }}
          >
            Generate high-quality prompts and understand the logic behind every improvement.
          </p>
        </div>

        {/* Two-column: on mobile, enhancer first then before/after */}
        <div
          className="animate-fade-up mt-8 grid grid-cols-1 items-stretch gap-6 lg:mt-12 lg:grid-cols-2"
          style={{ animationDelay: "0.15s" }}
        >
          {/* Enhancer tool - order-1 on mobile, order-2 on desktop */}
          <div className="order-1 lg:order-2 lg:sticky lg:top-24">
            <HeroEnhancer />

            <div className="mt-4 flex flex-col justify-center gap-2 sm:flex-row">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
                onClick={() => navigate({ to: "/library" })}
              >
                Explore Prompts
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                size="lg"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 sm:w-auto"
                onClick={openSubmit}
              >
                <Plus className="h-4 w-4" />
                Submit Prompt
              </Button>
            </div>
          </div>

          {/* Before vs After - order-2 on mobile, order-1 on desktop */}
          <div className="order-2 flex flex-col gap-4 lg:order-1">
            <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
              <div className="mb-3 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-destructive/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-destructive">
                  <XCircle className="h-3 w-3" /> Before
                </span>
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  Basic prompt
                </span>
              </div>
              <div className="rounded-lg border border-border bg-surface p-3">
                <p className="font-mono text-xs text-foreground/85 sm:text-sm">
                  "{BEFORE_TEXT}"
                </p>
              </div>
              <div className="mt-3 rounded-lg border border-dashed border-border bg-surface/60 p-3 text-xs text-muted-foreground">
                AI is changing the world. It's amazing how fast it's growing.
                Everyone should learn about AI. #AI #tech
              </div>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                <p className="text-[11px] text-destructive">● Generic · Low engagement</p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="h-8" onClick={() => copy(BEFORE_TEXT, "before")}>
                    {copiedKey === "before" ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    Copy
                  </Button>
                  <Button size="sm" className="h-8 bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => runInTestPrompts(BEFORE_TEXT, "Basic LinkedIn Prompt")}>
                    <Play className="h-3.5 w-3.5" /> Run
                  </Button>
                </div>
              </div>
            </div>

            <div className="relative rounded-2xl border border-primary/30 bg-card p-5 shadow-elegant">
              <div className="mb-3 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                  <CheckCircle2 className="h-3 w-3" /> After PromptLB
                </span>
                <span className="text-[10px] uppercase tracking-widest text-primary">
                  Enhanced
                </span>
              </div>
              <div className="rounded-lg border border-primary/20 bg-surface p-3">
                <div className="space-y-1 font-mono text-[11px] leading-relaxed text-foreground/90 sm:text-xs">
                  {ENHANCED_LINES.map((l) => (
                    <div key={l} className="line-clamp-1">{l}</div>
                  ))}
                </div>
              </div>
              <div className="mt-3 rounded-lg border border-primary/20 bg-surface/60 p-3 text-xs text-foreground">
                Most "AI advice" is noise. Here's what actually ships:
                <br />→ Replace a workflow, not a job
                <br />→ Charge for outcomes, not tokens
                <br />→ Ship weekly, measure retention
                <br />Which one are you betting on?
              </div>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                <p className="text-[11px] text-primary">● Specific · High-engagement structure</p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="h-8 border-primary/40 text-primary hover:bg-primary/10" onClick={() => copy(AFTER_TEXT, "after")}>
                    {copiedKey === "after" ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    Copy
                  </Button>
                  <Button size="sm" className="h-8 bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => runInTestPrompts(AFTER_TEXT, "Enhanced LinkedIn Prompt")}>
                    <Play className="h-3.5 w-3.5" /> Run
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* AI model logos */}
        <div className="mt-12 sm:mt-16">
          <div className="mb-5 text-center text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Optimized for
          </div>
          <div className="mx-auto grid max-w-3xl grid-cols-3 gap-x-4 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
            {AI_MODELS.map(({ name, Logo }) => (
              <div
                key={name}
                className="logo-hover flex flex-col items-center justify-center gap-2 text-muted-foreground"
              >
                <Logo className="h-7 w-7 sm:h-8 sm:w-8" />
                <span className="text-[11px] font-medium sm:text-xs">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
