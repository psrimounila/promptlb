import { Heart, MessageCircle, Share2, Copy, MoreHorizontal, ThumbsUp } from "lucide-react";

interface PromptCardProps {
  prompt: {
    id: number;
    title: string;
    description: string;
    category: string;
    model: string;
    author: string;
    votes: number;
    saves: number;
    comments: number;
    prompt: string;
  };
}

export function PromptCard({ prompt }: PromptCardProps) {
  return (
    <div className="group rounded-2xl border border-gray-800 bg-[#0B1222] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#002BFF] hover:shadow-[0_0_35px_rgba(0,43,255,0.25)]">

      {/* Creator */}

      <div className="mb-5 flex items-center justify-between">

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#002BFF] font-semibold">
            {prompt.author.charAt(0)}
          </div>

          <div>

            <h4 className="font-semibold">
              {prompt.author}
            </h4>

            <p className="text-xs text-gray-400">
              Prompt Creator
            </p>

          </div>

        </div>

        <button className="rounded-lg p-2 hover:bg-white/5">
          <MoreHorizontal size={18}/>
        </button>

      </div>

      {/* Title */}

      <h3 className="text-xl font-bold">
        {prompt.title}
      </h3>

      <p className="mt-2 text-sm text-gray-400">
        {prompt.description}
      </p>

      {/* Tags */}

      <div className="mt-4 flex flex-wrap gap-2">

        <span className="rounded-full bg-[#002BFF]/20 px-3 py-1 text-xs text-[#8FB2FF]">
          {prompt.category}
        </span>

        <span className="rounded-full bg-white/5 px-3 py-1 text-xs">
          {prompt.model}
        </span>

      </div>

      {/* Prompt Preview */}

      <div className="mt-5 rounded-xl border border-gray-800 bg-[#111827] p-4">

        <p className="line-clamp-4 text-sm text-gray-300">
          {prompt.prompt}
        </p>

      </div>

      {/* Stats */}

      <div className="mt-5 flex items-center justify-between text-sm">

        <div className="flex gap-4 text-gray-400">

          <span className="flex items-center gap-1">
            <ThumbsUp size={15}/>
            {prompt.votes}
          </span>

          <span className="flex items-center gap-1">
            <Heart size={15}/>
            {prompt.saves}
          </span>

          <span className="flex items-center gap-1">
            <MessageCircle size={15}/>
            {prompt.comments}
          </span>

        </div>

      </div>

      {/* Actions */}

      <div className="mt-6 grid grid-cols-4 gap-2">

        <button className="rounded-lg bg-[#002BFF] py-2 text-sm font-medium hover:bg-[#003cff]">
          Copy
        </button>

        <button className="rounded-lg border border-gray-700 py-2 hover:border-[#002BFF]">
          <Heart className="mx-auto" size={18}/>
        </button>

        <button className="rounded-lg border border-gray-700 py-2 hover:border-[#002BFF]">
          <Share2 className="mx-auto" size={18}/>
        </button>

        <button className="rounded-lg border border-gray-700 py-2 hover:border-[#002BFF]">
          <Copy className="mx-auto" size={18}/>
        </button>

      </div>

    </div>
  );
}