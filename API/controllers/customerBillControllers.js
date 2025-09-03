import { errorHandler, successHandler } from "../utils/responseHandler.js";
import Product from "../models/productModel.js";
import CustomerBill from "../models/customerBillModel.js";
import Customer from "../models/customerModel.js";

export const addCustomerBill = async (req, res) => {
  try {
    // request body se customerType, customerName aur items ko destructure kar rahe hain
    const { customerType, customerName, items } = req.body;

    // agar ye tino fields body me na milein to error return kar do
    if (!customerType || !customerName || !items) {
      return errorHandler(res, 400, "Missing Fields");
    }

    // updated items ki array banayi jisme final processed items push karenge
    let updatedItems = [];
    // total bill ka amount calculate karne ke liye variable
    let totalAmount = 0;

    // har item ke liye loop chalaya
    for (let i of items) {
      // product ko database se find kar rahe hain id ke basis par
      const product = await Product.findById(i.product);
      if (!product) {
        // agar product na mile to error return
        return errorHandler(res, 400, "Product not found");
      }

      //agar stock available na ho ya quantity se kam ho
      if (product.quantity < i.quantity) {
        return errorHandler(
          res,
          400,
          `Not enough stock for Product: ${product.productName}`
        );
      }

      // har item ka total price calculate karna (quantity * price)
      // agar frontend se total aa gaya hai to use karenge warna calculate karenge
      const itemTotal = i.total || i.price * i.quantity;

      // stock update karna (jitni quantity le li gayi utni kam karni)
      product.quantity -= i.quantity;
      await product.save();

      // updatedItems array me processed item push karna
      updatedItems.push({
        product: i.product,
        quantity: i.quantity,
        price: i.price,
        total: itemTotal,
      });

      // total bill amount me is item ka total add karna
      totalAmount += itemTotal;
    }

    // bill number unique banane ke liye timestamp ke sath generate karna
    const billNumber = "Bill-" + Date.now();
    // naya bill object banaya CustomerBill model ke through
    const newBill = new CustomerBill({
      customerType,
      customerName,
      items: updatedItems,
      billNumber,
      totalAmount,
    });

    // bill ko database me save kia
    const savedBill = await newBill.save();

    // agar customer type regular ho to uske record me bill ka id push karna hai
    if (customerType === "regular") {
      // customer ko find karna name ke basis par
      const customer = await Customer.findOne({ customerName: customerName });
      if (customer) {
        // uske bills array me savedBill ka id push karna
        customer.bills.push(savedBill._id);
        await customer.save();
      }
    }

    return successHandler(res, 200, "Bill added successfully");
  } catch (error) {
    return errorHandler(res, 400, error?.message);
  }
};

export const getAllCustomerBills = async (req, res) => {
  try {
    const { customerName, billNumber, date } = req.query;
    let filters = {};

    if (billNumber) {
      filters.billNumber = billNumber;
    }
    if (customerName) {
      filters.customerName = { $regex: customerName, $options: "i" };
    }
    if (date) {
      filters.date = new Date(date);
    }

    const customerBills = await CustomerBill.find(filters)

    if(!customerBills || customerBills.length === 0){
        return errorHandler(res, 400, "No data in customer Bills")
    }

    return successHandler(res, 200, "Customer bills fetched successfully", customerBills)
  } catch (error) {
    return errorHandler(res, 400, error?.message)
  }
};
