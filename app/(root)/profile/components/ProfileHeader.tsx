import Image from "next/image";
import ButtonLink from "../../../../components/ButtonLink";
import ROUTES from "@/routes";
import Link from "next/link";
import { IUserDoc } from "@/database/user.model";

interface IProfileHader {
  user: IUserDoc;
  totalQuestions: number;
  totalAnswers: number;
}
const ProfileHeader = ({
  user,
  totalQuestions,
  totalAnswers,
}: IProfileHader) => {
  return (
    <>
      <div className="flex justify-between  border-border pb-5">
        <div className="w-1/5 flex justify-center items-center">
          {user ? (
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
          <h1 className="text-3xl font-bold">{user.name} </h1>
          <div>
            <p>Member for 1 year</p>
          </div>
        </div>
        <div className="w-1/5">
          <div>
            <ButtonLink href={ROUTES.QUESTIONS} style="outline">
              Edit Profile
            </ButtonLink>
          </div>
        </div>
      </div>
      {/* <div className="rounded-xl border p-6">
        <div className="flex flex-col gap-6 md:flex-row">
          <img
            src=""
            alt="user profile"
            className="h-32 w-32 rounded-full object-cover"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold">{}</h1>

            <p className="text-gray-500">@{}</p>

            <p>{}</p>

            <p className="mt-2">📍 {}</p>

            <p className="mt-2">⭐ Reputation: {}</p>
          </div>
          (
          <Link
            href="/profile/edit"
            className="rounded-lg bg-blue-600 px-4 py-2 text-white"
          >
            Edit Profile
          </Link>
          )
        </div>
      </div> */}
    </>
  );
};
export default ProfileHeader;
