import { Linkedin, FileText, Megaphone, Image as ImageIcon, Briefcase, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const EXAMPLES = [
  { icon: Linkedin, label: "LinkedIn Post", prompt: "Write a LinkedIn post about why most AI features fail in production" },
  { icon: FileText, label: "Blog Article", prompt: "Write a blog article outline on remote work in 2026" },
  { icon: Megaphone, label: "Marketing Campaign", prompt: "Create a marketing campaign for a new indie coffee brand" },
  { icon: ImageIcon, label: "Image Generation", prompt: "Generate an image of a minimal luxury skincare product hero shot" },
  { icon: Briefcase, label: "Business Plan", prompt: "Draft a lean business plan for a SaaS analytics startup" },
];

export function PromptExamples() {
  const useExample = (prompt: string) => {
    window.dispatchEvent(new CustomEvent("promptlb:enhancer-prefill", { detail: prompt }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section id="examples" className="py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Prompt Examples
          </span>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Try it with one click
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            Pick an example. We'll load it into the enhancer above.
          </p>
        </Reveal>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-4 lg:grid-cols-5">
          {EXAMPLES.map((e, i) => (
            <Reveal key={e.label} delay={i * 60}>
              <button
                onClick={() => useExample(e.prompt)}
                className="card-hover group h-full w-full rounded-2xl border border-border bg-card p-5 text-left"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <e.icon className="h-5 w-5" />
                </div>
                <div className="mt-4 text-sm font-semibold">{e.label}</div>
                <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{e.prompt}</p>
                <div className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-primary opacity-70 transition-opacity group-hover:opacity-100">
                  Use example <ArrowRight className="h-3 w-3" />
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
