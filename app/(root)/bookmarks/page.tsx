import DataRenderer from "@/components/DataRenderer";
import Pagination from "@/components/Pagination";
import PillFilter from "@/components/PillFilter";
import ThreadCard from "@/components/ThreadCard";
import { CollectionFilters, DefaultFilters } from "@/constant/filter";
import GetBookMarkQuestions from "@/lib/actions/GetBookMarkQuestions.action";

const getPageTitle = (filter?: string) => {
  switch (filter) {
    case "newest":
      return "Newest Bookmarks";
    case "oldest":
      return "Oldest Bookmarks";
    case "mostvoted":
      return "Most Voted Bookmarks";
    case "mostviewed":
      return "Most Viewed Bookmarks";
    case "mostanswered":
      return "Most Answered Bookmarks";
    default:
      return "All Bookmarks";
  }
};

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
  const { page = 1, pageSize = 10, search, filter } = await searchParams;
  const title = getPageTitle(filter);
  const { data, success, message } = await GetBookMarkQuestions({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    search,
    filter,
  });

  const { questions = [], totalPages = 0, currentPage = 0 } = data || {};
  return (
    <div className="p-5 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold">{title}</h3>
        <div className="w-1/3"></div>
      </div>
      <div>
        <PillFilter
          filters={CollectionFilters}
          defaultFilter={DefaultFilters.CollectionFilters}
        />
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
      <Pagination totalPages={totalPages} currentPage={currentPage} />
    </div>
  );
}

export default page;
