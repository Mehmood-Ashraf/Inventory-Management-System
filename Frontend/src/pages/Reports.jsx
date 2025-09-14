import React from "react";
import { Clock } from "lucide-react";

const Reports = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <Clock className="w-16 h-16 text-gray-600 animate-pulse" />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Coming Soon</h1>
        <p className="text-gray-600 text-lg">
          The Reports page is under development. Please check back later!
        </p>
      </div>
    </div>
  );
};

export default Reports;
