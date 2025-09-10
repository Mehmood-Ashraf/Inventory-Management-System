import mongoose from "mongoose";

const vendorBillModel = new mongoose.Schema({
  vendorName: {
    type: mongoose.Schema.Types.ObjectId,
    ref : "Vendors",
    required : true,
  },
  billNumber : {
    type : Number,
    required : true
  },
  items: [
    {
      productName : {type : String, required : true},
      quantity : {type : Number, required : true, min : [0, "Quantity cannot be negative"]},
      price : {type : Number, required : true, min : [0, "Price cannot be negative"]},
      total : {type : Number}
    },
  ],
  totalAmount: {
    type: Number,
    default : 0
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("VendorBills", vendorBillModel);

// Pre-save hook
vendorBillModel.pre("save", function (next) {
  // per item total calculate karo agar missing ho
  this.items.forEach(item => {
    if (!item.total || item.total === 0) {
      item.total = item.quantity * item.price;
    }
  });

  // overall total calculate karo agar user ne na diya ho
  if (!this.totalAmount || this.totalAmount === 0) {
    this.totalAmount = this.items.reduce((sum, item) => sum + item.total, 0);
  }

  next();
});
