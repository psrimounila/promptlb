import {
  ArrowRight,
  Sparkles,
  TrendingUp,
  Star,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function CommunityHero() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0B1120] p-8 lg:p-14">

      {/* Background Glow */}

      <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#002BFF]/20 blur-[120px]" />
      <div className="absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-blue-500/10 blur-[120px]" />

      <div className="relative grid items-center gap-12 lg:grid-cols-2">

        {/* LEFT */}

        <div>

          <Badge className="mb-6 rounded-full bg-[#002BFF] text-white">
            <Sparkles className="mr-2 h-4 w-4" />
            PromptLB Community
          </Badge>

          <h1 className="max-w-2xl text-5xl font-bold leading-tight text-white lg:text-6xl">
            Discover,
            <span className="text-[#2D6BFF]"> Share</span>
            {" "}&
            <span className="text-[#2D6BFF]"> Save</span>
            <br />
            the Best
            <span className="text-[#2D6BFF]"> AI Prompts</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-gray-400">
            Explore thousands of prompts created by marketers,
            designers, developers and AI enthusiasts.
            Copy, improve and publish prompts in seconds.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">

            <Button
              size="lg"
              className="bg-[#002BFF] hover:bg-[#245DFF]"
            >
              Submit Prompt
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-white/10 bg-white/5 hover:bg-white/10"
            >
              Explore Prompts

              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

          </div>

        </div>

        {/* RIGHT */}

        <div className="space-y-5">

          <Card className="rounded-2xl border-white/10 bg-[#121B33] p-5 backdrop-blur">

            <div className="flex items-start justify-between">

              <div>

                <Badge className="bg-[#002BFF]/20 text-[#8FB2FF]">
                  Marketing
                </Badge>

                <h3 className="mt-4 text-xl font-semibold text-white">
                  LinkedIn Carousel Generator
                </h3>

                <p className="mt-2 text-sm text-gray-400">
                  Create high-converting LinkedIn carousel posts with
                  hooks, storytelling, CTA and engaging slide flow.
                </p>

              </div>

              <TrendingUp className="text-[#2D6BFF]" />

            </div>

            <div className="mt-5 flex items-center justify-between">

              <div className="flex items-center gap-2 text-yellow-400">

                <Star className="h-4 w-4 fill-yellow-400" />

                <span className="text-sm text-white">
                  4.9
                </span>

              </div>

              <span className="text-sm text-gray-400">
                2.1K Copies
              </span>

            </div>

          </Card>

          <Card className="rounded-2xl border-white/10 bg-[#121B33] p-5">

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-4xl font-bold text-[#2D6BFF]">
                  1,284+
                </h2>

                <p className="text-gray-400">
                  Community Prompts
                </p>

              </div>

              <div className="text-right">

                <h2 className="text-4xl font-bold text-[#2D6BFF]">
                  320+
                </h2>

                <p className="text-gray-400">
                  Creators
                </p>

              </div>

            </div>

          </Card>

          <Card className="rounded-2xl border border-white/10 bg-[#002BFF] p-6 text-white">

            <h3 className="text-xl font-bold">
              🚀 Become a Top Creator
            </h3>

            <p className="mt-2 text-white/80">
              Share your best prompts, grow your profile and help thousands
              of AI users build better outputs.
            </p>

            <Button
              className="mt-5 bg-white text-[#002BFF] hover:bg-white"
            >
              Start Sharing
            </Button>

          </Card>

        </div>

      </div>

    </section>
  );
}