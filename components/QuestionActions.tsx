"use client";
import AnswerDelete from "@/lib/actions/AnswerDelete.action";
import QuestionDelete from "@/lib/actions/QuestionDeleta.action";
import ROUTES from "@/routes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";

function QuestionActions(props: {
  questionId: string;
  type: "question" | "answer";
}) {
  const router = useRouter();
  const handleDelete = async () => {
    if (props.type === "question") {
      const { success, message } = await QuestionDelete({
        questionId: props.questionId,
      });
      if (success) {
        router.push(ROUTES.HOME);
        toast.success(message);
        router.push(ROUTES.HOME);
      } else {
        toast.error(message);
      }
    } else {
      const { success, message } = await AnswerDelete({
        answerId: props.questionId,
      });
      if (success) {
        toast.success(message);
      } else {
        toast.error(message);
      }
    }
  };
  return (
    <div
      className="inline-flex items-center overflow-hidden rounded-lg border border-border bg-input-background/40 shadow-sm"
      role="group"
      aria-label="Question actions"
    >
      {props.type === "question" && (
        <Link
          href={ROUTES.QUESTIONS_EDIT(props.questionId)}
          type="button"
          aria-label="Edit question"
          className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-text-muted transition-all duration-200 hover:bg-hover hover:text-main-text"
        >
          <FiEdit2 className="text-base" />
        </Link>
      )}

      <div className="h-6 w-px shrink-0 bg-border" aria-hidden="true" />

      <button
        type="button"
        onClick={handleDelete}
        aria-label="Delete question"
        className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-text-muted transition-all duration-200 hover:bg-danger/15 hover:text-danger"
      >
        <FiTrash2 className="text-base" />
      </button>
    </div>
  );
}

export default QuestionActions;
