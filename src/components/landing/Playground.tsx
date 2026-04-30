import { Button } from "@/components/ui/button";
import { Play, Copy, Sparkles, Image as ImageIcon, FileText, Code2 } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

type SampleCard = {
  type: "image" | "text" | "code";
  model: string;
  category: string;
  title: string;
  prompt: string;
  output: string;
  /** Tailwind gradient classes used for image preview */
  gradient: string;
};

const SAMPLES: SampleCard[] = [
  {
    type: "image",
    model: "Midjourney",
    category: "Image & Design",
    title: "Cinematic neon portrait",
    prompt:
      "cinematic portrait of a young inventor in a neon-lit workshop, volumetric light, shot on Arri Alexa, 35mm --ar 16:9 --style raw",
    output: "Generated 4 high-fidelity 16:9 stills",
    gradient:
      "from-fuchsia-500/60 via-violet-500/40 to-cyan-400/30",
  },
  {
    type: "image",
    model: "DALL·E",
    category: "Image & Design",
    title: "Minimal product hero",
    prompt:
      "minimal product hero shot of a matte-black smartwatch on a pastel gradient, soft studio light, top-down, 4k",
    output: "Clean editorial product render, ready for landing page",
    gradient:
      "from-rose-300/60 via-amber-200/50 to-sky-300/40",
  },
  {
    type: "text",
    model: "ChatGPT",
    category: "Marketing",
    title: "Viral LinkedIn hook",
    prompt:
      "Write a 3-line LinkedIn hook for B2B founders about why most AI features fail in production.",
    output:
      "Most AI features die in week 3.\nNot because the model is bad — because the workflow is.\nHere's the 1 thing teams shipping AI in production do differently…",
    gradient:
      "from-primary/40 via-accent/30 to-primary/20",
  },
  {
    type: "code",
    model: "Claude",
    category: "Coding",
    title: "React pricing component",
    prompt:
      "Generate a Tailwind + React pricing card with 3 tiers, monthly/yearly toggle, and a featured tier.",
    output:
      "// PricingCard.tsx\nexport function PricingCard({ tier, featured }) {\n  return (\n    <div className={`rounded-2xl ...`}>\n      ...\n    </div>\n  );\n}",
    gradient:
      "from-emerald-400/40 via-teal-300/30 to-cyan-400/20",
  },
];

const TYPE_META = {
  image: { icon: ImageIcon, label: "Image" },
  text: { icon: FileText, label: "Text" },
  code: { icon: Code2, label: "Code" },
} as const;

export function Playground() {
  const navigate = useNavigate();

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Prompt copied");
  };

  const run = (s: SampleCard) => {
    navigate({
      to: "/playground",
      search: { prompt: s.prompt, model: s.model, title: s.title },
    });
  };

  return (
    <section id="playground" className="relative py-12 sm:py-20">
      <div className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 h-[400px] -translate-y-1/2 bg-gradient-primary opacity-10 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-accent">
            <Play className="h-3.5 w-3.5" /> Prompt Playground
          </span>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-5xl">
            Test before you{" "}
            <span className="text-gradient-primary">trust</span>
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:mt-5 sm:text-lg">
            Run any prompt against your favorite model and see real outputs —
            text, code, or image — in seconds.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:mt-14 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
          {SAMPLES.map((s) => {
            const Icon = TYPE_META[s.type].icon;
            const typeLabel = TYPE_META[s.type].label;
            return (
              <article
                key={s.title}
                className="glass group flex flex-col overflow-hidden rounded-2xl transition-all hover:border-primary/40 hover:shadow-elegant"
              >
                {/* Output preview */}
                <div className="relative aspect-[4/3] overflow-hidden border-b border-border">
                  {s.type === "image" ? (
                    <>
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${s.gradient}`}
                      />
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.5))]" />
                      <div className="absolute bottom-2 left-2 right-2 grid grid-cols-3 gap-1.5">
                        {[0, 1, 2].map((i) => (
                          <div
                            key={i}
                            className={`aspect-square rounded-md bg-gradient-to-br ${s.gradient} ring-1 ring-white/20`}
                            style={{
                              backgroundPosition: `${i * 30}% ${i * 20}%`,
                              backgroundSize: "200% 200%",
                            }}
                          />
                        ))}
                      </div>
                    </>
                  ) : s.type === "code" ? (
                    <div
                      className={`relative h-full w-full bg-gradient-to-br ${s.gradient}`}
                    >
                      <div className="absolute inset-3 overflow-hidden rounded-lg border border-white/10 bg-background/80 p-3 backdrop-blur-sm">
                        <pre className="overflow-hidden font-mono text-[10px] leading-relaxed text-foreground/85">
                          {s.output}
                        </pre>
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`relative h-full w-full bg-gradient-to-br ${s.gradient}`}
                    >
                      <div className="absolute inset-3 overflow-hidden rounded-lg border border-white/10 bg-background/80 p-3 backdrop-blur-sm">
                        <p className="line-clamp-5 whitespace-pre-line text-[11px] leading-relaxed text-foreground/90">
                          {s.output}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full border border-white/20 bg-background/70 px-2 py-0.5 text-[10px] font-semibold backdrop-blur">
                    <Icon className="h-3 w-3" />
                    {typeLabel}
                  </div>
                  <div className="absolute right-3 top-3 rounded-full border border-white/20 bg-background/70 px-2 py-0.5 text-[10px] font-semibold text-accent backdrop-blur">
                    {s.model}
                  </div>
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col p-4">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    {s.category}
                  </div>
                  <h3 className="mt-1 line-clamp-1 text-sm font-semibold">
                    {s.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 font-mono text-[11px] leading-relaxed text-muted-foreground">
                    {s.prompt}
                  </p>

                  <div className="mt-4 flex items-center gap-1.5">
                    <Button
                      variant="hero"
                      size="sm"
                      className="h-8 flex-1"
                      onClick={() => run(s)}
                    >
                      <Play className="h-3 w-3" /> Run
                    </Button>
                    <Button
                      variant="glass"
                      size="sm"
                      className="h-8"
                      onClick={() => copy(s.prompt)}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-10 flex justify-center">
          <Button
            variant="hero"
            size="lg"
            onClick={() => navigate({ to: "/playground" })}
          >
            <Sparkles className="h-4 w-4" />
            Open Full Playground
          </Button>
        </div>
      </div>
    </section>
  );
}
