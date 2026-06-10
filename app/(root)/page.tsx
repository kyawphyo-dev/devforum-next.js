import ButtonLink from "@/components/ButtonLink";
import DataRenderer from "@/components/DataRenderer";
import PillFilter from "@/components/PillFilter";
import ThreadCard from "@/components/ThreadCard";
import { DefaultFilters, HomePageFilters } from "@/constant/filter";
import { GetQuestions } from "@/lib/actions/GetQuestions.action";
import ROUTES from "@/routes";

const getPageTitle = (filter?: string) => {
  switch (filter) {
    case "newest":
      return "Newest Questions";
    case "oldest":
      return "Oldest Questions";
    case "mostvoted":
      return "Most Voted Questions";
    case "mostanswered":
      return "Most Answered Questions";
    default:
      return "All Questions";
  }
};
async function page({
  searchParams,
}: {
  searchParams: {
    page?: string;
    pageSize?: string;
    search?: string;
    filter?: string;
  };
}) {
  const {
    page = 1,
    pageSize = 10,
    search = "",
    filter = "",
  } = await searchParams;

  const title = getPageTitle(filter);
  const { data, success, message } = await GetQuestions({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    search,
    filter,
  });
  // if (!success || !data) {
  //   return notFound();
  // }
  const questions = data?.questions || [];
  const totalQuestions = data?.totalQuestions || 0;
  // isNext is reserved for future pagination implementation
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isNext = data?.isNext || false;
  return (
    <div className="p-5 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold">{title}</h3>
        <div className="w-1/3">
          <ButtonLink href={ROUTES.QUESTIONS}>Create Thread</ButtonLink>
        </div>
      </div>
      {/* <Filter /> */}
      <div className="flex justify-between items-center">
        <h4 className="text-lg font-semibold">
          Total Questions: {totalQuestions}
        </h4>
        <PillFilter
          filters={HomePageFilters}
          defaultFilter={DefaultFilters.HomePageFilters}
        />
      </div>

      <DataRenderer
        success={success}
        data={questions}
        errorMessage={message}
        render={(questions) =>
          questions.map((question) => (
            <ThreadCard key={question._id.toString()} {...question} />
          ))
        }
      />
    </div>
  );
}

export default page;
