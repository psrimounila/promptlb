import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Check,
  Crown,
  Sparkles,
  Loader2,
  Users,
  Wand2,
  Infinity as InfinityIcon,
  Zap,
} from "lucide-react";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing · PromptLB" },
      {
        name: "description",
        content: "Upgrade to PromptLB Pro for unlimited prompts, AI optimizer and more.",
      },
    ],
  }),
  component: PricingPage,
});

function PricingPage() {
  const { user, isPro, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const [upgrading, setUpgrading] = useState(false);

  const upgrade = async () => {
    if (!user) {
      navigate({ to: "/auth", search: { mode: "signup" } });
      return;
    }
    setUpgrading(true);
    const { error } = await supabase
      .from("profiles")
      .update({ plan: "pro", pro_since: new Date().toISOString() })
      .eq("id", user.id);
    setUpgrading(false);
    if (error) return toast.error(error.message);
    await refreshProfile();
    toast.success("Welcome to PromptLB Pro! 🎉");
    navigate({ to: "/dashboard" });
  };

  const downgrade = async () => {
    if (!user) return;
    const { error } = await supabase
      .from("profiles")
      .update({ plan: "free", pro_since: null })
      .eq("id", user.id);
    if (error) return toast.error(error.message);
    await refreshProfile();
    toast.success("Downgraded to Free plan");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="relative pt-28 pb-20">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[600px] bg-gradient-hero opacity-60" />

        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">
              Pricing
            </span>
            <h1 className="mt-3 text-balance text-5xl font-bold tracking-tight sm:text-6xl">
              Simple plans for{" "}
              <span className="text-gradient-primary">every prompter</span>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground">
              Start free. Go Pro when you're ready to ship faster.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Free */}
            <div className="glass rounded-3xl p-8">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-muted-foreground" />
                <h3 className="text-xl font-bold">Free</h3>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                Get started with the essentials.
              </p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-5xl font-bold">$0</span>
                <span className="text-muted-foreground">/forever</span>
              </div>

              <ul className="mt-8 space-y-3 text-sm">
                <Feature>Browse 1000s of community prompts</Feature>
                <Feature>Submit up to 5 of your own prompts</Feature>
                <Feature>Personal collections</Feature>
                <Feature>Basic search & filters</Feature>
              </ul>

              <Button
                variant="glass"
                className="mt-8 w-full"
                size="lg"
                disabled={!isPro && !!user}
                onClick={isPro ? downgrade : undefined}
              >
                {isPro ? "Switch to Free" : !user ? "Get started" : "Current plan"}
              </Button>
            </div>

            {/* Pro */}
            <div className="border-gradient relative overflow-hidden rounded-3xl p-8">
              <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-pro opacity-20 blur-3xl" />
              <div className="absolute right-6 top-6">
                <span className="inline-flex items-center gap-1 rounded-full bg-gradient-pro px-3 py-1 text-[11px] font-bold text-amber-950">
                  <Crown className="h-3 w-3" /> MOST POPULAR
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Crown className="h-5 w-5 text-amber-400" />
                <h3 className="text-xl font-bold text-gradient-pro">Pro</h3>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                For creators and teams shipping with AI daily.
              </p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-5xl font-bold">$12</span>
                <span className="text-muted-foreground">/month</span>
              </div>

              <ul className="mt-8 space-y-3 text-sm">
                <ProFeature icon={InfinityIcon}>
                  <strong>Unlimited prompts & collections</strong> — never hit a cap
                </ProFeature>
                <ProFeature icon={Wand2}>
                  <strong>AI Prompt Optimizer</strong> — rewrite & tune for any model
                </ProFeature>
                <ProFeature icon={Users}>
                  <strong>Team collections & sharing</strong> — collaborate seamlessly
                </ProFeature>
                <ProFeature icon={Zap}>
                  <strong>Early access</strong> to new models & beta features
                </ProFeature>
                <ProFeature icon={Sparkles}>
                  <strong>Priority support</strong> & exclusive expert prompts
                </ProFeature>
              </ul>

              <Button
                variant="hero"
                className="mt-8 w-full bg-gradient-pro text-amber-950 hover:opacity-90"
                size="lg"
                onClick={upgrade}
                disabled={upgrading || isPro}
              >
                {upgrading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : isPro ? (
                  <>
                    <Check className="h-4 w-4" /> You're on Pro
                  </>
                ) : (
                  <>
                    <Crown className="h-4 w-4" /> Upgrade to Pro
                  </>
                )}
              </Button>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                Cancel anytime · 7-day money-back guarantee
              </p>
            </div>
          </div>

          {/* Comparison */}
          <div className="mt-20 text-center">
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
      <span className="text-foreground/90">{children}</span>
    </li>
  );
}

function ProFeature({
  icon: Icon,
  children,
}: {
  icon: typeof Crown;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-2.5">
      <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center">
        <Icon className="h-4 w-4 text-amber-400" />
      </div>
      <span className="text-foreground/90">{children}</span>
    </li>
  );
}
