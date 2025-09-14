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
import AllProducts from "./pages/AllProducts";
import AllCustomerBills from "./pages/AllCustomerBills";
import AddCutomerBill from "./pages/AddCutomerBill";
import DetailsPage from "./pages/DetailsPage";
import Reports from "./pages/Reports";

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
            <Route path="/inventory" element={<AllProducts />} />
            <Route path="/all_customer_bills" element={<AllCustomerBills />} />
            <Route path="/add_customer_bill" element={<AddCutomerBill />}/>
            <Route path="/details/:type/:id" element={<DetailsPage />}/>
            <Route path="/reports" element={<Reports />}/>
          </Route>
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
