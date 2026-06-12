import { IUserDoc } from "@/database/user.model";

function Status({
  user,
  totalQuestions,
  totalAnswers,
}: {
  user: IUserDoc;
  totalQuestions: number;
  totalAnswers: number;
}) {
  return (
    <div className="w-1/3 mt-3">
      <h2 className="text-xl font-bold mb-4">Status</h2>
      <div className=" card-wrapper p-6 border border-border rounded-md space-y-4">
        <div className="flex justify-between items-start">
          <span className="space-y-2">
            <p className="text-xs italic">Questions</p>
            <p className="text-lg text-secondary">{totalQuestions}</p>
          </span>
          <span className="space-y-2">
            <p className="text-xs italic">Answers</p>
            <p className="text-lg text-secondary">{totalAnswers}</p>
          </span>
        </div>
        <div className="flex justify-between items-start">
          <span className="space-y-2">
            <p className="text-xs italic">Reputation </p>
            <p className="text-lg text-secondary">{user.reputation}</p>
          </span>
          <span className="space-y-2">
            <p className="text-xs italic">Reached</p>
            <p className="text-lg text-secondary">100m</p>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Status;
