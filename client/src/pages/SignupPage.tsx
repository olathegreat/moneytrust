import { useState } from "react";
import ChatComponent from "../components/ChatComponent";
import Nav from "../components/Nav";
import RegisterCorporate from "../components/RegisterCorporate";
import RegisterUser from "../components/RegisterUser";

const SignupPage = () => {
  const [display, setDisplay] = useState("user");

  const setDisplayFunction = (value: string)=>{
    
    setDisplay(value)
  }

  return (
    <div className="bg-gray-100 flex  flex-col items-center p-4 min-h-[100vh] gap-10 sm:gap-20 pb-10">
      <Nav />
      {
        display === "corporate" && <RegisterCorporate setDisplay={setDisplayFunction} />
      }
      {
        display === "user" && <RegisterUser setDisplay={setDisplayFunction} />
      }
      
      
      <ChatComponent/>
    </div>
  );
};

export default SignupPage;
