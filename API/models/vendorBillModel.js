import mongoose from "mongoose";

const vendorBillModel = new mongoose.Schema({
  vendorName: {
    type: String,
    required : true,
  },
  billNumber : {
    type : Number,
    required : true
  },
  items: [
    {
      productName: String,
      quantity: Number,
      price: Number,
    },
  ],
  totalAmount: {
    type: Number,
    default : 0
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("VendorBills", vendorBillModel);
