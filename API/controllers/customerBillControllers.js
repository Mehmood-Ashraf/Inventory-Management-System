import { errorHandler, successHandler } from "../utils/responseHandler.js";
import Product from "../models/productModel.js";
import CustomerBill from "../models/customerBillModel.js";
import Customer from "../models/customerModel.js";
import CustomerPayments from "../models/customerPaymentModel.js"
import mongoose from "mongoose";

export const addCustomerBill = async (req, res) => {
  try {
    // request body se customerType, customerName aur items ko destructure kar rahe hain
    const { customerType, customerName, items, date, paymentType } = req.body;

    // agar ye tino fields body me na milein to error return kar do
    if (!customerType || !customerName || !items || !paymentType) {
      return errorHandler(res, 400, "Missing Fields");
    }

    let finalDate;
    if (date) {
      // frontend se string aayi hai to wahi store karo
      finalDate = date;
    } else {
      // agar nahi aayi to backend khud string banaye
      finalDate = new Date().toISOString().split("T")[0];
    }

    // updated items ki array banayi jisme final processed items push karenge
    let updatedItems = [];
    // total bill ka amount calculate karne ke liye variable
    let totalAmount = 0;

    // har item ke liye loop chalaya
    for (let i of items) {
      // product ko database se find kar rahe hain id ke basis par
      const product = await Product.findOne({
        productName: { $regex: new RegExp(`^${i.product}$`, "i") },
      });
      if (!product) {
        // agar product na mile to error return
        return errorHandler(res, 400, "Product not found");
      }

      if (i.quantity <= 0) {
        return errorHandler(
          res,
          400,
          `Invalid quantity for Product: ${product.productName}`
        );
      }

      //agar stock available na ho ya quantity se kam ho
      if (product.quantity < i.quantity) {
        return errorHandler(
          res,
          400,
          `Not enough stock for Product: ${product.productName}`
        );
      }

      const price = i.price || product.sellPrice;

      // har item ka total price calculate karna (quantity * price)
      // agar frontend se total aa gaya hai to use karenge warna calculate karenge
      const itemTotal = i.total || price * i.quantity;

      // stock update karna (jitni quantity le li gayi utni kam karni)
      product.quantity -= i.quantity;
      await product.save();

      // updatedItems array me processed item push karna
      updatedItems.push({
        product: product._id,
        quantity: i.quantity,
        price,
        total: itemTotal,
      });

      // total bill amount me is item ka total add karna
      totalAmount += itemTotal;
    }

    //last bill number check karna
    const lastBill = await CustomerBill.findOne().sort({ createdAt: -1 });
    let newBillNumber = "001";

    if (lastBill) {
      const lastNumber = parseInt(lastBill.billNumber, 10);
      const nextNumber = (lastNumber + 1).toString().padStart(3, "0");
      newBillNumber = `${nextNumber}`;
    }

    let customerId = null;
    if (customerType === "regular") {
      const customer = await Customer.findOne({ customerName });
      if (customer) {
        customerId = customer._id;
      }
    }

    let finalPaymentType = paymentType;

    if(customerType === "walkin"){
      finalPaymentType = "cash";
    }

    // naya bill object banaya CustomerBill model ke through
    const newBill = new CustomerBill({
      customerType,
      customerId,
      customerName,
      items: updatedItems,
      billNumber: newBillNumber,
      totalAmount,
      date: finalDate,
      paymentType : finalPaymentType
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
        customer.currentBalance += totalAmount;
        customer.totalTurnover += totalAmount
        await customer.save();
      }
    }

    return successHandler(res, 200, "Bill added successfully");
  } catch (error) {
    return errorHandler(res, 400, error?.message);
  }
};

// get all customers bills
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
    const customerBills = await CustomerBill.find(filters).sort({date : -1});

    if (!customerBills || customerBills.length === 0) {
      return errorHandler(res, 400, "No data in customer Bills");
    }

    return successHandler(
      res,
      200,
      "Customer bills fetched successfully",
      customerBills
    );
  } catch (error) {
    return errorHandler(res, 400, error?.message);
  }
};

//get singleCustomerBill
export const getSingleCustomerBill = async (req, res) => {
  try {
    const { id } = req.params;

    const singleBill = await CustomerBill.findById(id).populate(
      "items.product"
    );
    if (!singleBill) {
      return errorHandler(res, 400, "Bill not found by given ID");
    }

    return successHandler(res, 200, "Bill Found", singleBill);
  } catch (error) {
    return errorHandler(res, 400, error?.message);
  }
};

export const getSingleCustomerBills = async (req, res) => {
  try {
    const { id } = req.params;

    const bills = await CustomerBill.find({ customerId: id });
    if (!bills || bills.length === 0) {
      return errorHandler(res, 400, "Customer Bills Not found");
    }

    return successHandler(res, 200, "Single customer Bills fetched", bills);
  } catch (error) {
    return errorHandler(res, 400, error?.message);
  }
};

//Delete customer bill handler
export const deleteCustomerBill = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return errorHandler(res, 400, "Invalid Vendor Bill ID");
    }

    const deletedBill = await CustomerBill.findByIdAndDelete(id);

    if (!deletedBill) {
      return errorHandler(res, 400, "Bill not found!");
    }

    for (let item of deletedBill.items) {
      let product = await Product.findById(item.product);
      if (product) {
        product.quantity += item.quantity;
        await product.save();
      }
    }

    let customer = await Customer.findById(deletedBill.customerId);
    if (customer) {
      customer.customerBills = customer.customerBills.filter(
        (bill) => !bill.equals(deletedBill._id)
      );
      customer.currentBalance -= deletedBill.totalAmount;
      customer.totalTurnover -= deletedBill.totalAmount;
      await customer.save();
    }

    return successHandler(res, 200, "BIll Deleted Successfully", deletedBill);
  } catch (error) {
    return errorHandler(res, 400, error?.message);
  }
};


export const getTodaysSale = async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];

    const todaysBills = await CustomerBill.find({
      paymentType : "cash",
      date : today
    })

    const todayBillsSale = todaysBills.reduce((acc, bill) => acc + bill.totalAmount, 0)

    const todaysPayments = await CustomerPayments.find({ date : {
      $gte : new Date(today),
      $lte : new Date(new Date(today).setDate(new Date(today).getDate() + 1))
    }});

    const todaysReceivedPayments = todaysPayments.reduce(
      (acc, payment) => acc + payment.amount,
      0
    );

    const todaysSale = todayBillsSale + todaysReceivedPayments


    return successHandler(res, 200, "Todays Sale fetched Successfully", {
      todaysSale : todaysSale,
      billsTotal : todayBillsSale
      ,
      paymentsTotal : todaysReceivedPayments 
    })
  } catch (error) {
    return errorHandler(res, 500, error?.message)
  }
};