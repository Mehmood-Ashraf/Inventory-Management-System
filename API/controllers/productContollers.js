import { errorHandler, successHandler } from "../utils/responseHandler.js";
import Product from "../models/productModel.js";
import Vendors from "../models/vendorModel.js";
import Company from "../models/companyModel.js";
import Category from "../models/categoryModel.js";

export const addProduct = async (req, res) => {
  try {
    let {
      productName,
      companyName,
      vendorName,
      modelName,
      category,
      purchasePrice,
      sellPrice,
      quantity,
    } = req.body;

    if (!productName || !purchasePrice) {
      return errorHandler(res, 400, "Required Fields not available");
    }

    if (companyName && typeof companyName === "string") {
      let company = await Company.findOne({ companyName: companyName });
      if (!company) {
        company = await Company.create({ companyName: companyName });
      }
      companyName = company._id;
    }

    // convert category into ObjectId
    if (category && typeof category === "string") {
      let cat = await Category.findOne({ categoryName: category });
      if (!cat) {
        cat = await Category.create({ categoryName: category });
      }
      category = cat._id;
    }

    // convert vendorName in to ObjectId
    if (vendorName && typeof vendorName === "string") {
      let vendor = await Vendors.findOne({ vendorName: vendorName });
      if (!vendor) {
        vendor = await Vendors.create({ vendorName: vendorName });
      }
      vendorName = vendor._id;
    }

    const existingProduct = await Product.findOne({
      productName,
      companyName,
      modelName,
    });

    if (existingProduct) {
      existingProduct.quantity += quantity;
      await existingProduct.save();

      return successHandler(
        res,
        200,
        "Product quantity updated Successfully",
        existingProduct
      );
    }

    const newProduct = new Product({
      productName,
      companyName,
      category,
      modelName,
      vendorName,
      purchasePrice,
      sellPrice,
      quantity,
    });

    await newProduct.save();

    return successHandler(res, 200, "Product addedd Successfully", newProduct);
  } catch (error) {
    return errorHandler(res, 400, error);
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const { productName, companyName, id, category } = req.query;

    let filters = {};

    if (productName)
      filters.productName = { $regex: productName, $options: "i" };
    if (id) filters.id = id;
    if (companyName)
      filters.companyName = { $regex: companyName, $options: "i" };
    if (category) filters.category = category;

    const products = await Product.find(filters).populate("companyName");

    if (!products || products.length == 0) {
      return errorHandler(res, 400, "No products found with given details");
    }

    return successHandler(
      res,
      200,
      "All Products Fetched Successfully",
      products
    );
  } catch (error) {
    return errorHandler(res, 400, error);
  }
};

export const getLowStockProducts = async (req, res) => {
  try {
    const lowStockQuantity = req.query.quantity || 10;

    const lowStockProducts = await Product.find({
      quantity: { $lt: lowStockQuantity },
    });

    return successHandler(
      res,
      200,
      "Low stock Products Fetched Successfully",
      lowStockProducts
    );
  } catch (error) {
    return errorHandler(res, 400, error?.message);
  }
};

export const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return errorHandler(res, 400, "Invalid Product ID");
    }

    const singleProduct = await Product.findById(id);
    if (!singleProduct) {
      return errorHandler(res, 404, "Product not found by given ID");
    }

    return successHandler(
      res,
      200,
      "Product fetched successfully",
      singleProduct
    );
  } catch (error) {
    return errorHandler(res, 500, error?.message);
  }
};
