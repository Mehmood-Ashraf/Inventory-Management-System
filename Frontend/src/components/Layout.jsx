import React, { useState } from "react";
import {
  BarChart3,
  Package,
  Users,
  FileText,
  Truck,
  TrendingUp,
  Menu,
  X,
  Zap,
} from "lucide-react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const adminName = useSelector((state) => state.auth.adminName);
  const location = useLocation();

  const menuItems = [
    { path: "dashboard", icon: BarChart3, label: "Dashboard" },
    { path: "inventory", icon: Package, label: "Inventory" },
    { path: "customers", icon: Users, label: "Customers" },
    { path: "all_vendor_bills", icon: FileText, label: "Vendor Bills" },
    { path: "vendors", icon: Truck, label: "Vendors" },
    { path: "reports", icon: TrendingUp, label: "Reports" },
    { path : "all_customer_bills", icon : FileText, label : "Customer Bills"},
    { path : "add_customer_bill", icon : Zap ,label : "Create New Bill"}
  ];

  const currentPath = location.pathname.replace("/", "");
  const currentPage = menuItems.find((item) => item.path === currentPath);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40  bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
        <img src="/logo4.png" alt="IMS Logo" className="w-16 h-16 rounded-full object-cover" />
          <h1 className="text-xl font-bold text-gray-900">IMS Pro</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden cursor-pointer hover:bg-blue-50"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-8">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => {
                setSidebarOpen(false);
              }}
              className={({ isActive }) =>
                `w-full flex items-center px-6 py-3 text-left transition-colors cursor-pointer
                ${
                  isActive
                    ? "bg-blue-50 text-blue-600 font-medium"
                    : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                }`
              }
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.label}
            </NavLink>
          ))}

          
        </nav>
        <div className="flex items-center px-6 py-4 space-x-2 border-b border-gray-200 lg:hidden">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
              {adminName ? adminName.charAt(0).toUpperCase() : "A"}
            </div>
            <span className="text-gray-700 font-medium">{adminName}</span>
          </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-3 md:px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden cursor-pointer"
            >
              <Menu className="h-6 w-6" />
            </button>
          <div className="flex items-center gap-2">
        <img src="/logo4.png" alt="IMS Logo" className="w-16 h-16 rounded-full object-cover" />
            <h2 className="text-lg font-semibold text-gray-900 capitalize">
              {currentPage ? currentPage.label : "Dashboard"}
            </h2>
          </div>

            <div className="md:flex items-center space-x-4 hidden">
              <div className="relative">
                <button
                  className="text-sm text-gray-500 cursor-pointer"
                  onClick={() => setShowCalendar(!showCalendar)}
                >
                  {new Date().toLocaleDateString("en-US", {
                    // weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </button>

                {showCalendar && (
                  <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg z-50">
                    <Calendar />
                  </div>
                )}

                {/* <span className="md:hidden">
                  {new Date().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span> */}
              </div>

              <div className="space-x-2 lg:flex items-center hidden">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                  {adminName ? adminName.charAt(0).toUpperCase() : "A"}
                </div>
                <span className="text-gray-700 font-medium">{adminName}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
