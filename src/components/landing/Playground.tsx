import { Button } from "@/components/ui/button";
import { Play, Copy, Sparkles } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

export function Playground() {
  const navigate = useNavigate();

  const samplePrompt =
    "cinematic portrait of a young inventor in a neon-lit workshop, volumetric light, shot on Arri Alexa, 35mm, --ar 16:9 --style raw";

  const copySample = () => {
    navigator.clipboard.writeText(samplePrompt);
  };

  return (
    <section id="playground" className="relative py-12 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">
              Prompt Playground
            </span>
            <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-5xl">
              Test before you <span className="text-gradient-primary">trust</span>
            </h2>
            <p className="mt-4 text-base text-muted-foreground sm:mt-5 sm:text-lg">
              Run any prompt against your favorite model and see real outputs in
              seconds. Tweak, copy, and save the winners to your history.
            </p>

            <ul className="mt-6 space-y-3 sm:mt-8">
              {[
                "Run prompts across multiple models instantly",
                "See live AI output, copy or use it anywhere",
                "Save every run to your personal history",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-primary">
                    <Sparkles className="h-3 w-3 text-primary-foreground" />
                  </div>
                  <span className="text-sm text-foreground/90 sm:text-base">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 sm:mt-10">
              <Button
                variant="hero"
                size="lg"
                onClick={() => navigate({ to: "/playground" })}
              >
                Open Playground
                <Play className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-primary opacity-20 blur-3xl" />

            <div className="glass-strong rounded-2xl p-1 shadow-elegant">
              <div className="rounded-xl bg-surface/80">
                <div className="flex items-center justify-between border-b border-border px-4 py-3 sm:px-5">
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
                    <div className="h-2.5 w-2.5 rounded-full bg-accent/60" />
                    <div className="h-2.5 w-2.5 rounded-full bg-primary/60" />
                    <span className="ml-2 truncate text-xs text-muted-foreground sm:ml-3">
                      cinematic-portrait.prompt
                    </span>
                  </div>
                  <span className="rounded-md border border-border bg-surface-elevated px-2 py-0.5 text-[10px] font-medium text-accent">
                    MIDJOURNEY
                  </span>
                </div>

                <div className="p-4 sm:p-5">
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">
                    Prompt
                  </div>
                  <p className="mt-2 font-mono text-xs leading-relaxed text-foreground/90 sm:text-sm">
                    <span className="text-accent">cinematic portrait</span> of a young
                    inventor in a neon-lit workshop, volumetric light, shot on{" "}
                    <span className="text-accent">Arri Alexa</span>, 35mm,{" "}
                    <span className="text-accent">--ar 16:9 --style raw</span>
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-2 sm:mt-5">
                    <Button
                      variant="hero"
                      size="sm"
                      onClick={() =>
                        navigate({
                          to: "/playground",
                          search: { prompt: samplePrompt, model: "Midjourney" },
                        })
                      }
                    >
                      <Play className="h-3 w-3" /> Run
                    </Button>
                    <Button variant="glass" size="sm" onClick={copySample}>
                      <Copy className="h-3 w-3" /> Copy
                    </Button>
                    <div className="ml-auto text-xs text-muted-foreground">
                      ✓ Verified · 2.4k uses
                    </div>
                  </div>
                </div>

                <div className="border-t border-border bg-background/40 p-4 sm:p-5">
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
