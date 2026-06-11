import z from "zod";

const GetUserSchema = z.object({
  UserId: z.string(),
});
export default GetUserSchema;
