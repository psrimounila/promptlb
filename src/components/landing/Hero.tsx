import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Search } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import heroOrb from "@/assets/hero-orb.jpg";

export function Hero() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const search = () => {
    navigate({
      to: "/library",
      search: query ? { q: query } : {},
    } as never);
  };

  return (
    <section className="relative overflow-hidden pt-28 pb-20 sm:pt-44 sm:pb-32">
      <div className="pointer-events-none absolute left-1/2 top-1/4 -z-10 -translate-x-1/2 opacity-60">
        <img
          src={heroOrb}
          alt=""
          width={1280}
          height={1280}
          className="animate-float h-[400px] w-[400px] object-contain blur-2xl sm:h-[800px] sm:w-[800px]"
        />
      </div>

      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
        <div className="animate-fade-up mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 backdrop-blur-md">
          <Sparkles className="h-3.5 w-3.5 text-accent" />
          <span className="text-xs font-medium text-muted-foreground">
            100% free · Verified prompts for every AI model
          </span>
        </div>

        <h1
          className="animate-fade-up text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
          style={{ animationDelay: "0.1s" }}
        >
          Find the Best AI Prompts
          <br />
          <span className="text-gradient-primary">in Seconds.</span>
        </h1>

        <p
          className="animate-fade-up mx-auto mt-6 max-w-2xl text-balance text-base text-muted-foreground sm:mt-7 sm:text-xl"
          style={{ animationDelay: "0.2s" }}
        >
          100+ community-ranked prompts for Marketing, UI/UX, Coding, Business
          and Content Creation. Run them, copy them, or enhance your own with
          AI.
        </p>

        <div
          className="animate-fade-up mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row"
          style={{ animationDelay: "0.3s" }}
        >
          <Button
            variant="hero"
            size="xl"
            className="group w-full sm:w-auto"
            onClick={() => navigate({ to: "/library" })}
          >
            Explore the Library
            <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
          </Button>
          <Button
            variant="glass"
            size="xl"
            className="w-full sm:w-auto"
            onClick={() => navigate({ to: "/leaderboard" })}
          >
            View Leaderboard
          </Button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            search();
          }}
          className="animate-fade-up mx-auto mt-12 max-w-2xl sm:mt-16"
          style={{ animationDelay: "0.4s" }}
        >
          <div className="glass-strong group flex items-center gap-3 rounded-2xl px-4 py-3 transition-all focus-within:border-primary/40 sm:px-5 sm:py-4">
            <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder='Try "viral LinkedIn post" or "cinematic portrait"'
              className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground sm:text-base"
            />
            <button
              type="submit"
              className="hidden rounded-md border border-border bg-surface px-2 py-1 text-xs text-muted-foreground hover:bg-surface-elevated sm:inline-block"
            >
              Search
            </button>
          </div>
        </form>

        <div
          className="animate-fade-up mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground sm:mt-16 sm:gap-x-8 sm:gap-y-3"
          style={{ animationDelay: "0.5s" }}
        >
          <span className="text-xs uppercase tracking-widest">Optimized for</span>
          {["ChatGPT", "Claude", "Gemini", "Midjourney", "DALL·E", "Stable Diffusion"].map(
            (m) => (
              <span key={m} className="text-xs font-medium text-foreground/70 sm:text-sm">
                {m}
              </span>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
