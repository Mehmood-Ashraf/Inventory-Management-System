import mongoose from "mongoose";

const customerBillModel = new mongoose.Schema({
  customerType: { type: String, enum: ["walkin", "regular"], required: true },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: Number,
      price: Number
    }
  ],
  totalAmount: Number,
  date: { type: Date, default: Date.now() }
});

export default mongoose.model("CustomerBills", customerBillModel)