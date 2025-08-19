import mongoose from "mongoose";

const customerModel = new mongoose.Schema({
    customerName : {
        type : String,
        required : true
    },
    contact : {
        type : Number
    },
    address : {
        type : String
    },
    customerType : {
        type : String,
        enum : ["regular", "walk-in"],
        required : true
    },
    bills : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "CustomerBills"
    }]
})

export default mongoose.model("Customer", customerModel) 