import { Flame } from "lucide-react";

const trending = [
  {
    title: "LinkedIn Carousel Generator",
    copies: "2.4K",
    likes: "540",
  },
  {
    title: "Landing Page UI Prompt",
    copies: "1.9K",
    likes: "430",
  },
  {
    title: "Instagram Reel Script",
    copies: "1.3K",
    likes: "312",
  },
];

export function TrendingSection() {
  return (
    <section>

      <div className="mb-6 flex items-center gap-2">

        <Flame className="text-orange-500" />

        <h2 className="text-2xl font-bold text-gray-900">
          Trending Today
        </h2>

      </div>

      <div className="grid gap-6 md:grid-cols-3">

        {trending.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <h3 className="font-semibold text-gray-900">
              {item.title}
            </h3>

            <div className="mt-6 flex justify-between text-sm text-gray-500">

              <span>📋 {item.copies} Copies</span>

              <span>❤️ {item.likes}</span>

            </div>
          </div>
        ))}

      </div>

    </section>
  );
}