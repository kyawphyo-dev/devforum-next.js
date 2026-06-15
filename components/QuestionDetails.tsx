import { IPopulatedAll } from "@/database/question.model";
import { formatDistanceToNow } from "date-fns";
import BookMarkCard from "./BookMarkCard";
import Preview from "./MarkDownPreview";
import VoteButton from "./VoteButton";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import QuestionActions from "./QuestionActions";

function QuestionDetails(props: IPopulatedAll & { userId: string }) {
  const {
    title,
    createdAt,
    views,
    content,
    tags,
    author,
    upvotes,
    downvotes,
    answersCount,
  } = props;
  const isOwner = author._id === props.userId;
  return (
    <div className="rounded-xl border border-border p-9 bg-card space-y-5 shadow-2xl">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">{title}</h1>
        <BookMarkCard
          key={props._id}
          questionId={props._id}
          saved={props.saved}
        />
      </div>

      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <span>Asked by {author.name}</span>
        <span>•</span>
        <span>
          {formatDistanceToNow(new Date(createdAt), {
            addSuffix: true,
          })}
        </span>
        <span>•</span>
        <span>{views} views</span>
      </div>

      <div className="mt-4 flex gap-2">
        {tags.map((tag) => (
          <span
            key={tag._id}
            className="bg-primary text-white px-4 py-2 rounded-full"
          >
            {tag.name}
          </span>
        ))}
      </div>

      <div className="mt-6 prose">
        <Preview content={content} />
        {/* <pre>{content}</pre> */}
      </div>

      <div className="flex items-center justify-between gap-4 text-text-muted">
        <VoteButton
          targetId={props._id}
          targetType="question"
          initialDownvotes={downvotes}
          initialUpvotes={upvotes}
        />
        {isOwner && <QuestionActions questionId={props._id} type="question" />}
      </div>
    </div>
  );
}

export default QuestionDetails;
