import AnswersList from "@/components/AnswersList";
import QuestionDetails from "@/components/QuestionDetails";
import { GetAnswers } from "@/lib/actions/GetAnswers.action";
import { GetQuestionDetails } from "@/lib/actions/GetQuestionDetails.action";
import IncrementViews from "@/lib/actions/IncrementViews.action";
import { notFound } from "next/navigation";
import { after } from "next/server";
import AnswerForm from "../components/AnswerForm";

async function page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ showAll?: string }>;
}) {
  const { id } = await params;
  const { showAll: showAllParam } = await searchParams;
  const showAll = showAllParam === "true";

  const { data: question, success } = await GetQuestionDetails({
    questionId: id,
  });
  if (!success || !question) {
    return notFound();
  }

  const { data: answersData } = await GetAnswers({
    questionId: id,
    pageSize: showAll ? 100 : 3,
  });
  const { answers, totalAnswers } = answersData || {};

  after(async () => {
    await IncrementViews({
      questionId: id,
    });
  });

  return (
    <>
      <div className="container mx-auto px-4 my-15">
        <QuestionDetails {...question} />
      </div>
      <div className="container mx-auto px-4 my-15">
        <AnswersList
          answers={answers || []}
          totalAnswers={totalAnswers || 0}
          showAll={showAll}
        />
      </div>
      <div className="container mx-auto px-4 my-15">
        <AnswerForm
          questionId={id}
          questionContent={question.content}
          questionTitle={question.title}
        />
      </div>
    </>
  );
}

export default page;
