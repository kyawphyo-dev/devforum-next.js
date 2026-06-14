import { IUserDoc } from "@/database/user.model";
import Link from "next/link";
import ROUTES from "@/routes";

function AboutSection({ user, isOwner }: { user: IUserDoc; isOwner: boolean }) {
  return (
    <div className="w-2/3 mt-3">
      <h2 className="text-xl font-bold mb-4">About</h2>

      <div className="card-wrapper p-6 border border-border rounded-md">
        <p className="paragraph-regular text-gray-500">
          {user.bio ? (
            user.bio
          ) : isOwner ? (
            <>
              <span>
                You haven't added an About Me yet. Add a short bio to tell
                others who you are and what you're interested in.
              </span>

              <Link
                href={ROUTES.PROFILE_EDIT(user._id.toString())}
                className="text-blue-600 underline hover:text-blue-500 ml-2"
              >
                Edit Profile
              </Link>
            </>
          ) : (
            <span>This user hasn't added an About Me yet.</span>
          )}
        </p>
      </div>
    </div>
  );
}

export default AboutSection;
