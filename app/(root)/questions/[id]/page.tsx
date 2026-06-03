import QuestionDetails from "@/components/QuestionDetails";
import { GetQuestionDetails } from "@/lib/actions/GetQuestionDetails.action";
import IncrementViews from "@/lib/actions/IncrementViews.action";
import { notFound } from "next/navigation";
import { after } from "next/server";

async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const { data: question, success } = await GetQuestionDetails({
    questionId: id,
  });

  after(async () => {
    await IncrementViews({
      questionId: id,
    });
  });
  if (!success || !question) {
    return notFound();
  }
  return (
    <div className="container mx-auto px-4 my-15">
      <QuestionDetails {...question} />
    </div>
  );
}

export default page;
