import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className="glass-strong relative overflow-hidden rounded-3xl px-8 py-16 text-center sm:px-16 sm:py-20">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-primary opacity-10" />
          <div className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-64 w-[120%] -translate-x-1/2 rounded-full bg-gradient-primary opacity-30 blur-3xl" />

          <h2 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Stop guessing.
            <br />
            <span className="text-gradient-primary">Start prompting like a pro.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
            Join thousands of creators, developers, and businesses building with
            verified, high-quality AI prompts.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button variant="hero" size="xl" className="group">
              Get Started Free
              <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
            </Button>
            <Button variant="glass" size="xl">
              Browse Library
            </Button>
          </div>
          <p className="mt-5 text-xs text-muted-foreground">
            No credit card required · 10,000+ prompts · Updated daily
          </p>
        </div>
      </div>
    </section>
  );
}
