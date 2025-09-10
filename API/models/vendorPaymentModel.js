import mongoose from "mongoose";

const vendorPaymentModel = new mongoose.Schema({
    vendorName : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Vendors",
        required : true
    },
    amount : {
        type : Number,
        required : true
    },
    date : {
        type : Date,
        default : Date.now
    },
    method : {
        type : String,
        enum : ["Cash", "Bank", "Online"],
        default : "Cash"
    },
    note : {
        type : String
    }
}, { timestamps : true })

export default mongoose.model("VendorPayments", vendorPaymentModel)