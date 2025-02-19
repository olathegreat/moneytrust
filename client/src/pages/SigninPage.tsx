import ChatComponent from "../components/ChatComponent"
import Login from "../components/Login"
import Nav from "../components/Nav"

const SigninPage = () => {
  return (
    <div className="bg-gray-100 flex  flex-col items-center p-4 min-h-[100vh] gap-10 sm:gap-20 pb-10">
      <Nav />
      <Login/>
      
      <ChatComponent/>
    </div>
  )
}

export default SigninPage
