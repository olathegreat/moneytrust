import { Button } from "./ui/button"

const MainTabs = ({mainTab, setMainTab}: any) => {
  return (
    <div className="flex gap-4 items-center flex-wrap">

        <div
           
           className={`border-none  font-medium shadow-none hover:opacity-85 duration-300 transition-all rounded-full ease-linear  text-black/80`}	

        >
            Board
  
        </div>

        <Button
           onClick={() => setMainTab("X-Traded")}
           className={`border-none focus:bg-[#d71e0e] shadow-none hover:opacity-85 duration-300 transition-all rounded-full ease-linear  ${mainTab === "X-Traded" ? "bg-[#d71e0e] text-white" : "bg-gray-100/50 text-black/80"}`}	

        >
            X-Traded
  
        </Button>

        <Button
           onClick={() => setMainTab("OTC")}
           className={`border-none focus:bg-[#d71e0e] shadow-none hover:opacity-85 duration-300 transition-all rounded-full ease-linear  ${mainTab === "OTC" ? "bg-[#d71e0e] text-white" : "bg-gray-100/50 text-black/80"}`}	

        >
            OTC
  
        </Button>

        <Button
           onClick={() => setMainTab("FI")}
           className={`border-none focus:bg-[#d71e0e] shadow-none hover:opacity-85 duration-300 transition-all rounded-full ease-linear  ${mainTab === "FI" ? "bg-[#d71e0e] text-white" : "bg-gray-100/50 text-black/80"}`}	

        >
            FI
  
        </Button>

        <Button
           onClick={() => setMainTab("Derivatives")}
           className={`border-none focus:bg-[#d71e0e] shadow-none hover:opacity-85 duration-300 transition-all rounded-full ease-linear  ${mainTab === "Derivatives" ? "bg-[#d71e0e] text-white" : "bg-gray-100/50 text-black/80"}`}	

        >
            Derivatives
  
        </Button>

    </div>
  )
}

export default MainTabs