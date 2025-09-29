import React, { useEffect, useState } from "react";
import SearchInput from "../components/SearchInput";
import { FileText, Plus } from "lucide-react";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllCustomerBills,
  fetchSingleCustomerBills,
} from "../redux/slice/customerBillSlice";
import Table from "../components/Table";
import { useCustomersBills } from "../hooks/useCustomersBills";
import Modal from "../components/Modal";
import BillForm from "../components/BillForm";
import { customerBillsInputs } from "../formSource";
import Card from "../components/Dashboard/Card";
import { customerBillsCardData } from "../mockData/cardData";
import { toast } from "react-toastify";
import BillDetailsModal from "../components/BillDetailsModal";
import { useLocation, useNavigate } from "react-router-dom";

const AllCustomerBills = () => {
  const [searchInput, setSearchInput] = useState("");
  const dispatch = useDispatch();
  const { allCustomerBills, singleBill, singleCustomerBills, loading } =
    useSelector((state) => state.customerBills);
  const location = useLocation();
  const customerId = location.state?.customerId;
  const navigate = useNavigate();
  const {
    addCustomerBillModal,
    setAddCustomerBillModal,
    formData,
    setFormData,
    handleCloseModal,
    deleteCustomerBillHander,
    showBillDetailsModal,
    setShowBillDetailsModal,
    billDetailsHandler,
    handleCloseBillDetailModal,
    addCustomerBill,
    handleLoadMore
  } = useCustomersBills();

  const customerBillsListHeaders = [
    { key: "date", label: "Date" },
    { key: "customerName", label: "Customer Name" },
    { key: "billNumber", label: "Bill No" },
    { key: "totalAmount", label: "Amount" },
  ];

  const billsToShow =
    singleCustomerBills?.length > 0 ? singleCustomerBills : allCustomerBills;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };

  const filteredBills =
    searchInput.trim === ""
      ? billsToShow
      : billsToShow.filter((bill) => {
          const search = searchInput.toLowerCase();
          return (
            bill.customerName?.toLowerCase().includes(search) ||
            bill.billNumber?.toString().includes(search)
          );
        });

  useEffect(() => {
    if (customerId) {
      dispatch(fetchSingleCustomerBills(customerId));
    } else {
      dispatch(fetchAllCustomerBills({ page : 1, limit : 10}));
    }
  }, [customerId, dispatch]);

  const formattedBills = filteredBills?.map((bill) => ({
    ...bill,
    date: formatDate(bill.date),
  }));

  const billsCardsData = customerBillsCardData(billsToShow);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center gap-4">
        <SearchInput
          placeholder={"Search Bill......"}
          value={searchInput}
          onChange={setSearchInput}
        />

        <Button onClick={() => navigate("/add_customer_bill")}>
          <Plus className="h-4 w-4 mr-2" />
          Add Bill
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
        {billsCardsData?.map((item, index) => (
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
        ))}
      </div>

      <div>
        {formattedBills && (
          <Table
            title={"All Customers Bills"}
            subTitle={
              "Easily track customers bills information and Bill details."
            }
            Icon={FileText}
            data={formattedBills}
            headers={customerBillsListHeaders}
            showActions={true}
            loading={loading}
            onDelete={deleteCustomerBillHander}
            onView={billDetailsHandler}
            type={"Bill"}
            loadMore={handleLoadMore}
          />
        )}
      </div>

      
      {showBillDetailsModal && (
        <Modal
          title={"Customer Bill Details"}
          onClose={handleCloseBillDetailModal}
        >
          <BillDetailsModal type={"customer"} selectedBill={singleBill} />
        </Modal>
      )}
    </div>
  );
};

export default AllCustomerBills;