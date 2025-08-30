import mongoose from "mongoose";
import Company from "./companyModel.js";
import Category from './categoryModel.js'

const productModel = new mongoose.Schema({
  productName : {
    type : String,
    required : true
  },
  companyName : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "Company",
  },
  vendorName : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "Vendors"
  },
  modelName : {
    type : String
  },
  category : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "Category"
  },
  purchasePrice : {
    type : Number,
    required : true
  },
  sellPrice : {
    type : Number
  },
  quantity : {
    type : Number,
    default : 0
  }
})

productModel.pre("save", async function (next){
  try {
    const company = mongoose.model("Company");
    const category = mongoose.model("Category");

    if(!this.companyName){
        let genericCompany = await Company.findOne({ name : "Generic Company"})

        if(!genericCompany){
          genericCompany = await Company.create({ CompanyName : "Generic Company"})
        }
        this.companyName = genericCompany._id
    }

    if(!this.category){
      let defaultCatogory = await Category.findOne({ name : "Uncategorized"})

      if(!defaultCatogory){
        defaultCatogory = await Category.create({ name : "Uncategorized"})
      }
      this.category = defaultCatogory._id
    }

    next()
  } catch (error) {
    next(error)
  }
})

export default mongoose.model("Product", productModel)