import { dummyPrompts } from "./dummyPrompts";
import { PromptCard } from "./PromptCard";
import { Navbar } from "@/components/landing/Navbar";

export default function CommunityPage() {
  return (
    <main className="min-h-screen bg-[#020817] text-white">
      <div className="mx-auto max-w-7xl px-6 py-12">

        <h1 className="mb-8 text-4xl font-bold">
          Community
        </h1>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {dummyPrompts.map((prompt) => (
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