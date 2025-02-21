import { Input } from "./ui/input";
import { IoIosSearch } from "react-icons/io";
import { GrLineChart } from "react-icons/gr";
import { LuBook, LuEye } from "react-icons/lu";
import { MdOutlineCancel, MdOutlineHistory } from "react-icons/md";
import { GoIssueClosed } from "react-icons/go";

const SearchTab = ({
  searchNav,
  setSearchNav,
  formSubmit,
  searchTerm,
  setSearchTerm,
}: any) => {
  return (
    <div className="bg-white flex flex-col w-52 p-1 h-fit gap-2 pb-2">
      <form
        className="flex bg-gray-100 border-gray-300 border  items-center gap-1 px-1"
        onSubmit={(e) => formSubmit(e)}
      >
        <IoIosSearch className="text-2xl" />

        <Input
          type="text"
          className="border-none background-transparent focus:!ring-0"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>

      <div className="flex justify-center flex-col items-center w-full gap-2 mt-2 text-black/80">
        <div
          onClick={() => setSearchNav("Product View")}
          className={`${
            searchNav === "Product View" && "text-[#D71E0E] bg-gray-100"
          }  duration-300 w-full py-2 justify-start px-8 hover:bg-gray-100 transition-all ease-in-out flex cursor-pointer items-center gap-4`}
        >
          <GrLineChart className=" text-xl" />
          <div className="text-[14px] tracking-wider ">Product View</div>
        </div>

        <div
          onClick={() => setSearchNav("Order Book")}
          className={`${
            searchNav === "Order Book" && "text-[#D71E0E] bg-gray-100"
          }  duration-300 w-full py-2 justify-start px-8  hover:bg-gray-100 transition-all ease-in-out flex cursor-pointer items-center gap-4`}
        >
            <LuBook className=" text-xl" />
          <div className="text-[14px] tracking-wider">Order Book</div>
        </div>


        <div
          onClick={() => setSearchNav("Price History")}
          className={`${
            searchNav === "Price History" && "text-[#D71E0E] bg-gray-100"
          }  duration-300 w-full py-2 justify-start px-8  hover:bg-gray-100 transition-all ease-in-out flex cursor-pointer items-center gap-4`}
        >
            <MdOutlineHistory className=" text-xl" />
          <div className="text-[14px] tracking-wider">Price History</div>
        </div>

        <div
          onClick={() => setSearchNav("Open Order")}
          className={`${
            searchNav === "Open Order" && "text-[#D71E0E] bg-gray-100"
          }  duration-300 w-full py-2 justify-start px-8  hover:bg-gray-100 transition-all ease-in-out flex cursor-pointer items-center gap-4`}
        >
            <LuEye className=" text-xl" />
          <div className="text-[14px] tracking-wider">Open Order</div>
        </div>


        <div
          onClick={() => setSearchNav("Closed Trade")}
          className={`${
            searchNav === "Closed Trade" && "text-[#D71E0E] bg-gray-100"
          }  duration-300 w-full py-2 justify-start px-8  hover:bg-gray-100 transition-all ease-in-out flex cursor-pointer items-center gap-4`}
        >
            <GoIssueClosed className=" text-xl" />
          <div className="text-[14px] tracking-wider">Closed Trade</div>
        </div>


        <div
          onClick={() => setSearchNav("Cancelled Trade")}
          className={`${
            searchNav === "Cancelled Trade" && "text-[#D71E0E] bg-gray-100"
          }  duration-300 w-full py-2 justify-start pl-8  hover:bg-gray-100 transition-all ease-in-out flex cursor-pointer items-center gap-4`}
        >
            <MdOutlineCancel className=" text-xl" />
          <div className="text-[14px] tracking-wider">Cancelled Trade</div>
        </div>
      </div>
    </div>
  );
};

export default SearchTab;
