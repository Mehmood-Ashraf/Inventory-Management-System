import { useState } from "react";

export default function CreateInvoiceModal({ onClose }) {
  const [items, setItems] = useState([
    { name: "", qty: 1, rate: 0, discount: 0, amount: 0 },
  ]);

  // Amount update karne ka function
  const updateItem = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;

    // Auto calculate amount
    const qty = parseFloat(updatedItems[index].qty) || 0;
    const rate = parseFloat(updatedItems[index].rate) || 0;
    const discount = parseFloat(updatedItems[index].discount) || 0;
    const total = qty * rate;
    updatedItems[index].amount = total - (total * discount) / 100;

    setItems(updatedItems);
  };

  // New row add
  const addRow = () => {
    setItems([...items, { name: "", qty: 1, rate: 0, discount: 0, amount: 0 }]);
  };

  // Final total
  const finalTotal = items.reduce((sum, item) => sum + item.amount, 0);

//   if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-[800px]">
        <h2 className="text-xl font-bold mb-4">Create Invoice</h2>

        {/* Table Header */}
        <div className="flex font-semibold border-b pb-2">
          <div className="w-2/5">Item Name</div>
          <div className="w-1/5">Quantity</div>
          <div className="w-1/5">Rate</div>
          <div className="w-1/5">Discount (%)</div>
          <div className="w-1/5 text-right">Amount</div>
        </div>

        {/* Table Rows */}
        {items.map((item, index) => (
          <div key={index} className="flex gap-2 py-2 border-b">
            <input
              type="text"
              value={item.name}
              onChange={(e) => updateItem(index, "name", e.target.value)}
              className="w-2/5 border px-2 py-1"
              placeholder="Item Name"
            />
            <input
              type="number"
              value={item.qty}
              onChange={(e) => updateItem(index, "qty", e.target.value)}
              className="w-1/5 border px-2 py-1"
            />
            <input
              type="number"
              value={item.rate}
              onChange={(e) => updateItem(index, "rate", e.target.value)}
              className="w-1/5 border px-2 py-1"
            />
            <input
              type="number"
              value={item.discount}
              onChange={(e) => updateItem(index, "discount", e.target.value)}
              className="w-1/5 border px-2 py-1"
            />
            <div className="w-1/5 text-right px-2 py-1">
              {item.amount.toFixed(2)}
            </div>
          </div>
        ))}

        {/* Add Row Button */}
        <button
          onClick={addRow}
          className="mt-3 px-3 py-1 bg-green-500 text-white rounded"
        >
          + Add Item
        </button>

        {/* Final Total */}
        <div className="flex justify-end mt-4 text-lg font-bold">
          Final Total: Rs. {finalTotal.toFixed(2)}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 rounded text-white"
          >
            Cancel
          </button>
          <button className="px-4 py-2 bg-blue-600 rounded text-white">
            Save Invoice
          </button>
        </div>
      </div>
    </div>
  );
}
