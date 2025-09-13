import mongoose from "mongoose";

const customerBillModel = new mongoose.Schema({
  customerType: { type: String, enum: ["walkin", "regular"], required: true },
  customerName: { 
    type : String,
    required : true
   },
   customerId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "Customer"
   },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: Number,
      price: Number,
      total : Number
    }
  ],
  billNumber : {
    type : String,
    unique : true,
  },
  totalAmount: Number,
  date: { type: String, default: () => new Date().toISOString().split("T")[0] }
}, { timestamps : true });



export default mongoose.model("CustomerBills", customerBillModel)