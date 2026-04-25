import Image from "next/image";
import Link from "next/link";
import { FaRegComment } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { MdOutlineVisibility } from "react-icons/md";

interface ThreadCardProps {
  title: string;
  tags: string[];
  author: {
    name: string;
    image?: string;
  };
  createdAt: string;
  stats: {
    likes: number;
    answers: number;
    views: number;
  };
}

function ThreadCard({
  title,
  tags,
  author,
  createdAt,
  stats,
}: ThreadCardProps) {
  return (
    <div className="bg-primary/20 border border-border rounded-xl p-6 hover:border-secondary transition-all">
      <div className="flex flex-col gap-4">
        {/* Title */}
        <Link href="/">
          <h3 className="text-xl font-bold text-main-text hover:text-accent transition-colors">
            {title}
          </h3>
        </Link>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-medium rounded-full bg-input-background text-secondary-text border border-border"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Bottom Section: Author and Stats */}
        <div className="flex items-center justify-between mt-2">
          {/* Author Info */}
          <div className="flex items-center gap-2">
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-border">
              {author.image ? (
                <Image
                  src={author.image}
                  alt={author.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-secondary flex items-center justify-center text-white text-xs">
                  {author.name.charAt(0)}
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-main-text">
                {author.name}
              </span>
              <span className="text-xs text-text-muted">{createdAt}</span>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 text-text-muted">
            <div className="flex items-center gap-1 hover:text-accent transition-colors cursor-pointer">
              <AiOutlineLike className="text-lg" />
              <span className="text-sm">{stats.likes}</span>
            </div>
            <div className="flex items-center gap-1 hover:text-success transition-colors cursor-pointer">
              <FaRegComment className="text-md" />
              <span className="text-sm">{stats.answers}</span>
            </div>
            <div className="flex items-center gap-1 hover:text-warning transition-colors cursor-pointer">
              <MdOutlineVisibility className="text-lg" />
              <span className="text-sm">{stats.views}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThreadCard;
