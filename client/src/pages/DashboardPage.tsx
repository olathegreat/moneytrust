import { useState } from "react";
import FooterNav from "../components/FooterNav";
import SideNav from "../components/SideNav";
import TopNav from "../components/TopNav";
import SearchTab from "../components/SearchTab";
import MainTabs from "../components/MainTabs";
import SubTabs from "../components/SubTabs";
import BuyContainer from "../components/BuyContainer";
import { infoArray, productArray } from "../helpers/Data";
import SellContainer from "../components/SellContainer";
import TradeLog from "../components/TradeLog";

const DashboardPage = () => {
  const [activeNav, setActiveNav] = useState("market");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchNav, setSearchNav] = useState("Order Book");
  const [mainTab, setMainTab] = useState("X-Traded");
  const [subTab, setSubTab] = useState("All");
  const formSubmit = (e: any) => {
    e.preventDefault();
  };
  const buyFunction = () => {
    console.log("buy function");
  };

  return (
    <div className="bg-gray-100 flex flex-col max-w-[100vw]  min-h-[100vh] h-auto">
      <TopNav />
      <div className="flex gap-2 flex-grow w-full">
        <SideNav activeNav={activeNav} setActiveNav={setActiveNav} />
        <div className="mt-2 flex flex-grow gap-2">
          <div className="hidden md:flex">

          
          <SearchTab
            searchNav={searchNav}
            setSearchNav={setSearchNav}
            searchTerm={searchTerm}
            formSubmit={formSubmit}
            setSearchTerm={setSearchTerm}
          />
          </div>

          <div className="flex flex-col gap-2 ">
            <div className="flex flex-col gap-4 w-full bg-white p-4">
              <MainTabs mainTab={mainTab} setMainTab={setMainTab} />

              <SubTabs subTab={subTab} setSubTab={setSubTab} />
            </div>

            <div className="flex flex-col md:flex-row w-full gap-2 ">

              <BuyContainer buyFunction={buyFunction} productArray={productArray} />

              <SellContainer buyFunction={buyFunction} productArray={productArray} />

            </div>


            <TradeLog infoArray={infoArray}/>



            <div>

            </div>
          </div>
        </div>
      </div>
      <div className="h-16 w-full">
       
</div>
      <FooterNav />
      
    </div>
  );
};

export default DashboardPage;
