import {
  Wand2,
  Sparkles,
  GraduationCap,
  ListChecks,
  Clock,
  Cpu,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";

const features = [
  {
    icon: Wand2,
    title: "Instant Prompt Enhancement",
    desc: "Transform rough ideas into structured, AI-ready prompts in seconds.",
  },
  {
    icon: Sparkles,
    title: "Better AI Results",
    desc: "Get more accurate, relevant, and consistent outputs across AI tools.",
  },
  {
    icon: GraduationCap,
    title: "Learn Why Prompts Work",
    desc: "Understand the goal, audience, tone, and structure behind every enhanced prompt.",
  },
  {
    icon: ListChecks,
    title: "Prompt Breakdown",
    desc: "See exactly how PromptLB improves your prompt and what changes were made.",
  },
  {
    icon: Clock,
    title: "Save Time & Reduce Revisions",
    desc: "Spend less time rewriting prompts and more time creating great results.",
  },
  {
    icon: Cpu,
    title: "Optimized for Leading AI Models",
    desc: "Generate prompts tailored for ChatGPT, Claude, Gemini, and other leading AI tools.",
  },
];

export function Features() {
  return (
    <section id="features" className="relative py-8 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">
            Why PromptLB
          </span>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-5xl">
            Everything you need to{" "}
            <span className="text-gradient-primary">prompt better</span>
          </h2>
          <p className="mt-3 text-base text-muted-foreground sm:text-lg">
            One library. Every model. Crafted by creators, validated by the community.
          </p>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 80}>
              <div
                className="glass group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 sm:p-7"
              >
                <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-primary opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-30" />

                <div className="relative">
                  <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-primary shadow-[0_4px_20px_-4px_oklch(0.7_0.22_295/0.5)]">
                    <f.icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
