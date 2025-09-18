import mongoose from "mongoose";
import Company from "./companyModel.js";
import Category from './categoryModel.js'

const productModel = new mongoose.Schema({
  productName : {
    type : String,
    required : true,
    lowercase : true,
    trim : true
  },
  companyName : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "Company",
  },
  modelName : {
    type : String
  },
  category : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "Category",
    required : false,
    default : null
  },
  purchasePrice : {
    type : Number,
    required : true,
    min : [0, "Purchase price cannot be less than 0"]
  },
  sellPrice : {
    type : Number,
    min : [0, "Sell price cannot be less than 0"]
  },
  quantity : {
    type : Number,
    default : 0,
    min : [0, "Quantity cannot be less than 0"]
  }
})


productModel.pre("save", async function (next){
  try {
    const company = mongoose.model("Company");
    const category = mongoose.model("Category");

    if(!this.companyName){
        let genericCompany = await Company.findOne({ companyName : "Generic Company"})

        if(!genericCompany){
          genericCompany = await Company.create({ companyName : "Generic Company"})
        }
        this.companyName = genericCompany._id
    }

    if(!this.category){
      let defaultCatogory = await Category.findOne({ categoryName : "Uncategorized"})

      if(!defaultCatogory){
        defaultCatogory = await Category.create({ categoryName : "Uncategorized"})
      }
      this.category = defaultCatogory._id
    }

    next()
  } catch (error) {
    next(error) 
  }
})

export default mongoose.model("Product", productModel)