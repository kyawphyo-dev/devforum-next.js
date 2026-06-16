import Link from "next/link";
import { ITagDoc } from "@/database/tag.model";
import { IUserDoc } from "@/database/user.model";

type TagCardProps = {
  tag: ITagDoc;
};

function UserCard({ user }: { user: IUserDoc & { _id: string } }) {
  return (
    <Link
      href={`/profile/${user._id.toString()}`}
      className="group flex items-center justify-between rounded-xl bg-card p-3 border border-border transition-all hover:border-primary hover:bg-hover"
    >
      <div className="flex items-center gap-4">
        {user?.image ? (
          <img
            alt={`user avatar`}
            width={100}
            height={100}
            className="border border-border"
            src={``}
          />
        ) : (
          <div className="flex h-23 w-23 rounded-sm items-center justify-center bg-secondary text-4xl font-monospace text-white">
            {user.name?.charAt(0) ?? "?"}
          </div>
        )}

        <div>
          <h3 className="font-semibold text-sm text-white group-hover:text-primary">
            {user.name}
          </h3>

          <p className="text-xs text-accent">{user?.reputation} rep</p>
          <p className="text-xs text-accent">{user?.location || ""}</p>
        </div>
      </div>
    </Link>
  );
}

export default UserCard;
