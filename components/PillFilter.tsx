"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import queryString from "query-string";

interface Filter {
  name: string;
  value: string;
}

function PillFilter({
  filters,
  defaultFilter,
}: {
  filters: Filter[];
  defaultFilter: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentFilter = searchParams.get("filter") || defaultFilter;

  const handleFilterChange = (selectedValue: string) => {
    const currentQuery = queryString.parse(searchParams.toString());

    const updatedQuery = {
      ...currentQuery,
      page: 1, // reset pagination when changing filter
      filter: selectedValue,
    };

    const url = queryString.stringifyUrl(
      {
        url: pathname,
        query: updatedQuery,
      },
      {
        skipEmptyString: true,
        skipNull: true,
      },
    );

    router.push(url);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => {
        const isActive = currentFilter === filter.value;

        return (
          <button
            key={filter.value}
            onClick={() => handleFilterChange(filter.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200
              ${
                isActive
                  ? "bg-secondary text-white"
                  : "bg-primary text-gray-300 hover:bg-hover hover:text-white"
              }`}
          >
            {filter.name}
          </button>
        );
      })}
    </div>
  );
}

export default PillFilter;
