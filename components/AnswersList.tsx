import { IPopulatedAnswer } from "@/database/answer.model";
import { Suspense } from "react";
import AnswerCard from "./AnswerCard";
import SeeMoreAnswersButton from "./SeeMoreAnswersButton";
import PillFilter from "./PillFilter";
import { AnswerFilters, DefaultFilters } from "@/constant/filter";

const INITIAL_VISIBLE = 3;

interface AnswersListProps {
  answers: IPopulatedAnswer[];
  totalAnswers: number;
  showAll: boolean;
}

function AnswersList({ answers, totalAnswers, showAll }: AnswersListProps) {
  const countLabel =
    totalAnswers === 1 ? "1 Answer" : `${totalAnswers} Answers`;
  const remaining = totalAnswers - INITIAL_VISIBLE;

  return (
    <section className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-main-text">{countLabel}</h2>
        {/* <PillFilter
          filters={AnswerFilters}
          defaultFilter={DefaultFilters.AnswerFilters}
        /> */}
      </div>

      {answers.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-card/50 p-12 text-center">
          <p className="text-lg font-medium text-main-text">No answers yet</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Be the first to help by sharing your knowledge below.
          </p>
        </div>
      ) : (
        <>
          <ul className="space-y-5">
            {answers.map((answer) => (
              <AnswerCard key={answer._id} answer={answer} />
            ))}
          </ul>

          {!showAll && totalAnswers > INITIAL_VISIBLE && (
            <Suspense fallback={null}>
              <SeeMoreAnswersButton remaining={remaining} />
            </Suspense>
          )}
        </>
      )}
    </section>
  );
}

export default AnswersList;
