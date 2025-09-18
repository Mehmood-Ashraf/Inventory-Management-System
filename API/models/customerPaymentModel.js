import mongoose from "mongoose";

const customerPaymentModel = new mongoose.Schema({
    customerId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Customer",
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
        enum : ["cash", "bank", "online"],
        default : "cash"
    },
    note : {
        type : String
    }
}, { timestamps : true })

export default mongoose.model("CustomerPayments", customerPaymentModel)