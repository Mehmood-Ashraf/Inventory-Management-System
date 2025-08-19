import mongoose from "mongoose";

const vendorBillModel = new mongoose.Schema({
    vendorName : {
        type : mongoose.Schema.Types.ObjectId, ref : "Vendor"
    },
    items : [{
        product : {type : mongoose.Schema.Types.ObjectId, ref : "Product"},
        quantity : Number,
        price : Number
    }],
    totalAmount : Number,
    date : {
        type : Date,
        default : Date.now()
    }
})

export default mongoose.model("VendorBills", vendorBillModel)