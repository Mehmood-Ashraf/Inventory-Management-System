import React, { useEffect, useState } from "react";

const ProductForm = ({formData, setFormData, handleSubmit, handleClose, selectedProduct}) => {
  //   const [formData, setFormData] = useState({
  //     productName: "",
  //     companyName: "",
  //     modelName: "",
  //     category: "",
  //     purchasePrice: "",
  //     sellPrice: "",
  //     quantity: "",
  //   });
  useEffect(() => {
    if (selectedProduct) {
      setFormData({
        productName: selectedProduct.productName || "",
        companyName: selectedProduct.companyName?.companyName || "",
        modelName: selectedProduct.modelName || "",
        category: selectedProduct.category?.categoryName || "",
        purchasePrice: selectedProduct.purchasePrice || "",
        sellPrice: selectedProduct.sellPrice || "",
        quantity: selectedProduct.quantity || "",
      });
    }
  }, [selectedProduct, setFormData]);

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
          Save
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
