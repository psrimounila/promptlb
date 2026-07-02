import { useEffect, useRef, useState } from "react";

const METRICS = [
  { value: 42000, suffix: "+", label: "Prompts Enhanced" },
  { value: 8500, suffix: "+", label: "Active Users" },
  { value: 130, suffix: "+", label: "Verified Prompts" },
  { value: 6, suffix: "", label: "AI Workflows Supported" },
];

function useCountUp(target: number, active: boolean, duration = 1400) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, duration]);
  return value;
}

function Counter({ target, suffix, label }: { target: number; suffix: string; label: string }) {
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setActive(true), { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const v = useCountUp(target, active);
  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
        {v.toLocaleString()}{suffix}
      </div>
      <div className="mt-2 text-xs uppercase tracking-widest text-muted-foreground sm:text-sm">
        {label}
      </div>
    </div>
  );
}

export function Metrics() {
  return (
    <section className="py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="rounded-3xl border border-border bg-card p-8 shadow-soft sm:p-12">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {METRICS.map((m) => (
              <Counter key={m.label} target={m.value} suffix={m.suffix} label={m.label} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
