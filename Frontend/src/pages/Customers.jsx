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
import { fetchAllCustomers, fetchSingleCustomer } from "../redux/slice/customersSlice";
import useCustomers from "../hooks/useCustomers.js";
import Form from "../components/Form.jsx";
import { addCustomerInputs } from "../formSource.js";
import DetailModal from "../components/DetailModal.jsx";

const Customers = () => {
  const [searchInput, setSearchInput] = useState("");
  const dispatch = useDispatch();
  const { allCustomers, loading, singleCustomer } = useSelector(
    (state) => state.customer
  );

  console.log(useSelector((state) => state.customer));

  const {handleCustomerClick, formData, setFormData, handleSubmit ,deleteCustomerHandler , handleEditCustomer, showDetailModal, setShowDetailModal, showAddModal, setShowAddModal, resetForm, editingCustomer, setEditingCustomer } = useCustomers()

  useEffect(() => {
    // const customerId = localStorage.getItem("customerID");
    // if (customerId) {
    //   localStorage.removeItem("customerID");
    // };
    
    if (searchInput) {
      const handler = setTimeout(() => {
        dispatch(fetchAllCustomers(searchInput));
      }, 1000);

      return () => {
        clearTimeout(handler);
      };
    } else {
      dispatch(fetchAllCustomers(searchInput));
    }
    console.log(allCustomers);

    const savedID = localStorage.getItem("customerID");
    if (savedID) {
      dispatch(fetchSingleCustomer(savedID));
      setShowDetailModal(true);
    }
  }, [searchInput, dispatch]);

  const handleCloseModal = () => {
    setShowAddModal(false);
    setEditingCustomer(null);
    resetForm();
    localStorage.removeItem("customerID")
  };

  const customersListHeaders = [
    { key: "customerName", label: "Customer Name" },
    { key: "contact", label: "Contact" },
    { key: "balance", label: "Balance" },
  ];
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center gap-4">
        <SearchInput
          value={searchInput}
          placeholder={"Search customer...."}
          onChange={setSearchInput}
        />
        <Button onClick={() => setShowAddModal(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Customer
        </Button>
      </div>

      <div>
        {allCustomers && (
          <Table
            title={"All Customers"}
            subTitle={"Easily track customers information and account balances."}
            data={allCustomers}
            headers={customersListHeaders}
            showActions={true}
            loading={loading}
            onEdit={handleEditCustomer}
            onView={handleCustomerClick}
            onDelete={deleteCustomerHandler}
          />
        )}
      </div>

      {showAddModal && (
        <Modal
          title={editingCustomer ? "Edit Customer" : "Add Customer"}
          onClose={handleCloseModal}
        >
          {/* <VendorForm
            formData={formData}
            setFormData={setFormData}
            handleSubmit={(e) => {
              handleSubmit(e, editingVendor, handleCloseModal);
            }}
            handleCloseModal={handleCloseModal}
            editingVendor={editingVendor}
          /> */}
          <Form inputsData={addCustomerInputs} formData={formData} setFormData={setFormData} handleClose={handleCloseModal} submitLabel={editingCustomer ? "Update Customer" : "Add Customer"} handleSubmit={(e) => handleSubmit(e, handleCloseModal)}/>
        </Modal>
      )}

      {showDetailModal && (
        <Modal
          title={"Customer Details"}
          onClose={() => {
            setShowDetailModal(false);
            // dispatch(clearSingleVendor());
            localStorage.removeItem("CustomerID");
          }}
        >
          {singleCustomer && (
            <DetailModal
              type={"customer"}
              data={singleCustomer}
              setShowDetailModal={setShowDetailModal}
              handleEdit={handleEditCustomer}
              onDelete={deleteCustomerHandler}
            />
          )}
        </Modal>
      )}


      {}
    </div>
  );
};

export default Customers;
