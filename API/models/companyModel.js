import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    companyName : {
        type : String,
        required : true
    },
    products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products"   // ye Products model ka reference hoga
    }
  ]
})

export default mongoose.model("Company", companySchema);