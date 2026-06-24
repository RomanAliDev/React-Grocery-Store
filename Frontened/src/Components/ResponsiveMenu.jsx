import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router";

function ResponsiveMenu({ isNavOpen }) {
  return (
    <div
      className={`w-[70%] h-screen bg-green-200 top-0 left-0 fixed shadow-lg justify-between flex flex-col pt-20 py-35 px-8 ${
        isNavOpen ? "left-0" : "-left-[100%]"
      } transition-all duration-600 md:hidden rounded-r-xl z-20`}
    >
      <h2 className="text-4xl font-bold text-green-600">FreshMart</h2>
      <div className="flex flex-col gap-7 text-xl font-semibold">
        <ul className="flex flex-col gap-7 ">
          <li>
            <Link
              to={"/"}
              className="cursor-pointer hover:bg-green-500 px-4 py-2 rounded-md"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to={"./shop"}
              className="cursor-pointer hover:bg-green-500 px-4 py-2 rounded-md"
            >
              Shop
            </Link>
          </li>
          <li>
            <Link
              to={"./about"}
              className="cursor-pointer hover:bg-green-500 px-4 py-2 rounded-md"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to={"./contact"}
              className="cursor-pointer hover:bg-green-500 px-4 py-2 rounded-md"
            >
              Contact
            </Link>
          </li>
        </ul>
        <div>
          <button className="cursor-pointer bg-green-500 px-6 py-2 rounded-xl flex justify-center items-center gap-2 text-white font-semibold hover:bg-green-600">
            Login
            <IoIosArrowForward className="text-2xl" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResponsiveMenu;
