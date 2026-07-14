import { Badge } from "@/components/ui/badge";

const categories = [
  { name: "All", count: 1284 },
  { name: "Marketing", count: 126 },
  { name: "Coding", count: 214 },
  { name: "Design", count: 98 },
  { name: "Business", count: 87 },
  { name: "Content", count: 152 },
  { name: "SEO", count: 64 },
  { name: "Image", count: 183 },
  { name: "Education", count: 42 },
  { name: "Social", count: 119 },
  { name: "Productivity", count: 71 },
];

export function FilterBar() {
  return (
    <section className="space-y-4">

      <div className="flex items-center justify-between">

        <div>
          <h2 className="text-xl font-semibold">
            Browse Categories
          </h2>

          <p className="text-sm text-muted-foreground">
            Explore prompts by category.
          </p>
        </div>

        <Badge
          variant="secondary"
          className="rounded-full px-4 py-1"
        >
          {categories.length - 1} Categories
        </Badge>

      </div>

      <div className="flex flex-wrap gap-3">

        {categories.map((category, index) => (
          <button
            key={category.name}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200
            ${
              index === 0
                ? "border-[#002BFF] bg-[#002BFF] text-white shadow-md"
                : "border-border bg-background hover:border-[#002BFF] hover:text-[#002BFF] hover:shadow-sm"
            }`}
          >
            {category.name}

            <span className="ml-2 opacity-70">
              ({category.count})
            </span>

          </button>
        ))}

      </div>

    </section>
  );
}