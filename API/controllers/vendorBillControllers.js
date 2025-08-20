import { errorHandler, successHandler } from "../utils/responseHandler"
import VendorBill from '../models/vendorBillModel.js'



export const addVendorBill = async (req, res) => {
    try {
    const {vendorName, items} = req.body;
    let { totalAmount } = req.body;
    if(!vendorName || !items){
        return errorHandler(res, 400, "Missing Fields")
    }

    if(!totalAmount || totalAmount === 0) {
      totalAmount = items.reduce((sum, item) => {
        return sum + (item.quantity * item.price);
      }, 0);
    }

    const bill = new VendorBill({
        vendorName,
        items,
        totalAmount
    })

    const newBill = await bill.save()

    return successHandler(res, 200, "Vendor Bill added Successfully", newBill)

    } catch (error) {
        return errorHandler(res, 400, "Error in Add Vendor Bill")
    }
}