import Vendor from "../models/vendorModel.js";
import vendorPayments from "../models/vendorPaymentModel.js";
import { errorHandler, successHandler } from "../utils/responseHandler.js";

export const addVendorPayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, method, note } = req.body;

    if (!amount || !method) {
      return errorHandler(res, 400, "Payment amount or method missing!");
    }
    const vendor = await Vendor.findById(id);

    if (!vendor || Vendor.isDeleted) {
      return errorHandler(res, 400, "Vendor not found");
    }

    const newPayment = new vendorPayments({
      vendorName: id,
      amount,
      method,
      note,
    });

    await newPayment.save();

    //vendor ka current balance update kia
    vendor.currentBalance = vendor.currentBalance - amount;
    vendor.totalPaid = vendor.totalPaid + amount;
    //payment ki id push ki vendor me
    vendor.payments.push(newPayment._id);
    await vendor.save();

    return successHandler(res, 201, "Vendor payment added successfully", {
      payment: newPayment,
      vendor,
    });
  } catch (error) {
    return errorHandler(res, 400, error?.message);
  }
};

export const getAllVendorPayments = async (req, res) => {
  try {
    const { vendorName, vendorId } = req.query;

    let vendor = null;
    let filters = {};
    if (vendorId) {
      vendor = await Vendor.findById(vendorId).select("vendorName");
      if (!vendor) {
        return errorHandler(res, 404, "Vendor not found!");
      }
      filters.vendorName = vendor._id;
    } else if (vendorName) {
      vendor = await Vendor.findOne({
        vendorName: { $regex: ".*" + vendorName + ".*", $options: "i" },
        isDeleted: false,
      }).select("vendorName");
      if (!vendor) {
        return errorHandler(res, 400, "Vendor not found!");
      }
      filters.vendorName = vendor._id;
    }

    const allVendorPayments = await vendorPayments
      .find(filters)
      .populate("vendorName", "vendorName");

    return successHandler(res, 200, "Vendor Payments fetched successfully", {
      allVendorPayments,
      vendor,
    });
  } catch (error) {
    return errorHandler(res, 400, error?.message);
  }
};

export const getSingleVendorPayment = async (req, res) => {
  try {
    const { paymentId } = req.params;
    console.log(paymentId);

    const payment = await vendorPayments
      .findById(paymentId)
      .populate("vendorName", "vendorName");
    if (!payment) {
      return errorHandler(res, 404, "Payment not found");
    }

    return successHandler(
      res,
      200,
      "Vendor payment fetched successfully",
      payment
    );
  } catch (error) {
    return errorHandler(res, 400, error?.message);
  }
};

export const deleteVendorPayment = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const payment = await vendorPayments.findById(paymentId);
    if (!payment) {
      return errorHandler(res, 404, "Payment not found");
    }
    console.log(payment, "Payment");

    const paymentAmount = payment.amount;
    console.log(paymentAmount, "Payment Amount");
    const vendor = await Vendor.findById(payment.vendorName);
    console.log(vendor, "Vendor");
    if (!vendor) {
      return errorHandler(res, 404, "Vendor not found");
    }
    vendor.currentBalance += paymentAmount;
    vendor.totalPaid -= paymentAmount;

    vendor.payments = vendor.payments.filter(
      (p) => p.toString() !== paymentId.toString()
    );

    await vendor.save();

    await payment.deleteOne();

    return successHandler(res, 200, "Payment Deleted successfully", {
      vendorBalance: vendor.currentBalance,
      vendor,
    });
  } catch (error) {
    return errorHandler(res, 400, error?.message);
  }
};

export const updateVendorPayment = async (req, res) => {
  try {
    const { paymentId } = req.params;

    const { amount, method, note } = req.body;

    //jis payment ko update karna hai us ki details
    const payment = await vendorPayments.findById(paymentId);
    if (!payment) {
      return errorHandler(res, 404, "payment not found!");
    }

    // pehle jo payment amount thi 
    const oldAmount = payment.amount
    // vendor jis ki payment update karni hai
    const vendor = await Vendor.findById(payment.vendorName);
    if (!vendor) {
      return errorHandler(res, 404, "Vendor not found");
    }


    vendor.currentBalance += oldAmount;
    vendor.totalPaid -= oldAmount

    vendor.currentBalance -= amount
    vendor.totalPaid += amount;

    await vendor.save();

    payment.amount = amount
    payment.method = method
    payment.note = note

    await payment.save()

    return successHandler(res, 200, "Payment update successfully", {
        payment,
        vendorBalance : vendor.currentBalance,
        vendor
    });
  } catch (error) {
    return errorHandler(res, 400, error?.message);
  }
};
