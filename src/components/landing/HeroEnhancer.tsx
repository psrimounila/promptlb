import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Copy, Loader2, ArrowRight, Type, Image as ImageIcon, Code2, Wand2 } from "lucide-react";
import { toast } from "sonner";
import { enhancePrompt } from "@/utils/enhancePrompt.functions";

type OutputType = "text" | "image" | "code";

export function HeroEnhancer() {
  const enhanceFn = useServerFn(enhancePrompt);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState<OutputType>("text");

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
    if (!input.trim()) return toast.error("Type a rough idea first");
    setLoading(true);
    setOutput("");
    try {
      const res = await enhanceFn({ data: { prompt: input, outputType: type } });
      if (res.error) return toast.error(res.error);
      setOutput(res.enhanced);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to enhance");
    } finally {
      setLoading(false);
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(output);
    toast.success("Copied");
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-elegant sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Wand2 className="h-4 w-4" />
          </div>
          <div>
            <div className="text-sm font-semibold">Prompt Enhancer</div>
            <div className="text-[11px] text-muted-foreground">Free · No signup</div>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
          <Sparkles className="h-3 w-3" /> AI
        </span>
      </div>

      <label className="text-xs font-medium text-muted-foreground">
        Your rough idea
      </label>
      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="e.g. write a LinkedIn post about AI"
        rows={3}
        className="mt-1.5 resize-none border-border bg-surface text-sm"
      />

      <div className="mt-3 flex items-center justify-between gap-2">
        <div className="inline-flex rounded-lg border border-border bg-surface p-0.5">
          {([
            { v: "text", Icon: Type, label: "Text" },
            { v: "image", Icon: ImageIcon, label: "Image" },
            { v: "code", Icon: Code2, label: "Code" },
          ] as const).map(({ v, Icon, label }) => (
            <button
              key={v}
              type="button"
              onClick={() => setType(v)}
              className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium transition-colors ${
                type === v ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="h-3 w-3" />
              {label}
            </button>
          ))}
        </div>
        <Button size="sm" onClick={enhance} disabled={loading || !input.trim()} className="h-8 bg-primary text-primary-foreground hover:bg-primary/90">
          {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Sparkles className="h-3.5 w-3.5" />}
          Enhance
          {!loading && <ArrowRight className="h-3.5 w-3.5" />}
        </Button>
      </div>

      <div className="mt-4 min-h-[140px] rounded-lg border border-border bg-surface p-3">
        {loading ? (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Loader2 className="h-3.5 w-3.5 animate-spin" /> Structuring your prompt…
          </div>
        ) : output ? (
          <div>
            <pre className="max-h-[220px] overflow-auto whitespace-pre-wrap font-sans text-xs leading-relaxed text-foreground">
              {output}
            </pre>
            <button
              type="button"
              onClick={copy}
              className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-primary hover:underline"
            >
              <Copy className="h-3 w-3" /> Copy prompt
            </button>
          </div>
        ) : (
          <div className="text-xs text-muted-foreground">
            Your structured prompt (Goal · Audience · Tone · Format · Prompt) will appear here.
          </div>
        )}
      </div>
    </div>
  );
}
