import mongoose from "mongoose";

const customerPaymentModel = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: () => {
        const now = new Date();
        // Pakistan timezone offset +5 hours
        const utc = now.getTime() + now.getTimezoneOffset() * 60000;
        return new Date(utc + 5 * 60 * 60000);
      },
    },
    method: {
      type: String,
      enum: ["cash", "bank", "online"],
      default: "cash",
    },
    note: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("CustomerPayments", customerPaymentModel);
