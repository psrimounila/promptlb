import {
  ShieldCheck,
  Brain,
  Layers,
  PlayCircle,
  FolderHeart,
  Globe2,
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Verified Prompts",
    desc: "Every prompt is community-tested and quality-checked for consistent, reliable results.",
  },
  {
    icon: Brain,
    title: "Smart Recommendations",
    desc: "Filter by category, model, and tags to find the right prompt for your goal in seconds.",
  },
  {
    icon: Layers,
    title: "Model-Specific",
    desc: "Prompts optimized for ChatGPT, Claude, Gemini, Midjourney, DALL·E and more.",
  },
  {
    icon: PlayCircle,
    title: "Compare Prompts",
    desc: "Run any prompt directly inside the site, see real output, and save it to your history.",
  },
  {
    icon: FolderHeart,
    title: "Personal History",
    desc: "Sign in once and every prompt you run is saved automatically. Reuse your best work anytime.",
  },
  {
    icon: Globe2,
    title: "Explore Prompts",
    desc: "Submit your own prompts, share use cases, and earn recognition from the community.",
  },
];

export function Features() {
  return (
    <section id="features" className="relative py-12 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
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
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
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
          ))}
        </div>
      </div>
    </section>
  );
}
