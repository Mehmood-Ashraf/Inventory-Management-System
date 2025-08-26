import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

initialState = {
  allVendorBills: [],
  singleVendorBills: [],
  singleBill: null,
  loading: false,
  error: null,
};

export const fetchAllVendorBills = createAsyncThunk(
  "vendorBills/fetchAllVendorBills",
  async (filters = {}, thunkAPI) => {
    try {
      const queryParams = new URLSearchParams(filters).toString();

      const res = await api.get(`/vendor-bill/all?${queryParams}`);
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error Fetching all vendor bills"
      );
    }
  }
);

export const fetchSingleVendorBill = createAsyncThunk(
  "vendorBills/fetchSingleVendorBill",
  async (id, thunkAPI) => {
    try {
      const res = await api.get(`/vendor-bill/${id}`);
      return res?.data?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Error fetching single vendor bill"
      );
    }
  }
);

// export const fetchSingleBill = createAsyncThunk(
//     "vendorBills/fetchSingleBill",
//     async (id, thunkAPI) => {
//         try {
//             const res = await api.get
//         } catch (error) {

//         }
//     }
// )
