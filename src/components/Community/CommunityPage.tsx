import { useMemo, useState } from "react";
import { dummyPrompts } from "./dummyPrompts";
import { PromptCard } from "./PromptCard";
const [search, setSearch] = useState("");
const [selectedCategory, setSelectedCategory] = useState("All");

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

        <h1 className="mb-8 text-4xl font-bold">
          Community
        </h1>

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