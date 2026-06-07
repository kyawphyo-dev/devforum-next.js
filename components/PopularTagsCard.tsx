import { ITagDoc } from "@/database/tag.model";
import Link from "next/link";

function PopularTagsCard({ popularTags }: { popularTags: ITagDoc[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {popularTags.map((tag, i) => (
        <Link
          key={i}
          href={`/tags/${tag._id}`}
          className="flex items-center justify-between gap-2 bg-input-background hover:bg-hover border border-border rounded-md px-3 py-1.5 transition-all duration-200 cursor-pointer group"
        >
          <span className="text-xs font-medium text-secondary-text group-hover:text-main-text">
            {tag.name.toUpperCase()}
          </span>
          <span className="text-[10px] px-1.5 py-0.5 bg-primary/50 text-text-muted rounded-full">
            {tag.questions}
          </span>
        </Link>
      ))}
    </div>
  );
}

export default PopularTagsCard;
