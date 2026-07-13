import { useMemo, useState } from "react";
import { Navbar } from "@/components/landing/Navbar";
import { createFileRoute } from "@tanstack/react-router";
import { Search, TrendingUp, Users, Sparkles } from "lucide-react";

import { dummyPrompts } from "@/components/Community/dummyPrompts";
import { PromptCard } from "@/components/Community/PromptCard";


export const Route = createFileRoute("/community")({
  component: CommunityPage,
});


const categories = [
  "All",
  "Marketing",
  "UI/UX",
  "Coding",
  "Business",
  "Content Creation",
  "Education",
  "SEO",
  "Productivity",
];


function CommunityPage() {

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");


  const filteredPrompts = useMemo(() => {

    return dummyPrompts.filter((prompt) => {

      const searchValue = search.toLowerCase();


      const matchesSearch =
        prompt.title?.toLowerCase().includes(searchValue) ||
        prompt.description?.toLowerCase().includes(searchValue) ||
        prompt.author?.toLowerCase().includes(searchValue);



      const matchesCategory =
        selectedCategory === "All" ||
        prompt.category === selectedCategory;



      return matchesSearch && matchesCategory;

    });


  }, [search, selectedCategory]);



  return (

    <main className="min-h-screen bg-[#070D18] text-white">

      <div className="mx-auto max-w-7xl px-6 py-12">


        {/* Header */}

        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">


          <div>

            <span className="rounded-full bg-[#002BFF]/20 px-3 py-1 text-xs text-[#8FB2FF]">
              PromptLB Community
            </span>


            <h1 className="mt-4 text-5xl font-bold">
              Discover AI Prompts
            </h1>


            <p className="mt-3 max-w-2xl text-gray-400">
              Browse AI prompts created by the PromptLB community.
              Discover, save and use better prompts.
            </p>

          </div>



          <button className="rounded-xl bg-[#002BFF] px-7 py-4 font-semibold hover:opacity-90">
            + Submit Prompt
          </button>


        </div>




        {/* Stats */}

        <div className="mb-10 grid gap-5 md:grid-cols-4">


          <div className="rounded-2xl border border-gray-800 bg-[#0B1222] p-6">

            <TrendingUp className="mb-3 text-blue-400"/>

            <h2 className="text-3xl font-bold">
              {dummyPrompts.length}
            </h2>

            <p className="text-gray-400">
              Community Prompts
            </p>

          </div>



          <div className="rounded-2xl border border-gray-800 bg-[#0B1222] p-6">

            <Users className="mb-3 text-blue-400"/>

            <h2 className="text-3xl font-bold">
              100+
            </h2>

            <p className="text-gray-400">
              Creators
            </p>

          </div>




          <div className="rounded-2xl border border-gray-800 bg-[#0B1222] p-6">

            <Sparkles className="mb-3 text-blue-400"/>

            <h2 className="text-3xl font-bold">
              50+
            </h2>

            <p className="text-gray-400">
              Categories
            </p>

          </div>




          <div className="rounded-2xl border border-gray-800 bg-[#0B1222] p-6">

            <Users className="mb-3 text-blue-400"/>

            <h2 className="text-3xl font-bold">
              15K+
            </h2>

            <p className="text-gray-400">
              Members
            </p>

          </div>


        </div>





        {/* Search */}

        <div className="relative mb-8">


          <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500"/>


          <input

            value={search}

            onChange={(e)=>setSearch(e.target.value)}

            placeholder="Search prompts, creators..."

            className="w-full rounded-2xl border border-gray-700 bg-[#0E1528] py-5 pl-14 pr-5 text-white outline-none focus:border-[#002BFF]"

          />


        </div>





        {/* Categories */}

        <div className="mb-10 flex flex-wrap gap-3">


          {categories.map((category)=>(


            <button

              key={category}

              onClick={()=>setSelectedCategory(category)}

              className={`rounded-full px-5 py-2 text-sm transition ${
                
                selectedCategory === category

                ? "bg-[#002BFF] text-white"

                : "border border-gray-700 text-gray-300 hover:border-[#002BFF]"

              }`}


            >

              {category}


            </button>


          ))}


        </div>





        {/* Prompt Grid */}

        {filteredPrompts.length > 0 ? (

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">


            {filteredPrompts.map((prompt)=>(

              <PromptCard

                key={prompt.id}

                prompt={prompt}

              />

            ))}


          </div>


        ) : (

          <div className="rounded-xl border border-gray-800 bg-[#0B1222] p-10 text-center text-gray-400">

            No prompts found.

          </div>

        )}



      </div>


    </main>

  );

}