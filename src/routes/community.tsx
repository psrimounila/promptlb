function CommunityPage() {
  const stats = [
    { label: "Prompts", value: "2,480+" },
    { label: "Creators", value: "820+" },
    { label: "Categories", value: "18" },
    { label: "Weekly Votes", value: "12.4K" },
  ];

  const filters = [
    "Trending",
    "Latest",
    "Most Upvoted",
    "Most Saved",
    "Marketing",
    "Business",
    "Coding",
    "Design",
    "UI/UX",
    "Content",
    "Claude",
    "ChatGPT",
    "Gemini",
  ];

  return (
    <main className="min-h-screen bg-[#070D18] text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">

        {/* ---------------- Hero ---------------- */}

        <div className="mb-12 rounded-3xl border border-blue-900/40 bg-gradient-to-r from-[#0B1736] via-[#091427] to-[#070D18] p-10">

          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

            <div className="max-w-3xl">

              <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-xs uppercase tracking-widest text-blue-300">
                PromptLB Community
              </span>

              <h1 className="mt-5 text-5xl font-bold leading-tight">
                Discover AI prompts created by
                <span className="text-[#4D7CFF]"> creators worldwide.</span>
              </h1>

              <p className="mt-5 max-w-2xl text-lg text-gray-400">
                Explore high-quality prompts, discover new prompt engineering
                techniques, learn from the community, and share your own work.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">

                <button className="rounded-xl bg-[#002BFF] px-6 py-3 font-medium transition hover:scale-105">
                  🚀 Submit Prompt
                </button>

                <button className="rounded-xl border border-gray-700 px-6 py-3 transition hover:border-[#002BFF]">
                  Explore Community
                </button>

              </div>

            </div>

            {/* Right Hero Card */}

            <div className="rounded-2xl border border-gray-800 bg-[#0E1528] p-6 shadow-xl">

              <p className="text-sm text-gray-400">
                Trending Today
              </p>

              <h3 className="mt-2 text-2xl font-semibold">
                Marketing Email Generator
              </h3>

              <p className="mt-4 text-gray-400">
                One of the fastest growing prompts this week.
              </p>

              <div className="mt-8 flex gap-6 text-sm">

                <div>
                  <p className="text-2xl font-bold">842</p>
                  <p className="text-gray-500">Votes</p>
                </div>

                <div>
                  <p className="text-2xl font-bold">148</p>
                  <p className="text-gray-500">Saved</p>
                </div>

                <div>
                  <p className="text-2xl font-bold">91</p>
                  <p className="text-gray-500">Comments</p>
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* ---------------- Stats ---------------- */}

        <div className="mb-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {stats.map((stat) => (

            <div
              key={stat.label}
              className="rounded-2xl border border-gray-800 bg-[#0B1222] p-6 transition hover:border-[#002BFF]"
            >
              <p className="text-sm text-gray-400">
                {stat.label}
              </p>

              <h2 className="mt-3 text-3xl font-bold">
                {stat.value}
              </h2>
            </div>

          ))}

        </div>

        {/* ---------------- Search ---------------- */}

        <div className="sticky top-4 z-20 mb-8 rounded-2xl border border-gray-800 bg-[#0E1528]/90 p-5 backdrop-blur">

          <div className="flex flex-col gap-4 lg:flex-row">

            <input
              placeholder="Search prompts, creators, categories..."
              className="flex-1 rounded-xl border border-gray-700 bg-[#111827] px-5 py-4 outline-none transition focus:border-[#002BFF]"
            />

            <button className="rounded-xl bg-[#002BFF] px-8 py-4 font-medium hover:opacity-90">
              Search
            </button>

          </div>

        </div>

        {/* ---------------- Filters ---------------- */}

        <div className="mb-12 flex flex-wrap gap-3">

          {filters.map((filter) => (

            <button
              key={filter}
              className="rounded-full border border-gray-700 bg-[#0B1222] px-5 py-2 text-sm transition hover:border-[#002BFF] hover:bg-[#002BFF]/10 hover:text-[#8FB2FF]"
            >
              {filter}
            </button>

          ))}

        </div>

        {/* ---------------- NEXT PART ---------------- */}

        <div className="rounded-2xl border border-dashed border-gray-700 p-16 text-center text-gray-500">
          Prompt Cards & Sidebar will be added in Part 2.
        </div>

      </div>
    </main>
  );
}