import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

export function CTA() {
  const navigate = useNavigate();
  return (
    <section className="relative py-12 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="glass-strong relative overflow-hidden rounded-3xl px-6 py-12 text-center sm:px-16 sm:py-20">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-primary opacity-10" />
          <div className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-64 w-[120%] -translate-x-1/2 rounded-full bg-gradient-primary opacity-30 blur-3xl" />

          <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Stop guessing.
            <br />
            <span className="text-gradient-primary">Start prompting like a pro.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
            Join thousands of creators, developers, and businesses building with
            verified, high-quality AI prompts. Always free.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row">
            <Button
              variant="hero"
              size="xl"
              className="group w-full sm:w-auto"
              onClick={() => navigate({ to: "/auth", search: { mode: "signup" } })}
            >
              Get Started Free
              <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
            </Button>
            <Button
              variant="glass"
              size="xl"
              className="w-full sm:w-auto"
              onClick={() => navigate({ to: "/library" })}
            >
              Explore Prompts
            </Button>
          </div>
          <p className="mt-5 text-xs text-muted-foreground">
            No credit card required · Thousands of prompts · Updated daily
          </p>
        </div>
      </div>
    </section>
  );
}
