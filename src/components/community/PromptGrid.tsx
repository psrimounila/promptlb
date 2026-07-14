import { Button } from "@/components/ui/button";
import { PromptCard } from "./PromptCard";

const prompts = [
  {
    title: "LinkedIn Carousel Generator",
    description:
      "Create a high-converting LinkedIn carousel with a powerful hook, educational content, engaging visuals, and a strong CTA that increases saves and shares.",
    category: "Marketing",
    model: "GPT-5",
    author: "Alex Johnson",
    avatar: "AJ",
    verified: true,
    likes: 245,
    comments: 18,
    views: 3240,
  },
  {
    title: "Instagram Reel Script",
    description:
      "Generate a 30-second Instagram Reel script with a viral hook, storytelling, CTA, and caption optimized for maximum engagement.",
    category: "Social",
    model: "GPT-5",
    author: "Sarah Lee",
    avatar: "SL",
    verified: false,
    likes: 198,
    comments: 12,
    views: 2810,
  },
  {
    title: "Landing Page Copy",
    description:
      "Write persuasive SaaS landing page copy including headline, subheading, features, benefits, testimonials, and CTA sections.",
    category: "Business",
    model: "Claude",
    author: "Michael Chen",
    avatar: "MC",
    verified: true,
    likes: 312,
    comments: 25,
    views: 4512,
  },
  {
    title: "UI Design Prompt",
    description:
      "Generate a clean, modern dashboard UI with analytics, sidebar navigation, responsive cards, charts, and premium SaaS styling.",
    category: "Design",
    model: "Midjourney",
    author: "Emily Davis",
    avatar: "ED",
    verified: true,
    likes: 287,
    comments: 19,
    views: 3987,
  },
  {
    title: "Blog Writer",
    description:
      "Write an SEO-friendly blog post with headings, FAQs, internal linking suggestions, and metadata for higher Google rankings.",
    category: "SEO",
    model: "Gemini",
    author: "David Smith",
    avatar: "DS",
    verified: false,
    likes: 154,
    comments: 9,
    views: 1940,
  },
  {
    title: "YouTube Script",
    description:
      "Generate a complete YouTube video script with introduction, storytelling, value sections, CTA, and retention hooks.",
    category: "Content",
    model: "GPT-5",
    author: "Jessica Brown",
    avatar: "JB",
    verified: true,
    likes: 401,
    comments: 31,
    views: 6120,
  },
];

export function PromptGrid() {
  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">
            Community Prompts
          </h2>

          <p className="text-muted-foreground">
            Discover prompts shared by the PromptLB community.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {prompts.map((prompt) => (
          <PromptCard
            key={prompt.title}
            {...prompt}
          />
        ))}
      </div>

      <div className="flex justify-center">
        <Button
          variant="outline"
          size="lg"
        >
          Load More
        </Button>
      </div>
    </section>
  );
}