import { Button } from "@/components/ui/button";
import { Play, Copy, Sparkles } from "lucide-react";

export function Playground() {
  return (
    <section id="playground" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">
              Prompt Playground
            </span>
            <h2 className="mt-3 text-balance text-4xl font-bold tracking-tight sm:text-5xl">
              Test before you <span className="text-gradient-primary">trust</span>
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">
              Run any prompt against your favorite model and see real outputs in
              seconds. Tweak variables, compare models side-by-side, and save the
              winner to your collection.
            </p>

            <ul className="mt-8 space-y-3">
              {[
                "Run prompts across multiple models instantly",
                "See live output examples from the community",
                "Fork & remix any prompt as your own",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-primary">
                    <Sparkles className="h-3 w-3 text-primary-foreground" />
                  </div>
                  <span className="text-foreground/90">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <Button variant="hero" size="lg">
                Open Playground
                <Play className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Mock playground card */}
          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-primary opacity-20 blur-3xl" />

            <div className="glass-strong rounded-2xl p-1 shadow-elegant">
              <div className="rounded-xl bg-surface/80">
                {/* header */}
                <div className="flex items-center justify-between border-b border-border px-5 py-3">
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
                    <div className="h-2.5 w-2.5 rounded-full bg-accent/60" />
                    <div className="h-2.5 w-2.5 rounded-full bg-primary/60" />
                    <span className="ml-3 text-xs text-muted-foreground">
                      cinematic-portrait.prompt
                    </span>
                  </div>
                  <span className="rounded-md border border-border bg-surface-elevated px-2 py-0.5 text-[10px] font-medium text-accent">
                    MIDJOURNEY V6
                  </span>
                </div>

                {/* prompt */}
                <div className="p-5">
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">
                    Prompt
                  </div>
                  <p className="mt-2 font-mono text-sm leading-relaxed text-foreground/90">
                    <span className="text-accent">cinematic portrait</span> of a young
                    inventor in a neon-lit workshop, volumetric light, shot on{" "}
                    <span className="text-accent">Arri Alexa</span>, 35mm,{" "}
                    <span className="text-accent">--ar 16:9 --style raw</span>
                  </p>

                  <div className="mt-5 flex items-center gap-2">
                    <Button variant="hero" size="sm">
                      <Play className="h-3 w-3" /> Run
                    </Button>
                    <Button variant="glass" size="sm">
                      <Copy className="h-3 w-3" /> Copy
                    </Button>
                    <div className="ml-auto text-xs text-muted-foreground">
                      ✓ Verified · 2.4k uses
                    </div>
                  </div>
                </div>

                {/* output preview */}
                <div className="border-t border-border bg-background/40 p-5">
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">
                    Output Preview
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="aspect-square rounded-lg bg-gradient-to-br from-primary/40 via-accent/30 to-primary/20"
                        style={{
                          backgroundPosition: `${i * 30}% ${i * 20}%`,
                          backgroundSize: "200% 200%",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
