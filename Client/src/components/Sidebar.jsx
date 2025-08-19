import { Home, FileText, Users, Settings } from "lucide-react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col p-4 h-dvh">
      <h1 className="text-2xl font-bold mb-8">InvoicePro</h1>
      <nav className="flex flex-col gap-4">
        <Link to="/" className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded">
          <Home size={20} /> Dashboard
        </Link>
        <Link to="#" className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded">
          <FileText size={20} /> Invoices
        </Link>
        <Link to="#" className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded">
          <Users size={20} /> Customers
        </Link>
        <Link to="#" className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded">
          <Settings size={20} /> Settings
        </Link>
      </nav>
    </div>
  );
}
