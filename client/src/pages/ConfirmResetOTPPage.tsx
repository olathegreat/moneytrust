import ChatComponent from "../components/ChatComponent"
import ConfirmOTP from "../components/ConfirmOTP"
import Nav from "../components/Nav"


const ConfirmResetOTPPage = () => {
  return (
    <div className="bg-gray-100 flex  flex-col items-center p-4  min-h-[100vh] gap-10 sm:gap-20 pb-10">
      <Nav />
      <ConfirmOTP/>
      
      <ChatComponent/>
    </div>
  )
}

export default ConfirmResetOTPPage
