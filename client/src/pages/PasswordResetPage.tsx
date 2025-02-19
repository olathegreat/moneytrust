import ChatComponent from "../components/ChatComponent"
import Nav from "../components/Nav"
import PasswordReset from "../components/PasswordReset"

const PasswordResetPage = () => {
  return (
    <div className="bg-gray-100 flex  flex-col items-center p-4  min-h-[100vh] gap-10 sm:gap-20 pb-10">
      <Nav />
      <PasswordReset/>
      
      <ChatComponent/>
    </div>
  )
}

export default PasswordResetPage
