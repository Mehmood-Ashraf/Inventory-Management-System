import CustomerPayments from "../models/customerPaymentModel.js";
import VendorPayments from "../models/vendorPaymentModel.js";
import { errorHandler, successHandler } from "../utils/responseHandler.js";

export const getAllPayments = async (req, res) => {
  try {
    const { name, type } = req.query;

    let customerFilter = {};
    let vendorFilter = {};

    if (name) {
      customerFilter = { customerName: { $regex: name, $options: "i" } };
      vendorFilter = { vendorName: { $regex: name, $options: "i" } };
    }

    let customerPayments = await CustomerPayments.find(customerFilter)
      .populate("customerId", "customerName")
      .sort({ date: -1 }) 
      .lean();
    let vendorPayments = await VendorPayments.find(vendorFilter)
      .populate("vendorId", "vendorName")
      .sort({ date: -1 }) 
      .lean();


      //merge both payments
      const allPayments = [
        ...customerPayments.map((p) => ({ ...p, type: "customer", name: p.customerId ? p.customerId.customerName : "Unknown Customer" })),
        ...vendorPayments.map((p) => ({ ...p, type: "vendor", name: p.vendorId ? p.vendorId.vendorName : "Unknown Vendor" })),
      ].sort((a,b) => new Date(b.date) - new Date(a.date))

      return successHandler(res, 200, "Fetched all payments successfully", allPayments)
  } catch (error) {
    return errorHandler(res, 500, error?.message)
  }
};