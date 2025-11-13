import React, { useState } from "react";

const ProductInput = ({ value, onChange, allProducts, onSelect }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    onChange({ target : { name : "productName", value }});
    if (value.length > 2) {
      const matches = allProducts.filter((product) =>
        product.productName.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(matches);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  const handleSelect = (product) => {
    onSelect({product : product.productName, productName : product.productName, sellPrice : product.sellPrice});
    setShowDropdown(false);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={value || ""}
        onChange={handleChange}
        placeholder="Product"
        className="border px-3 py-2 rounded-lg w-full"
      />
      {showDropdown && suggestions.length > 0 && (
        <ul className="absolute top-full left-0 w-full bg-white border rounded-lg shadow-lg z-10 max-h-40 overflow-auto">
          {suggestions.map((p) => (
            <li
              key={p._id}
              onClick={() => handleSelect(p)}
              className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
            >
              {p.productName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductInput;
