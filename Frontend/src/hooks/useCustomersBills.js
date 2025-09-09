import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  deleteCustomerBill,
  fetchAllCustomerBills,
  fetchSingleBill,
  resetSingleBill,
} from "../redux/slice/customerBillSlice";

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
    contact: "",
    items: [],
  });

  const handleCloseModal = () => {
    setAddCustomerBillModal(false);
  };

  const deleteCustomerBillHander = async (billId) => {
    try {
      await dispatch(deleteCustomerBill(billId)).unwrap();
      toast.success("Customer bill delted Successfully");
      await dispatch(fetchAllCustomerBills()).unwrap();
    } catch (error) {
      toast.error("Error in delete Customer Bill", error?.message);
    }
  };

  const billDetailsHandler = async (billId) => {
    try {
      const singlebill = await dispatch(fetchSingleBill(billId)).unwrap();
      console.log(singlebill)
      console.log(billId)
        setShowBillDetailsModal(true);
        toast.success("Bill details fetched successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleCloseDetailModal = () => {
    dispatch(resetSingleBill())
    setShowBillDetailsModal(false)
  }

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
    handleCloseDetailModal
  };
};
