import React, { useEffect, useState } from "react";
import SearchInput from "../components/SearchInput";
import { Plus } from "lucide-react";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCustomerBills } from "../redux/slice/customerBillSlice";
import Table from "../components/Table";
import { useCustomersBills } from "../hooks/useCustomersBills";
import Modal from "../components/Modal";
import BillForm from "../components/BillForm";
import { customerBillsInputs } from "../formSource";

const AllCustomerBills = () => {
  const [searchInput, setSearchInput] = useState("");
  const dispatch = useDispatch();
  const { allCustomerBills, loading, error } = useSelector(
    (state) => state.customerBills
  );
  const {
    addCustomerBillModal,
    setAddCustomerBillModal,
    formData,
    setFormData,
    handleCloseModal,
  } = useCustomersBills();

  const customerBillsListHeaders = [
    { key: "date", label: "Date" },
    { key: "customerName", label: "Customer Name" },
    { key: "billNumber", label: "Bill No" },
    { key: "totalAmount", label: "Amount" },
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };

  useEffect(() => {
    dispatch(fetchAllCustomerBills({ customerName: searchInput }));
  }, [searchInput]);

  const formattedBills = allCustomerBills?.map((bill) => ({
    ...bill,
    date: formatDate(bill.date),
  }));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center gap-4">
        <SearchInput
          placeholder={"Search Bill......"}
          value={searchInput}
          onChange={setSearchInput}
        />

        <Button onClick={() => setAddCustomerBillModal(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Bill
        </Button>
      </div>

      <div>
        {formattedBills && (
          <Table
            title={"All Customers Bills"}
            subTitle={
              "Easily track customers bills information and Bill details."
            }
            data={formattedBills}
            headers={customerBillsListHeaders}
            showActions={true}
            loading={loading}
          />
        )}
      </div>

      {addCustomerBillModal && (
        <Modal
          title={"Create Bill"}
          onClose={() => {
            setAddCustomerBillModal(false);
          }}
        >
          <BillForm
            inputsData={customerBillsInputs}
            formData={formData}
            setFormData={setFormData}
            submitLabel={"Save Bill"}
            handleClose={handleCloseModal}
          />
        </Modal>
      )}
    </div>
  );
};

export default AllCustomerBills;
