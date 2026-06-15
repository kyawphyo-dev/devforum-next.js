import { QuestionLean } from "@/database/question.model";
import ProfileQuestionCard from "./QuestionCard";

function TopQuestions({
  topQuestions,
  isOwner,
}: {
  topQuestions: QuestionLean[];
  isOwner: boolean;
}) {
  return (
    <div className="">
      {topQuestions.map((question) => (
        <ProfileQuestionCard
          key={question._id.toString()}
          question={question}
          isOwner={isOwner}
        />
      ))}
    </div>
  );
}
export default TopQuestions;
