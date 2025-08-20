import mongoose from "mongoose";

const vendorBillModel = new mongoose.Schema({
  vendorName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor",
  },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Products" },
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
