import { createFileRoute } from "@tanstack/react-router";

import { dummyPrompts } from "@/components/Community/dummyPrompts";

import { PromptCard } from "@/components/Community/PromptCard";



export const Route = createFileRoute("/community")({

  component: CommunityPage,

});



function CommunityPage() {

  return (

    <main className="min-h-screen bg-[#020817] text-white">

      <div className="mx-auto max-w-7xl px-6 py-12">



        <div className="mb-10">

          <h1 className="text-4xl font-bold">Community</h1>

          <p className="mt-2 text-gray-400">

            Discover prompts shared by the community.

          </p>

        </div>



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