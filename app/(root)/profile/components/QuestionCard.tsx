import Link from "next/link";
import { format } from "date-fns";
import { QuestionLean } from "@/database/question.model";
import ROUTES from "@/routes";
import { CiSquareQuestion } from "react-icons/ci";
import { RiCharacterRecognitionFill } from "react-icons/ri";

function QuestionCard({ question }: { question: QuestionLean }) {
  return (
    <Link
      href={ROUTES.QUESTION_DETAILS(question._id.toString())}
      className="block border-b border-border py-4 hover:text-blue-600 transition-all"
    >
      <h3 className=" flex items-center font-semibold hover:text-primary-600 transition-colors">
        <CiSquareQuestion className="me-2 text-secondary font-bold" size={18} />
        {question.title}
      </h3>

      <div className="mt-2 flex gap-4 text-sm text-light-500">
        <span> {question.upvotes || 0} votes.</span>
        <span> {question.answersCount || 0} answers.</span>
        <span> {format(new Date(question.createdAt), "dd MMM yyyy")}</span>
      </div>
    </Link>
  );
}

export default QuestionCard;
