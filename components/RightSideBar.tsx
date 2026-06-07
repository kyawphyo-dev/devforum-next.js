import Question from "@/database/question.model";
import User from "@/database/user.model";
import GetPopularTags from "@/lib/actions/GetPopularTags.action";
import GetTopQuestions from "@/lib/actions/GetTopQuestion.action";
import PopularTagsCard from "./PopularTagsCard";
import TopQuestionCard from "./TopQuestionCard";

// const popularTags = [
//   { id: 1, name: "React", count: 120 },
//   { id: 2, name: "Next.js", count: 85 },
//   { id: 3, name: "Tailwind", count: 64 },
//   { id: 4, name: "Typescript", count: 52 },
//   { id: 5, name: "CSS", count: 41 },
// ];

async function RightSideBar() {
  const { success, data } = await GetTopQuestions();

  const topQuestions = data?.topQuestions || [];
  const { success: tagSuccess, data: tagsData } = await GetPopularTags();
  const popularTags = tagsData?.popularTags || [];

  const totalUsers = await User.countDocuments();
  const totalQuestions = await Question.countDocuments();

  return (
    <div className="flex flex-col gap-10 my-12 px-6">
      {/* Top Questions Section */}
      <section className="flex flex-col gap-5">
        <h3 className="text-xl font-bold text-main-text border-b border-border pb-3">
          Top Questions
        </h3>
        <TopQuestionCard topQuestions={topQuestions} />
      </section>

      {/* Popular Tags Section */}
      <section className="flex flex-col gap-5">
        <h3 className="text-xl font-bold text-main-text border-b border-border pb-3">
          Popular Tags
        </h3>
        <PopularTagsCard popularTags={popularTags} />
      </section>

      {/* Community Stats (Optional but good) */}
      <section className="bg-card-background border border-border rounded-xl p-5 flex flex-col gap-4">
        <h4 className="text-sm font-semibold text-main-text">
          Community Stats
        </h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <span className="text-xl font-bold text-accent">
              {totalQuestions}
            </span>
            <span className="text-[10px] uppercase tracking-wider text-text-muted">
              Questions
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-accent">{totalUsers}</span>
            <span className="text-[10px] uppercase tracking-wider text-text-muted">
              Members
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default RightSideBar;
