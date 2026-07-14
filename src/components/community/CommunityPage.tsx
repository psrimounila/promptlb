import { CommunityHero } from "./CommunityHero";
import { SearchBar } from "./SearchBar";
import { FilterBar } from "./FilterBar";
import { TrendingSection } from "./TrendingSection";
import { PromptGrid } from "./PromptGrid";

export function CommunityPage() {
  return (
    <main className="min-h-screen bg-[#070D18] text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">

        {/* Hero */}
        <CommunityHero />

        {/* Search */}
        <div className="mt-8">
          <SearchBar />
        </div>

        {/* Filters */}
        <div className="mt-6">
          <FilterBar />
        </div>

        {/* Trending */}
        <div className="mt-12">
          <TrendingSection />
        </div>

        {/* Prompt Grid */}
        <div className="mt-12">
          <PromptGrid />
        </div>

      </div>
    </main>
  );
}