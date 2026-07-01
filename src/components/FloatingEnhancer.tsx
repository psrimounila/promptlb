import { useEffect, useState } from "react";
import { Sparkles, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FloatingEnhancer() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 900);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const submit = () => {
    if (!value.trim()) return;
    window.dispatchEvent(new CustomEvent("promptlb:enhancer-prefill", { detail: value }));
    window.scrollTo({ top: 0, behavior: "smooth" });
    setValue("");
    setOpen(false);
  };

  if (!visible) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center px-4 sm:bottom-6">
      <div className="pointer-events-auto w-full max-w-2xl">
        {open ? (
          <div className="animate-fade-up rounded-2xl border border-border bg-card/95 p-3 shadow-elegant backdrop-blur-xl">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Sparkles className="h-4 w-4" />
              </div>
              <input
                autoFocus
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submit()}
                placeholder="Type your rough idea…"
                className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              <Button size="sm" className="h-8 bg-primary text-primary-foreground hover:bg-primary/90" onClick={submit} disabled={!value.trim()}>
                Enhance <ArrowRight className="h-3.5 w-3.5" />
              </Button>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <button
              onClick={() => setOpen(true)}
              className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-border bg-card/95 px-4 py-2.5 text-sm font-medium shadow-elegant backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:border-primary/40"
            >
              <Sparkles className="h-4 w-4 text-primary" />
              <span>Quick enhance a prompt</span>
              <span className="rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                AI
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
