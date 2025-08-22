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

function App() {
  return (
    <>
      <Routes>
        <Route element={<AuthRoutes />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<PrivateRoutes />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/vendors" element={<Vendors />} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
