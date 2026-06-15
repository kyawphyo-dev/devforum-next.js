import DataRenderer from "@/components/DataRenderer";
import Pagination from "@/components/Pagination";
import { GetUserAllAnswers } from "@/lib/actions/GetUserAllAnswers.action";
import AnswerCard from "../../components/AnswersCard";
import { auth } from "@/auth";

async function page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: {
    page?: string;
    pageSize?: string;
    search?: string;
    filter?: string;
    id?: string;
  };
}) {
  const { id } = await params;
  const auth_session = await auth();
  const isOwner = auth_session?.user?.id === id;
  const {
    page = 1,
    pageSize = 10,
    search = "",
    filter = "",
  } = await searchParams;

  const { data, success, message } = await GetUserAllAnswers({
    userId: id,
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 20,
    search,
    filter,
  });
  // if (!success || !data) {
  //   return notFound();
  // }
  const answers = data?.answers || [];
  const currentPage = data?.currentPage || 1;
  const totalPages = data?.totalPages || 1;
  // isNext is reserved for future pagination implementation
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isNext = data?.isNext || false;
  return (
    <div className="p-5 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold">All Answers</h3>
      </div>
      <DataRenderer
        success={success}
        data={answers}
        errorMessage={message}
        render={(answers) =>
          answers.map((answer) => (
            <AnswerCard
              isOwner={isOwner}
              key={answer._id.toString()}
              answer={answer}
            />
          ))
        }
      />

      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}

export default page;
