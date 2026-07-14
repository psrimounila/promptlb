import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SearchBar() {
  return (
    <section className="space-y-5">

      {/* Search Row */}

      <div className="flex flex-col gap-4 lg:flex-row">

        {/* Search */}

        <div className="relative flex-1">

          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

          <Input
            placeholder="Search prompts, creators or categories..."
            className="h-12 pl-12"
          />

        </div>

        {/* AI Model */}

        <Select>

          <SelectTrigger className="w-full lg:w-52">
            <SelectValue placeholder="AI Model" />
          </SelectTrigger>

          <SelectContent>

            <SelectItem value="chatgpt">
              ChatGPT
            </SelectItem>

            <SelectItem value="claude">
              Claude
            </SelectItem>

            <SelectItem value="gemini">
              Gemini
            </SelectItem>

            <SelectItem value="grok">
              Grok
            </SelectItem>

          </SelectContent>

        </Select>

        {/* Sort */}

        <Select>

          <SelectTrigger className="w-full lg:w-52">
            <SelectValue placeholder="Sort" />
          </SelectTrigger>

          <SelectContent>

            <SelectItem value="latest">
              Latest
            </SelectItem>

            <SelectItem value="popular">
              Most Popular
            </SelectItem>

            <SelectItem value="likes">
              Most Liked
            </SelectItem>

            <SelectItem value="copies">
              Most Copied
            </SelectItem>

          </SelectContent>

        </Select>

        <Button className="bg-[#002BFF] hover:bg-[#002BFF]/90">
          Search
        </Button>

      </div>

      {/* Popular Searches */}

      <div className="flex flex-wrap items-center gap-3">

        <span className="text-sm text-muted-foreground">
          Popular:
        </span>

        {[
          "LinkedIn",
          "Marketing",
          "ChatGPT",
          "UI Design",
          "Coding",
          "Image Generation",
        ].map((item) => (
          <Button
            key={item}
            variant="outline"
            size="sm"
            className="rounded-full"
          >
            #{item}
          </Button>
        ))}

      </div>

    </section>
  );
}