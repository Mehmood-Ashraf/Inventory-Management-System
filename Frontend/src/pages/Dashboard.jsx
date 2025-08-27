import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Card from "../components/Dashboard/Card";
import { cardData, formattedCardData } from "../mockData/cardData";
import Button from "../components/Button";
import Table from "../components/Table";
const Dashboard = () => {
  const [hovered, setHovered] = useState(null)
  return (
    <div className="space-y-10">
      <div className="heading text-4xl font-semibold">Inventory Management</div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 items-center">
        {formattedCardData.map((card, index) => (
          <Card key={index} title={card.title} value={card.formattedValue} />
        ))}
      </div>

      <div className="flex gap-8">
        <Button variant={hovered ? "secondary" : "primary"}
        // onMouseEnter={() => setHovered("create")}
        // onMouseLeave={() => setHovered(null)}
        >Create Bill</Button>
        <Button variant={hovered === "btn2" ? "primary" : "secondary"}
        onMouseEnter={() => setHovered("btn2")}
        onMouseLeave={() => setHovered(null)}
        >Add Vendor Bill</Button>
        <Button variant={hovered === "btn3" ? "primary" : "secondary"}
        onMouseEnter={() => setHovered("btn3")}
        onMouseLeave={() => setHovered(null)}
        >Add Today's Expenses</Button>
        <Button variant={hovered === "btn4" ? "primary" : "secondary"}
        onMouseEnter={() => setHovered("btn4")}
        onMouseLeave={() => setHovered(null)}
        >Show Order List</Button>
      </div>

        <div>
          <h1>Transiction history</h1>
          {/* <Table /> */}
        </div>
      
    </div>
  );
};

export default Dashboard;
