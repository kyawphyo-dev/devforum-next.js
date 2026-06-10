export const HomePageFilters = [
  { name: "Newest", value: "newest" },
  { name: "Oldest", value: "oldest" },
  { name: "Popular", value: "popular" },
  { name: "Most Voted", value: "mostvoted" },
  { name: "Most Answered", value: "mostanswered" },
  { name: "Unanswered", value: "unanswered" },
  //   { name: "Recommended", value: "recommended" },
];

export const AnswerFilters = [
  { name: "Newest", value: "newest" },
  { name: "Oldest", value: "oldest" },
  { name: "Popular", value: "popular" },
];

export const CollectionFilters = [
  { name: "Newest", value: "newest" },
  { name: "Oldest", value: "oldest" },
  { name: "Most Voted", value: "mostvoted" },
  { name: "Most Viewed", value: "mostviewed" },
  { name: "Most Answered", value: "mostanswered" },
];

export const TagFilters = [
  { name: "A-Z", value: "namedsc" },
  { name: "Newest", value: "newest" },
  { name: "Oldest", value: "oldest" },
  { name: "Popular", value: "popular" },
];

export const UserFilters = [
  { name: "Newest", value: "newest" },
  { name: "Oldest", value: "oldest" },
  { name: "Popular", value: "popular" },
];

// Default filter values for each filter set
export const DefaultFilters = {
  HomePageFilters: "newest",
  CollectionFilters: "newest",
  TagFilters: "namedsc",
  UserFilters: "newest",
  AnswerFilters: "newest",
} as const;
