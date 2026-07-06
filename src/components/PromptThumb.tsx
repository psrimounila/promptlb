import type { ReactNode } from "react";

/**
 * Decorative twin-thumbnail preview for prompt cards.
 * Two small CSS mockups, slightly rotated + overlapping, chosen by category / model.
 * Pure presentational — pointer-events disabled by the parent wrapper.
 */

type Kind =
  | "carousel"
  | "article"
  | "ad"
  | "thumbnail"
  | "email"
  | "ui"
  | "code"
  | "image"
  | "doc";

function pickKind(category: string, model: string): Kind {
  const m = model.toLowerCase();
  if (["midjourney", "dall·e", "dall-e", "stable diffusion"].some((x) => m.includes(x))) {
    return "image";
  }
  switch (category) {
    case "Marketing":
      return "ad";
    case "UI/UX":
      return "ui";
    case "Coding":
      return "code";
    case "Business":
      return "doc";
    case "Content Creation":
      return "article";
    case "Image & Design":
      return "image";
    default:
      return "carousel";
  }
}

/* ---------- Mockup primitives (tiny, dark-theme friendly) ---------- */

function Frame({ children, tint = "from-primary/25 to-accent/20" }: { children: ReactNode; tint?: string }) {
  return (
    <div
      className={`relative h-14 w-14 overflow-hidden rounded-[12px] border border-white/10 bg-gradient-to-br ${tint} shadow-[0_8px_18px_-8px_rgba(0,0,0,0.7)] backdrop-blur-sm`}
    >
      {children}
    </div>
  );
}

const Line = ({ w = "w-8", op = "bg-white/40" }: { w?: string; op?: string }) => (
  <div className={`h-[3px] rounded-full ${w} ${op}`} />
);

function MockAd() {
  return (
    <Frame tint="from-fuchsia-500/30 to-primary/20">
      <div className="absolute inset-1 rounded-md bg-white/10" />
      <div className="absolute bottom-1 left-1 right-1 space-y-[3px]">
        <Line w="w-7" op="bg-white/70" />
        <Line w="w-5" op="bg-white/40" />
      </div>
    </Frame>
  );
}

function MockArticle() {
  return (
    <Frame tint="from-sky-500/25 to-primary/20">
      <div className="absolute inset-x-1 top-1 h-3 rounded-sm bg-white/25" />
      <div className="absolute inset-x-1 bottom-1 space-y-[3px]">
        <Line w="w-10" />
        <Line w="w-8" op="bg-white/25" />
        <Line w="w-6" op="bg-white/25" />
      </div>
    </Frame>
  );
}

function MockCarousel() {
  return (
    <Frame tint="from-pink-500/30 to-orange-400/20">
      <div className="absolute inset-1 rounded-md ring-1 ring-white/20" />
      <div className="absolute bottom-1 left-1/2 flex -translate-x-1/2 gap-[3px]">
        <span className="h-[3px] w-[3px] rounded-full bg-white/80" />
        <span className="h-[3px] w-[3px] rounded-full bg-white/40" />
        <span className="h-[3px] w-[3px] rounded-full bg-white/40" />
      </div>
    </Frame>
  );
}

function MockThumbnail() {
  return (
    <Frame tint="from-red-500/30 to-primary/15">
      <div className="absolute inset-1 rounded-md bg-white/10" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-3 w-3 rounded-full bg-white/80 shadow" />
      </div>
    </Frame>
  );
}

function MockEmail() {
  return (
    <Frame tint="from-emerald-500/25 to-primary/15">
      <div className="absolute inset-x-1 top-1 h-2 rounded-sm bg-white/40" />
      <div className="absolute inset-x-1 bottom-1 space-y-[3px]">
        <Line w="w-9" op="bg-white/30" />
        <Line w="w-7" op="bg-white/25" />
      </div>
    </Frame>
  );
}

function MockUI() {
  return (
    <Frame tint="from-indigo-500/25 to-accent/20">
      <div className="absolute left-1 top-1 h-full w-2 rounded-sm bg-white/25" />
      <div className="absolute inset-y-1 left-4 right-1 space-y-[3px]">
        <Line w="w-8" />
        <Line w="w-6" op="bg-white/25" />
        <Line w="w-7" op="bg-white/25" />
      </div>
    </Frame>
  );
}

function MockCode() {
  return (
    <Frame tint="from-primary/25 to-emerald-500/20">
      <div className="absolute inset-1 space-y-[3px] font-mono">
        <Line w="w-4" op="bg-emerald-300/80" />
        <Line w="w-8" op="bg-white/60" />
        <Line w="w-6" op="bg-white/40" />
        <Line w="w-7" op="bg-sky-300/70" />
      </div>
    </Frame>
  );
}

function MockImage() {
  return (
    <Frame tint="from-violet-500/30 to-pink-400/25">
      <div className="absolute inset-1 rounded-md bg-gradient-to-tr from-white/20 to-white/5" />
      <div className="absolute bottom-1.5 left-1.5 h-2 w-2 rounded-full bg-white/70" />
      <div className="absolute right-1 top-1 h-2 w-3 rotate-12 rounded-sm bg-white/40" />
    </Frame>
  );
}

function MockDoc() {
  return (
    <Frame tint="from-amber-400/25 to-primary/15">
      <div className="absolute inset-x-1 top-1 h-2 rounded-sm bg-white/40" />
      <div className="absolute inset-x-1 bottom-1 space-y-[3px]">
        <Line w="w-9" op="bg-white/30" />
        <Line w="w-6" op="bg-white/25" />
        <div className="mt-1 flex gap-[3px]">
          <div className="h-2 w-2 rounded-sm bg-white/40" />
          <div className="h-2 w-3 rounded-sm bg-white/25" />
        </div>
      </div>
    </Frame>
  );
}

const MOCKS: Record<Kind, () => ReactNode> = {
  ad: MockAd,
  article: MockArticle,
  carousel: MockCarousel,
  thumbnail: MockThumbnail,
  email: MockEmail,
  ui: MockUI,
  code: MockCode,
  image: MockImage,
  doc: MockDoc,
};

export function PromptThumb({ category, model }: { category: string; model: string }) {
  const kind = pickKind(category, model);
  const Mock = MOCKS[kind];
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute right-3 top-3 z-10 h-14 w-[76px] select-none"
    >
      {/* back thumb */}
      <div className="absolute right-4 top-1 -rotate-[10deg] transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:-rotate-[6deg]">
        <div className="opacity-80">
          <Mock />
        </div>
      </div>
      {/* front thumb */}
      <div className="absolute right-0 top-2 rotate-[8deg] transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:rotate-[4deg] group-hover:scale-[1.04]">
        <Mock />
      </div>
    </div>
  );
}
