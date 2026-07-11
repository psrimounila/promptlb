import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Copy, Loader2, Wand2, ArrowRight, Type, Image as ImageIcon, Code2 } from "lucide-react";
import { toast } from "sonner";
import { enhancePrompt } from "@/utils/enhancePrompt.functions";

type OutputType = "text" | "image" | "code";

const EXAMPLES = [
  "write a tweet about AI",
  "logo for coffee shop",
  "blog post on remote work",
  "react component for pricing",
];

export function Enhancer() {
  const enhanceFn = useServerFn(enhancePrompt);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [outputType, setOutputType] = useState<OutputType>("text");

  // Listen for prefill events dispatched by the Hero search bar
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      if (typeof detail === "string" && detail.trim()) {
        setInput(detail);
        setOutput("");
      }
    };
    window.addEventListener("promptlb:enhancer-prefill", handler);
    return () => window.removeEventListener("promptlb:enhancer-prefill", handler);
  }, []);

  const enhance = async () => {
    if (!input.trim()) {
      toast.error("Type a rough idea first");
      return;
    }
    setLoading(true);
    setOutput("");
    try {
      const res = await enhanceFn({ data: { prompt: input, outputType } });
      if (res.error) {
        toast.error(res.error);
        return;
      }
      setOutput(res.enhanced);
      toast.success("Prompt enhanced");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to enhance";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(output);
    toast.success("Enhanced prompt copied");
  };

  return (
    <section id="enhancer" className="relative py-12 sm:py-20">
      <div className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 h-[400px] -translate-y-1/2 bg-gradient-primary opacity-10 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
        <div
  className="
    relative
    glass-strong
    rounded-2xl
    p-5
    sm:p-6
    border
    border-[#002BFF]/30
    shadow-[0_0_40px_rgba(0,43,255,0.20)]
    transition-all
    duration-300
    hover:shadow-[0_0_80px_rgba(0,43,255,0.40)]
  "
></div>
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-accent">
            <Sparkles className="h-3.5 w-3.5" /> Prompt Enhancer TEST123
          </span>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-5xl">
            Turn rough ideas into{" "}
            <span className="text-gradient-primary">pro-grade prompts</span>
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:mt-5 sm:text-lg">
            Type any rough idea. We will structure it with goal, audience, tone,
            and format so you get great results on the first try.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
          {/* Input */}
          <div className="glass-strong rounded-2xl p-5 sm:p-6">
            <div className="flex items-center gap-2">
              <Wand2 className="h-4 w-4 text-accent" />
              <span className="text-sm font-semibold">Your rough idea</span>
            </div>

            {/* Output type selector */}
            <div className="mt-3">
              <div className="inline-flex rounded-lg border border-border bg-surface/60 p-1">
                {([
                  { v: "text", label: "Text", Icon: Type },
                  { v: "image", label: "Image", Icon: ImageIcon },
                  { v: "code", label: "Code", Icon: Code2 },
                ] as const).map(({ v, label, Icon }) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setOutputType(v)}
                    className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                      outputType === v
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {label}
                  </button>
                ))}
              </div>
              {outputType === "image" && (
                <p className="mt-2 text-xs text-accent">
                  Optimized for Image Generation
                </p>
              )}
              {outputType === "code" && (
                <p className="mt-2 text-xs text-accent">
                  Optimized for Code Generation
                </p>
              )}
            </div>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g. tweet about why startups fail"
              rows={6}
              className="mt-3 resize-none text-sm"
            />

            <div className="mt-3 flex flex-wrap gap-1.5">
              {EXAMPLES.map((ex) => (
                <button
                  key={ex}
                  onClick={() => setInput(ex)}
                  className="rounded-full border border-border bg-surface/60 px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                >
                  {ex}
                </button>
              ))}
            </div>

            <Button
              variant="hero"
              className="mt-4 w-full"
              onClick={enhance}
              disabled={loading || !input.trim()}
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="h-4 w-4" />
              )}
              Enhance Prompt
              {!loading && <ArrowRight className="h-4 w-4" />}
            </Button>
          </div>

          {/* Output */}
          <div
  className="
    glass-strong
    rounded-2xl
    border
    border-[#002BFF]/30
    p-5
    sm:p-6
    shadow-[0_0_35px_rgba(0,43,255,0.20)]
    transition-all
    duration-300
    hover:border-[#002BFF]/60
    hover:shadow-[0_0_60px_rgba(0,43,255,0.35)]
  "
>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-accent" />
                <span className="text-sm font-semibold">Enhanced prompt</span>
              </div>
              {output && (
                <Button size="sm" variant="glass" onClick={copy}>
                  <Copy className="h-3.5 w-3.5" /> Copy
                </Button>
              )}
            </div>

            <div className="mt-3 min-h-[260px] rounded-xl border border-border bg-surface/40 p-4 text-sm leading-relaxed">
              {loading ? (
                <span className="inline-flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Structuring your prompt...
                </span>
              ) : output ? (
                <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-foreground/95">
                  {output}
                </pre>
              ) : (
                <div className="text-muted-foreground">
                  <p className="mb-3">Your structured prompt will appear here with:</p>
                  <ul className="space-y-1.5 text-xs">
                    <li>🎯 <span className="text-foreground/80">Goal</span> - what you want</li>
                    <li>👥 <span className="text-foreground/80">Audience</span> - who it is for</li>
                    <li>🎨 <span className="text-foreground/80">Tone &amp; Style</span> - voice and feel</li>
                    <li>📋 <span className="text-foreground/80">Format</span> - structure and length</li>
                    <li>📝 <span className="text-foreground/80">Prompt</span> - ready to paste</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
