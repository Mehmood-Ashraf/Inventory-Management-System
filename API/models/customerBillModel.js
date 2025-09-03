import mongoose from "mongoose";

const customerBillModel = new mongoose.Schema({
  customerType: { type: String, enum: ["walkin", "regular"], required: true },
  customerName: { 
    type : String,
    required : true
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
  date: { type: Date, default: Date.now() }
});



export default mongoose.model("CustomerBills", customerBillModel)