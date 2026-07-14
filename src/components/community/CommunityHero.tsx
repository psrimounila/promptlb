import { ArrowRight, Sparkles, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function CommunityHero() {
  return (
    <section className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-background to-muted/40 p-8 lg:p-12">

      <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-[#002BFF]/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-52 w-52 rounded-full bg-blue-400/10 blur-3xl" />

      <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">

        {/* Left */}

        <div>

          <Badge className="mb-5 rounded-full bg-[#002BFF] px-4 py-1 text-white hover:bg-[#002BFF]">
            <Sparkles className="mr-2 h-4 w-4" />
            PromptLB Community
          </Badge>

          <h1 className="max-w-2xl text-5xl font-bold tracking-tight">
            Discover,
            <span className="text-[#002BFF]"> Share </span>
            &
            <span className="text-[#002BFF]"> Save </span>
            the Best AI Prompts
          </h1>

          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Explore prompts created by marketers, designers, developers and AI
            enthusiasts. Copy, improve and publish your own prompts in seconds.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">

            <Button
              size="lg"
              className="bg-[#002BFF] hover:bg-[#002BFF]/90"
            >
              Submit Prompt
            </Button>

            <Button
              size="lg"
              variant="outline"
            >
              Explore Prompts

              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

          </div>

        </div>

        {/* Right */}

        <div className="grid gap-5 sm:grid-cols-2">

          <Card className="rounded-2xl p-6">

            <h3 className="text-4xl font-bold text-[#002BFF]">
              1,284+
            </h3>

            <p className="mt-2 text-muted-foreground">
              Community Prompts
            </p>

          </Card>

          <Card className="rounded-2xl p-6">

            <h3 className="text-4xl font-bold text-[#002BFF]">
              320+
            </h3>

            <p className="mt-2 text-muted-foreground">
              Active Creators
            </p>

          </Card>

          <Card className="rounded-2xl p-6">

            <h3 className="text-4xl font-bold text-[#002BFF]">
              10
            </h3>

            <p className="mt-2 text-muted-foreground">
              Categories
            </p>

          </Card>

          <Card className="rounded-2xl p-6">

            <div className="flex items-center gap-3">

              <div className="rounded-xl bg-[#002BFF]/10 p-3">

                <Users className="h-6 w-6 text-[#002BFF]" />

              </div>

              <div>

                <h3 className="text-3xl font-bold">
                  15K+
                </h3>

                <p className="text-muted-foreground">
                  Prompt Copies
                </p>

              </div>

            </div>

          </Card>

        </div>

      </div>

    </section>
  );
}