import { Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import Footer from "./components/Home/Footer"
import Navbar from "./components/Home/Navbar"
import FaceVerification from "./pages/FaceVerification"

function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/" element={<Home/>}/>
      <Route path="/verify" element={<FaceVerification />}/>
    </Routes>
    <Footer/>
    </>
    
  )
}

export default App