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

export const useCustomersBills = () => {
  const [addCustomerBillModal, setAddCustomerBillModal] = useState(false);
  const [showBillDetailsModal, setShowBillDetailsModal] = useState(false);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    customerType: "",
    customerName: "",
    billNumber: "",
    contact: "",
    city: "",
    date : "",
    items: [{ product: "", quantity: "", price: "", total: "" }],
  });

  const navigate = useNavigate();

  const handleCloseModal = () => {
    setAddCustomerBillModal(false);
  };

  const deleteCustomerBillHander = async (billId) => {
    try {
      await dispatch(deleteCustomerBill(billId)).unwrap();
      toast.success("Customer bill deleted Successfully");
      await dispatch(fetchAllCustomerBills()).unwrap();
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
      contact: "",
      city: "",
      contact: "",
      date : "",
      items: [{ product: "", quantity: "", price: "", total: "" }],
    });
  };

  const handleAddCustomerBill = (billDetails) => {
    try {
      console.log(billDetails)
      dispatch(addCustomerBill(billDetails));
      toast.success("Bill Added Successfully");
      resetBillForm();
      setTimeout(() => {
        navigate("/all_customer_bills");
      }, 2000);
    } catch (error) {
      toast.error(error?.message, "Error while adding bill");
    }
  };

  return {
    addCustomerBillModal,
    setAddCustomerBillModal,
    formData,
    setFormData,
    handleCloseModal,
    deleteCustomerBillHander,
    billDetailsHandler,
    showBillDetailsModal,
    setShowBillDetailsModal,
    handleCloseBillDetailModal,
    handleAddCustomerBill,
  };
};
