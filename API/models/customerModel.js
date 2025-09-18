import mongoose from "mongoose";

const customerModel = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
    },
    address: {
      type: String,
    },
    city: {
      type: String,
      default: "karachi",
    },
    customerType: {
      type: String,
      enum: ["regular", "walk-in"],
      required: true,
    },
    bills: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "CustomerBills",
      }],
    currentBalance: {
      type: Number,
      default: 0,
    },
    previousBalance: {
      type: Number,
      default: 0,
    },
    totalTurnover: {
      type: Number,
      default: 0,
    },
    totalRecieved: {
      type: Number,
      default: 0,
    },
    payments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CustomerPayments",
      },
    ],
  }, { timestamps: true }
);

export default mongoose.model("Customer", customerModel);
