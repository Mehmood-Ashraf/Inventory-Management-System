import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/api";

const initialState = {
  allCustomerBills: [],
  singleCustomerBills: [],
  singleBill: null,
  addSingleBill : null,
  loading: false,
  error: null,
};

export const fetchAllCustomerBills = createAsyncThunk(
  "customerBills/fetchAllCustomerBills",
  async (filters = {}, thunkApi) => {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const res = await api.get(`/customer-bill/all?${queryParams}`)
      return res?.data?.data
    } catch (error) {
        return thunkApi.rejectWithValue(error?.response?.data?.message || "Error Fetching all customer bills")
    }
  }
);

export const addCustomerBill = createAsyncThunk(
  "customerBills/addCustomerBill",
  async (billDetails, thunkApi) => {
    try {
      const res = await api.post(`/customer-bill/add`, billDetails)
      return res?.data?.data
    } catch (error) {
      return thunkApi.rejectWithValue(error?.response?.data?.message || "Something went wrong in addBill")
    }
  }
    

);


const customerBillsSlice = createSlice({
    name : "customerBills",
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder.addCase(fetchAllCustomerBills.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchAllCustomerBills.fulfilled, (state, action) => {
            state.loading = false;
            state.allCustomerBills = action.payload;
        })
        .addCase(fetchAllCustomerBills.rejected, (state, action) => {
            state.loading = false;
            state.allCustomerBills = [];
            state.error = action.payload
        })
        .addCase(addCustomerBill.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(addCustomerBill.fulfilled, (state, action) => {
          state.loading = false;
          state.addSingleBill = action.payload;
          state.error = null
        })
        .addCase(addCustomerBill.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload
        })
    }
})


export default customerBillsSlice.reducer