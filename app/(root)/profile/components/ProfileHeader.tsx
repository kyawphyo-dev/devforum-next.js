import Image from "next/image";
import ButtonLink from "../../../../components/ButtonLink";
import ROUTES from "@/routes";
import { formatDistanceToNow } from "date-fns";
import { IUserDoc } from "@/database/user.model";

const ProfileHeader = async ({
  user,
  authUserId,
}: {
  user: IUserDoc;
  authUserId: string;
}) => {
  const isOwner = authUserId === user._id.toString();
  return (
    <>
      <div className="flex justify-between  border-border pb-5">
        <div className="w-1/5 flex justify-center items-center">
          {user.image ? (
            <Image
              src={user.image}
              alt="user profile"
              width={150}
              height={150}
              className="object-cover rounded-sm border border-border"
            />
          ) : (
            <div className="flex h-10 w-10 rounded-full items-center justify-center bg-secondary text-sm font-medium text-white">
              {user.name?.charAt(0) ?? "?"}
            </div>
          )}
        </div>
        <div className="w-3/5 items-start ms-2 pt-15 space-y-2">
          <h1 className="text-3xl font-bold flex items-center">
            {user.name}{" "}
            <span className="text-xs py-1 px-2 bg-primary rounded-full ms-2">
              {user.username ? `@${user.username}` : ""}
            </span>
          </h1>
          <div>
            <p>
              Member for{" "}
              {formatDistanceToNow(new Date(user.createdAt.toString()))}
            </p>
          </div>
        </div>
        <div className="w-1/5">
          <div>
            {isOwner && (
              <ButtonLink
                href={ROUTES.PROFILE_EDIT(user._id.toString())}
                style="outline"
              >
                Edit Profile
              </ButtonLink>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default ProfileHeader;
