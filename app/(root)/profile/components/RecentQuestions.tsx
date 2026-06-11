import QuestionCard from "./QuestionCard";

function RecentQuestions() {
  return (
    <div className="card-wrapper p-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">Recent Questions</h2>

        <button>View All</button>
      </div>

      <QuestionCard />
      <QuestionCard />
      <QuestionCard />
    </div>
  );
}
export default RecentQuestions;
