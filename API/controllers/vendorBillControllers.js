import { errorHandler, successHandler } from "../utils/responseHandler.js";
import VendorBill from "../models/vendorBillModel.js";
import Vendor from "../models/vendorModel.js";
import Products from "../models/productModel.js";

export const addVendorBill = async (req, res) => {
  try {
    const { vendorName, items } = req.body;
    let { totalAmount } = req.body;
    if (!vendorName || !items) {
      return errorHandler(res, 400, "Missing Fields");
    }

    let billItems = [];

    for (let item of items) {
      let product = await Products.findOne({ name: item.productName });

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

      billItems.push({
        product: product._id,
        productName : item.productName,
        quantity: item.quantity,
        price: item.price,
      });
    }

    if (!totalAmount || totalAmount === 0) {
      totalAmount = items.reduce((sum, item) => {
        return sum + item.quantity * item.price;
      }, 0);
    }

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

    return successHandler(res, 200, "Vendor Bill added Successfully", newBill);
  } catch (error) {
    return errorHandler(res, 400, "Error in Add Vendor Bill");
  }
};
