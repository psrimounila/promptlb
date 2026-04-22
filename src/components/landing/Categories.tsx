import {
  Brain,
  PenLine,
  Palette,
  Briefcase,
  Code2,
  MessageCircle,
  Video,
  Bot,
  Puzzle,
} from "lucide-react";

const categories = [
  {
    icon: Brain,
    title: "General & Foundational",
    items: ["Productivity", "Learning", "Research", "Brainstorming"],
  },
  {
    icon: PenLine,
    title: "Writing & Content",
    items: ["Blog Writing", "Copywriting", "Storytelling", "SEO", "Emails"],
  },
  {
    icon: Palette,
    title: "Design & Creativity",
    items: ["Logo & Branding", "UI/UX", "Midjourney Art", "Photography"],
  },
  {
    icon: Briefcase,
    title: "Business & Marketing",
    items: ["Market Research", "Social Ads", "Personas", "Pitches"],
  },
  {
    icon: Code2,
    title: "Development & Tech",
    items: ["Code Generation", "Debugging", "API Ideas", "AI Agents"],
  },
  {
    icon: MessageCircle,
    title: "Social & Community",
    items: ["Captions", "Hashtags", "Video Scripts", "Engagement"],
  },
  {
    icon: Video,
    title: "Audio & Video",
    items: ["Podcasts", "YouTube", "Editing", "Voiceovers"],
  },
  {
    icon: Bot,
    title: "AI Model-Specific",
    items: ["ChatGPT", "Claude", "Gemini", "Midjourney", "Stable Diffusion"],
  },
  {
    icon: Puzzle,
    title: "Specialized & Niche",
    items: ["Education", "Healthcare", "Legal", "Finance", "HR"],
  },
];

export function Categories() {
  return (
    <section id="categories" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">
            Categories
          </span>
          <h2 className="mt-3 text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            A prompt for <span className="text-gradient-primary">every craft</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            From blog posts to bedtime stories, code reviews to cinematic art —
            we've got you covered.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <div
              key={cat.title}
              className="glass group cursor-pointer rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-elevated transition-colors group-hover:bg-gradient-primary">
                  <cat.icon className="h-5 w-5 text-accent transition-colors group-hover:text-primary-foreground" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold">{cat.title}</h3>
                  <div className="mt-3 flex flex-wrap gap-1.5">
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
