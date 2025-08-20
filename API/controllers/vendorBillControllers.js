import { errorHandler, successHandler } from "../utils/responseHandler.js";
import VendorBill from "../models/vendorBillModel.js";
import Vendor from "../models/vendorModel.js";
import Products from "../models/productModel.js";

export const addVendorBill = async (req, res) => {
  try {
    //bill aya vendorname aur items destructure kia
    const { vendorName, items } = req.body;
    //total amount destructure kia
    let { totalAmount } = req.body;
    //aagar vendorname aur items nahi hai to return error
    if (!vendorName || !items) {
      return errorHandler(res, 400, "Missing Fields");
    }

    // billITems ka empty array create kia
    let billItems = [];
    
    //jo Items user ne add kiye vendor bill k un per loop chala kar check kia agar Prodcuts k data me already item exist karta hai to Product k data me us ki quantity update ki agar nahi hai to naya product create kia Product data me... 
    for (let item of items) {
      let product = await Products.findOne({ productName: item.productName });

      if (!product) {
        product = await Products.create({
          productName: item.productName,
          purchasePrice: item.price,
          stockInHand : item.quantity,
          salePrice : item.salePrice
        });
      }else {
        product.stockInHand += item.quantity
        await product.save()
      }
      //bill Items k array me 
      billItems.push({
        product: product._id,
        productName : item.productName,
        quantity: item.quantity,
        price: item.price,
      });
    }

    //agar total amount user ne add nahi kia to auto total ho kar add hojae ga...
    if (!totalAmount || totalAmount === 0) {
      totalAmount = items.reduce((sum, item) => {
        return sum + item.quantity * item.price;
      }, 0);
    }

    //vendor ko find karenge agar vendor already exist karta hai to vendors k data me existing vendor ka bill data update hoga otherwise new vendor create hoga...
    let vendor = await Vendor.findOne({ vendorName });

    if (!vendor) {
      vendor = new Vendor({ vendorName });
      await vendor.save();
    }

    const bill = new VendorBill({
      vendorName,
      items: billItems,
      totalAmount,
    });

    const newBill = await bill.save();

    vendor.vendorBills.push(newBill._id);
    vendor.balance += totalAmount;
    vendor.totalTurnover += totalAmount;
    await vendor.save();

    return successHandler(res, 200, "Vendor Bill added Successfully", newBill);
  } catch (error) {
    return errorHandler(res, 400, "Error in Add Vendor Bill");
  }
};
