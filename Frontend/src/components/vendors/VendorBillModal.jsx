import React, { useState } from "react";

const VendorBillModal = ({ isOpen, onClose, onSave }) => {
  const [vendorName, setVendorName] = useState("");
  const [billNumber, setBillNumber] = useState("");
  const [items, setItems] = useState([{ productName: "", quantity: 1, price: 0, total: 0 }]);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  // Item update handler
  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;

    // total = quantity * price
    if (field === "quantity" || field === "price") {
      newItems[index].total = newItems[index].quantity * newItems[index].price;
    }
    setItems(newItems);
  };

  // Add new item row
  const addItemRow = () => {
    setItems([...items, { productName: "", quantity: 1, price: 0, total: 0 }]);
  };

  // Remove item row
  const removeItemRow = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  // Calculate total amount
  const totalAmount = items.reduce((acc, item) => acc + item.total, 0);

  // Submit handler
  const handleSubmit = () => {
    const newBill = {
      vendorName,
      billNumber,
      items,
      totalAmount,
      date,
    };
    onSave(newBill); // parent me API call ke liye bhejenge
    onClose(); // modal close
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-3/4 p-6 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Add Vendor Bill</h2>

        {/* Vendor Name */}
        <input
          type="text"
          placeholder="Vendor Name"
          value={vendorName}
          onChange={(e) => setVendorName(e.target.value)}
          className="w-full p-2 border mb-3 rounded"
        />

        {/* Bill Number */}
        <input
          type="number"
          placeholder="Bill Number"
          value={billNumber}
          onChange={(e) => setBillNumber(e.target.value)}
          className="w-full p-2 border mb-3 rounded"
        />

        {/* Date */}
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 border mb-3 rounded"
        />

        {/* Items Section */}
        <h3 className="font-semibold mb-2">Items</h3>
        {items.map((item, index) => (
          <div key={index} className="grid grid-cols-5 gap-2 mb-2">
            <input
              type="text"
              placeholder="Product Name"
              value={item.productName}
              onChange={(e) => handleItemChange(index, "productName", e.target.value)}
              className="p-2 border rounded"
            />
            <input
              type="number"
              placeholder="Quantity"
              value={item.quantity}
              onChange={(e) => handleItemChange(index, "quantity", Number(e.target.value))}
              className="p-2 border rounded"
            />
            <input
              type="number"
              placeholder="Price"
              value={item.price}
              onChange={(e) => handleItemChange(index, "price", Number(e.target.value))}
              className="p-2 border rounded"
            />
            <input
              type="number"
              value={item.total}
              readOnly
              className="p-2 border rounded bg-gray-100"
            />
            <button
              onClick={() => removeItemRow(index)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              X
            </button>
          </div>
        ))}
        <button onClick={addItemRow} className="bg-blue-500 text-white px-3 py-1 rounded mb-4">
          + Add Item
        </button>

        {/* Total */}
        <div className="font-bold text-lg mb-4">Total: {totalAmount}</div>

        {/* Buttons */}
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded">
            Cancel
          </button>
          <button onClick={handleSubmit} className="bg-green-600 text-white px-4 py-2 rounded">
            Save Bill
          </button>
        </div>
      </div>
    </div>
  );
};

export default VendorBillModal;
