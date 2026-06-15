"use client";
import QuestionDelete from "@/lib/actions/QuestionDeleta.action";
import ROUTES from "@/routes";
import Link from "next/link";
import React from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

function QuestionActions(props: {
  questionId: string;
  type: "question" | "answer";
}) {
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
        onClick={() => QuestionDelete({ questionId: props.questionId })}
        aria-label="Delete question"
        className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-text-muted transition-all duration-200 hover:bg-danger/15 hover:text-danger"
      >
        <FiTrash2 className="text-base" />
      </button>
    </div>
  );
}

export default QuestionActions;
