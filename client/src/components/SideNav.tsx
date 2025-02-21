import { CgCollage } from "react-icons/cg";
import { PiChartLineUp } from "react-icons/pi";
import { FiBriefcase } from "react-icons/fi";
import { BsPeople } from "react-icons/bs";
import { CiFileOn } from "react-icons/ci";
import { IoSettingsOutline } from "react-icons/io5";

const SideNav = ({activeNav, setActiveNav}:any) => {
  return <div className="bg-white flex py-8 px-4 flex-col p text-black/80 w-20 gap-8">

    <div onClick={()=>setActiveNav("overview")} className={`${activeNav === "overview" && "text-[#D71E0E]"}  duration-300 transition-all ease-in-out flex flex-col cursor-pointer items-center gap-[4px]`}>

        <CgCollage className="text-3xl"/>
        <div className="text-[12px] letter-1">Overview</div>
    </div>


    <div onClick={()=>setActiveNav("market")} className={`${activeNav === "market" && "text-[#D71E0E]"}  duration-300 transition-all ease-in-out flex flex-col cursor-pointer items-center gap-[4px]`}>

        <PiChartLineUp className="text-3xl"/>
        <div className="text-[12px] letter-1">Market</div>
    </div>

    <div onClick={()=>setActiveNav("portfolio")} className={`${activeNav === "portfolio" && "text-[#D71E0E]"}  duration-300 transition-all ease-in-out flex flex-col cursor-pointer items-center gap-[4px]`}>

        <FiBriefcase className="text-3xl"/>
        <div className="text-[12px] letter-1">Portfolio</div>
    </div>

    <div onClick={()=>setActiveNav("community")} className={`${activeNav === "community" && "text-[#D71E0E]"}  duration-300 transition-all ease-in-out flex flex-col cursor-pointer items-center gap-[4px]`}>

        <BsPeople className="text-3xl"/>
        <div className="text-[12px] letter-1">Community</div>
    </div>


    <div onClick={()=>setActiveNav("report")} className={`${activeNav === "report" && "text-[#D71E0E]"}  duration-300 transition-all ease-in-out flex flex-col cursor-pointer items-center gap-[4px]`}>

        <CiFileOn className="text-3xl"/>
        <div className="text-[12px] letter-1">Report</div>
    </div>


    <div onClick={()=>setActiveNav("settings")} className={`${activeNav === "settings" && "text-[#D71E0E]"}  duration-300 transition-all ease-in-out flex flex-col cursor-pointer items-center gap-[4px]`}>

        <IoSettingsOutline className="text-3xl"/>
        <div className="text-[12px] letter-1">Settings</div>
    </div>



  </div>;
};

export default SideNav;
