import Link from "next/link";
import { format } from "date-fns";
import ROUTES from "@/routes";

import { RiCharacterRecognitionFill } from "react-icons/ri";
import { IAnswerLean } from "@/database/answer.model";
import QuestionActions from "@/components/QuestionActions";

function AnswerCard({
  answer,
  isOwner,
}: {
  answer: IAnswerLean;
  isOwner: boolean;
}) {
  return (
    <div className="block border-b border-border py-4 hover:text-blue-600 transition-all flex justify-between">
      <Link href={ROUTES.QUESTION_DETAILS(answer.question)}>
        <h3 className=" flex items-center font-semibold hover:text-primary-600 transition-colors">
          <RiCharacterRecognitionFill
            className="me-2 text-secondary font-bold"
            size={18}
          />
          {answer.content.split(" ").length > 15
            ? answer.content.split(" ").slice(0, 15).join(" ") + "..."
            : answer.content}
        </h3>

        <div className="mt-2 flex gap-4 text-sm text-light-500">
          <span>{answer.upvotes || 0} votes.</span>
          <span> {format(new Date(answer.createdAt), "dd MMM yyyy")}</span>
        </div>
      </Link>
      {isOwner && (
        <div>
          <QuestionActions questionId={answer._id} type="answer" />
        </div>
      )}
    </div>
  );
}

export default AnswerCard;
