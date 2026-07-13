import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { dummyPrompts } from "@/components/Community/dummyPrompts";
import { PromptCard } from "@/components/Community/PromptCard";
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
          {[1, 2, 3, 4, 5, 6].map((_, index) => (
            <div
              key={index}
              className="rounded-2xl border border-gray-800 bg-[#0B1222] p-6 transition hover:border-[#002BFF]"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="rounded-full bg-[#002BFF]/20 px-3 py-1 text-xs text-[#8FB2FF]">
                  ChatGPT
                </span>

                <span className="text-gray-400">▲ 245</span>
              </div>

              <h3 className="mb-2 text-xl font-semibold">
                Instagram Carousel
              </h3>

              <p className="mb-5 text-gray-400">
                Generate a 10-slide educational carousel with hooks, teaching
                points and CTA.
              </p>

              <div className="mb-6 rounded-lg bg-[#111827] p-4 text-sm text-gray-300">
                Write a 10-slide Instagram carousel about {"{topic}"}...
              </div>

              <div className="flex gap-2">
                <button className="flex-1 rounded-lg bg-[#002BFF] py-3">
                  Run
                </button>

                <button className="rounded-lg border border-gray-700 px-4">
                  Copy
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
