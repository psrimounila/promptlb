import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Lightbulb, Wand2, Sparkles, ArrowRight } from "lucide-react";

const STEPS = [
  {
    icon: Lightbulb,
    title: "Enter your idea",
    desc: "Type a rough thought, no structure needed.",
    preview: "write a tweet about AI hype",
  },
  {
    icon: Wand2,
    title: "Enhance prompt",
    desc: "AI structures it with goal, audience, tone & format.",
    preview: "🎯 Goal · 👥 Audience · 🎨 Tone · 📋 Format",
  },
  {
    icon: Sparkles,
    title: "Get better results",
    desc: "Paste anywhere and get sharper, on-point output.",
    preview: "✨ Ready-to-use prompt",
  },
];

function TypingLine({ text, active }: { text: string; active: boolean }) {
  const [shown, setShown] = useState("");
  useEffect(() => {
    if (!active) {
      setShown("");
      return;
    }
    let i = 0;
    setShown("");
    const id = setInterval(() => {
      i++;
      setShown(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, 45);
    return () => clearInterval(id);
  }, [text, active]);
  return (
    <span className="font-mono text-sm text-foreground/90">
      {shown}
      {active && <span className="ml-0.5 inline-block h-4 w-[2px] animate-pulse bg-primary align-middle" />}
    </span>
  );
}

export function HowItWorks() {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { threshold: 0.3 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const id = setInterval(() => setActive((a) => (a + 1) % STEPS.length), 2800);
    return () => clearInterval(id);
  }, [visible]);

  const scrollToEnhancer = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section id="how-it-works" ref={ref} className="relative py-8 sm:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">
            How It Works
          </span>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-5xl">
            Three steps to{" "}
            <span className="text-gradient-primary">better prompts</span>
          </h2>
          <p className="mt-3 text-base text-muted-foreground sm:text-lg">
            Turn any idea into a structured, high-quality AI prompt in seconds.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:mt-14 md:grid-cols-3">
          {STEPS.map((step, i) => {
            const isActive = visible && active === i;
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                className={`glass-strong relative overflow-hidden rounded-2xl p-6 transition-all duration-500 sm:p-7 ${
                  isActive
                    ? "scale-[1.02] border-primary/40 shadow-elegant"
                    : "scale-100"
                }`}
              >
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-primary opacity-0 transition-opacity duration-500 ${
                    isActive ? "opacity-10" : ""
                  }`}
                />
                <div className="relative">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-primary shadow-elegant transition-transform duration-500 ${
                        isActive ? "rotate-6 scale-110" : ""
                      }`}
                    >
                      <Icon className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      Step {i + 1}
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold sm:text-xl">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    {step.desc}
                  </p>

                  <div className="mt-5 min-h-14 rounded-xl border border-border bg-surface/60 px-4 py-3">
                    {i === 0 ? (
                      <TypingLine text={step.preview} active={isActive} />
                    ) : (
                      <span
                        className={`block text-sm transition-all duration-500 ${
                          isActive
                            ? "translate-y-0 opacity-100"
                            : "translate-y-1 opacity-60"
                        } ${i === 2 ? "text-gradient-primary font-semibold" : "text-foreground/85"}`}
                      >
                        {step.preview}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 flex justify-center">
          <Button variant="hero" size="lg" onClick={scrollToEnhancer} className="group">
            <Sparkles className="h-4 w-4" />
            Try Prompt Enhancer
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
