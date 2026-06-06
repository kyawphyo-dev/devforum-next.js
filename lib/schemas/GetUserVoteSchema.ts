import z from "zod";

const GetUserVoteSchema = z.object({
  targetId: z.string(),
  targetType: z.enum(["question", "answer"]),
});
export default GetUserVoteSchema;
