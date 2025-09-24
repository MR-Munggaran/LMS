import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import FaceVerification from "./pages/FaceVerification";
import Dashboard from "./pages/Dashboard";
import { useAuthContext } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

function App() {
  const { token } = useAuthContext();
  return (
    <>
    <Routes>
      {/* Public Pages */}
      <Route
        path="/"
        element={<Home />}
        />
      <Route
        path="/login"
        element={token ? <Navigate to="/dashboard" replace /> : <Login />}
        />
      <Route
        path="/register"
        element={<Register />}
        />
      <Route
        path="/verify"
        element={<FaceVerification />}
      />
      <Route path="/dashboard/*" element={token ? <Dashboard /> : <Navigate to={'/'}/> } />
    </Routes>
    <Toaster/>
    </>
  );
}

export default App;
