import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/community")({
  component: CommunityPage,
});

function CommunityPage() {
  return (
    <main className="min-h-screen bg-[#070D18] text-white">
      <div className="mx-auto max-w-7xl px-6 py-12">

        {/* Header */}
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">Community</h1>
            <p className="mt-2 text-gray-400">
              Discover, share and explore AI prompts from the PromptLB community.
            </p>
          </div>

          <button className="rounded-xl bg-[#002BFF] px-6 py-3 font-medium hover:opacity-90">
            + Submit Prompt
          </button>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search prompts..."
          className="mb-8 w-full rounded-xl border border-gray-700 bg-[#0E1528] px-5 py-4 outline-none focus:border-[#002BFF]"
        />

        {/* Filters */}
        <div className="mb-10 flex flex-wrap gap-3">
          {[
            "Trending",
            "Latest",
            "Most Upvoted",
            "Marketing",
            "Coding",
            "Design",
            "Business",
          ].map((item) => (
            <button
              key={item}
              className="rounded-full border border-gray-700 px-4 py-2 text-sm hover:border-[#002BFF] hover:text-[#7EA6FF]"
            >
              {item}
            </button>
          ))}
        </div>

        {/* Prompt Cards */}
<div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

  {[1,2,3,4,5,6].map((card)=>(
    <div
      key={card}
      className="group rounded-2xl border border-gray-800 bg-[#0B1222] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#002BFF] hover:shadow-[0_0_35px_rgba(0,43,255,0.25)]"
    >

      {/* Header */}
      <div className="flex items-start justify-between">

        <div>

          <h3 className="text-xl font-semibold">
            AI Landing Page Generator
          </h3>

          <p className="mt-2 text-sm text-gray-400">
            Generate a modern SaaS landing page with hero, features,
            pricing, FAQs and CTA.
          </p>

        </div>

        <button className="text-xl">
          ❤️
        </button>

      </div>

      {/* Tags */}

      <div className="mt-5 flex flex-wrap gap-2">

        <span className="rounded-full bg-[#002BFF]/20 px-3 py-1 text-xs text-[#8FB2FF]">
          Marketing
        </span>

        <span className="rounded-full bg-white/5 px-3 py-1 text-xs">
          GPT-5
        </span>

        <span className="rounded-full bg-white/5 px-3 py-1 text-xs">
          Claude
        </span>

      </div>

      {/* Prompt Preview */}

      <div className="mt-5 rounded-xl border border-gray-800 bg-[#111827] p-4">

        <p className="line-clamp-4 text-sm text-gray-300">
          Create a modern SaaS landing page for
          {" {business_name} "}
          with compelling copy, conversion-focused sections,
          testimonials and pricing...
        </p>

      </div>

      {/* Stats */}

      <div className="mt-5 flex items-center justify-between text-sm text-gray-400">

        <div className="flex gap-4">

          <span>👍 284</span>

          <span>❤️ 812</span>

          <span>👁 4.2K</span>

        </div>

        <span>
          by <span className="text-white">Srimounila</span>
        </span>

      </div>

      {/* Buttons */}

      <div className="mt-6 flex gap-2">

        <button className="flex-1 rounded-lg bg-[#002BFF] py-3 font-medium hover:bg-[#0038ff]">
          Copy Prompt
        </button>

        <button className="rounded-lg border border-gray-700 px-4 hover:border-[#002BFF]">
          Share
        </button>

      </div>

    </div>
  ))}

</div>
    </main>
  );
}
