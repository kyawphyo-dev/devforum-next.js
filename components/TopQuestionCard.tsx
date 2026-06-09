import { IQuestionDoc } from "@/database/question.model";
import ROUTES from "@/routes";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";

function TopQuestionCard({ topQuestions }: { topQuestions: IQuestionDoc[] }) {
  return (
    <div className="flex flex-col gap-4">
      {topQuestions?.map((question, i) => (
        <Link
          key={question._id.toString()}
          href={ROUTES.QUESTION_DETAILS(question._id.toString())}
          className="group flex items-start justify-between gap-3 text-secondary-text hover:text-lg hover:text-accent hover:-translate-x-1 hover:pb-3 border-border transition-all duration-300 cursor-pointer"
        >
          <span className="text-sm leading-snug line-clamp-2">
            {question.title}
          </span>
          <FaChevronRight className="mt-1 text-xs text-border group-hover:text-accent shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      ))}
    </div>
  );
}

export default TopQuestionCard;
