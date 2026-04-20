import Image from "next/image";
import logo from "../public/devlogo-removebg.png";
import Link from "next/link";
import globe from "../public/globe.svg";
function Navbar() {
  return (
    <div className="flex justify-between px-10 py-3 items-center">
      <div>
        <Link href="/">
          <Image
            src={logo}
            alt="dev forum"
            width={120}
            height={130}
            className="object-cover"
          />
        </Link>
      </div>
      <div>
        <input
          type="text"
          placeholder="Search"
          className="w-150 bg-input-background px-3 py-2 rounded-md border-border"
          name=""
          id=""
        />
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
