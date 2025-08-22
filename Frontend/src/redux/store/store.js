import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../slice/authSlice'
import vendorReducer from '../slice/vendorSlice'


export const store = configureStore({
    reducer : {
        auth : authReducer,
        vendor : vendorReducer
    }
})