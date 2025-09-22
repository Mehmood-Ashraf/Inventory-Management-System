import mongoose from "mongoose";

const customerBillModel = new mongoose.Schema(
  {
    customerType: { type: String, enum: ["walkin", "regular"], required: true },
    customerName: {
      type: String,
      required: true,
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: Number,
        price: Number,
        total: Number,
      },
    ],
    billNumber: {
      type: String,
      unique: true,
    },
    totalAmount: Number,
    paymentType: { type: String, enum: ["credit", "cash"], required: true },
    date: {
      type: String,
      default: () => {
        const now = new Date();
        // Pakistan timezone offset +5 hours
        const utc = now.getTime() + now.getTimezoneOffset() * 60000;
        return new Date(utc + 5 * 60 * 60000);
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("CustomerBills", customerBillModel);
