import { useState } from "react";
import { useDispatch } from "react-redux";
import { addCustomerPayment, fetchAllCustomerPayments, fetchAllPayments } from "../redux/slice/paymentSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const usePayment = () => {
  const [showAddPaymentModal, setShowAddPaymentModal] = useState(false);
  const dispatch = useDispatch();
  const navigate =  useNavigate();
  const [paymentFormData, setPaymentFormData] = useState({
    type: "customer",
    customerName: "",
    vendorName: "",
    amount: "",
    method: "",
    date: new Date().toISOString().split("T")[0],
    note: "",
  });

  const fetchCustomerPayments = async (name) => {
    try {
      const res = await dispatch(fetchAllCustomerPayments(name)).unwrap()
      return res
    } catch (error) {
        return toast.error(error?.message,"Error Fetching Customer Payments")
    }
  };

  const getAllPayments = async (searchInput) => {
    try {
      const res = await dispatch(fetchAllPayments(searchInput)).unwrap()
      return res
    } catch (error) {
      return toast.error(error?.message, "Something went wrong in all payments")
    }
  }

  const resetForm = () => {
    setPaymentFormData({
      type: "customer",
      customerName: "",
      vendorName: "",
      amount: "",
      method: "",
      date: new Date().toISOString().split("T")[0],
      note: "",
    });
  };
  const handleClose = () => {
    resetForm();
    setShowAddPaymentModal(false);
  };

  const handleFormSubmit = (e, paymentData) => {
    e.preventDefault();
    console.log(paymentData)

    if(paymentFormData.type === "customer"){
        dispatch(addCustomerPayment(paymentData))
    }else{
        console.log(paymentData, "type === vendor")
    }
    resetForm();
    setShowAddPaymentModal(false);
    navigate('/payments')
  }

  return {
    paymentFormData,
    setPaymentFormData,
    handleClose,
    showAddPaymentModal,
    setShowAddPaymentModal,
    handleFormSubmit,
    fetchCustomerPayments,
    getAllPayments
  };
};

export default usePayment;