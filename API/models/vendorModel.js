import mongoose from "mongoose";

const vendorModel = new mongoose.Schema({
  vendorName: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
  },
  address: {
    type: String,
  },
  city : {
    type : String
  },
  vendorBills: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "VendorBills"
    },
  ],
  previousBalance : {
    type : Number,
    default : 0
  },
  currentBalance : {
    type : Number,
    default : 0
  },
  totalTurnover : {
    type : Number,
    default : 0
  },
  totalPaid : {
    type : Number,
    default : 0
  },
  payments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "VendorPayments",
    },
  ],
  isDeleted : {
    type : Boolean,
    default : false
  }
}, {timestamps : true});

export default mongoose.model("Vendors", vendorModel)
