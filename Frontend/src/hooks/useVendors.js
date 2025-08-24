import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  addVendor,
  deleteVendor,
  fetchSingleVendor,
  updateVendor,
} from "../redux/slice/vendorSlice";
import { toast } from "react-toastify";

const useVendors = () => {
  const dispatch = useDispatch();
  const  [editingVendor, setEditingVendor] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showBillDetailsModal, setShowBillDetailsModal] = useState(false)
  const [selectedBill, setSelectedBill] = useState(null)
  const [formData, setFormData] = useState({
    vendorName: "",
    email: "",
    contact: "",
    address: "",
    totalTurnover: "",
  }); 

  const resetForm = () => {
    setFormData({
      vendorName: "",
      email: "",
      contact: "",
      address: "",
      totalTurnover: "",
    });

    setEditingVendor(null);
  };


  const handleVendorClick = (vendorID) => {
    dispatch(fetchSingleVendor(vendorID))
    setShowDetailModal(true)
    localStorage.setItem("VendorID", vendorID)
  }

  const handleViewBillDetails = (bill) => {
    setSelectedBill(bill)
    setShowBillDetailsModal(true)
  }

  const editVendorBill = (bill) => {
    setShowAddModal(true)
    setSelectedBill(bill)
  }


  const deleteVendorHandler = (vendorID) => {
    try {
      dispatch(deleteVendor(vendorID))
      toast.success("Vendor deleted Successfully!")
    } catch (error) {
      toast.error(error?.message || " Vendor not deleted Something went wrong!")
    }
  }

  const handleEditVendor = (vendor) => {
    setEditingVendor(vendor);
    setFormData({
      vendorName: vendor.vendorName,
      email: vendor.email,
      contact: vendor.contact,
      address: vendor.address,
      totalTurnover: vendor.totalTurnover,
    });
    setShowAddModal(true);
    setShowDetailModal(false)
  }



  const handleSubmit = (e, editingVendor, onClose) => {
    e.preventDefault();
    try {
      if (editingVendor) {
        dispatch(updateVendor({ id: editingVendor._id, vendorData : formData }));
        toast.success("Vendor updated Successfully")
      } else {
        dispatch(addVendor(formData));
        toast.success("Vendor added Successfully")
      }
      resetForm();
      onClose();
    } catch (error) {
        toast.error(error?.message || "Something went wrong!")
    }
  };

  

  return {
    handleSubmit,
    resetForm,
    formData,
    setFormData,
    handleEditVendor,
    editingVendor,
    setEditingVendor,
    showAddModal,
    setShowAddModal, showDetailModal, setShowDetailModal, handleVendorClick, deleteVendorHandler, selectedBill, showBillDetailsModal, handleViewBillDetails, editVendorBill, setShowBillDetailsModal, setSelectedBill
  };
};

export default useVendors;
