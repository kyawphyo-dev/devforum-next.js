import Image from "next/image";
import logo from "../public/devlogo-removebg.png";
import Link from "next/link";
import globe from "../public/globe.svg";
import SearchInput from "../components/SearchInput";
import ROUTES from "@/routes";
import { Suspense } from "react";

function Navbar() {
  return (
    <div className="flex justify-between px-10 py-3 items-center">
      <div>
        <Link href={ROUTES.HOME}>
          <Image
            src={logo}
            alt="dev forum"
            width={120}
            height={130}
            className="object-cover"
          />
        </Link>
      </div>
      <div className="w-150">
        <Suspense
          fallback={
            <div className="h-10 w-full bg-input-background animate-pulse rounded-md" />
          }
        >
          <SearchInput />
        </Suspense>
      </div>
      <div>
        <Image
          src={globe}
          alt="profile globe"
          width={40}
          height={40}
          className="rounded-full object-cover"
        />
      </div>
    </div>
  );
}

export default Navbar;
