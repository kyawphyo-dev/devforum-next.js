import ProfileHeader from "@/app/(root)/profile/components/ProfileHeader";
import AboutSection from "../components/About";
import Status from "../components/Status";
import GetUser from "@/lib/actions/GetUser.action";
import { notFound } from "next/navigation";
import GetUserTopQuestions from "@/lib/actions/GetUserTopQuestions.action";
import GetUserTopAnswers from "@/lib/actions/GetUserTopAnswers.action";
import ProfileContents from "../components/ProfileContents";

async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  //   Get User
  const result = await GetUser({ UserId: id });

  if (!result.success || !result.data) {
    return notFound();
  }
  const { user, totalQuestions, totalAnswers } = result.data;

  //   Get Top Questions
  const topQuestionsResult = await GetUserTopQuestions({ UserId: id });
  if (!topQuestionsResult.success || !topQuestionsResult.data) {
    return notFound();
  }
  const topQuestions = topQuestionsResult.data;

  //   Get Top Answers
  const topAnswersResult = await GetUserTopAnswers({ UserId: id });
  if (!topAnswersResult.success || !topAnswersResult.data) {
    return notFound();
  }
  const topAnswers = topAnswersResult.data;

  return (
    <div className="my-15">
      <div className="bg-gray-800/50 rounded-xl p-5">
        <ProfileHeader user={user} />
        <div className="flex gap-3">
          <AboutSection user={user} />
          <Status
            user={user}
            totalQuestions={totalQuestions}
            totalAnswers={totalAnswers}
          />
        </div>
      </div>
      <ProfileContents
        userId={id}
        topQuestions={topQuestions}
        topAnswers={topAnswers}
      />
    </div>
  );
}
export default page;
