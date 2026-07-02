import { useEffect, useState } from "react";
import { Wand2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FloatingEnhancer() {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const submit = () => {
    if (!value.trim()) return;
    window.dispatchEvent(new CustomEvent("promptlb:enhancer-prefill", { detail: value }));
    window.scrollTo({ top: 0, behavior: "smooth" });
    setValue("");
  };

  if (!visible) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center px-4 sm:bottom-6">
      <div className="pointer-events-auto w-full max-w-3xl">
        <div className="animate-fade-up rounded-2xl border border-primary/40 bg-card/95 p-2.5 shadow-elegant ring-1 ring-primary/20 backdrop-blur-xl">
          <div className="flex items-center gap-2">
            <div className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary sm:flex">
              <Wand2 className="h-4 w-4" />
            </div>
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submit()}
              placeholder="type your rough idea..."
              className="min-w-0 flex-1 bg-transparent px-2 text-sm outline-none placeholder:text-muted-foreground"
            />
            <Button
              size="sm"
              className="h-9 shrink-0 bg-primary text-primary-foreground shadow-sm hover:bg-primary/90"
              onClick={submit}
              disabled={!value.trim()}
            >
              <Wand2 className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Enhance Prompt</span>
              <span className="sm:hidden">Enhance</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
