import { marketingPrompts } from "./data/marketing";
import { codingPrompts } from "./data/coding";
import { designPrompts } from "./data/design";
import { businessPrompts } from "./data/business";
import { contentPrompts } from "./data/content";
import { socialPrompts } from "./data/social";
import { seoPrompts } from "./data/seo";
import { educationPrompts } from "./data/education";
import { productivityPrompts } from "./data/productivity";
import { imagePrompts } from "./data/image";

export const dummyPrompts = [
  ...marketingPrompts,
  ...codingPrompts,
  ...designPrompts,
  ...businessPrompts,
  ...contentPrompts,
  ...socialPrompts,
  ...seoPrompts,
  ...educationPrompts,
  ...productivityPrompts,
  ...imagePrompts,
];

export const categories = [
  "All",
  "Marketing",
  "Coding",
  "Design",
  "Business",
  "Content",
  "Social Media",
  "SEO",
  "Education",
  "Productivity",
  "Image",
];

export const trendingPrompts = [...dummyPrompts]
  .sort((a, b) => b.votes - a.votes)
  .slice(0, 10);

export const premiumPrompts = dummyPrompts.filter(
  (prompt) => prompt.premium
);

export const verifiedCreators = Array.from(
  new Map(
    dummyPrompts
      .filter((p) => p.verified)
      .map((p) => [
        p.author,
        {
          name: p.author,
          avatar: p.avatar,
          prompts: dummyPrompts.filter(
            (x) => x.author === p.author
          ).length,
          totalVotes: dummyPrompts
            .filter((x) => x.author === p.author)
            .reduce((sum, x) => sum + x.votes, 0),
        },
      ])
  ).values()
);

export const topCreators = verifiedCreators
  .sort((a, b) => b.totalVotes - a.totalVotes)
  .slice(0, 8);