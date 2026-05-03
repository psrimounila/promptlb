import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import {
  Search,
  Sparkles,
  Play,
  Trophy,
  History,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export const Route = createFileRoute("/tutorial")({
  head: () => ({
    meta: [
      { title: "Tutorial - How to use PromptLB" },
      {
        name: "description",
        content:
          "Step-by-step guide to finding, enhancing, running and saving AI prompts on PromptLB.",
      },
    ],
  }),
  component: TutorialPage,
});

const STEPS = [
  {
    icon: Search,
    title: "1. Search Explore Prompts",
    desc: "Use the search bar on the home page to find verified prompts. Try a category name like 'Marketing' or a keyword like 'landing page hero'.",
    tips: [
      "Direct category names jump straight to that filter.",
      "Keyword search returns matching titles, descriptions and tags.",
      "If nothing matches, you'll be sent to the Enhancer to craft one.",
    ],
  },
  {
    icon: Sparkles,
    title: "2. Enhance a Rough Idea",
    desc: "Open the Prompt Enhancer, type any rough idea, and click Enhance. The AI structures it with Goal, Audience, Tone & Style and Format.",
    tips: [
      "Use the example chips to see the format in action.",
      "Click Copy to grab the structured prompt.",
      "Paste it into ChatGPT, Claude, Gemini or any model you use.",
    ],
  },
  {
    icon: Play,
    title: "3. Run in Compare Prompts",
    desc: "Open any prompt in Compare Prompts to run it against your favorite model and see real output instantly.",
    tips: [
      "Pick the model from the dropdown.",
      "Tweak the prompt text before running.",
      "Copy the output or save the run to your history.",
    ],
  },
  {
    icon: Trophy,
    title: "4. Vote on the Leaderboard",
    desc: "Browse the top community-ranked prompts and upvote your favorites to help others discover the best work.",
    tips: [
      "Filter by category to find top prompts in your craft.",
      "Anyone can upvote, no account required.",
      "Submit your own prompts from the Dashboard.",
    ],
  },
  {
    icon: History,
    title: "5. Save your History",
    desc: "Sign in to automatically save every prompt you run. Your history is private to you and accessible from your Dashboard.",
    tips: [
      "Free account, no payment required.",
      "Reuse past runs in one click.",
      "Build personal collections of your best prompts.",
    ],
  },
];

function TutorialPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="mx-auto max-w-4xl px-4 pt-28 pb-16 sm:px-6 sm:pt-36 sm:pb-24">
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-accent">
            <Sparkles className="h-3.5 w-3.5" /> Tutorial
          </span>
          <h1 className="mt-3 text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            Get the most out of{" "}
            <span className="text-gradient-primary">PromptLB</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
            Five quick steps to find, enhance, run and save the best AI prompts.
          </p>
        </div>

        <div className="mt-10 space-y-4 sm:mt-14 sm:space-y-5">
          {STEPS.map((step) => (
            <div
              key={step.title}
              className="glass-strong rounded-2xl p-5 sm:p-7"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-primary shadow-elegant">
                  <step.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-lg font-semibold sm:text-xl">
                    {step.title}
                  </h2>
                  <p className="mt-1.5 text-sm text-muted-foreground sm:text-base">
                    {step.desc}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {step.tips.map((tip) => (
                      <li
                        key={tip}
                        className="flex items-start gap-2 text-sm text-foreground/85"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-center gap-3 text-center sm:flex-row">
          <Button variant="hero" size="lg" asChild>
            <Link to="/library">
              Explore Prompts
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="glass" size="lg" asChild>
            <Link to="/playground">Compare Prompts</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
