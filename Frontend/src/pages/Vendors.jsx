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

  if (loading) {
    return <Loader />;
  }

  const vendorsListHeaders = [
    { key: "vendorName", label: "Vendor Name" },
    { key: "contact", label: "Contact" },
    { key: "balance", label: "Balance" },
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
        {/* <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search vendors..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div> */}
        <Button onClick={() => setShowAddModal(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Vendor
        </Button>
      </div>

      {/* <Card title={"All Vendors"} subtitle={"Easily track vendor information and account balances."}>
        <div className="divide-y divide-gray-200">
          {vendors?.map((vendor) => (
            <li
              key={vendor._id}
              className="py-4 px-6 hover:bg-gray-50 cursor-pointer transition-colors list-none"
              onClick={() => handleVendorClick(vendor._id)}
            >
              <div className="grid grid-cols-3 items-center">
                <div className="flex items-center space-x-4 min-w-0 ">
                  <div className="flex-shrink-0">
                    <Truck className="h-10 w-10 text-gray-400 bg-gray-100 rounded-full p-2" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {vendor.vendorName}
                    </p>

                    <span className="text-xs text-gray-500 truncate max-w-48">
                        {vendor.contact}
                      </span>
                  </div>
                </div>

                <div className="text-sm font-medium text-gray-900 text-center">
                  {vendor.balance}
                </div>

                <div className="flex items-center space-x-2 justify-end flex-shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditVendor(vendor);
                    }}
                    className="text-indigo-600 hover:text-indigo-900 p-1 cursor-pointer"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteVendorHandler(vendor._id);
                    }}
                    className="text-red-600 hover:text-red-900 p-1 cursor-pointer"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </div>
      </Card>
       */}
      <div>
        <Table
          title={"All Vendors"}
          subTitle={"Easily track vendor information and account balances."}
          data={vendors}
          headers={vendorsListHeaders}
        />
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

      {showDetailModal && (
        <Modal
          title={"Vendor Details"}
          onClose={() => {
            setShowDetailModal(false);
            dispatch(clearSingleVendor());
            localStorage.removeItem("VendorID");
          }}
        >
          {singleVendor && (
            <VendorDetailsModal
              handleEditVendor={handleEditVendor}
              selectedVendor={singleVendor}
              setShowDetailModal={setShowDetailModal}
            />
          )}
        </Modal>
      )}

      {}
    </div>
  );
};

export default Vendors;
