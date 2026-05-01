import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { FAQ } from "@/components/landing/FAQ";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ - PromptLB" },
      {
        name: "description",
        content:
          "Frequently asked questions about PromptLB, the free AI prompt library and leaderboard.",
      },
    ],
  }),
  component: FAQPage,
});

function FAQPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-20 sm:pt-28">
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
