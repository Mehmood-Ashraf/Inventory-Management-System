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
  balance : {
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
  payments : [
    {
      amount : {type : Number},
      data : {type : Date, default : Date.now()},
      method : {type : String, enum : ["cash", "bank", "online"], default : "cash"}
    }
  ]
}, {timestamps : true});

export default mongoose.model("Vendors", vendorModel)
