import Link from "next/link";
import { IoMdHome } from "react-icons/io";
import { FaChartLine } from "react-icons/fa";
import { MdOutlineCategory } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { CiLogout } from "react-icons/ci";

function SideBar() {
  return (
    <div className="flex mt-5">
      <div className="w-1/5 border-r border-primary">
        <ul className="flex flex-col items-center px-5 space-y-1">
          {/* <li className="w-full mb-3">
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-input-background px-3 py-2 rounded-lg border-border"
              name=""
              id=""
            />
          </li> */}
          <li className="text-white px-4 w-full py-3 bg-secondary rounded-sm hover:bg-hover cursor-pointer ">
            <Link href="/" className="flex items-center">
              <IoMdHome />
              <span className="ms-2">Home</span>
            </Link>
          </li>

          <li className="text-white px-4 w-full py-3  rounded-sm hover:bg-hover cursor-pointer">
            <Link href="/" className="flex items-center">
              <FaChartLine className="text-secondary" />
              <span className="ms-2">Popular</span>
            </Link>
          </li>
          <li className="text-white px-4 w-full py-3  rounded-sm hover:bg-hover cursor-pointer">
            <Link href="/" className="flex items-center">
              <MdOutlineCategory className="text-secondary" />
              <span className="ms-2">Categories</span>
            </Link>
          </li>
          <li className="text-white px-4 w-full py-3  rounded-sm hover:bg-hover cursor-pointer">
            <Link href="/" className="flex items-center">
              <BiCategory className="text-secondary" />
              <span className="ms-2">All</span>
            </Link>
          </li>

          <li className=" px-4 w-full py-3 text-danger  rounded-sm hover:text-white hover:bg-red-500 cursor-pointer">
            <Link href="/" className="flex items-center">
              <CiLogout />
              <span className="ms-2">Logout</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="w-3/5"></div>
      <div className="w-1/5 border-l border-primary"></div>
    </div>
  );
}

export default SideBar;
