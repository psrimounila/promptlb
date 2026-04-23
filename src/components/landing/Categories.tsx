import { useNavigate } from "@tanstack/react-router";
import { Megaphone, Layout, Code2, Briefcase, Sparkles } from "lucide-react";

const categories: Array<{
  icon: typeof Megaphone;
  title: string;
  filter: string;
  count: string;
  blurb: string;
  items: string[];
  accent: string;
}> = [
  {
    icon: Megaphone,
    title: "Marketing",
    filter: "Marketing",
    count: "22+ prompts",
    blurb: "Ads, emails, landing pages, social, SEO, and growth tactics.",
    items: ["Ads", "Email", "SEO", "Social", "Brand"],
    accent: "from-pink-500/20 to-orange-500/20",
  },
  {
    icon: Layout,
    title: "UI/UX",
    filter: "UI/UX",
    count: "21+ prompts",
    blurb: "Audits, personas, wireframes, design systems, and microcopy.",
    items: ["Audits", "Personas", "Wireframes", "Tokens", "Microcopy"],
    accent: "from-purple-500/20 to-blue-500/20",
  },
  {
    icon: Code2,
    title: "Coding",
    filter: "Coding",
    count: "22+ prompts",
    blurb: "Reviews, refactors, debugging, tests, and architecture decisions.",
    items: ["Review", "Debug", "Tests", "SQL", "TypeScript"],
    accent: "from-green-500/20 to-emerald-500/20",
  },
  {
    icon: Briefcase,
    title: "Business",
    filter: "Business",
    count: "21+ prompts",
    blurb: "Strategy, pitch decks, OKRs, hiring, sales, and operations.",
    items: ["Strategy", "Pitch", "OKRs", "Sales", "Hiring"],
    accent: "from-amber-500/20 to-yellow-500/20",
  },
  {
    icon: Sparkles,
    title: "Content Creation",
    filter: "Content Creation",
    count: "22+ prompts",
    blurb: "YouTube, newsletters, blogs, threads, and visual prompts.",
    items: ["YouTube", "Newsletter", "Blog", "Threads", "Visuals"],
    accent: "from-cyan-500/20 to-sky-500/20",
  },
];

export function Categories() {
  const navigate = useNavigate();
  return (
    <section id="categories" className="relative py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">
            Categories
          </span>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-5xl">
            A prompt for{" "}
            <span className="text-gradient-primary">every craft</span>
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:mt-5 sm:text-lg">
            Five focused categories. 100+ verified prompts. All free, all
            community-ranked.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <button
              key={cat.title}
              onClick={() =>
                navigate({
                  to: "/library",
                  search: { category: cat.filter } as never,
                })
              }
              className="glass group relative cursor-pointer overflow-hidden rounded-2xl p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 sm:p-6"
            >
              <div
                className={`pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br ${cat.accent} opacity-40 blur-3xl transition-opacity group-hover:opacity-70`}
              />
              <div className="relative">
                <div className="flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface-elevated transition-colors group-hover:bg-gradient-primary">
                    <cat.icon className="h-5 w-5 text-accent transition-colors group-hover:text-primary-foreground" />
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                    {cat.count}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-semibold">{cat.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {cat.blurb}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {cat.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-md bg-surface px-2 py-0.5 text-xs text-muted-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
