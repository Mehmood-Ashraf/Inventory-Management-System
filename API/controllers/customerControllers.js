import { errorHandler, successHandler } from "../utils/responseHandler.js";
import Customer from "../models/customerModel.js";

export const addCustomer = async (req, res) => {
  const { customerName, customerType, contact, address, city } = req.body;
  if (!customerName || !customerType) {
    return errorHandler(res, 404, "Missing Fields!");
  }
  try {
    const isExist = await Customer.findOne({ customerName });
    if (isExist) {
      return errorHandler(res, 400, "Customer already exist");
    }

    const newCustomer = new Customer({
      customerName,
      customerType,
      contact,
      address,
      city,
    });
    const customer = await newCustomer.save();

    return successHandler(res, 200, "Customer addedd successfully", customer);
  } catch (error) {
    return errorHandler(res, 400, error);
  }
};

export const getSingleCustomer = async (req, res) => {
  try {
    const { id } = req.params;

    const customer = await Customer.findByIdAndUpdate(id);
    if (!customer) {
      return errorHandler(res, 400, "Customer not found by given id");
    }

    return successHandler(res, 200, "Customer Fetched successfully", customer);
  } catch (error) {
    return errorHandler(
      res,
      400,
      "Something went wrong while fetching single customer"
    );
  }
};

export const getAllCustomers = async (req, res) => {
  try {
    const filters = {};

    if (req.query?.type) {
      filters.customerType = { $regex: new RegExp(req.query.type, "i") };;
    }

    if (req.query.city) {
      filters.city = { $regex: new RegExp(req.query.city, "i") };
    }

    if (req.query.customerName) {
      filters.customerName = { $regex: new RegExp(req.query.customerName, "i") }; // case-insensitive partial
    }

    const customers = await Customer.find(filters);
    if (!customers || customers.length === 0) {
      return errorHandler(res, 400, "No customers Found");
    }

    return successHandler(
      res,
      200,
      "Customers fetched successfully",
      customers
    );
  } catch (error) {
    return errorHandler(res, 400, error);
  }
};

export const deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCustomer = await Customer.findByIdAndDelete(id);
    if (!deletedCustomer) {
      return errorHandler(res, 400, "Customer not found by given id");
    }

    return successHandler(
      res,
      200,
      "Customer deleted successfully",
      deletedCustomer
    );
  } catch (error) {
    return errorHandler(
      res,
      400,
      "something went wrong while deleting customer"
    );
  }
};
