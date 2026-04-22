import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing · PromptLB" },
      {
        name: "description",
        content:
          "PromptLB is 100% free. Browse thousands of verified AI prompts, run them in the playground, and save your history.",
      },
    ],
  }),
  component: PricingPage,
});

function PricingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="relative pt-24 pb-20 sm:pt-28">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[600px] bg-gradient-hero opacity-60" />

        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">
              Pricing
            </span>
            <h1 className="mt-3 text-balance text-4xl font-bold tracking-tight sm:text-6xl">
              Free for everyone.{" "}
              <span className="text-gradient-primary">Forever.</span>
            </h1>
            <p className="mt-5 text-base text-muted-foreground sm:text-lg">
              No paywalls. No credit card. Just the best AI prompt library on
              the internet, available to every creator, developer and team.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-2xl">
            <div className="glass-strong relative overflow-hidden rounded-3xl p-6 sm:p-10">
              <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-primary opacity-30 blur-3xl" />

              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-accent" />
                <h3 className="text-2xl font-bold">PromptLB</h3>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                Everything you need, in one library.
              </p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-6xl font-bold">$0</span>
                <span className="text-muted-foreground">/forever</span>
              </div>

              <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Feature>Browse the full prompt library</Feature>
                <Feature>Search across every category & model</Feature>
                <Feature>Submit unlimited prompts</Feature>
                <Feature>Run any prompt in the playground</Feature>
                <Feature>Save your prompt history</Feature>
                <Feature>Personal collections</Feature>
                <Feature>Copy & remix any prompt</Feature>
                <Feature>Optimized for ChatGPT, Claude, Gemini & more</Feature>
              </ul>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  variant="hero"
                  size="lg"
                  className="flex-1"
                  onClick={() =>
                    navigate({ to: "/auth", search: { mode: "signup" } })
                  }
                >
                  Create free account
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="glass"
                  size="lg"
                  className="flex-1"
                  onClick={() => navigate({ to: "/library" })}
                >
                  Browse Library
                </Button>
              </div>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                No credit card required. Sign up in seconds.
              </p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold">Loved by 10,000+ creators</h2>
            <p className="mt-2 text-muted-foreground">
              Join the community building the future of prompting.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function Feature({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2.5">
      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
      <span className="text-sm text-foreground/90">{children}</span>
    </li>
  );
}
