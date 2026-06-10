"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import { MdNavigateNext } from "react-icons/md";
import { MdNavigateBefore } from "react-icons/md";

function generatePages(currentPage: number, totalPages: number) {
  const pages: (number | string)[] = [];

  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  pages.push(1);

  if (currentPage > 4) {
    pages.push("...");
  }

  const start = Math.max(2, currentPage - 2);
  const end = Math.min(totalPages - 1, currentPage + 2);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (currentPage < totalPages - 3) {
    pages.push("...");
  }

  pages.push(totalPages);

  return pages;
}

function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const goToPage = (page: number) => {
    const query = queryString.parse(searchParams.toString());

    const url = queryString.stringifyUrl({
      url: pathname,
      query: {
        ...query,
        page,
      },
    });

    router.push(url);
  };
  const pages = generatePages(currentPage, totalPages);

  return (
    <div className="flex justify-center gap-2 mt-6  rounded-md py-1">
      <button
        disabled={currentPage === 1}
        onClick={() => goToPage(currentPage - 1)}
        className="px-4 cursor-pointer transition-all py-2 border border-secondary hover:bg-hover rounded bg-black disabled:cursor-not-allowed  disabled:opacity-50  "
      >
        <MdNavigateBefore size={18} />
      </button>

      {pages.map((page, index) => {
        if (page === "...") {
          return (
            <span key={`dots-${index}`} className="px-2 py-2 text-gray-400">
              ...
            </span>
          );
        }

        return (
          <button
            key={page}
            onClick={() => goToPage(Number(page))}
            className={`px-3 py-2 rounded-md border border-secondary
        ${
          currentPage === page
            ? "bg-secondary text-white"
            : "bg-black hover:bg-secondary"
        }
      `}
          >
            {page}
          </button>
        );
      })}

      <button
        disabled={currentPage === totalPages}
        onClick={() => goToPage(currentPage + 1)}
        className="px-4 cursor-pointer transition-all py-2 border border-secondary hover:bg-hover rounded bg-black disabled:cursor-not-allowed  disabled:opacity-50"
      >
        <MdNavigateNext size={18} />
      </button>
    </div>
  );
}

export default Pagination;
