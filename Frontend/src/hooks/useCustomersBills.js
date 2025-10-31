import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  addCustomerBill,
  deleteCustomerBill,
  fetchAllCustomerBills,
  fetchSingleBill,
  resetSingleBill,
} from "../redux/slice/customerBillSlice";
import { useNavigate } from "react-router-dom";
import {fetchSingleCustomer} from "../redux/slice/customersSlice"

export const useCustomersBills = () => {
  const [addCustomerBillModal, setAddCustomerBillModal] = useState(false);
  const [showBillDetailsModal, setShowBillDetailsModal] = useState(false);
  const dispatch = useDispatch();
  const { page, limit, total, allCustomerBills } = useSelector(
    (state) => state.customerBills
  );
  const now = new Date();
  const pakistanOffset = 5 * 60 * 60 * 1000; // Pakistan +5 hours
  const pakistanDate = new Date(now.getTime() + pakistanOffset)
    .toISOString()
    .split("T")[0];
    
  const [formData, setFormData] = useState({
    customerType: "",
    customerName: "",
    billNumber: "",
    paymentType: "",
    contact: "",
    city: "",
    // date: new Date().toISOString().split("T")[0],
    date: pakistanDate,
    items: [{ product: "", quantity: "", price: "", total: "" }],
  });

  const navigate = useNavigate();

  const handleCloseModal = () => {
    setAddCustomerBillModal(false);
  };

  const handleCloseAddBill = () => {
    navigate("/dashboard");
    resetBillForm();
  };

  const deleteCustomerBillHandler = async (billId, customerId = null) => {
    try {
      await dispatch(deleteCustomerBill(billId)).unwrap();
      toast.success("Customer bill deleted Successfully");
      if(customerId){
        await dispatch(fetchSingleCustomer(customerId)).unwrap();
      }else {
        await dispatch(fetchAllCustomerBills()).unwrap();
      }
    } catch (error) {
      toast.error("Error in delete Customer Bill", error?.message);
    }
  };

  const billDetailsHandler = async (billId) => {
    try {
      const singlebill = await dispatch(fetchSingleBill(billId)).unwrap();
      console.log(singlebill);
      console.log(billId);
      setShowBillDetailsModal(true);
      toast.success("Bill details fetched successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleCloseBillDetailModal = () => {
    dispatch(resetSingleBill());
    setShowBillDetailsModal(false);
  };

  const resetBillForm = () => {
    setFormData({
      customerType: "",
      customerName: "",
      billNumber: "",
      paymentType: "",
      contact: "",
      city: "",
      contact: "",
      date: "",
      items: [{ product: "", quantity: "", price: "", total: "" }],
    });
  };

  const handleAddCustomerBill = async (billDetails) => {
    try {
      const newBill = await dispatch(addCustomerBill(billDetails)).unwrap();
      if (newBill) {
        toast.success("Bill Added Successfully");
      }
      resetBillForm();
      setTimeout(() => {
        navigate("/all_customer_bills");
      }, 2000);
    } catch (error) {
      toast.error(error?.message || "Error while adding bill");
    }
  };

  const handleLoadMore = async () => {
    const hasMore = allCustomerBills.length < total;
    if (!hasMore) {
      toast.info("No more bills to load");
      return;
    }
    try {
      await dispatch(fetchAllCustomerBills({ page: page + 1, limit })).unwrap();
    } catch (error) {
      toast.error("Failed to laod more bills");
    }
  };

  return {
    addCustomerBillModal,
    setAddCustomerBillModal,
    formData,
    setFormData,
    handleCloseModal,
    deleteCustomerBillHandler,
    billDetailsHandler,
    showBillDetailsModal,
    setShowBillDetailsModal,
    handleCloseBillDetailModal,
    handleAddCustomerBill,
    handleCloseAddBill,
    handleLoadMore,
  };
};
