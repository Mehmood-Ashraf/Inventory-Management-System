import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";

const Card = ({ title, value }) => {
  const [showValue, setShowValue] = useState(false)
  return (
    <div className="border-1 border-black bg-white shadow-md rounded-2xl p-4 max-w-xs">
      <h1 className="text-lg font-semibold text-gray-900">{title}</h1>

      <div className="flex items-center justify-between mt-2">
        <p className="text-2xl font-bold text-gray-700">
          {showValue ? value.toLocaleString("en-US", {
            style: "currency",
            currency: "PKR",
          }) : "PKR ••••••"}
        </p>
        <button onClick={() => setShowValue(!showValue)} className="cursor-pointer">
          {showValue ? <EyeOff className="w-5 h-5 text-gray-600" /> : <Eye className="w-5 h-5 text-gray-600" />}
        </button>
      </div>
    </div>
  );
};

export default Card;
