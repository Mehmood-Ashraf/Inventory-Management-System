import Customer from "../models/customerModel.js";
import CustomerPayments from "../models/customerPaymentModel.js";
import { errorHandler, successHandler } from "../utils/responseHandler.js";

export const addCustomerPayment = async (req, res) => {
  const { customerName, amount, method, note, date } = req.body;

  if (!amount || !method) {
    return errorHandler(res, 404, "Amount or method missing");
  }

  try {
    const customer = await Customer.findOne({
      customerName: { $regex: `^${customerName}$`, $options: "i" },
    });
    if (!customer) {
      return errorHandler(res, 404, "Customer not found by given ID");
    }

    amount = Number(amount);

    const newPayment = new CustomerPayments({
      customerId: customer._id,
      amount,
      method,
      note,
      date,
    });

    await newPayment.save();

    customer.previousBalance = customer.currentBalance;
    customer.currentBalance -= amount;
    customer.totalRecieved = (customer.totalRecieved || 0) + amount;
    customer.payments.push(newPayment._id);
    await customer.save();

    return successHandler(res, 200, "Customer payment added successfully", {
      payment: newPayment,
      customer,
    });
  } catch (error) {
    return errorHandler(res, 500, error?.message);
  }
};

export const getAllCustomerPayments = async (req, res) => {
  try {
    const { name } = req.query;
    let filters = {};

    if (name) {
      const customer = await Customer.findOne({
        customerName: { $regex: name, $options: "i" },
      });

      if (!customer) {
        return errorHandler(res, 404, "Customer not found");
      }

      const payments = await CustomerPayments.find({
        customerId: customer._id,
      }).populate("customerId", "customerName").sort({date : -1});
      if (!payments || payments.length === 0) {
        return errorHandler(res, 404, "Payments not found for this customer");
      }

      const formattedPayments = payments.map((p) => ({
        _id : p._id,
        amount: p.amount,
        method: p.method,
        date: p.date,
        createdAt: p.createdAt,
        updatedAt: p.updatedAt,
        customerName: p.customerId?.customerName || null,
      }))

      return successHandler(
        res,
        200,
        "Customer payments fetched successfully",
        formattedPayments
      );
    }

    const allPayments = await CustomerPayments.find().populate(
      "customerId",
      "customerName"
    ).sort({createdAt : -1})

    const formattedAllPayments = allPayments.map((p) => ({
      _id: p._id,
      amount: p.amount,
      method: p.method,
      date: p.date,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
      customerName: p.customerId?.customerName || null,
    }));

    return successHandler(
      res,
      200,
      "All customer payments fetched successfully",
      formattedAllPayments
    );
  } catch (error) {
    return errorHandler(res, 500, error?.message);
  }
};


export const updateCustomerPayment = async (req, res) => {
  try {
    const {id} = req.params;
    const {customerName, amount, method, note, date} = req.body;

    const payment = await CustomerPayments.findById(id);

    if(!payment){
      return errorHandler(res, 404, "Payment not found");
    }

    const customer = await Customer.findById(payment.customerId);
    if(!customer){
      return errorHandler(res, 404, "Customer not found");
    }

    customer.currentBalance += payment.amount;
    customer.totalRecieved -= payment.amount;

    payment.amount = amount ?? payment.amount;
    payment.date = date ?? payment.date;
    payment.method = method ?? payment.method;
    payment.note = note ?? payment.note;

    await payment.save();

    customer.currentBalance -= amount;
    customer.totalRecieved += amount;
    await customer.save();

    return successHandler(res, 200, "Payment updated Successfully", payment);

  } catch (error) {
    return errorHandler(res, 400, error?.message);
  }
};


export const deleteCustomerPayment = async (req, res) => {
  try {
    const {id} = req.params;

    const payment = await CustomerPayments.findById(id);

    if(!payment){
      return errorHandler(res, 404, "Payment not found!")
    }

    const deletedPayment = await CustomerPayments.findByIdAndDelete(id);

    const customer = await Customer.findOne(deletedPayment.customerId);
    customer.currentBalance = customer.currentBalance + deletedPayment.amount;
    customer.totalRecieved = customer.totalRecieved - deletedPayment.amount;
    customer.payments = customer.payments.filter((p) => !p.equals(deletedPayment._id))
    await customer.save();

    return successHandler(res, 200, "Payment deleted successfully", deletedPayment)


  } catch (error) {
    return errorHandler(res, 400, error?.message)
  }
}