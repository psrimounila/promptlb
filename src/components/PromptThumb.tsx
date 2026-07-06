import type { ReactNode } from "react";

/**
 * Decorative twin-preview mockups for prompt cards.
 * Two small template-style thumbnails, slightly rotated + overlapping.
 * Purely presentational; pointer-events disabled.
 */

type Kind =
  | "instagram"
  | "linkedin"
  | "dashboard"
  | "ad"
  | "resume"
  | "article"
  | "email"
  | "youtube"
  | "code"
  | "image"
  | "doc";

function pickKind(category: string, model: string, title: string): Kind {
  const t = title.toLowerCase();
  const m = model.toLowerCase();

  // Keyword-first (more specific than category)
  if (/instagram|carousel|reel|story|ig\b/.test(t)) return "instagram";
  if (/linkedin|hook|post\b/.test(t)) return "linkedin";
  if (/dashboard|saas|admin|analytics/.test(t)) return "dashboard";
  if (/ad\b|advert|banner|promo|campaign copy/.test(t)) return "ad";
  if (/resume|cv\b|cover letter/.test(t)) return "resume";
  if (/blog|article|essay|newsletter article/.test(t)) return "article";
  if (/email|newsletter|cold outreach|drip/.test(t)) return "email";
  if (/youtube|thumbnail|video/.test(t)) return "youtube";
  if (/code|snippet|function|component|api\b/.test(t)) return "code";

  if (["midjourney", "dall·e", "dall-e", "stable diffusion"].some((x) => m.includes(x))) {
    return "image";
  }

  switch (category) {
    case "Marketing":
      return "ad";
    case "UI/UX":
      return "dashboard";
    case "Coding":
      return "code";
    case "Business":
      return "doc";
    case "Content Creation":
      return "article";
    case "Image & Design":
      return "image";
    default:
      return "article";
  }
}

/* ---------- Mockup primitives ---------- */

function Frame({
  children,
  bg = "bg-[#12121a]",
}: {
  children: ReactNode;
  bg?: string;
}) {
  return (
    <div
      className={`relative h-16 w-14 overflow-hidden rounded-[12px] border border-white/10 ${bg} shadow-[0_10px_22px_-10px_rgba(0,0,0,0.75)]`}
    >
      {children}
    </div>
  );
}

const Bar = ({ w = "w-8", h = "h-[3px]", c = "bg-white/40" }: { w?: string; h?: string; c?: string }) => (
  <div className={`rounded-full ${w} ${h} ${c}`} />
);

/* Instagram carousel slide */
function MockInstagram() {
  return (
    <Frame bg="bg-gradient-to-br from-pink-500/70 via-fuchsia-500/60 to-orange-400/60">
      <div className="absolute inset-1 rounded-md bg-white/10 ring-1 ring-white/20" />
      <div className="absolute left-1.5 top-1.5 h-2 w-2 rounded-full bg-white/80" />
      <div className="absolute bottom-1.5 left-1/2 flex -translate-x-1/2 gap-[3px]">
        <span className="h-[3px] w-[3px] rounded-full bg-white" />
        <span className="h-[3px] w-[3px] rounded-full bg-white/50" />
        <span className="h-[3px] w-[3px] rounded-full bg-white/50" />
      </div>
    </Frame>
  );
}

/* LinkedIn post */
function MockLinkedIn() {
  return (
    <Frame bg="bg-white">
      <div className="absolute inset-x-1 top-1 flex items-center gap-1">
        <div className="h-2 w-2 rounded-full bg-[#0a66c2]" />
        <div className="h-[3px] w-6 rounded-full bg-slate-400" />
      </div>
      <div className="absolute inset-x-1 top-4 space-y-[3px]">
        <Bar w="w-10" c="bg-slate-700" />
        <Bar w="w-8" c="bg-slate-400" />
        <Bar w="w-9" c="bg-slate-400" />
      </div>
      <div className="absolute inset-x-1 bottom-1 flex items-center gap-1">
        <div className="h-1.5 w-1.5 rounded-full bg-[#0a66c2]" />
        <div className="h-[2px] w-4 rounded-full bg-slate-300" />
      </div>
    </Frame>
  );
}

/* SaaS dashboard */
function MockDashboard() {
  return (
    <Frame bg="bg-[#0e0f1a]">
      <div className="absolute left-1 top-1 h-full w-2 rounded-sm bg-white/10">
        <div className="mx-auto mt-1 h-[3px] w-[3px] rounded-full bg-primary" />
        <div className="mx-auto mt-1 h-[3px] w-[3px] rounded-full bg-white/30" />
        <div className="mx-auto mt-1 h-[3px] w-[3px] rounded-full bg-white/30" />
      </div>
      <div className="absolute inset-y-1 left-4 right-1 space-y-[3px]">
        <div className="flex gap-[3px]">
          <div className="h-3 w-4 rounded-sm bg-primary/50" />
          <div className="h-3 w-4 rounded-sm bg-accent/50" />
        </div>
        <div className="flex items-end gap-[2px] pt-1">
          <div className="h-2 w-[3px] rounded-sm bg-white/40" />
          <div className="h-3 w-[3px] rounded-sm bg-white/60" />
          <div className="h-4 w-[3px] rounded-sm bg-primary" />
          <div className="h-2 w-[3px] rounded-sm bg-white/40" />
          <div className="h-3 w-[3px] rounded-sm bg-white/60" />
        </div>
      </div>
    </Frame>
  );
}

/* Product ad banner */
function MockAd() {
  return (
    <Frame bg="bg-gradient-to-br from-primary/70 to-fuchsia-500/60">
      <div className="absolute left-1 top-1 h-[8px] w-6 rounded-sm bg-white/80" />
      <div className="absolute right-1 top-1 h-2 w-2 rounded-full bg-white/60" />
      <div className="absolute inset-x-1 bottom-3 space-y-[3px]">
        <Bar w="w-9" c="bg-white" />
        <Bar w="w-6" c="bg-white/60" />
      </div>
      <div className="absolute bottom-1 left-1 h-[8px] w-5 rounded-sm bg-white text-[6px]" />
    </Frame>
  );
}

/* Resume page */
function MockResume() {
  return (
    <Frame bg="bg-white">
      <div className="absolute inset-x-1 top-1 flex items-center gap-1">
        <div className="h-3 w-3 rounded-full bg-slate-300" />
        <div className="space-y-[2px]">
          <div className="h-[3px] w-6 rounded-full bg-slate-700" />
          <div className="h-[2px] w-4 rounded-full bg-slate-400" />
        </div>
      </div>
      <div className="absolute inset-x-1 top-6 space-y-[2px]">
        <div className="h-[2px] w-3 rounded-full bg-primary" />
        <div className="h-[2px] w-9 rounded-full bg-slate-300" />
        <div className="h-[2px] w-8 rounded-full bg-slate-300" />
      </div>
      <div className="absolute inset-x-1 bottom-1 space-y-[2px]">
        <div className="h-[2px] w-3 rounded-full bg-primary" />
        <div className="h-[2px] w-9 rounded-full bg-slate-300" />
        <div className="h-[2px] w-7 rounded-full bg-slate-300" />
      </div>
    </Frame>
  );
}

/* Blog article page */
function MockArticle() {
  return (
    <Frame bg="bg-white">
      <div className="absolute inset-x-1 top-1 h-3 rounded-sm bg-slate-200" />
      <div className="absolute inset-x-1 top-5 space-y-[3px]">
        <Bar w="w-10" c="bg-slate-800" />
        <Bar w="w-6" c="bg-slate-400" />
      </div>
      <div className="absolute inset-x-1 bottom-1 space-y-[2px]">
        <Bar w="w-10" c="bg-slate-300" />
        <Bar w="w-9" c="bg-slate-300" />
        <Bar w="w-7" c="bg-slate-300" />
      </div>
    </Frame>
  );
}

/* Email newsletter */
function MockEmail() {
  return (
    <Frame bg="bg-white">
      <div className="absolute inset-x-0 top-0 h-3 bg-primary/80" />
      <div className="absolute inset-x-1 top-4 space-y-[3px]">
        <Bar w="w-9" c="bg-slate-700" />
        <Bar w="w-7" c="bg-slate-400" />
        <Bar w="w-8" c="bg-slate-400" />
      </div>
      <div className="absolute bottom-1 left-1 h-2 w-5 rounded-sm bg-primary" />
    </Frame>
  );
}

/* YouTube thumbnail */
function MockYouTube() {
  return (
    <Frame bg="bg-gradient-to-br from-red-500/70 to-slate-900">
      <div className="absolute inset-1 rounded-md bg-black/40" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-3 w-3 rounded-full bg-red-500 shadow" />
      </div>
      <div className="absolute bottom-1 right-1 h-[6px] w-4 rounded-sm bg-black/70" />
    </Frame>
  );
}

/* Code editor */
function MockCode() {
  return (
    <Frame bg="bg-[#0b0f1a]">
      <div className="absolute left-0 top-0 flex h-2 w-full items-center gap-[2px] px-1">
        <span className="h-[3px] w-[3px] rounded-full bg-red-400" />
        <span className="h-[3px] w-[3px] rounded-full bg-yellow-400" />
        <span className="h-[3px] w-[3px] rounded-full bg-green-400" />
      </div>
      <div className="absolute inset-x-1 top-3 space-y-[3px] font-mono">
        <Bar w="w-4" c="bg-fuchsia-400/80" />
        <Bar w="w-8" c="bg-sky-300/80" />
        <Bar w="w-6" c="bg-white/50" />
        <Bar w="w-7" c="bg-emerald-300/80" />
      </div>
    </Frame>
  );
}

/* Generic image / gallery */
function MockImage() {
  return (
    <Frame bg="bg-gradient-to-br from-violet-500/60 via-fuchsia-400/50 to-pink-400/60">
      <div className="absolute inset-1 rounded-md bg-white/10" />
      <div className="absolute bottom-1.5 left-1.5 h-2 w-2 rounded-full bg-white/70" />
      <div className="absolute right-1 top-1 h-2 w-3 rotate-12 rounded-sm bg-white/40" />
    </Frame>
  );
}

/* Business doc */
function MockDoc() {
  return (
    <Frame bg="bg-white">
      <div className="absolute inset-x-1 top-1 h-2 rounded-sm bg-slate-800" />
      <div className="absolute inset-x-1 top-4 space-y-[2px]">
        <Bar w="w-10" c="bg-slate-300" />
        <Bar w="w-8" c="bg-slate-300" />
      </div>
      <div className="absolute inset-x-1 bottom-1 flex items-end gap-[2px]">
        <div className="h-2 w-1 rounded-sm bg-primary" />
        <div className="h-3 w-1 rounded-sm bg-primary/70" />
        <div className="h-4 w-1 rounded-sm bg-primary" />
        <div className="h-2 w-1 rounded-sm bg-primary/70" />
      </div>
    </Frame>
  );
}

const MOCKS: Record<Kind, () => ReactNode> = {
  instagram: MockInstagram,
  linkedin: MockLinkedIn,
  dashboard: MockDashboard,
  ad: MockAd,
  resume: MockResume,
  article: MockArticle,
  email: MockEmail,
  youtube: MockYouTube,
  code: MockCode,
  image: MockImage,
  doc: MockDoc,
};

export function PromptThumb({
  category,
  model,
  title,
}: {
  category: string;
  model: string;
  title: string;
}) {
  const kind = pickKind(category, model, title);
  const Mock = MOCKS[kind];
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute right-3 top-3 z-10 h-16 w-[78px] select-none"
    >
      {/* back thumb */}
      <div className="absolute right-5 top-0 -rotate-[9deg] opacity-90 transition-transform duration-300 ease-out group-hover:-translate-y-0.5">
        <Mock />
      </div>
      {/* front thumb */}
      <div className="absolute right-0 top-1 rotate-[8deg] transition-transform duration-300 ease-out group-hover:-translate-y-1">
        <Mock />
      </div>
    </div>
  );
}
