import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { PromptExamples } from "@/components/landing/PromptExamples";
import { WhoItsFor } from "@/components/landing/WhoItsFor";
import { Categories } from "@/components/landing/Categories";
import { Features } from "@/components/landing/Features";
import { Metrics } from "@/components/landing/Metrics";
import { Playground } from "@/components/landing/Playground";
import { Testimonials } from "@/components/landing/Testimonials";
import { Enhancer } from "@/components/landing/Enhancer";
import { FAQ } from "@/components/landing/FAQ";
import { CTA } from "@/components/landing/CTA";
import { Footer } from "@/components/landing/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PromptLB - Turn Rough Ideas Into Smarter AI Prompts" },
      {
        name: "description",
        content:
          "Turn rough ideas into structured, high-quality AI prompts. Better ChatGPT, Claude, Gemini, and Midjourney results without prompt engineering.",
      },
      { property: "og:title", content: "PromptLB - Turn Rough Ideas Into Smarter AI Prompts" },
      {
        property: "og:description",
        content: "Get more accurate, relevant, and useful AI results, instantly.",
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
        <HowItWorks />
        <PromptExamples />
        <WhoItsFor />
        <Categories />
        <Features />
        <Metrics />
        <Playground />
        <Testimonials />
        <Enhancer />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
