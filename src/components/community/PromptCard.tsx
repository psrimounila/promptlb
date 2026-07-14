import {
  Copy,
  Bookmark,
  Heart,
  MessageCircle,
  Share2,
  Eye,
  ChevronRight,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export interface PromptCardProps {
  title: string;
  description: string;
  category: string;
  model: string;
  author: string;
  avatar: string;
  verified?: boolean;
  likes: number;
  comments: number;
  views: number;
}

export function PromptCard({
  title,
  description,
  category,
  model,
  author,
  avatar,
  verified,
  likes,
  comments,
  views,
}: PromptCardProps) {
  return (
    <Card className="overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:border-[#002BFF] hover:shadow-xl">

      {/* Header */}

      <div className="flex items-center justify-between p-5">

        <div className="flex items-center gap-3">

          <Avatar>
            <AvatarFallback>
              {avatar}
            </AvatarFallback>
          </Avatar>

          <div>

            <div className="flex items-center gap-2">

              <h3 className="font-semibold">
                {author}
              </h3>

              {verified && (
                <Badge className="bg-[#002BFF] hover:bg-[#002BFF]">
                  Verified
                </Badge>
              )}

            </div>

            <p className="text-sm text-muted-foreground">
              {category} • {model}
            </p>

          </div>

        </div>

      </div>

      {/* Body */}

      <div className="px-5">

        <h2 className="text-xl font-bold">
          {title}
        </h2>

        <p className="mt-3 line-clamp-3 text-sm leading-7 text-muted-foreground">
          {description}
        </p>

        <Button
          variant="link"
          className="mt-2 px-0 text-[#002BFF]"
        >
          Read More

          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>

      </div>

      {/* Footer */}

      <div className="mt-5 border-t p-5">

        <div className="mb-4 flex items-center gap-5 text-sm text-muted-foreground">

          <div className="flex items-center gap-1">
            <Heart className="h-4 w-4" />
            {likes}
          </div>

          <div className="flex items-center gap-1">
            <MessageCircle className="h-4 w-4" />
            {comments}
          </div>

          <div className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            {views}
          </div>

        </div>

        <div className="grid grid-cols-3 gap-2">

          <Button variant="outline" size="sm">
            <Copy className="mr-2 h-4 w-4" />
            Copy
          </Button>

          <Button variant="outline" size="sm">
            <Bookmark className="mr-2 h-4 w-4" />
            Save
          </Button>

          <Button variant="outline" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>

        </div>

      </div>

    </Card>
  );
}