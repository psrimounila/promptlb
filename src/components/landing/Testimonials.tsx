import { Reveal } from "@/components/Reveal";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Sarah Chen",
    role: "Growth Lead, Notion",
    initials: "SC",
    text: "PromptLB replaced 20 minutes of trial-and-error with a single click. My LinkedIn engagement doubled the first week.",
  },
  {
    name: "Marcus Reed",
    role: "Founder, Loop AI",
    initials: "MR",
    text: "The structured Goal-Audience-Tone-Format output is the missing piece for anyone using ChatGPT seriously.",
  },
  {
    name: "Priya Sharma",
    role: "Designer, Figma community",
    initials: "PS",
    text: "My Midjourney results went from generic to editorial-grade. This is the tool I recommend to every designer friend.",
  },
];

export function Testimonials() {
  return (
    <section className="py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Loved by builders
          </span>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            What creators are saying
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-14 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 80}>
              <div className="card-hover h-full rounded-2xl border border-border bg-card p-6">
                <div className="flex items-center gap-1 text-primary">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-foreground">"{t.text}"</p>
                <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
