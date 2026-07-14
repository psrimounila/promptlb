export function CommunityHero() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0B1222] via-[#10182B] to-[#070D18] px-8 py-12">

      {/* Background Glow */}
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#002BFF]/20 blur-3xl" />
      <div className="absolute -bottom-32 left-0 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="relative z-10 flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">

        {/* Left */}
        <div className="max-w-3xl">

          <div className="mb-4 inline-flex items-center rounded-full border border-[#002BFF]/30 bg-[#002BFF]/10 px-4 py-2 text-sm text-[#8FB2FF]">
            🚀 PromptLB Community
          </div>

          <h1 className="text-5xl font-bold leading-tight">
            Discover the Best
            <span className="text-[#4B7BFF]"> AI Prompts</span>
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-400">
            Explore thousands of AI prompts shared by creators, marketers,
            developers and designers. Copy, save, improve and publish your own
            prompts in one place.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">

            <button className="rounded-xl bg-[#002BFF] px-6 py-3 font-semibold transition hover:opacity-90">
              + Submit Prompt
            </button>

            <button className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-semibold transition hover:border-[#002BFF]">
              Explore Prompts
            </button>

          </div>

        </div>

        {/* Right Stats */}

        <div className="grid w-full max-w-md grid-cols-2 gap-5">

          <StatCard
            number="1,000+"
            label="AI Prompts"
          />

          <StatCard
            number="250+"
            label="Creators"
          />

          <StatCard
            number="10"
            label="Categories"
          />

          <StatCard
            number="15K+"
            label="Prompt Copies"
          />

        </div>

      </div>
    </section>
  );
}

type StatProps = {
  number: string;
  label: string;
};

function StatCard({ number, label }: StatProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">

      <h2 className="text-3xl font-bold text-[#4B7BFF]">
        {number}
      </h2>

      <p className="mt-2 text-sm text-gray-400">
        {label}
      </p>

    </div>
  );
}