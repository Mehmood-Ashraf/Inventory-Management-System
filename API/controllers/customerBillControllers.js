import { errorHandler } from "../utils/responseHandler";

export const addCustomerBill = (req, res) => {
    try {
        const {customerType, customerName, items} = req.body;
        if(!customerType || !customerName || !items){
            return errorHandler(res, 400, "Missing Fields")
        }



    } catch (error) {
        
    }
}
