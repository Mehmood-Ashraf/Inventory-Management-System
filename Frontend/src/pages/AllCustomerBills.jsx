import React, { useEffect, useState } from "react";
import SearchInput from "../components/SearchInput";
import { FileText, Plus } from "lucide-react";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCustomerBills } from "../redux/slice/customerBillSlice";
import Table from "../components/Table";
import { useCustomersBills } from "../hooks/useCustomersBills";
import Modal from "../components/Modal";
import BillForm from "../components/BillForm";
import { customerBillsInputs } from "../formSource";
import Card from "../components/Dashboard/Card";
import { customerBillsCardData } from "../mockData/cardData";
import { toast } from "react-toastify";

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
    deleteCustomerBillHander,
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

  const filteredBills =
  searchInput.trim === "" ? allCustomerBills :
  allCustomerBills.filter((bill) =>{
    const search = searchInput.toLowerCase();
    return(
      bill.customerName.toLowerCase().includes(search) ||
      bill.billNumber?.toString().includes(search)
    )}
  );
  console.log(filteredBills);

  // useEffect(() => {
  //   const loadCustomerBills = () => {
  //     try {
  //       if(searchInput){
  //         dispatch(fetchAllCustomerBills({ customerName: searchInput }));
  //       }else{
  //         dispatch(fetchAllCustomerBills())
  //         toast.success("Fetched All Customers Bills successfully!")
  //       }
  //     } catch (error) {
  //       toast.error(error?.message)
  //     }

  //   };
  //   loadCustomerBills();
  // }, [searchInput, dispatch]);

  useEffect(() => {
    dispatch(fetchAllCustomerBills());
  }, []);

  const formattedBills = filteredBills?.map((bill) => ({
    ...bill,
    date: formatDate(bill.date),
  }));

  const billsCardsData = customerBillsCardData(allCustomerBills);

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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
        {billsCardsData?.map((item, index) => (
          <Card key={index} title={item.title} value={item.value} />
        ))}
      </div>

      <div>
        {formattedBills && (
          <Table
            title={"All Customers Bills"}
            subTitle={
              "Easily track customers bills information and Bill details."
            }
            Icon={FileText}
            data={formattedBills}
            headers={customerBillsListHeaders}
            showActions={true}
            loading={loading}
            onDelete={deleteCustomerBillHander}
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
