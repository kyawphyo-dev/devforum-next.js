import Image from "next/image";
import Link from "next/link";
import { FaRegComment } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { MdOutlineVisibility } from "react-icons/md";
import { IPopulatedAll } from "@/database/question.model";
import { BiDislike } from "react-icons/bi";
import { FaBookmark } from "react-icons/fa";

import ROUTES from "@/routes";

// interface ThreadCardProps {
//   title: string;
//   tags: string[];
//   author: {
//     name: string;
//     image?: string;
//   };
//   createdAt: string;
//   stats: {
//     likes: number;
//     answers: number;
//     views: number;
//   };
// }

function ThreadCard(question: IPopulatedAll) {
  return (
    <div className="bg-primary/20 border border-border rounded-xl p-6 hover:border-secondary transition-all my-3">
      <div className="flex flex-col gap-4">
        {/* Title and Bookmark */}
        <div className="flex justify-between items-start gap-4">
          <Link href={ROUTES.QUESTION_DETAILS(question._id)}>
            <h3 className="text-xl font-bold text-main-text hover:text-accent transition-colors flex-1">
              {question.title}
            </h3>
          </Link>
          {question.saved && (
            <FaBookmark className="text-secondary shrink-0" size={18} />
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {question?.tags?.map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1 text-xs font-medium rounded-full bg-input-background text-secondary-text border border-border"
            >
              {tag.name}
            </span>
          ))}
        </div>

        {/* Bottom Section: Author and Stats */}
        <div className="flex items-center justify-between mt-2">
          {/* Author Info */}
          <div className="flex items-center gap-2">
            <Link
              href={ROUTES.PROFILE(question.author._id)}
              className="relative w-8 h-8 rounded-full overflow-hidden border border-border"
            >
              {question?.author?.image ? (
                <Image
                  src={question.author.image}
                  alt={question.author.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-secondary flex items-center justify-center text-white text-xs">
                  {question?.author?.name?.charAt(0)}
                </div>
              )}
            </Link>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-main-text">
                {question?.author?.name}
              </span>
              <span className="text-xs text-text-muted">
                {new Date(question.createdAt).toLocaleString()}
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 text-text-muted">
            <div className="flex items-center gap-1 hover:text-accent transition-colors cursor-pointer">
              <AiOutlineLike className="text-lg" />
              <span className="text-sm">{question?.upvotes}</span>
            </div>
            <div className="flex items-center gap-1 hover:text-accent transition-colors cursor-pointer">
              <BiDislike className="text-lg" />
              <span className="text-sm">{question?.downvotes}</span>
            </div>
            <div className="flex items-center gap-1 hover:text-success transition-colors cursor-pointer">
              <FaRegComment className="text-md" />
              <span className="text-sm">{question?.answersCount}</span>
            </div>
            <div className="flex items-center gap-1 hover:text-warning transition-colors cursor-pointer">
              <MdOutlineVisibility className="text-lg" />
              <span className="text-sm">{question?.views}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThreadCard;
