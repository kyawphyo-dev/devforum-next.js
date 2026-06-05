"use server"
import { generateText } from "ai";
import dbConnect from "../dbConnect";
import { errorAction } from "../response";
import { GenerateAiAnswerSchema } from "../schemas/GenerateAiAnswerSchema";
import { google } from "@ai-sdk/google";

const GenerateAiAnswer = async (params: {
    questionContent: string;
    questionTitle: string;
    answerContent: string;
}): Promise<{
    success: boolean;
  data?: {
    answer: string;
  };
  message?: string;
  details?: object | null;

}> => {
     console.log("action reach")
    dbConnect();
    console.log("db connected")
    const validated = GenerateAiAnswerSchema.safeParse(params);
    if (!validated.success) {
        console.error(
          "CreateAnswer Server Action - VALIDATION FAILED:",
          validated.error.flatten().fieldErrors,
        );
        return errorAction(validated.error);
      }
    const {questionContent, questionTitle, answerContent} = validated.data;
    console.log(
        "GOOGLE_GENERATIVE_AI_API_KEY exists:",
        !!process.env.GOOGLE_GENERATIVE_AI_API_KEY
      );
    try {
    const { text: answer } = await generateText({
        model: google("gemini-2.0-flash"),
        prompt: `Generate a clear and concise answer in markdown format to the question: "${questionTitle}".
    
    Use the context and the user's answer **only to improve accuracy** — do not mention them or explain how they are used.
    
    **Context:** ${questionContent}  
    **User's Answer:** ${answerContent}
    
    Rules:
    - If the user's answer is correct, refine and expand on it.
    - If the user's answer is incomplete or incorrect, correct it and provide the proper explanation.
    - Do NOT reference the context, the prompt, or say things like "based on the context" or "the user's input".
    - Final output must be the answer only, written in helpful markdown format.`,
        system:
          "You are a helpful assistant that provides informative responses in markdown format. Use appropriate markdown syntax for headings, lists, code blocks, and emphasis where necessary. For code blocks, use short-form smaller case language identifiers (e.g., 'js' for JavaScript, 'py' for Python, 'ts' for TypeScript, 'html' for HTML, 'css' for CSS, etc.).",
      });

      
        //ai answer generation
        return {
          success: true,
          data: {
            answer,
          },
        };
      } catch (error) {
        return errorAction(error);
      }
}

export default GenerateAiAnswer;