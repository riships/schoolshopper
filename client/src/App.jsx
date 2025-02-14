import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import ProtectedRoute from "./context/ProtectedRoute";
import ForgotPassword from "./components/ForgotPassword";
import VerifyOtp from "./components/VerifyOtp";
import ResetPassword from "./components/ResetPassword";
import Items from "./views/Items";
import AddProduct from "./views/AddProduct";
import "./assets/css/style.css";
import OrganizationDetails from "./views/configuration/OrganizationDetails";
import Inventory from "./views/configuration/Inventory";


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgetPassword" element={<ForgotPassword />} />
          <Route path="/verifyOtp" element={<VerifyOtp />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Home />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/inventory" element={<Inventory />}>
              <Route path="item" element={<Items />} />
              <Route path="organizationDetails" element={<OrganizationDetails />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
