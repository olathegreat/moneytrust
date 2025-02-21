import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { apiClient } from "../lib/apiClient";
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
// import CustomLoaderCircle from "../components/LoaderCircle";
import Nav from "../components/Nav";


const DashboardPage = () => {
  const [activeNav, setActiveNav] = useState("market");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchNav, setSearchNav] = useState("Order Book");
  const [mainTab, setMainTab] = useState("X-Traded");
  const [subTab, setSubTab] = useState("All");
  const navigate = useNavigate();
  
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); 

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await apiClient.get("/api/v1/auth/get-user-or-company/", {
          withCredentials: true,
        });
        console.log(response);
        sessionStorage.setItem("sessionUserInfo", JSON.stringify(response?.data));
        setIsAuthenticated(true);
      } catch (err: any) {
        console.error(err.response);
        setIsAuthenticated(false);
        toast("You are not signed in, kindly sign in.");
        navigate("/sign-in");  
      }
    };

    getUser();
  }, [navigate]);

  if (isAuthenticated === null) {
    return <div className="flex flex-col animate-pulse h-[100vh] text-5xl w-[100vw] items-center justify-center">
      <Nav/>
      {/* <CustomLoaderCircle color="#d71e0e"/> */}
    </div>; 
  }

  return (
    <div className="bg-gray-100 flex flex-col w-[100vw] min-h-[100vh] h-auto">
      <TopNav />
      <div className="flex gap-2 w-full">
        <SideNav activeNav={activeNav} setActiveNav={setActiveNav} />
        <div className="hidden lg:flex mt-2">
          <SearchTab
            searchNav={searchNav}
            setSearchNav={setSearchNav}
            searchTerm={searchTerm}
            formSubmit={(e:any) => e.preventDefault()}
            setSearchTerm={setSearchTerm}
          />
        </div>
        <div className="mt-2 flex flex-grow  overflow-x-auto bg-red-400 lg:ml-0  sm:mr-6   gap-2">
          <div className="flex flex-col w-full gap-10 sm:gap-2">
            <div className="flex flex-col   custom-scrollbar gap-4 w-fit xl:w-full  bg-white p-4">
              <MainTabs mainTab={mainTab} setMainTab={setMainTab} />
              <SubTabs subTab={subTab} setSubTab={setSubTab} />
            </div>
            <div className="flex flex-col  xl:flex-row w-fit md:w-full   gap-6 sm:gap-2">
              <div className="flex-1 animate-slide-in-left duration-1000">
                <BuyContainer buyFunction={() => console.log("buy function")} productArray={productArray} />
              </div>
              <div className="flex-1">
                <SellContainer buyFunction={() => console.log("buy function")} productArray={productArray} />
              </div>
            </div>
            <TradeLog infoArray={infoArray} />
          </div>
        </div>
      </div>
      <div className="h-16 w-full"></div>
      <FooterNav />
    </div>
  );
};

export default DashboardPage;
