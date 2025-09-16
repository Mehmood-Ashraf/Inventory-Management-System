import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";

const Card = ({ title, onFetch }) => {
  const [showValue, setShowValue] = useState(false);
  const [fetchedValue, setFetchedValue] = useState("••••••");

  const handleToggle = async () => {
    if(!showValue && onFetch){
      const newValue = await onFetch()
      setFetchedValue(newValue)
    }
    setShowValue(!showValue)
  }

  return (
    <div className="border-1 border-black bg-white shadow-md rounded-2xl p-1 sm:p-4 max-h-full min-h-[80px]">
      <h1 className="text-sm sm:text-lg font-semibold sm:text-left text-center text-gray-900 whitespace-nowrap">{title}</h1>

      <div className="flex items-center justify-between mt-2">
        <p className="sm:text-2xl text-sm sm:text-left text-center font-bold text-gray-700">
          {showValue ? fetchedValue : "••••••"}
        </p>
        <button onClick={handleToggle} className="cursor-pointer">
          {showValue ? <EyeOff className="sm:w-5 sm:h-5 w-3 h-3 text-gray-600" /> : <Eye className="sm:w-5 sm:h-5 w-3 h-3 text-gray-600" />}  
        </button>
      </div>
    </div>
  );
};

export default Card;