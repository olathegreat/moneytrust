import { useNavigate } from "react-router-dom";
import ChatComponent from "../components/ChatComponent";
import Nav from "../components/Nav";
import { Button } from "../components/ui/button";


const WelcomePage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="relative bg-gray-100 flex flex-col items-center  p-4 min-h-[100vh] gap-20 pb-10">
      <Nav />

      <div className="flex w-full items-center flex-col  gap-10">
        <div className="w-full sm:w-[555px] flex flex-col items-center p-12 h-[228px] bg-white">
          <div className="text-2xl sm:text-3xl ">Sign in to ComX</div>
          <div className=" mt-2 mb-8">Welcome to comx</div>

          <Button onClick={()=>navigate("/sign-in")} className="bg-green-600 rounded-none transition-all duration-300 hover:bg-green-500 text-white w-full h-[48px]">
            Sign in
          </Button>
          
        </div>

        <div className="w-full sm:w-[555px] flex flex-col items-center p-12 h-[228px] bg-white">
          <div className="text-2xl text-nowrap sm:text-3xl ">Create an Account</div>
          <div className=" mt-2 mb-8">Join the family</div>

          <Button onClick={()=>navigate("/sign-in")} className="bg-black/80 rounded-none transition-all duration-300 hover:bg-black/70 text-white w-full h-[48px]">
            Register
          </Button>
        </div>
      </div>

      <ChatComponent />
    </div>
  );
};

export default WelcomePage;
