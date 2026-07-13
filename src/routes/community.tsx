import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/landing/Navbar";

export const Route = createFileRoute("/community")({
  component: CommunityRoute,
});

function CommunityRoute() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#070D18] pt-24 text-white">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <h1 className="text-5xl font-bold">PromptLB Community</h1>

          <p className="mt-4 text-gray-400">
            Community page is working successfully.
          </p>
        </div>
      </main>
    </>
  );
}