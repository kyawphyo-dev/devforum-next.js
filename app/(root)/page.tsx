import { auth } from "@/auth";
import Button from "@/components/Button";
import Filter from "@/components/Filter";
import ThreadCard from "@/components/ThreadCard";

const MOCK_THREADS = [
  {
    id: "1",
    title: "How to handle authentication in Next.js 16?",
    tags: ["nextjs", "auth", "react"],
    author: {
      name: "John Doe",
    },
    createdAt: "2 hours ago",
    stats: {
      likes: 12,
      answers: 5,
      views: 156,
    },
  },
  {
    id: "2",
    title: "Understanding Server Actions in App Router",
    tags: ["react", "nextjs", "server-actions"],
    author: {
      name: "Jane Smith",
    },
    createdAt: "5 hours ago",
    stats: {
      likes: 45,
      answers: 12,
      views: 1200,
    },
  },
  {
    id: "3",
    title: "Tailwind CSS v4: What's new and how to migrate?",
    tags: ["tailwind", "css", "frontend"],
    author: {
      name: "Alex Dev",
    },
    createdAt: "1 day ago",
    stats: {
      likes: 89,
      answers: 24,
      views: 3400,
    },
  },
];

async function page({
  searchParams,
}: {
  searchParams: Promise<{
    search: string | undefined;
    filter: string | undefined;
  }>;
}) {
  const session = await auth();
  const { search, filter } = await searchParams;

  return (
    <div className="p-5 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold">All Threads</h3>
        <div className="w-1/3">
          <Button>Create Thread</Button>
        </div>
      </div>
      <Filter />

      <div className="flex flex-col gap-4">
        {MOCK_THREADS.map((thread) => (
          <ThreadCard key={thread.id} {...thread} />
        ))}
      </div>
    </div>
  );
}

export default page;
