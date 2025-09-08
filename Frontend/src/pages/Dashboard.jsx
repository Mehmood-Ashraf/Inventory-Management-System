import React, { useState } from "react";
import Card from "../components/Dashboard/Card";
import { formattedCardData } from "../mockData/cardData";
import Button from "../components/Button";
import Table from "../components/Table";
import Card1 from "../components/Card";
import { Zap } from "lucide-react";
import LowStockAlert from "../components/Dashboard/LowStockAlert";

const Dashboard = () => {
  const [hovered, setHovered] = useState(null);
  return (
    <div className="space-y-10">
      <div className="heading text-4xl font-semibold">Inventory Management</div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 items-center">
        {formattedCardData.map((card, index) => (
          <Card key={index} title={card.title} value={card.formattedValue} />
        ))}
      </div>

      <div className="flex gap-8 w-full flex-col lg:flex-row justify-between">
        <div className="w-3/4">
          <LowStockAlert />
        </div>

        <Card1
          title={"Quick Actions"}
          subtitle={"Common tasks and shortcuts"}
          className="lg:w-1/3"
          icon={Zap}
        >
          <div className="flex flex-col gap-3">
            <Button
              variant={hovered ? "secondary" : "primary"}
              // onMouseEnter={() => setHovered("create")}
              // onMouseLeave={() => setHovered(null)}
            >
              Create Bill
            </Button>
            <Button
              variant={hovered === "btn2" ? "primary" : "secondary"}
              onMouseEnter={() => setHovered("btn2")}
              onMouseLeave={() => setHovered(null)}
            >
              Add Vendor Bill
            </Button>
            <Button
              variant={hovered === "btn3" ? "primary" : "secondary"}
              onMouseEnter={() => setHovered("btn3")}
              onMouseLeave={() => setHovered(null)}
            >
              Add Today's Expenses
            </Button>
            <Button
              variant={hovered === "btn4" ? "primary" : "secondary"}
              onMouseEnter={() => setHovered("btn4")}
              onMouseLeave={() => setHovered(null)}
            >
              Show Order List
            </Button>
          </div>
        </Card1>
      </div>

      <div>
        <Table title={"Recent Transactions"} subTitle={"Record of your recent transactions"}/>
      </div>
    </div>
  );
};

export default Dashboard;
