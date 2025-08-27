import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import Dashboard from "./pages/Dashboard";
import AuthRoutes from "./routes/AuthRoutes";
import PrivateRoutes from "./routes/PrivateRoutes";
import Vendors from "./pages/Vendors";
import Layout from "./components/Layout";
import Vendors1 from "./pages/Vendors";
import VendorBills from "./pages/VendorBills";
import VendorBills1 from "./pages/VendorBills";
import Customers from "./pages/Customers";
import AllVendorBills from "./pages/AllVendorBills";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<AuthRoutes />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<PrivateRoutes />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/vendors" element={<Vendors1 />} />
            <Route path="/vendors/:id/bills" element={<VendorBills1 />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/all_vendor_bills" element={<AllVendorBills />} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
