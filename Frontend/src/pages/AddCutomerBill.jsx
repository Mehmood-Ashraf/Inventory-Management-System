import React, { useEffect } from "react";
import BillForm from "../components/BillForm";
import { useCustomersBills } from "../hooks/useCustomersBills";
import { customerBillsInputs } from "../formSource";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSingleCustomer,
  fetchSingleCustomer,
} from "../redux/slice/customersSlice";
import {
  fetchSingleBill,
  resetSingleBill,
} from "../redux/slice/customerBillSlice";

const AddCutomerBill = () => {
  const { billId } = useParams();
  const {
    formData,
    setFormData,
    handleAddCustomerBill,
    handleCloseAddBill,
    handleUpdateCustomerBill,
  } = useCustomersBills();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const customerId = queryParams.get("customerId");

  const dispatch = useDispatch();
  const singleCustomer = useSelector((state) => state.customer.singleCustomer);
  const singleBill = useSelector((state) => state.customerBills.singleBill);

  //agar customerId hai to singleCustomer fetch karenge
  useEffect(() => {
    if (customerId) {
      dispatch(fetchSingleCustomer(customerId));
    }
  }, [customerId, dispatch]);

  useEffect(() => {
    if (billId) {
      console.log(billId);
      dispatch(fetchSingleBill(billId));
    } else {
      dispatch(resetSingleBill());
      dispatch(clearSingleCustomer());
      // setFormData({
      //   customerType: "",
      //   customerName: "",
      //   items: [],
      //   date: "",
      //   paymentType: "",
      // });
    }
  }, [billId, dispatch]);

  useEffect(() => {
    if (singleBill && billId) {
      console.log(singleBill);
      setFormData({
        customerType: singleBill.customerType,
        customerName: singleBill.customerName,
        items: singleBill.items.map((item) => ({
          productId: item.product._id, // store id
          productName: item.product.productName, // optional for display
          price: item.price,
          quantity: item.quantity,
          total: item.total,
        })),
        date: singleBill.date,
        paymentType: singleBill.paymentType,
      });
    }
  }, [singleBill]);

  useEffect(() => {
    if (singleCustomer) {
      setFormData((prev) => ({
        ...prev,
        customerName: singleCustomer?.customerName,
        contact: singleCustomer?.contact,
        city: singleCustomer?.city,
        address: singleCustomer?.address,
        customerType: singleCustomer?.customerType,
      }));
    }
  }, [singleCustomer, setFormData]);

  const handleSubmit = (data) => {
    if (billId) {
      handleUpdateCustomerBill(billId, data);
    } else {
      handleAddCustomerBill(data);
    }
  };

  return (
    <div>
      <BillForm
        inputsData={customerBillsInputs}
        formData={formData}
        setFormData={setFormData}
        submitLabel={billId ? "Update Bill" : "Save Bill"}
        handleSubmit={handleSubmit}
        handleClose={handleCloseAddBill}
        heading={billId ? "Update Bill" : "Add Bill"}
      />
    </div>
  );
};

export default AddCutomerBill;
