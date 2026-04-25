"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import queryString from "query-string";

function Filter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [filter, setFilter] = useState("");

  // Sync state with URL
  useEffect(() => {
    const currentFilter = searchParams.get("filter") || "";
    setFilter(currentFilter);
  }, [searchParams]);

  const handleFilter = (item: string) => {
    const currentQuery = queryString.parse(searchParams.toString());

    if (filter === item) {
      // remove filter if clicked again
      delete currentQuery.filter;
    } else {
      // set new filter
      currentQuery.filter = item;
    }

    const url = queryString.stringifyUrl(
      {
        url: pathname,
        query: currentQuery,
      },
      { skipNull: true },
    );

    router.push(url);
  };

  const filterItem = ["all", "javascript", "typescript", "react", "vue"];

  return (
    <div className="flex flex-wrap gap-3">
      {filterItem.map((item, index) => (
        <button
          key={index}
          className={`px-3 py-2 rounded-xl ${
            filter === item
              ? "bg-secondary text-primary"
              : "bg-primary text-gray-500"
          }`}
          onClick={() => handleFilter(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

export default Filter;
