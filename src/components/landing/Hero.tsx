import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Search, Loader2, Wand2, Bot, Image as ImageIcon, Code2, Zap } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
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

const KNOWN_CATEGORIES = [
  "Marketing",
  "UI/UX",
  "Coding",
  "Business",
  "Content Creation",
  "Image & Design",
];

export function Hero() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);

  const scrollToEnhancer = (prefill: string) => {
    const el = document.getElementById("enhancer");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    // Dispatch a custom event so the Enhancer can prefill its input
    window.dispatchEvent(
      new CustomEvent("promptlb:enhancer-prefill", { detail: prefill }),
    );
  };

  const search = async () => {
    const q = query.trim();
    if (!q) {
      navigate({ to: "/library" } as never);
      return;
    }

    setSearching(true);
    try {
      // 1. Direct category match
      const matchedCategory = KNOWN_CATEGORIES.find(
        (c) => c.toLowerCase() === q.toLowerCase(),
      );
      if (matchedCategory) {
        navigate({
          to: "/library",
          search: { category: matchedCategory },
        } as never);
        return;
      }

      // 2. Search verified prompts in DB (title, description, tags, category)
      const { data, error } = await supabase
        .from("prompts")
        .select("id, category")
        .eq("is_public", true)
        .or(
          `title.ilike.%${q}%,description.ilike.%${q}%,category.ilike.%${q}%`,
        )
        .limit(5);

      if (error) throw error;

      if (data && data.length > 0) {
        // Found matching prompts → go to library with query
        navigate({
          to: "/library",
          search: { q },
        } as never);
        toast.success(`Found ${data.length} matching prompt${data.length > 1 ? "s" : ""}`);
        return;
      }

      // 3. No match → send to Enhancer with prefill
      toast.info("No verified prompt found. Let's craft one for you!");
      scrollToEnhancer(q);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Search failed";
      toast.error(msg);
    } finally {
      setSearching(false);
    }
  };

  return (
    <section className="relative overflow-hidden pt-24 pb-12 sm:pt-36 sm:pb-20">
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
          130+ community-ranked prompts for Marketing, UI/UX, Coding, Business,
          Content Creation and Image & Design. Run them, copy them, or enhance
          your own with AI.
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
          className="animate-fade-up mx-auto mt-8 max-w-2xl sm:mt-12"
          style={{ animationDelay: "0.4s" }}
        >
          <div className="glass-strong group flex items-center gap-3 rounded-2xl px-4 py-3 transition-all focus-within:border-primary/40 sm:px-5 sm:py-4">
            {searching ? (
              <Loader2 className="h-5 w-5 shrink-0 animate-spin text-muted-foreground" />
            ) : (
              <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
            )}
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder='Try "viral LinkedIn post" or "cinematic portrait"'
              className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground sm:text-base"
              disabled={searching}
            />
            <button
              type="submit"
              disabled={searching}
              className="hidden rounded-md border border-border bg-surface px-2 py-1 text-xs text-muted-foreground hover:bg-surface-elevated disabled:opacity-50 sm:inline-block"
            >
              {searching ? "Searching..." : "Search"}
            </button>
          </div>
        </form>

        <div
          className="animate-fade-up mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground sm:mt-12 sm:gap-x-8 sm:gap-y-3"
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
