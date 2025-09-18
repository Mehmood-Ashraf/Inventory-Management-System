import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../slice/authSlice'
import vendorReducer from '../slice/vendorSlice'
import customerReducer from '../slice/customersSlice'
import productReducer from '../slice/productSlice'
import customerBillsReducer from '../slice/customerBillSlice'
import salesReducer from '../slice/salesSlice'
import paymentReducer from '../slice/paymentSlice'

export const store = configureStore({
    reducer : {
        auth : authReducer,
        vendor : vendorReducer,
        customer : customerReducer,
        product : productReducer,
        customerBills : customerBillsReducer,
        sales : salesReducer,
        payment : paymentReducer
        // vendorBills : 
    }
})