import { IPopulatedAnswer } from "@/database/answer.model";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import Preview from "./MarkDownPreview";
import VoteButton from "./VoteButton";

function AnswerCard({ answer }: { answer: IPopulatedAnswer }) {
  return (
    <li className="rounded-xl border border-border bg-card space-y-5 p-9 shadow-2xl">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-border">
            {answer.author?.image ? (
              <Image
                src={answer.author.image}
                alt={answer.author.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-secondary text-sm font-medium text-white">
                {answer.author?.name?.charAt(0) ?? "?"}
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-main-text">
              {answer.author?.name ?? "Anonymous"}
            </span>
            <span className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(answer.createdAt), {
                addSuffix: true,
              })}
            </span>
          </div>
        </div>
      </div>

      <div className="prose max-w-none">
        <Preview content={answer.content} />
      </div>

      <div className="flex items-center gap-4 text-text-muted">
        {/* <div className="flex cursor-pointer items-center gap-1 transition-colors hover:text-accent">
          <AiOutlineLike className="text-lg" />
          <span className="text-sm">{answer.upvotes}</span>
        </div>
        <div className="flex cursor-pointer items-center gap-1 transition-colors hover:text-accent">
          <BiDislike className="text-lg" />
          <span className="text-sm">{answer.downvotes}</span>
        </div> */}
        <VoteButton
          targetId={answer._id}
          targetType="answer"
          initialDownvotes={answer.downvotes}
          initialUpvotes={answer.upvotes}
        />
      </div>
    </li>
  );
}

export default AnswerCard;
