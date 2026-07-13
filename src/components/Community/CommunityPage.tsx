import { useMemo, useState } from "react";
import { dummyPrompts } from "./dummyPrompts";
import { PromptCard } from "./PromptCard";

export default function CommunityPage() {
  const [search, setSearch] = useState("");
const [selectedCategory, setSelectedCategory] = useState("All");

const categories = [
  "All",
  ...new Set(dummyPrompts.map((p) => p.category)),
];

const filteredPrompts = dummyPrompts.filter((prompt) => {
  const matchesCategory =
    selectedCategory === "All" ||
    prompt.category === selectedCategory;

  const keyword = search.toLowerCase();

  const matchesSearch =
    prompt.title.toLowerCase().includes(keyword) ||
    prompt.description.toLowerCase().includes(keyword) ||
    prompt.author.toLowerCase().includes(keyword);

  return matchesCategory && matchesSearch;
});
  return (
  <main className="min-h-screen bg-[#020817] text-white">
    <div className="mx-auto max-w-7xl px-6 py-12">

      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">Community</h1>
          <p className="mt-2 text-gray-400">
            Discover prompts shared by the community.
          </p>
        </div>

        <button className="rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700">
          Submit Prompt
        </button>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search prompts..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6 w-full rounded-lg border border-gray-700 bg-[#111827] px-4 py-3"
      />

      {/* Categories */}
      <div className="mb-8 flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`rounded-full px-4 py-2 text-sm transition ${
              selectedCategory === category
                ? "bg-blue-600 text-white"
                : "border border-gray-700 hover:bg-gray-800"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredPrompts.map((prompt) => (
          <PromptCard
            key={prompt.id}
            prompt={prompt}
          />
        ))}
      </div>

    </div>
  </main>
);
}