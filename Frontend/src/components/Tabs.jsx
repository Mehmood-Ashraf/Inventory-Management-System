import React, { useState } from "react";
import Button from "../components/Button";

const Tabs = ({ tabs = [], onChange }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]); // by default first tab

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (onChange) onChange(tab);
  };

  return (
    <div className="w-full bg-gray-200 p-2 rounded-2xl flex justify-between">
      {tabs.map((tab) => (
        <Button
          key={tab}
          variant="tab"
          size="lg"
          className={`!py-1 ${
            activeTab === tab ? "bg-white text-gray-900" : "bg-gray-200"
          }`}
          onClick={() => handleTabClick(tab)}
        >
          {tab}
        </Button>
      ))}
    </div>
  );
};

export default Tabs;
