import { useDispatch, useSelector } from "react-redux";
import {
  addCustomer,
  deleteCustomer,
  fetchAllCustomers,
  fetchSingleCustomer,
  updateCustomer,
} from "../redux/slice/customersSlice";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const useCustomers = () => {
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const { singleCustomer } = useSelector((state) => state.customer);
  const [formData, setFormData] = useState({
    customerName: "",
    contact: "",
    address: "",
    customerType: "",
    city: "",
  });

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleCustomerClick = (customerID) => {
    dispatch(fetchSingleCustomer(customerID));
    setShowDetailModal(true);
    localStorage.setItem("customerID", customerID);
  };

  const viewBillsHandler = () => {
    localStorage.removeItem("customerID")
    setShowDetailModal(false);
    setTimeout(() => {
      navigate("/all_customer_bills", {
        state: { customerId: singleCustomer._id },
      });
    }, 200);
  };

  const deleteCustomerHandler = async (customerID) => {
    try {
      await dispatch(deleteCustomer(customerID)).unwrap();
      toast.success("customer deleted Successfully!");
      setShowDetailModal(false);
      await dispatch(fetchAllCustomers()).unwrap();
    } catch (error) {
      toast.error(
        error?.message || " Vendor not deleted Something went wrong!"
      );
    }
  };

  const handleEditCustomer = (customer) => {
    setEditingCustomer(customer);
    setFormData({
      customerName: customer.customerName,
      contact: customer.contact,
      address: customer.address,
      city: customer.city,
      customerType: customer.customerType,
    });
    setShowAddModal(true);
    setShowDetailModal(false);
    localStorage.removeItem("CustomerID");
  };

  //For edit or Add customer
  // const handleSubmit = async (e, editingCustomer, onClose) => {
  //   e.preventDefault();
  //   try {
  //     if (editingCustomer) {
  //       await dispatch(
  //         updateCustomer({ id: editingCustomer._id, CustomerData: formData })
  //       ).unwrap();
  //       toast.success("Customer updated Successfully");
  //     } else {
  //       await dispatch(addCustomer(formData)).unwrap();
  //       toast.success("Customer added Successfully");
  //     }
  //     resetForm();
  //     onClose();
  //   } catch (error) {
  //     toast.error(error?.message || "Something went wrong!");
  //   }
  // };

  const resetForm = () => {
    setFormData({
      customerName: "",
      contact: "",
      address: "",
      customerType: "",
      city: "",
    });
  };

  const handleSubmit = async (e, onClose) => {
    e.preventDefault();
    console.log(formData);
    try {
      if (!formData.customerType) {
        alert("Select");
        return;
      }
      const res = await dispatch(addCustomer(formData)).unwrap();
      console.log(res);
      toast.success("Customer added Successfully");
      resetForm();
      onClose();
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
    }
  };

  return {
    resetForm,
    handleCustomerClick,
    deleteCustomerHandler,
    showAddModal,
    setShowAddModal,
    handleSubmit,
    formData,
    setFormData,
    handleEditCustomer,
    showDetailModal,
    setShowDetailModal,
    editingCustomer,
    setEditingCustomer,
    viewBillsHandler,
  };
};

export default useCustomers;
