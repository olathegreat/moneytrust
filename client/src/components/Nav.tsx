import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";

const Nav = () => {
  const navigate = useNavigate()
  return (
    <div onClick={()=>navigate("/")} className="cursor-pointer">
      <img src={Logo} className="w-[161px] h-[84px]" alt="logo" />
    </div>
  );
};

export default Nav;
