import mongoose from "mongoose";

const customerModel = new mongoose.Schema({
    customerName : {
        type : String,
        required : true
    },
    contact : {
        type : String
    },
    address : {
        type : String
    },
    city : {
        type : String,
        default : "karachi"
    },
    customerType : {
        type : String,
        enum : ["regular", "walk-in"],
        required : true
    },
    bills : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "CustomerBills"
    }],
    balance : {
        type : Number,
        default : 0
    },
    totalTurnover : {
        type : Number,
        default : 0
    },
    totalRecieved : {
    type : Number,
    default : 0
  },
  payments : [
    {
      amount : {type : Number},
      date : {type : Date, default : Date.now()},
      method : {type : String, enum : ["cash", "bank", "online"], default : "cash"}
    }
  ]
}, {timestamps : true})

export default mongoose.model("Customer", customerModel)