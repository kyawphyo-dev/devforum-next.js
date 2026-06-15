"use client";
import { useState } from "react";
import TopQuestions from "./TopQuestions";
import { QuestionLean } from "@/database/question.model";
import AnswerCard from "./AnswersCard";
import { IAnswerLean } from "@/database/answer.model";
import Link from "next/link";
import ROUTES from "@/routes";

function ProfileContents({
  userId,
  topQuestions,
  topAnswers,
  isOwner,
}: {
  userId: string;
  topQuestions: QuestionLean[];
  topAnswers: IAnswerLean[];
  isOwner: boolean;
}) {
  const [type, setType] = useState("questions");
  const clickhandle = ({ type }: { type: "questions" | "answers" }) => {
    setType(type);
  };
  return (
    <div className="mt-5">
      <h2 className="text-xl font-bold">
        Top {type === "questions" ? "Questions" : "Answers"}
      </h2>

      <div className="space-x-3 text-xs mt-5 flex items-center ">
        <button
          onClick={() => clickhandle({ type: "questions" })}
          className={`px-2 py-1 rounded-sm border-border border hover:bg-active transition-all ${type === "questions" ? "bg-active" : ""}`}
        >
          Questions
        </button>
        <button
          onClick={() => clickhandle({ type: "answers" })}
          className={`px-2 py-1 rounded-sm border-border border hover:bg-active transition-all ${type === "answers" ? "bg-active" : ""}`}
        >
          Answers
        </button>
        <p>
          View all{" "}
          <Link
            className="text-blue-600 underline"
            href={ROUTES.PROFILE_ALLQUESTIONS(userId)}
          >
            questions
          </Link>{" "}
          or{" "}
          <Link
            className="text-blue-600 underline"
            href={ROUTES.PROFILE_ALLANSWERS(userId)}
          >
            answers
          </Link>
        </p>
      </div>
      {type === "questions" && (
        <TopQuestions isOwner={isOwner} topQuestions={topQuestions} />
      )}
      {type === "answers" &&
        topAnswers.map((answer) => (
          <AnswerCard
            key={answer._id.toString()}
            answer={answer}
            isOwner={isOwner}
          />
        ))}
    </div>
  );
}

export default ProfileContents;
