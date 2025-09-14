import React from "react";
import Button from "./Button";

const ProductDetails = ({ product }) => {
  if (!product) return null; // agar product na ho to kuch render na ho

  const productName = product.productName || "";
  const quantity = product.quantity || 0;
  const companyName = product.companyName?.companyName || "";
  const category = product.category?.categoryName || "";
  const purchasePrice = product.purchasePrice || 0;
  const sellPrice = product.sellPrice || 0;

  const renderDetail = (label, value) => (
    <div className="bg-zinc-200 rounded-xl p-4 shadow-inner">
      <h2 className="text-lg font-semibold text-zinc-500 mb-1">{label}</h2>
      <p className="text-xl font-medium">
        {label.includes("Price") ? `PKR ${value.toFixed(2)}` : value}
      </p>
    </div>
  );

  return (
      <div className="w-full max-w-2xl bg-zinc-100 rounded-2xl shadow-2xl p-8 transform transition-transform duration-300 ">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Product Details
          </h1>
          <span className="text-sm font-semibold text-zinc-500">
            Inventory ID: {productName.slice(0, 3).toUpperCase()}-12345
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          {renderDetail("Product Name", productName)}
          {renderDetail("Quantity", quantity)}
          {renderDetail("Company Name", companyName)}
          {renderDetail("Category", category)}
          {renderDetail("Purchase Price", purchasePrice)}
          {renderDetail("Selling Price", sellPrice)}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end">
          <Button
          variant="danger"
          size="lg"
          >Delete</Button>
        </div>
      </div>
  );
};

export default ProductDetails;
