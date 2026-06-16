import React from "react";
import UserCard from "./components/UserCard";
import { GetAllUsers } from "@/lib/actions/GetAllUsers.action";
import Pagination from "@/components/Pagination";

async function page() {
  const result = await GetAllUsers({
    page: 1,
    pageSize: 15,
    search: "",
    filter: "",
  });
  const { users = [], currentPage = 1, totalPages = 1 } = result.data || {};
  return (
    <div className="my-15 mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white">Users</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 space-y-3">
        {users.map((user) => {
          return <UserCard key={user._id.toString()} user={user} />;
        })}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}

export default page;
