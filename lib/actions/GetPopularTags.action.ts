import Tag, { ITagDoc } from "@/database/tag.model";
import dbConnect from "../dbConnect";
import { errorAction } from "../response";

const GetPopularTags = async (): Promise<{
  success: boolean;
  data?: {
    popularTags: ITagDoc[];
  };
  error?: string;
}> => {
  try {
    await dbConnect();

    const popularTags = await Tag.find().sort({ questions: -1 }).limit(5);

    return {
      success: true,
      data: {
        popularTags,
      },
    };
  } catch (error) {
    return errorAction(error);
  }
};

export default GetPopularTags;
