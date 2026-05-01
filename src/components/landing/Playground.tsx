import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Play,
  Copy,
  Sparkles,
  Image as ImageIcon,
  FileText,
  Code2,
  XCircle,
  CheckCircle2,
  ArrowRight,
  Maximize2,
} from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { useState } from "react";
import socialEnhanced from "@/assets/playground-social-enhanced.jpg";
import socialBasic from "@/assets/playground-social-basic.jpg";
import productEnhanced from "@/assets/playground-product.jpg";
import productBasic from "@/assets/playground-product-basic.jpg";

type PromptSection = { emoji: string; label: string; text: string };

type Side = {
  prompt: string;
  /** For image type: image src. For text/code: rendered output. */
  output: string;
  note: string;
};

type EnhancedSide = Side & {
  sections: PromptSection[];
};

type SampleCard = {
  type: "image" | "text" | "code";
  model: string;
  category: string;
  title: string;
  basic: Side;
  enhanced: EnhancedSide;
};

const SAMPLES: SampleCard[] = [
  {
    type: "image",
    model: "Midjourney",
    category: "Image & Design",
    title: "Skincare social post",
    basic: {
      prompt: "create social media post of skincare brand",
      output: socialBasic,
      note: "Random snapshot, no design, off-brand",
    },
    enhanced: {
      prompt:
        "instagram social post for a luxury skincare brand, glass serum bottle on pastel peach background, botanical leaves, golden accents, headline 'GLOW DAILY' in elegant serif, soft studio light, 1:1",
      output: socialEnhanced,
      note: "Scroll-stopping, on-brand ad creative",
    },
  },
  {
    type: "image",
    model: "DALL·E",
    category: "Image & Design",
    title: "Luxury product hero",
    basic: {
      prompt: "photo of a green handbag on a table",
      output: productBasic,
      note: "Flat lighting, no styling",
    },
    enhanced: {
      prompt:
        "editorial product shot of a sage green leather handbag held by elegant hands with manicured nails, soft cream gradient backdrop, golden hour studio light, gold hardware, magazine quality, 4k",
      output: productEnhanced,
      note: "Campaign-ready hero shot",
    },
  },
  {
    type: "text",
    model: "ChatGPT",
    category: "Marketing",
    title: "Viral LinkedIn hook",
    basic: {
      prompt: "Write a LinkedIn post about AI features.",
      output:
        "AI is changing the world. Many companies are now adding AI features to their products. It is exciting to see what will come next. #AI #innovation",
      note: "Generic, no hook, low engagement",
    },
    enhanced: {
      prompt:
        "Write a 3-line LinkedIn hook for B2B founders about why most AI features fail in production.",
      output:
        "Most AI features die in week 3.\nNot because the model is bad - because the workflow is.\nHere's the 1 thing teams shipping AI in production do differently…",
      note: "Scroll-stopping hook, specific, sharable",
    },
  },
  {
    type: "code",
    model: "Claude",
    category: "Coding",
    title: "React pricing component",
    basic: {
      prompt: "make me a pricing component in react",
      output:
        "function Pricing() {\n  return (\n    <div>\n      <h2>Pricing</h2>\n      <p>Basic - $10</p>\n      <p>Pro - $20</p>\n    </div>\n  );\n}",
      note: "No styling, no structure",
    },
    enhanced: {
      prompt:
        "Generate a Tailwind + React pricing card with 3 tiers, monthly/yearly toggle, and a featured tier.",
      output:
        "// PricingCard.tsx\nexport function PricingCard({ tier, featured }) {\n  return (\n    <div className={`rounded-2xl p-6 ${featured\n      ? 'bg-gradient-to-br from-primary to-accent ring-2 ring-primary'\n      : 'border border-border bg-surface'}`}>\n      <Toggle billing={billing} onChange={setBilling} />\n      <Tiers data={tier} />\n    </div>\n  );\n}",
      note: "Production-ready, themed, complete",
    },
  },
];

const TYPE_META = {
  image: { icon: ImageIcon, label: "Image" },
  text: { icon: FileText, label: "Text" },
  code: { icon: Code2, label: "Code" },
} as const;

function OutputPreview({
  type,
  output,
  variant,
  onExpand,
}: {
  type: SampleCard["type"];
  output: string;
  variant: "basic" | "enhanced";
  onExpand?: () => void;
}) {
  if (type === "image") {
    const isExpandable = variant === "enhanced" && onExpand;

    return (
      <button
        type="button"
        className="group relative aspect-square w-full overflow-hidden rounded-lg border border-border bg-surface/40 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
        onClick={isExpandable ? onExpand : undefined}
        aria-label={
          isExpandable ? "View full enhanced image" : "Image output preview"
        }
      >
        <img
          src={output}
          alt={variant === "basic" ? "Basic prompt result" : "Enhanced prompt result"}
          loading="lazy"
          className={`h-full w-full object-contain ${
            variant === "basic" ? "opacity-90" : ""
          }`}
        />
        {isExpandable ? (
          <span className="absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background/80 text-foreground opacity-0 shadow-soft transition-opacity group-hover:opacity-100 group-focus:opacity-100">
            <Maximize2 className="h-3.5 w-3.5" />
          </span>
        ) : null}
      </button>
    );
  }

  if (type === "code") {
    return (
      <div className="aspect-[4/3] w-full overflow-hidden rounded-lg border border-border bg-background/60 p-3">
        <pre className="h-full overflow-hidden whitespace-pre-wrap font-mono text-[10px] leading-relaxed text-foreground/90">
          {output}
        </pre>
      </div>
    );
  }

  return (
    <div className="aspect-[4/3] w-full overflow-hidden rounded-lg border border-border bg-background/60 p-3">
      <p className="h-full overflow-hidden whitespace-pre-line text-[11px] leading-relaxed text-foreground/90">
        {output}
      </p>
    </div>
  );
}

export function Playground() {
  const navigate = useNavigate();
  const [expandedImage, setExpandedImage] = useState<{
    src: string;
    title: string;
  } | null>(null);

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Prompt copied");
  };

  const run = (s: SampleCard) => {
    navigate({
      to: "/playground",
      search: { prompt: s.enhanced.prompt, model: s.model, title: s.title },
    });
  };

  return (
    <section id="playground" className="relative py-12 sm:py-20">
      <div className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 h-[400px] -translate-y-1/2 bg-gradient-primary opacity-10 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-accent">
            <Play className="h-3.5 w-3.5" /> Prompt Playground
          </span>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-5xl">
            Compare basic vs{" "}
            <span className="text-gradient-primary">enhanced</span>
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:mt-5 sm:text-lg">
            See exactly how a stronger prompt changes the output - text, code,
            or image - side by side.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:mt-14 lg:grid-cols-2">
          {SAMPLES.map((s) => {
            const Icon = TYPE_META[s.type].icon;
            const typeLabel = TYPE_META[s.type].label;
            return (
              <article
                key={s.title}
                className="glass overflow-hidden rounded-2xl transition-all hover:border-primary/40 hover:shadow-elegant"
              >
                {/* Header */}
                <div className="flex items-center justify-between gap-2 border-b border-border px-4 py-3">
                  <div className="flex min-w-0 items-center gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full border border-border bg-background/70 px-2 py-0.5 text-[10px] font-semibold">
                      <Icon className="h-3 w-3" />
                      {typeLabel}
                    </span>
                    <span className="truncate text-sm font-semibold">
                      {s.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="rounded-full border border-border bg-background/70 px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                      {s.category}
                    </span>
                    <span className="rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 text-[10px] font-semibold text-accent">
                      {s.model}
                    </span>
                  </div>
                </div>

                {/* Comparison: left = Basic, right = Enhanced */}
                <div className="grid grid-cols-1 gap-px bg-border md:grid-cols-2">
                  {/* BASIC */}
                  <div className="bg-background/40 p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1 rounded-full border border-destructive/30 bg-destructive/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-destructive">
                        <XCircle className="h-3 w-3" /> Basic
                      </span>
                    </div>
                    <p className="line-clamp-2 font-mono text-[11px] leading-relaxed text-muted-foreground">
                      {s.basic.prompt}
                    </p>
                    <div className="mt-3">
                      <OutputPreview
                        type={s.type}
                        output={s.basic.output}
                        variant="basic"
                      />
                    </div>
                    <p className="mt-2 text-[10px] text-destructive/90">
                      ● {s.basic.note}
                    </p>
                  </div>

                  {/* ENHANCED */}
                  <div className="bg-surface/60 p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1 rounded-full border border-primary/40 bg-primary/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary-glow">
                        <CheckCircle2 className="h-3 w-3" /> Enhanced
                      </span>
                    </div>
                    <p className="line-clamp-2 font-mono text-[11px] leading-relaxed text-foreground/90">
                      {s.enhanced.prompt}
                    </p>
                    <div className="mt-3">
                      <OutputPreview
                        type={s.type}
                        output={s.enhanced.output}
                        variant="enhanced"
                        onExpand={() =>
                          setExpandedImage({ src: s.enhanced.output, title: s.title })
                        }
                      />
                    </div>
                    <p className="mt-2 text-[10px] text-primary-glow">
                      ● {s.enhanced.note}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 border-t border-border px-4 py-3">
                  <Button
                    variant="hero"
                    size="sm"
                    className="h-8 flex-1"
                    onClick={() => run(s)}
                  >
                    <Play className="h-3 w-3" /> Run enhanced
                    <ArrowRight className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="glass"
                    size="sm"
                    className="h-8"
                    onClick={() => copy(s.enhanced.prompt)}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-10 flex justify-center">
          <Button
            variant="hero"
            size="lg"
            onClick={() => navigate({ to: "/playground" })}
          >
            <Sparkles className="h-4 w-4" />
            Open Full Playground
          </Button>
        </div>
      </div>

      <Dialog
        open={Boolean(expandedImage)}
        onOpenChange={(open) => {
          if (!open) setExpandedImage(null);
        }}
      >
        <DialogContent className="max-h-[92vh] max-w-[min(92vw,960px)] overflow-hidden p-4">
          <DialogTitle className="sr-only">
            {expandedImage?.title ?? "Enhanced image preview"}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Full size enhanced image preview
          </DialogDescription>
          {expandedImage ? (
            <img
              src={expandedImage.src}
              alt={`${expandedImage.title} enhanced full preview`}
              className="max-h-[84vh] w-full rounded-lg object-contain"
            />
          ) : null}
        </DialogContent>
      </Dialog>
    </section>
  );
}
