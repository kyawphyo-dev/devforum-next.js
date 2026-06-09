import ButtonLink from "@/components/ButtonLink";
import DataRenderer from "@/components/DataRenderer";
import Filter from "@/components/Filter";
import ThreadCard from "@/components/ThreadCard";
import { IPopulatedAll } from "@/database/question.model";
import { GetQuestions } from "@/lib/actions/GetQuestions.action";
import ROUTES from "@/routes";

async function page({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    pageSize?: string;
    search?: string;
    filter?: string;
    sort?: string;
    isNext: boolean;
    question: IPopulatedAll[];
  }>;
}) {
  const { page, pageSize, search, filter } = await searchParams;
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
  // isNext is reserved for future pagination implementation
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isNext = data?.isNext || false;
  return (
    <div className="p-5 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold">All Threads</h3>
        <div className="w-1/3">
          <ButtonLink href={ROUTES.QUESTIONS}>Create Thread</ButtonLink>
        </div>
      </div>
      <Filter />

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
