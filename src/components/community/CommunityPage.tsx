import { Sparkles, TrendingUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { CommunityHero } from "./CommunityHero";
import { SearchBar } from "./SearchBar";
import { FilterBar } from "./FilterBar";
import { TrendingSection } from "./TrendingSection";
import { PromptGrid } from "./PromptGrid";

export function CommunityPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto max-w-7xl px-6 py-10">

        {/* Hero */}
        <CommunityHero />

        {/* Search */}
        <section className="mt-10">
          <SearchBar />
        </section>

        {/* Filters */}
        <section className="mt-6">
          <FilterBar />
        </section>

        {/* Stats */}
        <section className="mt-10 grid gap-5 md:grid-cols-3">

          <Card className="rounded-2xl p-6">
            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-muted-foreground">
                  Total Prompts
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  1,284
                </h2>

              </div>

              <div className="rounded-xl bg-blue-100 p-3 dark:bg-blue-900/30">
                <Sparkles className="h-6 w-6 text-blue-600" />
              </div>

            </div>
          </Card>

          <Card className="rounded-2xl p-6">
            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-muted-foreground">
                  Community Members
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  324
                </h2>

              </div>

              <div className="rounded-xl bg-green-100 p-3 dark:bg-green-900/30">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>

            </div>
          </Card>

          <Card className="rounded-2xl p-6">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-muted-foreground">
                  Categories
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  10
                </h2>

              </div>

              <Button>
                Browse
              </Button>

            </div>

          </Card>

        </section>

        {/* Trending */}
        <section className="mt-14">
          <TrendingSection />
        </section>

        {/* Prompt Grid */}
        <section className="mt-14">
          <PromptGrid />
        </section>

      </div>
    </main>
  );
}