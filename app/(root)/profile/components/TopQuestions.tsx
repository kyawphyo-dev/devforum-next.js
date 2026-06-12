import { QuestionLean } from "@/database/question.model";
import ProfileQuestionCard from "./QuestionCard";

function TopQuestions({ topQuestions }: { topQuestions: QuestionLean[] }) {
  return (
    <div className="">
      {topQuestions.map((question) => (
        <ProfileQuestionCard
          key={question._id.toString()}
          question={question}
        />
      ))}
    </div>
  );
}
export default TopQuestions;
