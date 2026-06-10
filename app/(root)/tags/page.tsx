import { auth } from "@/auth";
import DataRenderer from "@/components/DataRenderer";
import Pagination from "@/components/Pagination";
import PillFilter from "@/components/PillFilter";
import TagCard from "@/components/TagCard";
import { DefaultFilters, TagFilters } from "@/constant/filter";
import { ITagDoc } from "@/database/tag.model";
import { GetTags } from "@/lib/actions/GetTags.action";

const getPageTitle = (filter?: string) => {
  switch (filter) {
    case "namedsc":
      return "A-Z Tags";
    case "newest":
      return "Newest Tags";
    case "oldest":
      return "Oldest Tags";
    case "popular":
      return "Popular Tags";
    default:
      return "All Tags";
  }
};

async function page({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: string;
  }>;
}) {
  const session = await auth();
  const { page = 1, pageSize = 12, search, filter } = await searchParams;
  const title = getPageTitle(filter);

  const { success, data, message } = await GetTags({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    search: search || "",
    filter: filter || "",
  });

  const { tags = [], totalPages = 0, currentPage = 0 } = data || {};

  console.log(tags, success);

  return (
    <>
      <div className="flex items-center justify-between p-5">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-3xl font-bold">{title}</h1>
          <PillFilter
            filters={TagFilters}
            defaultFilter={DefaultFilters.TagFilters}
          />
        </div>
      </div>
      <DataRenderer<ITagDoc>
        success={success}
        data={tags}
        errorMessage={message}
        render={(tags) => {
          return (
            <div className="grid grid-cols-3 gap-2">
              {tags.map((tag) => (
                <TagCard key={tag._id.toString()} tag={tag} />
              ))}
            </div>
          );
        }}
      />
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </>
  );
}

export default page;
