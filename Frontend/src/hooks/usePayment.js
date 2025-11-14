import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCustomerPayment,
  deletePayment,
  fetchAllCustomerPayments,
  fetchAllPayments,
  updateCustomerPayment,
} from "../redux/slice/paymentSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const usePayment = () => {
  const [showAddPaymentModal, setShowAddPaymentModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);
  const { allPayments, page, total, limit } = useSelector(
    (state) => state.payment
  );
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
      const res = await dispatch(fetchAllCustomerPayments(name)).unwrap();
      return res;
    } catch (error) {
      return toast.error(error?.message || "Error Fetching Customer Payments");
    }
  };

  const getAllPayments = async (searchInput = "") => {
    try {
      const res = await dispatch(
        fetchAllPayments({ page: 1, limit: 10, searchInput })
      ).unwrap();
      return res;
    } catch (error) {
      return toast.error(
        error?.message || "Something went wrong in all payments"
      );
    }
  };

  const deletePaymentHandler = async (id) => {
    try {
      const res = await dispatch(deletePayment(id)).unwrap();
      return toast.success("Payment deleted successfully");
    } catch (error) {
      return toast.error(error?.message || "Something went wrong");
    }
  };

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
    if (paymentFormData.type === "customer") {
      dispatch(addCustomerPayment(paymentData));
    } else {
      console.log(paymentData, "type === vendor");
    }
    resetForm();
    setShowAddPaymentModal(false);
    navigate("/payments");
  };

  const handleLoadMore = async () => {
    const hasMore = allPayments.length < total;
    if (!hasMore) {
      toast.info("No more payments to load");
      return;
    }
    try {
      await dispatch(fetchAllPayments({ page: page + 1, limit })).unwrap();
      toast.success("More Payments loaded successfully");
    } catch (error) {
      toast.error(error?.message);
    }
  };

  const openEditPaymentHandler = async (payment) => {
    console.log(payment)
    setPaymentFormData({
      type : payment.type || "customer",
      customerName : payment?.name || "",
      vendorName : payment?.vendorName || "",
      amount : payment?.amount || "",
      method : payment?.method || "",
      date : payment?.date ? payment?.date.split("T")[0] : new Date().toISOString().split("T")[0],
      note : payment?.note || "",
      _id : payment?._id || ""
    });
    setIsEditMode(true);
    setShowAddPaymentModal(true);
  }

  const updateCustomerPaymentHandler = async (id, updatedData) => {
    if(!id) return toast.error("PaymentID is required");

    try {
      const res = await dispatch(updateCustomerPayment({id , paymentData : updatedData})).unwrap();
      
      toast.success("Payment Updated successfully");

      resetForm();

      await getAllPayments();

      return res;
    } catch (error) {
      toast.error(error?.message || "Failed to update payment");
    }
  }

  return {
    paymentFormData,
    setPaymentFormData,
    handleClose,
    showAddPaymentModal,
    setShowAddPaymentModal,
    handleFormSubmit,
    fetchCustomerPayments,
    getAllPayments,
    handleLoadMore,
    deletePaymentHandler,
    openEditPaymentHandler,
    resetForm,
    setIsEditMode,
    isEditMode,
    updateCustomerPaymentHandler
  };
};

export default usePayment;