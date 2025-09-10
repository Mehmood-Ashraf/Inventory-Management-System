import { errorHandler, successHandler } from "../utils/responseHandler.js";
import VendorBill from "../models/vendorBillModel.js";
import Vendor from "../models/vendorModel.js";
import Products from "../models/productModel.js";
import mongoose from "mongoose";

export const addVendorBill = async (req, res) => {
  try {
    //bill aya vendorname aur items destructure kia
    const { vendorName, items, billNumber } = req.body;
    //total amount destructure kia
    let { totalAmount } = req.body;
    //aagar vendorname aur items nahi hai to return error
    if (!vendorName || !items) {
      return errorHandler(res, 400, "Missing Fields");
    }

    let vendor = await Vendor.findOne({
      vendorName: vendorName.trim().toLowerCase(),
    });

    if (!vendor || vendor.isDeleted) {
      vendor = await Vendor.create({
        vendorName: vendorName.trim().toLowerCase(),
      });
    }

    // billITems ka empty array create kia
    let billItems = [];

    //Jo Items user ne add kiye vendor bill k un per loop chala kar check kia agar Prodcuts k data me already item exist karta hai to Product k data me us ki quantity update ki agar nahi hai to naya product create kia Product data me...
    for (let item of items) {
      let product = await Products.findOne({ productName: item.productName });

      if (!product) {
        product = await Products.create({
          productName: item.productName,
          purchasePrice: item.price,
          quantity: item.quantity,
          // salePrice: item.salePrice,
        });
      } else {
        product.quantity += item.quantity;
        product.purchasePrice = item.price;
        await product.save();
      }
      //bill Items k array me
      billItems.push({
        product: product._id,
        productName: item.productName,
        quantity: item.quantity,
        price: item.price,
        total: item.total || item.quantity * item.price,
      });
    }

    //agar total amount user ne add nahi kia to auto total ho kar add hojae ga...
    if (!totalAmount || totalAmount === 0) {
      totalAmount = items.reduce((sum, item) => {
        return sum + item.quantity * item.price;
      }, 0);
    }

    //vendor ko find karenge agar vendor already exist karta hai to vendors k data me existing vendor ka bill data update hoga otherwise new vendor create hoga...
    // let vendor = await Vendor.findOne({ vendorName });

    // if (!vendor) {
    //   vendor = new Vendor({ vendorName });
    //   await vendor.save();
    // }

    const bill = new VendorBill({
      vendorName: vendor._id,
      items: billItems,
      totalAmount,
      billNumber,
    });

    const newBill = await bill.save();

    vendor.vendorBills.push(newBill._id);
    vendor.currentBalance += totalAmount;
    vendor.totalTurnover += totalAmount;
    await vendor.save();

    return successHandler(res, 200, "Vendor Bill added Successfully", newBill);
  } catch (error) {
    return errorHandler(res, 400, error?.message);
  }
};

export const getAllVendorBills = async (req, res) => {
  try {
    const { billNumber, vendorName, date } = req.query;

    // const vendor = await Vendor.findOne({ vendorName: new RegExp(vendorName, "i") });

    let filters = {};
    // if(vendor){
    //   filters.vendorName = vendor._id
    // }

    if (billNumber) {
      filters.billNumber = billNumber;
    }
    if (vendorName) {
      const vendors = await Vendor.find({
        vendorName: { $regex: vendorName, $options: "i" },
      }).select("_id");

      const vendorIds = vendors.map((v) => v._id);
      filters.vendorName = { $in: vendorIds };
    }

    if (date) {
      filters.date = new Date(date);
    }

    const vendorBills = await VendorBill.find(filters).populate(
      "vendorName",
      "vendorName"
    );

    if (!vendorBills || vendorBills.length === 0) {
      return errorHandler(res, 400, "No data in Vendor Bills");
    }

    return successHandler(
      res,
      200,
      "VendorBills Fetched Successfully",
      vendorBills
    );
  } catch (error) {
    return errorHandler(
      res,
      400,
      "Something went wrong during fetch vendor bills"
    );
  }
};

// get single vendor bill by id
export const getSingleVendorBill = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return errorHandler(res, 400, "vendor bill not available!");
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return errorHandler(res, 400, "Invalid Vendor Bill ID");
    }

    const vendorBill = await VendorBill.findById(id).populate(
      "vendorName",
      "vendorName"
    );

    if (!vendorBill) {
      return errorHandler(res, 404, "No bills found for this vendor");
    }

    return successHandler(
      res,
      200,
      "Vendor Bill fetched successfully",
      vendorBill
    );
  } catch (error) {
    return errorHandler(res, 500, error?.message);
  }
};

//delete vendor bill by id
export const deleteVendorBill = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return errorHandler(res, 400, "Invalid Vendor Bill ID");
    }

    
    const deletedVendorBill = await VendorBill.findByIdAndDelete(id);
    if (!deletedVendorBill) {
      return errorHandler(res, 404, "Vendor bill not found");
    }

    for(let item of deletedVendorBill.items){
      let product = await Products.findById(item.product)
      if(product){
        product.quantity -= item.quantity
        await product.save()
      }
    }

    let vendor = await Vendor.findById(deletedVendorBill.vendorName);
    if(vendor){
      vendor.vendorBills = vendor.vendorBills.filter(b => !b.equals(deletedVendorBill._id))
      vendor.currentBalance -= deletedVendorBill.totalAmount;
      vendor.totalTurnover -= deletedVendorBill.totalAmount;
      await vendor.save()
    }

    return successHandler(
      res,
      200,
      "Vendor bill Deleted successfully",
      deletedVendorBill
    );
  } catch (error) {
    return errorHandler(res, 500, "Something went wrong");
  }
};


//update vendor bill
export const updateVendorBill = async (req, res) => {
  try {
    const { id } = req.params;

   if (!mongoose.Types.ObjectId.isValid(id)) {
      return errorHandler(res, 400, "Invalid Vendor Bill ID");
    }


    const vendorBill = await VendorBill.findById(id);
    if(!vendorBill){
      return errorHandler(res, 404, "Bill Not Found")
    }

    const updatedBillData = req.body;


    const updatedBill = await VendorBill.findByIdAndUpdate(id, updatedBillData, { new : true, runValidators : true})

    if(!updatedBill) {
      return errorHandler(res, 404, "Bill Not updated")
    }

    return successHandler(res, 200, "Vendor bill updated successfully", updatedBill)

  } catch (error) {
    return errorHandler(res, 400, error?.message)
  }
};


// export const updateVendorBill = async (req, res) => {
//   try {
//     const { id } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return errorHandler(res, 400, "Invalid Vendor Bill ID");
//     }

//     const vendorBill = await VendorBill.findById(id);
//     if (!vendorBill) {
//       return errorHandler(res, 404, "Bill Not Found");
//     }

//     const updatedBillData = req.body;

//     // 1️⃣ Adjust product stock (reduce old items)
//     for (let item of vendorBill.items) {
//       let product = await Products.findById(item.product);
//       if (product) {
//         product.stockInHand -= item.quantity;
//         if (product.stockInHand < 0) product.stockInHand = 0;
//         await product.save();
//       }
//     }

//     // 2️⃣ Update the bill
//     const updatedBill = await VendorBill.findByIdAndUpdate(id, updatedBillData, { 
//       new: true, 
//       runValidators: true 
//     });

//     // 3️⃣ Adjust product stock (add new items)
//     for (let item of updatedBill.items) {
//       let product = await Products.findById(item.product);
//       if (product) {
//         product.stockInHand += item.quantity;
//         await product.save();
//       }
//     }

//     // 4️⃣ Update vendor balances
//     let vendor = await Vendor.findById(updatedBill.vendorName);
//     if (vendor) {
//       // remove old total, add new total
//       vendor.currentBalance = vendor.currentBalance - vendorBill.totalAmount + updatedBill.totalAmount;
//       vendor.totalTurnover = vendor.totalTurnover - vendorBill.totalAmount + updatedBill.totalAmount;
//       await vendor.save();
//     }

//     return successHandler(res, 200, "Vendor bill updated successfully", updatedBill);

//   } catch (error) {
//     return errorHandler(res, 400, error?.message);
//   }
// };
