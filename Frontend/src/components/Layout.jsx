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
} from "lucide-react";
import { Outlet, NavLink } from "react-router-dom";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { path: "dashboard", icon: BarChart3, label: "Dashboard" },
    { path: "inventory", icon: Package, label: "Inventory" },
    { path: "customers", icon: Users, label: "Customers" },
    { path: "all_vendor_bills", icon: FileText, label: "Vendor Bills" },
    { path: "vendors", icon: Truck, label: "Vendors" },
    { path: "reports", icon: TrendingUp, label: "Reports" },
  ];

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
          <h1 className="text-xl font-bold text-gray-900">InventoryPro</h1>
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
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden cursor-pointer"
            >
              <Menu className="h-6 w-6" />
            </button>

            <h2 className="text-lg font-semibold text-gray-900 capitalize">
              Dashboard
            </h2>

            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">
                <span className="hidden md:inline">
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>

                <span className="md:hidden">
                  {new Date().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
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
