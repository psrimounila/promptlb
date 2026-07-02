import { useEffect, useState } from "react";
import { useServerFn, useNavigate } from "@tanstack/react-start";
import { useNavigate as useRouterNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Loader2, ArrowRight, Type, Image as ImageIcon, Code2, Wand2, Brain, Check } from "lucide-react";
import { toast } from "sonner";
import { enhancePrompt } from "@/utils/enhancePrompt.functions";
import { useAuth } from "@/contexts/AuthContext";

type OutputType = "text" | "image" | "code";

export function HeroEnhancer() {
  const enhanceFn = useServerFn(enhancePrompt);
  const navigate = useRouterNavigate();
  const { user } = useAuth();
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState<OutputType>("text");
  const [copied, setCopied] = useState(false);

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
    setCopied(true);
    toast.success("Prompt copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const openBreakdown = () => {
    try {
      sessionStorage.setItem("promptlb:breakdown", JSON.stringify({
        original: input,
        enhanced: output,
        outputType: type,
      }));
    } catch {}
    if (!user) {
      toast.info("Sign in to unlock the prompt breakdown");
      navigate({ to: "/auth", search: { mode: "signup" }, hash: "breakdown" } as never);
      return;
    }
    navigate({ to: "/breakdown" });
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
          <Wand2 className="h-3 w-3" /> AI
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
          {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Wand2 className="h-3.5 w-3.5" />}
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
            <div className="mt-3 flex flex-wrap gap-2">
              <Button
                size="sm"
                onClick={copy}
                className="h-9 bg-primary text-primary-foreground shadow-sm hover:bg-primary/90"
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? "Copied!" : "Copy Prompt"}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={openBreakdown}
                className="h-9 border-primary/40 text-primary hover:bg-primary/10"
              >
                <Brain className="h-3.5 w-3.5" />
                🧠 Learn Why This Prompt Works
              </Button>
            </div>
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
