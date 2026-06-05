import { z } from "zod";

const VoteActionSchema = z.object({
  targetId: z.string(),
  targetType: z.enum(["question", "answer"]),
  userVote: z.enum(["upvote", "downvote"]),
});

export default VoteActionSchema;
