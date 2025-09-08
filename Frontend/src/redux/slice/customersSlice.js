import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/api";

const initialState = {
  allCustomers: [],
  singleCustomer: null,
  loading: false,
  error: null,
};

export const fetchAllCustomers = createAsyncThunk(
  "customer/fetchAllCustomers",
  async (searchInput, thunkAPI) => {
    try {
      let url = "/customer/all";
      if (searchInput && searchInput.trim() !== "") {
        url += `?customerName=${encodeURIComponent(searchInput)}`;
      }

      const res = await api.get(url);
      return res?.data?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Error fetching customers"
      );
    }
  }
);

export const fetchSingleCustomer = createAsyncThunk(
  "customer/fetchSingleCustomer",
  async (id, thunkAPI) => {
    try {
      const res = await api.get(`/customer/${id}`);
      return res?.data?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Error fetching customer"
      );
    }
  }
);

export const deleteCustomer = createAsyncThunk(
  "customer/deleteCustomer",
  async (id, thunkAPI) => {
    try {
      const res = await api.delete(`/customer/${id}`);
      return res?.data
    } catch (error) {
      return (
        thunkAPI,
        rejectWithValue(
          error?.response?.data?.message || "Error delete customer"
        )
      );
    }
  }
);

export const addCustomer = createAsyncThunk(
  "customer/addCustomer",
  async (customerData, thunkAPI) => {
    try {
      const res = await api.post(`/customer/add`, customerData);
      console.log(res?.data);
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error adding vendor"
      );
    }
  }
);

export const updateCustomer = createAsyncThunk(
  "Customer/updataCustomer",
  async ({ id, CustomerData }, thunkAPI) => {
    try {
      const res = await api.put(`/customer/update/${id}`, CustomerData);
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error updating Customer"
      );
    }
  }
);

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCustomers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCustomers.fulfilled, (state, action) => {
        state.loading = false;
        state.allCustomers = action.payload;
      })
      .addCase(fetchAllCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.allCustomers = [];
      })
      .addCase(fetchSingleCustomer.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(fetchSingleCustomer.fulfilled, (state, action) => {
        (state.loading = false),
          (state.singleCustomer = action.payload),
          (state.error = null);
      })
      .addCase(fetchSingleCustomer.rejected, (state, action) => {
        state.loading = false;
        state.singleCustomer = null;
        state.error = action.payload;
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        (state.loading = false),
          (state.singleCustomer = action.payload),
          (state.error = null);
      })
      .addCase(deleteCustomer.fulfilled, (state) => {
        (state.loading = false),
        (state.singleCustomer = null),
        (state.error = null);
      });
  },
});

export default customerSlice.reducer;
