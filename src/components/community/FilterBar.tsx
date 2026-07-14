const categories = [
  "All",
  "Marketing",
  "Coding",
  "Design",
  "Business",
  "Content",
  "Image",
  "SEO",
  "Education",
  "Social",
  "Productivity",
];

export function FilterBar() {
  return (
    <div className="mt-6 flex flex-wrap gap-3">

      {categories.map((category) => (
        <button
          key={category}
          className={`rounded-full border px-5 py-2 text-sm transition
          ${
            category === "All"
              ? "border-[#002BFF] bg-[#002BFF] text-white"
              : "border-gray-200 bg-white text-gray-700 hover:border-[#002BFF] hover:text-[#002BFF]"
          }`}
        >
          {category}
        </button>
      ))}

    </div>
  );
}