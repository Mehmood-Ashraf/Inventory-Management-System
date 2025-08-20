import mongoose from "mongoose";

const productModel = new mongoose.Schema({
  productName : {
    type : String,
    required : true
  },
  purchasePrice : {
    type : Number
  },
  salePrice : {
    type : Number
  },
  stockInHand : {
    type : Number,
    default : 0
  }
})

export default mongoose.model("Products", productModel)