import CustomerPayments from "../models/customerPaymentModel.js";
import VendorPayments from "../models/vendorPaymentModel.js";
import { errorHandler, successHandler } from "../utils/responseHandler.js";
import Customer from "../models/customerModel.js"
import Vendor from "../models/vendorModel.js"

export const getAllPayments = async (req, res) => {
  try {
    const { name, type, page = 1, limit = 10 } = req.query;

    let customerFilter = {};
    let vendorFilter = {};

    let customerPayments = await CustomerPayments.find(customerFilter)
      .populate("customerId", "customerName")
      .sort({ date: -1 })
      .lean();
    let vendorPayments = await VendorPayments.find(vendorFilter)
      .populate("vendorId", "vendorName")
      .sort({ date: -1 })
      .lean();

    if (name) {
      const regex = new RegExp(name, "i");
      customerPayments = customerPayments.filter((p) =>
        p.customerId?.customerName?.match(regex)
      );
      vendorPayments = vendorPayments.filter((p) =>
        p.vendorId?.vendorName?.match(regex)
      );
    }
    //merge both payments
    const allPayments = [
      ...customerPayments.map((p) => ({
        ...p,
        type: "customer",
        name: p.customerId ? p.customerId.customerName : "Unknown Customer",
      })),
      ...vendorPayments.map((p) => ({
        ...p,
        type: "vendor",
        name: p.vendorId ? p.vendorId.vendorName : "Unknown Vendor",
      })),
    ].sort((a, b) => new Date(b.date) - new Date(a.date));

    const total = allPayments.length;

    const startIndex = (page - 1) * limit;
    const paginatedpayments = allPayments.slice(
      startIndex,
      startIndex + parseInt(limit)
    );

    return successHandler(res, 200, "Fetched all payments successfully", {
      payments: paginatedpayments,
      total,
      page: Number(page),
      limit: Number(limit),
    });
  } catch (error) {
    return errorHandler(res, 500, error?.message);
  }
};



export const deletePayment = async (req, res) => {
  const {id, type} = req.params;

  if(!id || !type){
    return errorHandler(res, 404, "Missing id or type");
  };

  try {
    if(type === "customer"){
      const payment = await CustomerPayments.findById(id);
      if(!payment){
        return errorHandler(res, 404, "Payment not found")
      };

      const customer = await Customer.findById(payment.customerId);
      if(customer){
        customer.currentBalance += payment.amount;
        customer.totalRecieved -= payment.amount;
        customer.payments.pull(payment._id)
        await customer.save();
      }

      await CustomerPayments.findByIdAndDelete(id);
    }else if(type === "vendor"){
      const payment = await VendorPayments.findById(id);
      if(!payment){
        return errorHandler(res, 404, "Payment not found");
      };

      const vendor = await Vendor.findById(payment.vendorId);
      if(vendor){
        vendor.currentBalance += payment.amount;
        vendor.totalPaid -= payment.amount;
        vendor.payments.pull(payment._id);
        await vendor.save();
      }

      await VendorPayments.findByIdAndDelete(id);
    }else{
      return errorHandler(res, 400, "Invalid payment type");
    };
    
    return successHandler(res, 200, "Payment deleted successfully");

  } catch (error) {
    return errorHandler(res, 500, error?.message);
  }
};