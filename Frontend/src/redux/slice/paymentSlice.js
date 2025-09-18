import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/api";

const initialState = {
  allPayments: [],
  customerPayments: [],
  vendorPayments: [],
  singleCustomerPayment: null,
  singleVendorPayment: null,
  loading: false,
  error: null,
};

export const fetchAllPayments = createAsyncThunk(
  "payment/fetchAllPayments",
  async (searchInput = "", thunkAPI) => {
    try {
      const query = searchInput ? `?name=${searchInput}` : "";
      const res = await api.get(`/payments/all${query}`);
      return res?.data?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Error fetching All payments"
      );
    }
  }
);

export const fetchAllCustomerPayments = createAsyncThunk(
  "payment/fetchCustomerPayments",
  async (searchInput, thunkAPI) => {
    try {
      const query = searchInput ? `?name=${searchInput}` : "";
      const res = await api.get(`/customer-payment/all${query}`);
      return res?.data?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Error fetching All payments"
      );
    }
  }
);

export const addCustomerPayment = createAsyncThunk(
  "payment/addCustomerPayment",
  async (paymentData, thunkAPI) => {
    try {
      const res = await api.post(`/customer-payment/add`, paymentData);
      const payment = res?.data?.data?.payment;
      const customer = res?.data?.data?.customer;
      return {
        _id: payment._id,
        date: payment.date || payment.createdAt,
        amount: payment.amount,
        method: payment.method,
        name: customer.customerName,
        type: "customer",
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Error adding customer payment"
      );
    }
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addCustomerPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCustomerPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.allPayments = [action.payload, ...state.allPayments];
        if (action.payload.type === "customer") {
          state.customerPayments = [action.payload, ...state.customerPayments];
        }
        state.error = null;
      })
      .addCase(addCustomerPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllCustomerPayments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCustomerPayments.fulfilled, (state, action) => {
        state.loading = false;
        state.customerPayments = action.payload;
        state.error = null;
      })
      .addCase(fetchAllCustomerPayments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllPayments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllPayments.fulfilled, (state, action) => {
        state.loading = false;
        state.allPayments = action.payload;
        state.customerPayments = action.payload.filter(
          (p) => p.type === "customer"
        );
        state.vendorPayments = action.payload.filter(
          (p) => p.type === "vendor"
        );
        state.error = null;
      })
      .addCase(fetchAllPayments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default paymentSlice.reducer;