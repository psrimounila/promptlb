import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Sparkles,
  Wand2,
  Bot,
  Image as ImageIcon,
  Code2,
  Zap,
  XCircle,
  CheckCircle2,
  ArrowDown,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import heroOrb from "@/assets/hero-orb.jpg";
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

const ENHANCED_SECTIONS: { label: string; emoji: string; text: string }[] = [
  { emoji: "🎯", label: "Goal", text: "Write a viral tweet that sparks debate about AI hype vs real impact." },
  { emoji: "👥", label: "Audience", text: "Startup founders and product builders shipping AI features." },
  { emoji: "🎨", label: "Tone & Style", text: "Bold, contrarian, conversational. No buzzwords." },
  { emoji: "📋", label: "Format", text: "1-line hook + 3 short bullets + 1 question CTA. Under 280 chars." },
  { emoji: "📝", label: "Prompt", text: "You are a sharp tech founder on X. Write a single tweet under 280 characters that opens with a contrarian hook about AI advice being noise, then lists 3 punchy do/don'ts (ship features not demos, replace workflows not jobs, charge for outcomes not tokens), and ends with a question that invites replies. No hashtags. No emojis." },
];

export function Hero() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const scrollToEnhancer = () => {
    const el = document.getElementById("enhancer");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative overflow-hidden pt-20 pb-10 sm:pt-28 sm:pb-16">
      {/* Animated gradient blobs background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
        <div className="blob blob-purple absolute -top-32 -left-24 h-[420px] w-[420px] rounded-full" />
        <div className="blob blob-blue absolute top-1/3 -right-32 h-[480px] w-[480px] rounded-full" style={{ animationDelay: "-6s" }} />
        <div className="blob blob-pink absolute bottom-0 left-1/3 h-[380px] w-[380px] rounded-full" style={{ animationDelay: "-12s" }} />
      </div>

      <div className="pointer-events-none absolute left-1/2 top-1/4 -z-10 -translate-x-1/2 opacity-50">
        <img
          src={heroOrb}
          alt=""
          width={1280}
          height={1280}
          className="animate-float h-[400px] w-[400px] object-contain blur-2xl sm:h-[800px] sm:w-[800px]"
        />
      </div>

      {/* Floating decorative illustrations */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 hidden lg:block"
      >
        <div className="animate-float absolute left-[5%] top-[18%] flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-surface/40 backdrop-blur-md" style={{ animationDelay: "0s" }}>
          <Bot className="h-5 w-5 text-primary-glow" />
        </div>
        <div className="animate-float absolute right-[6%] top-[22%] flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-surface/40 backdrop-blur-md" style={{ animationDelay: "1.2s" }}>
          <Wand2 className="h-5 w-5 text-accent" />
        </div>
        <div className="animate-float absolute left-[8%] top-[62%] flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-surface/40 backdrop-blur-md" style={{ animationDelay: "2.4s" }}>
          <Code2 className="h-5 w-5 text-primary" />
        </div>
        <div className="animate-float absolute right-[8%] top-[60%] flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-surface/40 backdrop-blur-md" style={{ animationDelay: "0.6s" }}>
          <ImageIcon className="h-5 w-5 text-primary-glow" />
        </div>
        <div className="animate-float absolute left-[3%] top-[42%] flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-surface/30 backdrop-blur-md" style={{ animationDelay: "1.8s" }}>
          <Sparkles className="h-4 w-4 text-accent" />
        </div>
        <div className="animate-float absolute right-[3%] top-[42%] flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-surface/30 backdrop-blur-md" style={{ animationDelay: "3s" }}>
          <Zap className="h-4 w-4 text-primary-glow" />
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
        <div className="animate-fade-up mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 backdrop-blur-md">
          <Sparkles className="h-3.5 w-3.5 text-accent" />
          <span className="text-xs font-medium text-muted-foreground">
            100% free · See the difference instantly
          </span>
        </div>

        <h1
          className="animate-fade-up text-balance text-3xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl"
          style={{ animationDelay: "0.1s" }}
        >
          Turn Simple Prompts into{" "}
          <span className="text-gradient-primary">Powerful Results</span>
        </h1>

        <p
          className="animate-fade-up mx-auto mt-4 max-w-2xl text-balance text-sm text-muted-foreground sm:mt-5 sm:text-lg"
          style={{ animationDelay: "0.2s" }}
        >
          Enhance your prompts and get better AI outputs instantly.
        </p>

        <div
          className="animate-fade-up mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row"
          style={{ animationDelay: "0.3s" }}
        >
          <Button
            variant="hero"
            size="xl"
            className="group w-full sm:w-auto"
            onClick={scrollToEnhancer}
          >
            <Sparkles className="h-4 w-4" />
            Try Prompt Enhancer
            <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
          </Button>
          <Button
            variant="glass"
            size="xl"
            className="w-full sm:w-auto"
            onClick={() => navigate({ to: "/library" })}
          >
            Explore Prompts
          </Button>
        </div>

        {/* Before / After Comparison */}
        <div
          className="animate-fade-up mt-12 sm:mt-16"
          style={{ animationDelay: "0.4s" }}
        >
          <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-[1fr_auto_1fr] md:gap-6">
            {/* BEFORE */}
            <div className="glass rounded-2xl p-5 text-left opacity-90 transition-all hover:opacity-100 sm:p-6">
              <div className="mb-3 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-destructive/30 bg-destructive/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-destructive">
                  <XCircle className="h-3 w-3" /> Before
                </span>
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  Basic prompt
                </span>
              </div>
              <div className="rounded-lg border border-border bg-surface/60 p-3">
                <p className="font-mono text-xs text-foreground/80 sm:text-sm">
                  "write a tweet about AI"
                </p>
              </div>
              <div className="mt-3 text-[10px] uppercase tracking-wider text-muted-foreground">
                Output
              </div>
              <div className="mt-2 rounded-lg border border-dashed border-border bg-background/40 p-3 text-xs text-muted-foreground sm:text-sm">
                AI is changing the world. It's amazing how fast it's growing.
                Everyone should learn about AI. #AI #tech
              </div>
              <div className="mt-3 flex items-center gap-1 text-[11px] text-muted-foreground">
                <span className="text-destructive">●</span> Generic · Low engagement
              </div>
            </div>

            {/* Arrow */}
            <div className="flex items-center justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-primary shadow-elegant md:h-14 md:w-14">
                <ArrowRight className="hidden h-5 w-5 text-primary-foreground md:block" />
                <ArrowDown className="h-5 w-5 text-primary-foreground md:hidden" />
              </div>
            </div>

            {/* AFTER */}
            <div className="glass-strong relative rounded-2xl p-5 text-left shadow-elegant sm:p-6">
              <div className="absolute -inset-px -z-10 rounded-2xl bg-gradient-primary opacity-20 blur" />
              <div className="mb-3 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-glow">
                  <CheckCircle2 className="h-3 w-3" /> After using PromptLB
                </span>
                <span className="text-[10px] uppercase tracking-wider text-accent">
                  Enhanced
                </span>
              </div>
              <div className="rounded-lg border border-primary/30 bg-surface/80 p-3">
                <div className="space-y-1.5 font-mono text-[11px] leading-relaxed text-foreground/95 sm:text-xs">
                  {(expanded ? ENHANCED_SECTIONS : ENHANCED_SECTIONS.slice(0, 2)).map((s) => (
                    <div key={s.label}>
                      <span className="text-accent font-semibold">
                        {s.emoji} {s.label}
                      </span>{" "}
                      <span className={expanded ? "" : "line-clamp-1"}>{s.text}</span>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => setExpanded((v) => !v)}
                    className="text-accent underline-offset-2 hover:underline text-[11px] font-semibold"
                  >
                    {expanded ? "show less" : "more"}
                  </button>
                </div>
              </div>
              <div className="mt-3 text-[10px] uppercase tracking-wider text-muted-foreground">
                Output
              </div>
              <div className="mt-2 rounded-lg border border-primary/20 bg-background/40 p-3 text-xs text-foreground/95 sm:text-sm">
                Most "AI advice" is noise. Here's what actually moves the needle:
                <br />→ Ship a feature, not a demo
                <br />→ Replace a workflow, not a job
                <br />→ Charge for outcomes, not tokens
                <br />Which one are you betting on?
                <br />
                <br />#AI #Startups #BuildInPublic #ProductStrategy
              </div>
              <div className="mt-3 flex items-center gap-1 text-[11px] text-primary-glow">
                <span>●</span> Specific · High-engagement structure
              </div>
            </div>
          </div>
        </div>

        {/* Logos */}
        <div
          className="animate-fade-up mt-12 sm:mt-16"
          style={{ animationDelay: "0.5s" }}
        >
          <div className="mb-5 text-center text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Optimized for
          </div>
          <div className="mx-auto grid max-w-3xl grid-cols-3 gap-x-4 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
            {AI_MODELS.map(({ name, Logo }) => (
              <div
                key={name}
                className="logo-hover group flex flex-col items-center justify-center gap-2 text-foreground/70"
              >
                <Logo className="h-7 w-7 sm:h-9 sm:w-9" />
                <span className="text-[11px] font-medium text-muted-foreground sm:text-xs">
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
