import './App.css'
import { Route,  Routes } from 'react-router-dom'
import DashboardPage from './pages/DashboardPage'
import SignupPage from './pages/SignupPage'
import SigninPage from './pages/SigninPage'
import WelcomePage from './pages/WelcomePage'
import PasswordResetPage from './pages/PasswordResetPage'
import ConfirmResetOTPPage from './pages/ConfirmResetOTPPage'


function App() {
  

  return (
    <Routes>
      <Route path="/"  element={<WelcomePage/>}/>
      
      <Route path="/sign-up"  element={<SignupPage/>}/>
      <Route path="/sign-in"  element={<SigninPage/>}/>
      <Route path="/dashboard" element={<DashboardPage/>}/>
      <Route path="/sign-in/password-reset" element={<PasswordResetPage/>}/>
      <Route path='/sign-in/confirm-otp' element={<ConfirmResetOTPPage/>}/>     

    


    </Routes>
  )
}

export default App
