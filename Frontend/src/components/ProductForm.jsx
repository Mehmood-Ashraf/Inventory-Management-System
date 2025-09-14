import React, { useState } from "react";

const ProductForm = ({formData, setFormData, handleSubmit, handleClose}) => {
  //   const [formData, setFormData] = useState({
  //     productName: "",
  //     companyName: "",
  //     modelName: "",
  //     category: "",
  //     purchasePrice: "",
  //     sellPrice: "",
  //     quantity: "",
  //   });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const renderInput = (label, name, value, type = "text") => (
    <div className="bg-zinc-200 rounded-xl p-4 shadow-inner">
      <h2 className="text-lg font-semibold text-zinc-500 mb-1">{label}</h2>
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        className="w-full bg-transparent text-xl font-medium focus:outline-none"
      />
    </div>
  );

  return (
    // <div className="flex items-center justify-center min-h-screen bg-white">
    //   <form
    //     onSubmit={(e) => {
    //       e.preventDefault();
    //       handleSubmit(formData);
    //     }}
    //     className="w-full max-w-lg bg-black text-white p-8 rounded-lg shadow-lg"
    //   >
    //     <h2 className="text-2xl font-bold mb-6 text-center">Add New Product</h2>

    //     {/* Product Name */}
    //     <div className="mb-4">
    //       <label className="block mb-2 font-semibold">Product Name</label>
    //       <input
    //         type="text"
    //         name="productName"
    //         value={formData.productName}
    //         onChange={handleChange}
    //         className="w-full p-2 rounded bg-white text-black border border-gray-300"
    //         placeholder="Enter product name"
    //         required
    //       />
    //     </div>

    //     {/* Company */}
    //     <div className="mb-4">
    //       <label className="block mb-2 font-semibold">Company</label>
    //       <input
    //         type="text"
    //         name="companyName"
    //         value={formData.companyName}
    //         onChange={handleChange}
    //         className="w-full p-2 rounded bg-white text-black border border-gray-300"
    //         placeholder="Enter company name"
    //       />
    //     </div>

    //     {/* Model Name */}
    //     <div className="mb-4">
    //       <label className="block mb-2 font-semibold">Model Name</label>
    //       <input
    //         type="text"
    //         name="modelName"
    //         value={formData.modelName}
    //         onChange={handleChange}
    //         className="w-full p-2 rounded bg-white text-black border border-gray-300"
    //         placeholder="Enter model name"
    //       />
    //     </div>

    //     {/* Category */}
    //     <div className="mb-4">
    //       <label className="block mb-2 font-semibold">Category</label>
    //       <input
    //         type="text"
    //         name="category"
    //         value={formData.category}
    //         onChange={handleChange}
    //         className="w-full p-2 rounded bg-white text-black border border-gray-300"
    //         placeholder="Enter category"
    //       />
    //     </div>

    //     {/* Purchase Price */}
    //     <div className="mb-4">
    //       <label className="block mb-2 font-semibold">Purchase Price</label>
    //       <input
    //         type="number"
    //         name="purchasePrice"
    //         value={formData.purchasePrice}
    //         onChange={handleChange}
    //         className="w-full p-2 rounded bg-white text-black border border-gray-300"
    //         placeholder="Enter purchase price"
    //         required
    //       />
    //     </div>

    //     {/* Sell Price */}
    //     <div className="mb-4">
    //       <label className="block mb-2 font-semibold">Sell Price</label>
    //       <input
    //         type="number"
    //         name="sellPrice"
    //         value={formData.sellPrice}
    //         onChange={handleChange}
    //         className="w-full p-2 rounded bg-white text-black border border-gray-300"
    //         placeholder="Enter sell price"
    //       />
    //     </div>

    //     {/* Quantity */}
    //     <div className="mb-4">
    //       <label className="block mb-2 font-semibold">Quantity</label>
    //       <input
    //         type="number"
    //         name="quantity"
    //         value={formData.quantity}
    //         onChange={handleChange}
    //         className="w-full p-2 rounded bg-white text-black border border-gray-300"
    //         placeholder="Enter quantity"
    //         min="0"
    //       />
    //     </div>

    //     {/* Buttons */}
    //     <div className="flex justify-between mt-6">
    //       <button
    //         type="button"
    //         className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
    //       >
    //         Cancel
    //       </button>
    //       <button
    //         type="submit"
    //         className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
    //         onClick={handleClose}
    //       >
    //         Save Product
    //       </button>
    //     </div>
    //   </form>
    // </div>
    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(formData); }}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {renderInput("Product Name", "productName", formData.productName)}
        {renderInput("Company Name", "companyName", formData.companyName)}
        {renderInput("Model Name", "modelName", formData.modelName)}
        {renderInput("Category", "category", formData.category)}
        {renderInput("Purchase Price", "purchasePrice", formData.purchasePrice, "number")}
        {renderInput("Sell Price", "sellPrice", formData.sellPrice, "number")}
        {renderInput("Quantity", "quantity", formData.quantity, "number")}
      </div>

      <div className="flex justify-end space-x-4 mt-6">
        <button
          type="button"
          onClick={handleClose}
          className="py-3 px-6 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full shadow-lg transition-colors duration-300 transform hover:scale-105"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full shadow-lg transition-colors duration-300 transform hover:scale-105"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
