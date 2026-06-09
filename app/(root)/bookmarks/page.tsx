import DataRenderer from "@/components/DataRenderer";
import ThreadCard from "@/components/ThreadCard";
import { GetBookMarkQuestions } from "@/lib/actions/GetBookMarkQuestions.action";

async function page({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    pageSize?: string;
    search?: string;
    filter?: string;
  }>;
}) {
  const { page, pageSize, search, filter } = await searchParams;
  const { data, success, message } = await GetBookMarkQuestions({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    search,
    filter,
  });

  const questions = data?.questions || [];
  return (
    <div className="p-5 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold">Bookmarks</h3>
        <div className="w-1/3"></div>
      </div>

      <DataRenderer
        success={success}
        data={questions}
        errorMessage={message}
        render={(questions) =>
          questions.map((question) => (
            <ThreadCard key={question._id} {...question} />
          ))
        }
      />
    </div>
  );
}

export default page;
