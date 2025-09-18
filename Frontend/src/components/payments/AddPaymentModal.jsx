import React from "react";
import Modal from "../Modal";
import Card from "./Card";
import {
  Building2,
  Calendar,
  DollarSign,
  FileText,
  TrendingUp,
  User,
  Wallet,
} from "lucide-react";
import Button from "../Button";


const AddPaymentModal = ({
  setShowAddPaymentModal,
  paymentData,
  handleClose,
  handleSubmit,
  setPaymentData
}) => {


  const handleChange = (e) => {
  const { name, value } = e.target;

  setPaymentData((prev) => ({
    ...prev,
    [name]: value,   // input ke "name" ke basis par state update karega
  }));
};


  return (
    <Modal
      title={"Add New Payment"}
      onClose={() => setShowAddPaymentModal(false)}
    >
      <form className="space-y-6" onSubmit={(e) => handleSubmit(e, paymentData)}>
        <label className="block text-base font-semibold">Payment Type</label>
        <div className="grid grid-cols-2 gap-4">
          <Card
            title={"Cutomer Payment"}
            Icon={TrendingUp}
            description={"Incoming Payment"}
            onClick={() => setPaymentData((prev) =>( {...prev, type : "customer"}))}
          />
          <Card
            title={"Vendor Payment"}
            Icon={Building2}
            description={"Outgoing Payment"}
            onClick={() => setPaymentData((prev) => ({...prev, type : "vendor"}))}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="name" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              {paymentData.type === "customer" ? "Customer" : "Vendor"} Name
            </label>
            <input
              id="name"
              type="text"
              name={paymentData.type === "customer" ? "customerName" : "vendorName"} 
              className="flex h-10 w-full rounded-md px-3 py-2 border border-gray-900 text-base focus:ring-primary"
              value={paymentData.type === "customer" ? paymentData.customerName : paymentData.vendorName}
              placeholder={`Enter ${paymentData.type} name`}
              required
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="amount" className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Amount
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              min="0"
              className="flex h-10 w-full rounded-md px-3 py-2 border border-gray-900 text-base focus:ring-primary"
              placeholder="0.00"
              value={paymentData.amount || 0}
              required
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="name" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Payment Date
            </label>
            <input
              id="date"
              type="date"
              name="date"
              className="flex h-10 w-full rounded-md px-3 py-2 border border-gray-900 text-base focus:ring-primary"
              value={paymentData.date || ""}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="method" className="flex items-center gap-2">
              <Wallet className="w-4 h-4" />
              Method
            </label>
            <select
              name="method"
              id="method"
              value={paymentData.method}
              className="border border-gray-900 focus:ring-primary h-10 w-full rounded-md py-2 px-3"
              onChange={handleChange}
            >
              <option value="">Select Method</option>
              <option value="cash">Cash</option>
              <option value="bank">Bank</option>
              <option value="online">Online</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="note" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Note
          </label>
          <textarea name="note" id="note" value={paymentData.note} className="border border-gray-900 min-h-24 w-full rounded-md p-4" placeholder="Enter additional note" onChange={handleChange}></textarea>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" onClick={handleClose} variant="secondary">Cancel</Button>
          <Button type="submit">Add Payment</Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddPaymentModal;
