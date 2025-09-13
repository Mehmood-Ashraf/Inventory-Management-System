import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSingleVendor,
  fetchAllVendors,
  fetchSingleVendor,
} from "../redux/slice/vendorSlice";
import Button from "../components/Button";
import { Edit, Loader, Plus, Search, Trash2, Truck } from "lucide-react";
import Modal from "../components/Modal";
import VendorForm from "../components/vendors/VendorForm";
import Card from "../components/Card";
import useVendors from "../hooks/useVendors";
import VendorDetailsModal from "../components/vendors/VendorDetailsModal";
import SearchInput from "../components/SearchInput";
import Table from "../components/Table";

const Vendors = () => {
  const [searchInput, setSearchInput] = useState("");
  const dispatch = useDispatch();
  const { vendors, loading, singleVendor } = useSelector(
    (state) => state.vendor
  );

  console.log(useSelector((state) => state.vendor));
  const {
    formData,
    setFormData,
    handleSubmit,
    resetForm,
    showAddModal,
    setShowAddModal,
    editingVendor,
    setEditingVendor,
    handleEditVendor,
    handleVendorClick,
    showDetailModal,
    setShowDetailModal,
    deleteVendorHandler,
    addVendorBillModalOpen,
    setAddVendorBillModalOpen,
    saveVendorBill,
  } = useVendors();

  useEffect(() => {
    const vendorId = localStorage.getItem("VendorID");
    if (vendorId) {
      localStorage.removeItem("VendorID");
    }
    if (searchInput) {
      const handler = setTimeout(() => {
        dispatch(fetchAllVendors(searchInput));
      }, 1000);

      return () => {
        clearTimeout(handler);
      };
    } else {
      dispatch(fetchAllVendors(searchInput));
    }

    const savedID = localStorage.getItem("VendorID");
    if (savedID) {
      dispatch(fetchSingleVendor(savedID));
      setShowDetailModal(true);
    }
  }, [searchInput, dispatch]);

  const handleCloseModal = () => {
    setShowAddModal(false);
    setEditingVendor(null);
    resetForm();
  };

  const vendorsListHeaders = [
    { key: "vendorName", label: "Vendor Name" },
    { key: "contact", label: "Contact" },
    { key: "currentBalance", label: "Balance" },
  ];
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center gap-4">
        <SearchInput
          value={searchInput}
          placeholder={"Search vendors...."}
          onChange={setSearchInput}
        />
        <Button onClick={() => setShowAddModal(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Vendor
        </Button>
      </div>

      <div>
        {vendors && (
          <Table
            title={"All Vendors"}
            subTitle={"Easily track vendor information and account balances."}
            data={vendors}
            headers={vendorsListHeaders}
            showActions={true}
            loading={loading}
            onEdit={handleEditVendor}
            onView={handleVendorClick}
            onDelete={deleteVendorHandler}
            Icon={Truck}
          />
        )}
      </div>

      {showAddModal && (
        <Modal
          title={editingVendor ? "Edit Vendor" : "Add Vendor"}
          onClose={() => {
            setShowAddModal(false);
            resetForm();
          }}
        >
          <VendorForm
            formData={formData}
            setFormData={setFormData}
            handleSubmit={(e) => {
              handleSubmit(e, editingVendor, handleCloseModal);
            }}
            handleCloseModal={handleCloseModal}
            editingVendor={editingVendor}
          />
        </Modal>
      )}

      {showDetailModal && singleVendor && (
        <Modal
          title={"Vendor Details"}
          onClose={() => {
            setShowDetailModal(false);
            dispatch(clearSingleVendor());
            localStorage.removeItem("VendorID");
          }}
        >
          <VendorDetailsModal
            handleEditVendor={handleEditVendor}
            selectedVendor={singleVendor}
            setShowDetailModal={setShowDetailModal}
          />
        </Modal>
      )}

      {}
    </div>
  );
};

export default Vendors;
