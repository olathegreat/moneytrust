import Logo from "../assets/logo.png";
// import { Button } from "./ui/button";
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowRight } from "react-icons/md";
// import { TbBrightnessUp } from "react-icons/tb";
import { Switch } from "./ui/switch";

const TopNav = () => {
  return (
    <div className="h-16 w-full flex items-center justify-between px-4 text-black/80 bg-white shadow-gray-200 shadow-md ">
        <img src={Logo} className="h-16 object-cover w-28"/>
        <div className="flex gap-4 sm:gap-8 text-[10px] items-center">
            <div className=" flex items-center gap-2 text-[10px]">
                LIGHT
               {/* <TbBrightnessUp/> */}
               <Switch/>

            </div>


            <div className="hidden sm:flex items-center justify-between border-l-[1px] border-r-[1px] border-gray-300  text-black/20 gap-6 p-4 pr-8">
                <MdOutlineKeyboardArrowRight className="text-xl"/>

                <div className="flex gap-10">

                <div className="flex flex-col items-start">
                    <div >
                        CASH BALANCE


                    </div>
                    <div className="text-black/80 text-[14px]">
                    &#8358;8,374,763

                    </div>




                </div>




                <div className="flex  flex-col items-start">
                    <div >
                        CASH BALANCE


                    </div>
                    <div className="text-black/80 text-[14px]">
                    &#8358;8,374,763

                    </div>


                    

                </div>



                <div className="flex flex-col items-start">
                    <div >
                        CASH BALANCE


                    </div>
                    <div className="text-black/80 text-[14px]">
                    &#8358;8,374,763

                    </div>


                    

                </div>
                </div>
                

            </div>

            <div className="flex gap-2 sm:ml-4 cursor-pointer items-center">
                <div className="text-[10px]  bg-black/80 py-[1px] px-2 text-white ">
                    DEMO
                </div>
                <MdOutlineKeyboardArrowDown />
                {/* <Button className="text-[8px]">
                

                </Button> */}
            </div>

        </div>

    </div>
  )
}

export default TopNav