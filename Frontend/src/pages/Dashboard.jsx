import React, { useEffect, useState } from "react";
import Card from "../components/Dashboard/Card";
import { dashboardCardData, formattedCardData } from "../mockData/cardData";
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
import { useDispatch, useSelector } from "react-redux";
import { clearSingleCustomer } from "../redux/slice/customersSlice";
import { fetchLowStockProducts } from "../redux/slice/productSlice";
import { fetchTodaySale } from "../redux/slice/salesSlice";
import useProducts from "../hooks/useProducts";
import ProductForm from "../components/ProductForm";
import usePayment from "../hooks/usePayment";
import AddPaymentModal from "../components/payments/AddPaymentModal";

const Dashboard = () => {
  const [hovered, setHovered] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { todaySale, loading, error} = useSelector((state) => state.sales);
  const {showProductForm, setShowProductForm, formData, setFormData, handleCloseProductForm, handleSubmit} = useProducts()
  const {showAddPaymentModal, setShowAddPaymentModal, paymentFormData, setPaymentFormData, handleClose, handleFormSubmit} = usePayment();

  const cardsWithFetch = dashboardCardData.map((card) => {
    if (card.title === "Todays's Sale") {
      return {
        ...card,
        onFetch: async () => {
          const res = await dispatch(fetchTodaySale()).unwrap();
          return `PKR ${res?.data?.todaysSale.toLocaleString("en-US")}`;
        },
      };
    }
    return card;
  });

  useEffect(() => {
    dispatch(clearSingleCustomer());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchLowStockProducts());

    const interval = setInterval(() => {
      dispatch(fetchLowStockProducts());
    }, 3600000); //1 hour

    return clearInterval(interval);
  }, [dispatch]);

  return (
    <div className="space-y-10">
      <div className="flex items-center space-x-3">
        <div className=" text-2xl sm:text-4xl text-center font-semibold">
          Inventory Management System
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-8 items-center">
        {cardsWithFetch.map((card, index) => (
          <Card key={index} title={card.title} onFetch={card.onFetch} />
        ))}
      </div>

      <div className="flex md:flex-row flex-col gap-8 w-full justify-between">

        <Card1
          title={"Quick Actions"}
          subtitle={"Common tasks and shortcuts"}
          className="md:w-1/3"
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
              onClick={() => setShowAddPaymentModal(true)}
            >
              Add Payment
            </Button>
            <Button
              variant={hovered === "btn4" ? "primary" : "secondary"}
              onMouseEnter={() => setHovered("btn4")}
              onMouseLeave={() => setHovered(null)}
              onClick={() => setShowProductForm(true)}
            >
              Add Product
            </Button>
            <Button
              variant={hovered === "btn5" ? "primary" : "secondary"}
              onMouseEnter={() => setHovered("btn5")}
              onMouseLeave={() => setHovered(null)}
            >
              Show Order List
            </Button>
          </div>
        </Card1>


        <div className="md:w-3/4 w-full">
          <LowStockAlert />
        </div>

      </div>

      <div>
        <Table
          title={"Recent Transactions"}
          subTitle={"Record of your recent transactions"}
          type={"bill"}
        />
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

      {showProductForm && (
        <Modal title={"Add Product"} onClose={handleCloseProductForm}>
          <ProductForm
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
            handleClose={handleCloseProductForm}
          />
        </Modal>
      )}

      {showAddPaymentModal && (
        <AddPaymentModal
        setShowAddPaymentModal={setShowAddPaymentModal}
        paymentData={paymentFormData}
        setPaymentData={setPaymentFormData}
        handleClose={handleClose}
        handleSubmit={handleFormSubmit}
        />
      )}
    </div>
  );
};

export default Dashboard;
