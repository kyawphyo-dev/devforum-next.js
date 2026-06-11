import ProfileButtons from "@/app/(root)/profile/components/ProfileButtons";
import ProfileHeader from "@/app/(root)/profile/components/ProfileHeader";
import AboutSection from "../components/About";
import TopTags from "../components/TopTags";
import RecentQuestions from "../components/RecentQuestions";
import RecentAnswers from "../components/RecentAnswers";
import Status from "../components/Status";
import GetUser from "@/lib/actions/GetUser.action";
import { notFound } from "next/navigation";

async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data, success } = await GetUser({ UserId: id });
  if (!success) {
    return notFound();
  }
  const { user, totalQuestions, totalAnswers } = data!;
  return (
    <div className="my-15">
      <ProfileHeader
        user={user}
        totalQuestions={totalQuestions}
        totalAnswers={totalAnswers}
      />
      <ProfileButtons />
      <div className="flex gap-3">
        <AboutSection />
        <Status />
      </div>

      <TopTags />
      <RecentQuestions />
      <RecentAnswers />
    </div>
  );
}
export default page;
