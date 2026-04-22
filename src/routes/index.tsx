import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { Categories } from "@/components/landing/Categories";
import { Playground } from "@/components/landing/Playground";
import { CTA } from "@/components/landing/CTA";
import { Footer } from "@/components/landing/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PromptLB — Your AI Prompt Library" },
      {
        name: "description",
        content:
          "Discover, organize and share verified AI prompts for ChatGPT, Claude, Gemini, Midjourney and more. Stop testing — start shipping.",
      },
      { property: "og:title", content: "PromptLB — Your AI Prompt Library" },
      {
        property: "og:description",
        content:
          "A unified library of community-tested prompts for every AI model and use case.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Categories />
        <Playground />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
