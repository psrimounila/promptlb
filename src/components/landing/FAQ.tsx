import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const FAQS = [
  {
    q: "Is PromptLB really free?",
    a: "Yes. Every prompt, the playground, the leaderboard and the AI Prompt Enhancer are 100% free. No credit card, no trial, no hidden tier.",
  },
  {
    q: "Which AI models are supported?",
    a: "Our prompts are optimized for ChatGPT, Claude, Gemini, Midjourney, DALL·E and Stable Diffusion. You can run text prompts directly in the Playground.",
  },
  {
    q: "How does the Prompt Enhancer work?",
    a: "Type a rough idea and our AI structures it into a pro-grade prompt with Goal, Audience, Tone & Style, Format and a final ready-to-paste prompt.",
  },
  {
    q: "Do I need an account to browse prompts?",
    a: "No. You can browse the library, leaderboard and run the Enhancer without signing in. An account is only needed to save your prompt history and submit your own prompts.",
  },
  {
    q: "Can I submit my own prompts?",
    a: "Yes. Once signed in, head to your Dashboard and submit prompts to the public library. The community upvotes the best ones onto the leaderboard.",
  },
  {
    q: "How are leaderboard rankings calculated?",
    a: "Prompts are ranked by community upvotes. Anyone can upvote a prompt, including anonymous visitors, to help surface the best work.",
  },
  {
    q: "Where is my data stored?",
    a: "Your account, prompts and run history are stored securely in our managed backend. You can delete your data at any time from your dashboard.",
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
