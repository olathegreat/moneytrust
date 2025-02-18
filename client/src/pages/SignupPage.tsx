import ChatComponent from "../components/ChatComponent";
import Nav from "../components/Nav";
import RegisterCorporate from "../components/RegisterCorporate";

const SignupPage = () => {
  return (
    <div className="bg-gray-100 flex  flex-col items-center p-4 h-fit gap-10 sm:gap-20 pb-10">
      <Nav />
      <RegisterCorporate />
      <ChatComponent/>
    </div>
  );
};

export default SignupPage;
