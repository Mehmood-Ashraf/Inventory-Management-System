import { useDispatch } from "react-redux";
import {
  addCustomer,
  deleteCustomer,
  fetchSingleCustomer,
  updateCustomer,
} from "../redux/slice/customersSlice";
import { useState } from "react";
import { toast } from "react-toastify";

const useCustomers = () => {
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [formData, setFormData] = useState({
    customerName: "",
    contact: "",
    address: "",
    customerType: "",
    city : ""
  });

  const dispatch = useDispatch();

  const handleCustomerClick = (customerID) => {
    dispatch(fetchSingleCustomer(customerID));
    setShowDetailModal(true);
    localStorage.setItem("customerID", customerID);
  };

  const deleteCustomerHandler = async (customerID) => {
    try {
      await dispatch(deleteCustomer(customerID)).unwrap();
      toast.success("customer deleted Successfully!");
    } catch (error) {
      toast.error(
        error?.message || " Vendor not deleted Something went wrong!"
      );
    }
  };

  const handleEditCustomer = (vendor) => {
    setEditingCustomer(vendor);
    setFormData({
      customerName: customer.customerName,
      email: customer.email,
      contact: customer.contact,
      address: customer.address,
      totalTurnover: customer.totalTurnover,
    });
    setShowAddModal(true);
    setShowDetailModal(false);
    localStorage.removeItem("VendorID");
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

  const handleSubmit = async (e, onClose) => {
    e.preventDefault();
    console.log(formData);
    try {
      if(!formData.customerType){
        alert("Select")
        return
      }
      const res = await dispatch(addCustomer(formData)).unwrap();
      console.log(res);
      toast.success("Customer added Successfully");
      onClose();
    } catch (error) {
      toast.error(error?.message);
    }
  };

  return {
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
  };
};

export default useCustomers;
