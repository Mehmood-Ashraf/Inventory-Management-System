import { useDispatch } from "react-redux";
import {
    addCustomer,
  deleteCustomer,
  fetchSingleCustomer,
  updateCustomer,
} from "../redux/slice/customersSlice";
import { useState } from "react";


const useCustomers = () => {
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
    const [formData, setFormData] = useState({
    vendorName: "",
    email: "",
    contact: "",
    address: "",
    totalTurnover: "",
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
      vendorName: vendor.vendorName,
      email: vendor.email,
      contact: vendor.contact,
      address: vendor.address,
      totalTurnover: vendor.totalTurnover,
    });
    setShowAddModal(true);
    setShowDetailModal(false)
    localStorage.removeItem("VendorID")
  }
  //For edit or Add customer
  const handleSubmit = async (e, editingCustomer, onClose) => {
    e.preventDefault();
    try {
      if (editingCustomer) {
        await dispatch(
          updateCustomer({ id: editingCustomer._id, CustomerData: formData })
        ).unwrap();
        toast.success("Customer updated Successfully");
      } else {
        await dispatch(addCustomer(formData)).unwrap();
        toast.success("Customer added Successfully");
      }
      resetForm();
      onClose();
    } catch (error) {
      toast.error(error?.message || "Something went wrong!");
    }
  };

  return { handleCustomerClick, deleteCustomerHandler, handleSubmit, handleEditCustomer, showDetailModal, setShowDetailModal };
};

export default useCustomers;