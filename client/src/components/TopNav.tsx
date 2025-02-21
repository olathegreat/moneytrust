import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { TbBrightnessUp } from "react-icons/tb";
import { Switch } from "./ui/switch";
import { apiClient } from "../lib/apiClient";

const TopNav = () => {
  const [isDark, setIsDark] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null); 

  const handleLogout = async () => {
    const res = await apiClient.post("/api/v1/auth/logout/");
    console.log(res);
    navigate("/sign-in");
  };

  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDropdown]);

  return (
    <div className="h-16 w-full flex items-center justify-between px-4 text-black/80 bg-white shadow-gray-200 shadow-md">
      <img src={Logo} className="h-16 object-cover w-28" />

      <div className="flex gap-4 sm:gap-8 text-[10px] items-center">
    
        <div className="flex items-center gap-2">
          <div
            className={`relative w-16 h-7 flex items-center rounded-full transition-all duration-300 ${
              !isDark ? "bg-gray-700" : "bg-gray-200"
            }`}
          >
            {isDark && (
              <span className="absolute left-[17px] transform -translate-x-1/2 text-black/50 text-[9px] font-bold">
                Light
              </span>
            )}

            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center bg-white shadow-md transform transition-transform ${
                isDark ? "translate-x-9" : "translate-x-1"
              }`}
            >
              <TbBrightnessUp className="text-gray-800 text-lg" />
            </div>

            {!isDark && (
              <span className="absolute left-[44px] transform -translate-x-1/2 text-white text-[9px] font-bold">
                Dark
              </span>
            )}

            <Switch
              checked={isDark}
              onCheckedChange={() => setIsDark(!isDark)}
              className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
            />
          </div>
        </div>

        
        <div className="hidden sm:flex items-center justify-between border-l-[1px] border-r-[1px] border-gray-300 text-black/20 gap-4 p-4 pr-8">
          <MdOutlineKeyboardArrowRight className="text-xl" />
          <div className="flex gap-10">
            {Array(3)
              .fill("CASH BALANCE")
              .map((label, index) => (
                <div key={index} className="flex flex-col items-start">
                  <div>{label}</div>
                  <div className="text-black/80 text-[14px]">&#8358;8,374,763</div>
                </div>
              ))}
          </div>
        </div>

        
        <div ref={dropdownRef} className="relative flex gap-2 sm:ml-2 cursor-pointer items-center">
          <div className="text-[10px] bg-black/80 py-[1px] px-2 text-white">DEMO</div>
          <MdOutlineKeyboardArrowDown
            className="text-2xl"
            onClick={() => setShowDropdown(!showDropdown)}
          />

          
          {showDropdown && (
            <div
              className="absolute right-0 mt-2 bg-white shadow-lg rounded-md p-2 text-sm text-black cursor-pointer hover:bg-gray-100"
              onClick={handleLogout}
            >
              Logout
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopNav;
