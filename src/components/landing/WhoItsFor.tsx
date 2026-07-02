import { Megaphone, PenLine, Palette, Code2, GraduationCap, Rocket } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const AUDIENCES = [
  { icon: Megaphone, title: "Marketers", desc: "Ad copy, campaigns, SEO briefs, and social hooks that convert." },
  { icon: PenLine, title: "Content Creators", desc: "Newsletters, scripts, threads, and blog outlines in seconds." },
  { icon: Palette, title: "Designers", desc: "Better image prompts for Midjourney, DALL·E, and Stable Diffusion." },
  { icon: Code2, title: "Developers", desc: "Cleaner specs, refactor plans, and test cases from vague ideas." },
  { icon: GraduationCap, title: "Students", desc: "Clearer study prompts, essay outlines, and research questions." },
  { icon: Rocket, title: "Entrepreneurs", desc: "Pitch decks, positioning, and go-to-market briefs, done fast." },
];

export function WhoItsFor() {
  return (
    <section id="who-its-for" className="py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Who it's for
          </span>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Built for anyone using AI
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            No prompt engineering experience needed. PromptLB does the structuring for you.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-14 sm:gap-4 lg:grid-cols-3">
          {AUDIENCES.map((a, i) => (
            <Reveal key={a.title} delay={i * 60}>
              <div className="card-hover h-full rounded-2xl border border-border bg-card p-5 sm:p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <a.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold sm:text-lg">{a.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{a.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
