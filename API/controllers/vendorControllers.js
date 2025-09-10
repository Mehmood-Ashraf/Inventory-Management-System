// import vendorModel from "../models/vendorModel"
import { errorHandler, successHandler } from "../utils/responseHandler.js";
import Vendor from "../models/vendorModel.js";

//add vendor
export const addVendor = async (req, res) => {
  const { vendorName, contact, address, city } = req.body;

  if (!vendorName) {
    return errorHandler(res, 400, "Missing vendor name");
  }

  const name = vendorName.trim().toLowerCase()

  const existingVendor = await Vendor.findOne({ vendorName : name });
  if (existingVendor) {
    return errorHandler(res, 409, "Vendor already Exist!!");
  }

  try {
    const newVendor = new Vendor({
      vendorName : name,
      contact,
      address,
      city,
      vendorBills: [],
    });

    const vendor = await newVendor.save();

    return successHandler(res, 200, "New Vendor Added", vendor);
  } catch (error) {
    console.log("error in addVendorController");
    return errorHandler(res, 500, error?.message);
  }
};

//get single vendor
export const getSingleVendor = async (req, res) => {
  try {
    const { id } = req.params;

    const vendor = await Vendor.findById(id)
      .populate("vendorBills")
      .populate("payments");
    if (!vendor) {
      return errorHandler(res, 404, "Vendor not found");
    }

    return successHandler(res, 200, "Vendor fetched successfully", vendor);
  } catch (error) {
    return errorHandler(res, 500, error);
  }
};

//get all vendors
export const getAllVendors = async (req, res) => {
  // console.log("Get all vendor chala")
  try {
    let filters = {};
    if (req.query?.vendorName) {
      filters.vendorName = { $regex: new RegExp(req.query.vendorName, "i") }; // case-insensitive partial
    }
    const vendors = await Vendor.find(filters).select(
      "vendorName contact balance"
    );
    if (!vendors || vendors.length === 0) {
      return errorHandler(res, 404, "No vendors found");
    }

    return successHandler(res, 200, "Vendors fetched successfully", vendors);
  } catch (error) {
    console.log("Error in get all vendors", error);
    return errorHandler(res, 500, "Vendors Fetched Failed");
  }
};

//delete vendor
export const deleteVendor = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedVendor = await Vendor.findByIdAndDelete(id);
    if (!deletedVendor) {
      return errorHandler(res, 404, "Vendor not found");
    }

    return successHandler(
      res,
      200,
      "Vendor Deleted successfully",
      deletedVendor
    );
  } catch (error) {
    return errorHandler(res, 500, "Something went wrong");
  }
};

export const updateVendor = async (req, res) => {
  try {
    const { id } = req.params;

    const updateData = req.body;

    const updatedVendor = await Vendor.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedVendor) {
      return errorHandler(res, 404, "Vendor not found!");
    }

    return successHandler(
      res,
      200,
      "Vendor updated successfully",
      updatedVendor
    );
  } catch (error) {
    return errorHandler(res, 500, error?.message);
  }
};
