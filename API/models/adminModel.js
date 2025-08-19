import mongoose from "mongoose";

const adminModel = new mongoose.Schema({
    adminName : {
        type : String,
        required : true
    },
    email: {
        type : String,
        required: true
    },
    password : {
        type: String,
        required : true
    }
}, {timestamps: true})

export default mongoose.model("Admin", adminModel)