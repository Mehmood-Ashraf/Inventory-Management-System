import React, { useEffect, useState } from "react";
import Card from "../components/Dashboard/Card";
import { formattedCardData } from "../mockData/cardData";
import Button from "../components/Button";
import Table from "../components/Table";
import Card1 from "../components/Card";
import { Zap } from "lucide-react";
import LowStockAlert from "../components/Dashboard/LowStockAlert";
import { useCustomersBills } from "../hooks/useCustomersBills";
import Modal from "../components/Modal";
import BillForm from "../components/BillForm";
import { customerBillsInputs } from "../formSource";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearSingleCustomer } from "../redux/slice/customersSlice";

const Dashboard = () => {
  const [hovered, setHovered] = useState(null);
  const navigate = useNavigate()
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearSingleCustomer())
  }, [dispatch])

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
              onClick={() => navigate("/add_customer_bill")}
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


      {/* {
        addCustomerBillModal && 
        <Modal
        title={"Create Bill"}
        onClose={() => setAddCustomerBillModal(false)}
        >
          <BillForm
          inputsData={customerBillsInputs}
          formData={formData}
          setFormData={setFormData}
          submitLabel={"Seve Bill"}
          handleClose={handleCloseModal}
          />

        </Modal>
      } */}
    </div>
  );
};

export default Dashboard;
