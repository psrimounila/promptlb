import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const FAQS = [
  {
    q: "What is PromptLB?",
    a: "PromptLB helps you turn simple ideas into powerful AI prompts so you can get better results instantly.",
  },
  {
    q: "Why should I use PromptLB instead of AI tools directly?",
    a: "AI tools give answers — PromptLB helps you ask better questions. Better prompts = better results with less trial and error.",
  },
  {
    q: "How does the Prompt Enhancer work?",
    a: "You enter a basic idea, and PromptLB converts it into a structured prompt with a clear goal, target audience, tone/style, and output format.",
  },
  {
    q: "Do I need prompt writing skills?",
    a: "No. PromptLB is built for beginners. Just type your idea — it does the rest.",
  },
  {
    q: "Which AI tools can I use these prompts with?",
    a: "You can use them with tools like ChatGPT, Claude, Gemini, and Midjourney.",
  },
  {
    q: "Can I edit the generated prompts?",
    a: "Yes, you can copy and customize them anytime.",
  },
  {
    q: "Is PromptLB free to use?",
    a: "Yes, core features are free.",
  },
  {
    q: "Will this guarantee better results?",
    a: "PromptLB improves your input quality, which usually leads to better outputs — but results also depend on the AI tool used.",
  },
  {
    q: "Who is PromptLB for?",
    a: "Anyone using AI — creators, students, marketers, designers, and developers.",
  },
  {
    q: "When should I use PromptLB?",
    a: "Before using any AI tool. Just enter your idea here first, then use the enhanced prompt for better results.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="relative py-12 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-accent">
            <HelpCircle className="h-3.5 w-3.5" /> FAQ
          </span>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-5xl">
            Questions, <span className="text-gradient-primary">answered</span>
          </h2>
          <p className="mt-3 text-base text-muted-foreground sm:text-lg">
            Everything you need to know about PromptLB.
          </p>
        </div>

        <div className="mt-8 sm:mt-10">
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((item, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="glass mb-2 overflow-hidden rounded-xl border-border px-4"
              >
                <AccordionTrigger className="text-left text-sm font-semibold sm:text-base">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
