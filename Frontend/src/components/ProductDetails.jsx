import React, { useState } from 'react';

// Main App component to render the product detail page
const ProductDetails = () => {
  // Use individual state variables for each product detail to allow for editing
  const [productName, setProductName] = useState("Wireless Mechanical Keyboard");
  const [quantity, setQuantity] = useState(150);
  const [companyName, setCompanyName] = useState("TechCorp Inc.");
  const [category, setCategory] = useState("Electronics");
  const [purchasePrice, setPurchasePrice] = useState(75.00);
  const [sellPrice, setSellPrice] = useState(129.99);
  
  // State to toggle between view and edit modes
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');

  // Function to handle clicking the "Update Details" button
  const handleUpdateDetails = () => {
    setIsEditing(true);
    setMessage('');
  };

  // Function to save the changes (simulated)
  const handleSave = () => {
    // In a real application, you would send this data to an API
    console.log("Saving changes:", {
      productName,
      quantity,
      companyName,
      category,
      purchasePrice,
      sellPrice,
    });
    setMessage('Product details updated successfully!');
    setIsEditing(false);
  };

  // Function to cancel the editing and revert to original values
  const handleCancel = () => {
    setIsEditing(false);
    // You could also add logic to revert the state to its initial values if needed
    setMessage('Update canceled.');
  };
  
  // Conditionally render the input fields or static text based on isEditing state
  const renderDetail = (label, value, setValue) => (
    <div className="bg-zinc-200 rounded-xl p-4 shadow-inner">
      <h2 className="text-lg font-semibold text-zinc-500 mb-1">{label}</h2>
      {isEditing ? (
        <input
          type={label.includes('Price') || label.includes('Quantity') ? "number" : "text"}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full bg-transparent text-xl font-medium focus:outline-none"
        />
      ) : (
        <p className="text-xl font-medium">
          {label.includes('Price') ? `$${value.toFixed(2)}` : value}
        </p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 text-zinc-900 font-sans">
      <div className="w-full max-w-2xl bg-zinc-100 rounded-2xl shadow-2xl p-8 transform transition-transform duration-300 hover:scale-[1.01]">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Product Details</h1>
          <span className="text-sm font-semibold text-zinc-500">Inventory ID: {productName.slice(0, 3).toUpperCase()}-12345</span>
        </div>

        {/* Message box for success/error messages */}
        {message && (
          <div className={`p-4 mb-4 rounded-xl text-center font-semibold ${message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message}
          </div>
        )}

        {/* Product Information Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          {renderDetail("Product Name", productName, setProductName)}
          {renderDetail("Quantity", quantity, setQuantity)}
          {renderDetail("Company Name", companyName, setCompanyName)}
          {renderDetail("Category", category, setCategory)}
          {renderDetail("Purchase Price", purchasePrice, setPurchasePrice)}
          {renderDetail("Selling Price", sellPrice, setSellPrice)}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between sm:justify-end space-x-4">
          {isEditing ? (
            <>
              <button onClick={handleSave} className="flex-1 sm:flex-none py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full shadow-lg transition-colors duration-300 transform hover:scale-105">
                Save Changes
              </button>
              <button onClick={handleCancel} className="flex-1 sm:flex-none py-3 px-6 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full shadow-lg transition-colors duration-300 transform hover:scale-105">
                Cancel
              </button>
            </>
          ) : (
            <>
              <button onClick={handleUpdateDetails} className="flex-1 sm:flex-none py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full shadow-lg transition-colors duration-300 transform hover:scale-105">
                Update Details
              </button>
              <button className="flex-1 sm:flex-none py-3 px-6 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full shadow-lg transition-colors duration-300 transform hover:scale-105">
                Delete Product
              </button>
            </>
          )}
        </div>
        
      </div>
    </div>
  );
};

export default ProductDetails;
