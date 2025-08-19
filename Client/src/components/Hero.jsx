import { useState } from 'react';
import Card from './Card'
import CreateInvoiceModal from './CreateInvoiceModal';

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-4">
      {/* Search Bar */}
      <div className="mb-6 flex gap-2">
        <input
          type="text"
          placeholder="Search customer..."
          className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer">
          Search
        </button>
      </div>

      {/* Stats Cards */}
      <div className="flex flex-wrap gap-4">
        <Card title="Total Sale (Ongoing Month)" value="Rs. 250,000" />
        <Card title="Today Cash Sale" value="Rs. 15,000" />
        <Card title="Today Received Credit" value="Rs. 8,000" />
        <Card title="Total Receivable" value="Rs. 40,000" />
        <Card title="Total Payable" value="Rs. 20,000" />
        <Card title="Yearly Sale" value="Rs. 3,200,000" />
        <Card title="Add Item" value="+" isButton />
        <Card title="Create Invoice" value="+" isButton onclick={() => setIsModalOpen(true)} />
      </div>

      {isModalOpen && <CreateInvoiceModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}


