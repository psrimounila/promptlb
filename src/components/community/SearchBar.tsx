import { Search, Sparkles } from "lucide-react";

export function SearchBar() {
  return (
    <div className="relative">

      <div className="flex items-center rounded-2xl border border-gray-200 bg-white shadow-sm transition focus-within:border-[#002BFF]">

        <Search
          size={20}
          className="ml-5 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search prompts, creators, categories..."
          className="h-14 w-full bg-transparent px-4 text-gray-800 placeholder:text-gray-400 focus:outline-none"
        />

        <button className="mr-3 flex items-center gap-2 rounded-xl bg-[#002BFF] px-5 py-2 text-sm font-medium text-white transition hover:opacity-90">
          <Sparkles size={16} />
          Search
        </button>

      </div>

    </div>
  );
}