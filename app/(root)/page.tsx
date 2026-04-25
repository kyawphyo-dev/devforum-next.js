import { auth } from "@/auth";
import Filter from "@/components/Filter";

async function page({
  searchParams,
}: {
  searchParams: Promise<{ search: string | undefined }>;
}) {
  // const session = await auth();
  // const { search } = await searchParams;
  return (
    <div className="p-5">
      <Filter />
    </div>
  );
}

export default page;
