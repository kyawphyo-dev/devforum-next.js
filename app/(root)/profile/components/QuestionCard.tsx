import Link from "next/link";

interface ProfileQuestionCardProps {
  _id: string;
  title: string;
  answers: number;
  votes: number;
  createdAt: string;
}

function ProfileQuestionCard() {
  return (
    <Link href="" className="block border-b border-border py-4">
      <h3 className="text-base font-semibold hover:text-primary-600 transition-colors">
        title
      </h3>

      <div className="mt-2 flex gap-4 text-sm text-light-500">
        <span> votes.</span>
        <span> answers.</span>
        <span> createdAt</span>
      </div>
    </Link>
  );
}

export default ProfileQuestionCard;
