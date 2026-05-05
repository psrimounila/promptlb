import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { HowItWorks } from "@/components/landing/HowItWorks";

export const Route = createFileRoute("/tutorial")({
  head: () => ({
    meta: [
      { title: "How It Works - PromptLB" },
      {
        name: "description",
        content:
          "Three simple steps to turn rough ideas into pro-grade AI prompts with PromptLB.",
      },
    ],
  }),
  component: TutorialPage,
});

function TutorialPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-20 sm:pt-24">
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
}
