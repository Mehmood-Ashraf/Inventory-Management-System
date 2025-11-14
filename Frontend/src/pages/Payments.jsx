import React, { useEffect, useMemo, useState } from "react";
import SearchInput from "../components/SearchInput";
import Button from "../components/Button";
import { Plus, Wallet } from "lucide-react";
import { useSelector } from "react-redux";
import { paymentsCardsData } from "../mockData/cardData";
import Tabs from "../components/Tabs";
import Table from "../components/Table";
import AddPaymentModal from "../components/payments/AddPaymentModal";
import usePayment from "../hooks/usePayment";
import { Loader } from "../components/Loader";

const Payments = () => {
  const [searchInput, setSearchInput] = useState("");
  const [activeTab, setActiveTab] = useState("All Payments");
  const {
    paymentFormData,
    setPaymentFormData,
    setShowAddPaymentModal,
    showAddPaymentModal,
    handleClose,
    handleFormSubmit,
    fetchCustomerPayments,
    getAllPayments,
    handleLoadMore,
    deletePaymentHandler,
    openEditPaymentHandler,
    resetForm,
    setIsEditMode,
    isEditMode,
    updateCustomerPaymentHandler,
  } = usePayment();

  const {
    allPayments,
    customerPayments,
    vendorPayments,
    singleCustomerPayment,
    singleVendorPayment,
    loading,
    error,
  } = useSelector((state) => state.payment);

  const AllPaymentsCardsData = useMemo(
    () => paymentsCardsData(customerPayments, vendorPayments),
    [customerPayments, vendorPayments]
  );

  const tabsData = ["All Payments", "Customer Payments", "Vendor Payments"];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };

  const paymentListHeaders = useMemo(() => {
    if (activeTab === "Vendor Payments") {
      return [
        { key: "date", label: "Date", render: (row) => formatDate(row.date) },
        { key: "vendorName", label: "Vendor Name" },
        { key: "method", label: "Method" },
        { key: "amount", label: "Amount" },
      ];
    }

    if (activeTab === "All Payments") {
      return [
        { key: "date", label: "Date", render: (row) => formatDate(row.date) },
        { key: "name", label: "Name" }, // aap mapping me condition laga sakte ho
        { key: "method", label: "Method" },
        { key: "amount", label: "Amount" },
      ];
    }

    // default (All + Customer)
    return [
      { key: "date", label: "Date", render: (row) => formatDate(row.date) },
      { key: "customerName", label: "Customer Name" },
      { key: "method", label: "Method" },
      { key: "amount", label: "Amount" },
    ];
  }, [activeTab]);

  const filteredPayments = useMemo(() => {
    let data = [];

    if (activeTab === "All Payments") {
      data = allPayments || [];
    } else if (activeTab === "Customer Payments") {
      data = customerPayments || [];
    } else if (activeTab === "Vendor Payments") {
      data = vendorPayments || [];
    }

    if (searchInput.trim()) {
      data = data?.filter(
        (p) =>
          p.customerName?.toLowerCase().includes(searchInput.toLowerCase()) ||
          p.vendorName
            ?.toLowerCase()
            .includes(searchInput?.toLocaleLowerCase()) ||
          p.name?.toLowerCase().includes(searchInput.toLowerCase())
      );
    }

    return data || [];
  }, [activeTab, searchInput, allPayments, customerPayments, vendorPayments]);

  useEffect(() => {
    if (activeTab === "Customer Payments") {
      fetchCustomerPayments(searchInput || "");
    } else if (activeTab === "Vendor Payments") {
      // fetchVendorPayments(searchInput);
    } else if (activeTab === "All Payments") {
      getAllPayments(searchInput);
    }
  }, [searchInput, activeTab]);

  return (
    <div className="space-y-6">
      {/* searchbar and input */}
      <div className="flex justify-between items-center gap-4">
        <SearchInput
          placeholder={"Search Payments....."}
          value={searchInput}
          onChange={setSearchInput}
        />

        <Button
          onClick={() => {
            resetForm();
            setIsEditMode(false);
            setShowAddPaymentModal(true);
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Payment
        </Button>
      </div>

      {/* cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
        {loading ? (
          <div className="col-span-2 flex justify-center">
            <Loader /> {/* ya koi spinning animation */}
          </div>
        ) : (
          AllPaymentsCardsData.map((item, index) => (
            // <Card key={index} title={item.title} value={item.value} />
            <div
              key={index}
              className="border-1 border-black bg-white shadow-md rounded-2xl p-4"
            >
              <h1 className="text-lg font-semibold text-gray-900">
                {item.title}
              </h1>
              <p className="text-2xl font-bold text-gray-700">{item.value}</p>
            </div>
          ))
        )}
      </div>

      <Tabs tabs={tabsData} onChange={setActiveTab} />

      <div>
        <Table
          title={"Payments"}
          subTitle={
            "Easily track vendor & customer payments with complete details."
          }
          Icon={Wallet}
          type={"Payment"}
          headers={paymentListHeaders}
          data={filteredPayments}
          showActions={true}
          loadMore={handleLoadMore}
          onDelete={deletePaymentHandler}
          onEdit={(payment) => openEditPaymentHandler(payment)}
        />
      </div>

      {showAddPaymentModal && (
        <AddPaymentModal
          setShowAddPaymentModal={setShowAddPaymentModal}
          paymentData={paymentFormData}
          setPaymentData={setPaymentFormData}
          handleClose={handleClose}
          handleSubmit={handleFormSubmit}
          isEditMode={isEditMode}
          updateCustomerPaymentHandler={updateCustomerPaymentHandler}
        />
      )}
    </div>
  );
};

export default Payments;
