import AnswersList from "@/components/AnswersList";
import QuestionDetails from "@/components/QuestionDetails";
import { GetAnswers } from "@/lib/actions/GetAnswers.action";
import { GetQuestionDetails } from "@/lib/actions/GetQuestionDetails.action";
import IncrementViews from "@/lib/actions/IncrementViews.action";
import { notFound } from "next/navigation";
import { after } from "next/server";
import AnswerForm from "../components/AnswerForm";
import ButtonLink from "@/components/ButtonLink";
import ROUTES from "@/routes";
import { auth } from "@/auth";

async function page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ showAll?: string }>;
}) {
  const { id } = await params;
  const auth_session = await auth();
  if (!auth_session) {
    return notFound();
  }
  const AuthUserId = auth_session.user?.id;
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
      <div className="w-1/3 flex justify-between my-15">
        <div></div>
        <ButtonLink href={ROUTES.QUESTIONS}>Create Thread</ButtonLink>
      </div>
      <div className="container mx-auto px-4 ">
        <QuestionDetails {...question} userId={AuthUserId} />
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
