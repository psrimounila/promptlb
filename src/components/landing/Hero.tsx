import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Search } from "lucide-react";
import heroOrb from "@/assets/hero-orb.jpg";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-36 pb-24 sm:pt-44 sm:pb-32">
      {/* Background orb */}
      <div className="pointer-events-none absolute left-1/2 top-1/4 -z-10 -translate-x-1/2 opacity-60">
        <img
          src={heroOrb}
          alt=""
          width={1280}
          height={1280}
          className="animate-float h-[600px] w-[600px] object-contain blur-2xl sm:h-[800px] sm:w-[800px]"
        />
      </div>

      <div className="mx-auto max-w-5xl px-6 text-center">
        <div className="animate-fade-up mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 backdrop-blur-md">
          <Sparkles className="h-3.5 w-3.5 text-accent" />
          <span className="text-xs font-medium text-muted-foreground">
            10,000+ verified prompts · Across every AI model
          </span>
        </div>

        <h1
          className="animate-fade-up text-balance text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
          style={{ animationDelay: "0.1s" }}
        >
          Your AI Prompt
          <br />
          <span className="text-gradient-primary">Library, unified.</span>
        </h1>

        <p
          className="animate-fade-up mx-auto mt-7 max-w-2xl text-balance text-lg text-muted-foreground sm:text-xl"
          style={{ animationDelay: "0.2s" }}
        >
          Discover, organize, and share verified prompts that actually work — for
          ChatGPT, Claude, Gemini, Midjourney and more. Stop testing. Start shipping.
        </p>

        <div
          className="animate-fade-up mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          style={{ animationDelay: "0.3s" }}
        >
          <Button variant="hero" size="xl" className="group">
            Explore the Library
            <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
          </Button>
          <Button variant="glass" size="xl">
            Try the Playground
          </Button>
        </div>

        {/* Search preview */}
        <div
          className="animate-fade-up mx-auto mt-16 max-w-2xl"
          style={{ animationDelay: "0.4s" }}
        >
          <div className="glass-strong group flex items-center gap-3 rounded-2xl px-5 py-4 transition-all hover:border-primary/40">
            <Search className="h-5 w-5 text-muted-foreground" />
            <span className="text-left text-muted-foreground">
              Try: <span className="text-foreground/80">"viral LinkedIn post"</span>
              <span className="hidden sm:inline">
                {" "}
                or <span className="text-foreground/80">"cinematic Midjourney portrait"</span>
              </span>
            </span>
            <div className="ml-auto rounded-md border border-border bg-surface px-2 py-1 text-xs text-muted-foreground">
              ⌘K
            </div>
          </div>
        </div>

        {/* Logos / trust */}
        <div
          className="animate-fade-up mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground"
          style={{ animationDelay: "0.5s" }}
        >
          <span className="text-xs uppercase tracking-widest">Optimized for</span>
          {["ChatGPT", "Claude", "Gemini", "Midjourney", "DALL·E", "Stable Diffusion"].map(
            (m) => (
              <span key={m} className="font-medium text-foreground/70">
                {m}
              </span>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
