import './App.css'
import { Route,  Routes } from 'react-router-dom'
import DashboardPage from './pages/DashboardPage'
import SignupPage from './pages/SignupPage'
import SigninPage from './pages/SigninPage'
import WelcomePage from './pages/WelcomePage'


function App() {
  

  return (
    <Routes>
      <Route path="/"  element={<WelcomePage/>}/>
      
      <Route path="/sign-up"  element={<SignupPage/>}/>
      <Route path="/sign-in"  element={<SigninPage/>}/>
      <Route path="/profile" element={<DashboardPage/>}/>
     

    


    </Routes>
  )
}

export default App
