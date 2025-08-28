import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../slice/authSlice'
import vendorReducer from '../slice/vendorSlice'
import customerReducer from '../slice/customersSlice'


export const store = configureStore({
    reducer : {
        auth : authReducer,
        vendor : vendorReducer,
        customer : customerReducer
    }
})