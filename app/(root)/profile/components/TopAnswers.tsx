import QuestionCard from "./QuestionCard";

function TopAnswers() {
  return (
    <div className="card-wrapper p-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">Top Answers</h2>

        <button>View All</button>
      </div>
    </div>
  );
}
export default TopAnswers;
