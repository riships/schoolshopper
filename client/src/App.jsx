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
import Items from "./views/inventory/Items";
import AddProduct from "./views/inventory/AddProduct";
import "./assets/css/style.css";
import Inventory from "./views/inventory/Inventory";
import Configuration from "./views/configuration/Configuration";
import VendorDetails from "./views/purchase/VendorDetails";
import AddEditVendor from "./views/purchase/AddEditVendor";
import Ledgers from "./views/purchase/Ledgers";


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
            <Route path="/profile" element={<Profile />} />
            <Route path="/inventory" element={<Inventory />}>
              <Route path="item" element={<Items />} />
              <Route path="add-product" element={<AddProduct />} />
            </Route>
            <Route path="/purchase" element={<Inventory />}>
              <Route path="vendor" element={<VendorDetails />} />
              <Route path="vendor/add" element={<AddEditVendor />} />
              <Route path="vendor/ledgers" element={<Ledgers />} />
            </Route>
            <Route path="/configuration" element={<Configuration />}>
              <Route path="" />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider >
  )
}

export default App
