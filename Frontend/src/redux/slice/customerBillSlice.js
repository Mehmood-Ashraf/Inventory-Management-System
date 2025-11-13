import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/api";

const initialState = {
  allCustomerBills: [],
  singleCustomerBills: [],
  singleBill: null,
  addSingleBill: null,
  total: 0,
  page: 1,
  limit: 10,
  loading: false,
  error: null,
};

export const fetchAllCustomerBills = createAsyncThunk(
  "customerBills/fetchAllCustomerBills",
  async (filters = {}, thunkApi) => {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const res = await api.get(`/customer-bill/all?${queryParams}`);
      return res?.data?.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error?.response?.data?.message || "Error Fetching all customer bills"
      );
    }
  }
);

export const addCustomerBill = createAsyncThunk(
  "customerBills/addCustomerBill",
  async (billDetails, thunkApi) => {
    try {
      const res = await api.post(`/customer-bill/add`, billDetails);
      return res?.data?.data;
    } catch (error) {
      return thunkApi.rejectWithValue({
        message:
          error?.response?.data?.message || "Something went wrong in addBill",
      });
    }
  }
);

export const deleteCustomerBill = createAsyncThunk(
  "customerBills/deleteCustomerBill",
  async (billID, thunkApi) => {
    try {
      const deletedCustomer = await api.delete(`/customer-bill/${billID}`);
      return deletedCustomer?.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const fetchSingleBill = createAsyncThunk(
  "customerBills/fetchSingleBill",
  async (id, thunkApi) => {
    try {
      const res = await api.get(`/customer-bill/${id}`);
      return res?.data?.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error?.response?.data?.message || "Error Fetching single bill"
      );
    }
  }
);

export const fetchSingleCustomerBills = createAsyncThunk(
  "customerBills/fetchSingleCustomerBills",
  async (id, thunkAPI) => {
    try {
      const res = await api.get(`/customer-bill/all/${id}`);
      return res?.data?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Something went wrong"
      );
    }
  }
);

export const updateCustomerBill = createAsyncThunk(
  "customerBills/uppdateCustomerBill",
  async ({ billId, billDetails }, thunkAPI) => {
    try {
      const res = await api.put(`customer-bill/update_customer_bill/${billId}`, billDetails);
      return res?.data?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message ||
          "Something went wrong while updating the bill"
      );
    }
  }
);

const customerBillsSlice = createSlice({
  name: "customerBills",
  initialState,
  reducers: {
    resetSingleBill: (state) => {
      state.singleBill = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCustomerBills.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCustomerBills.fulfilled, (state, action) => {
        state.loading = false;
        const { bills, total, page } = action.payload;

        if (page === 1) {
          state.allCustomerBills = bills;
        } else {
          state.allCustomerBills = [...state.allCustomerBills, ...bills];
        }
        state.total = total;
        state.page = page;
      })
      .addCase(fetchAllCustomerBills.rejected, (state, action) => {
        state.loading = false;
        state.allCustomerBills = [];
        state.error = action.payload;
      })
      .addCase(addCustomerBill.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCustomerBill.fulfilled, (state, action) => {
        state.loading = false;
        state.addSingleBill = action.payload;
        state.error = null;
      })
      .addCase(addCustomerBill.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteCustomerBill.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCustomerBill.fulfilled, (state, action) => {
        state.loading = false;
        state.allCustomerBills = state.allCustomerBills.filter(
          (bill) => bill._id !== action.payload._id
        );
      })
      .addCase(deleteCustomerBill.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchSingleBill.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSingleBill.fulfilled, (state, action) => {
        state.loading = false;
        state.singleBill = action.payload;
      })
      .addCase(fetchSingleBill.rejected, (state, action) => {
        state.loading = false;
        state.singleBill = null;
        state.error = action.payload;
      })
      .addCase(fetchSingleCustomerBills.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSingleCustomerBills.fulfilled, (state, action) => {
        state.loading = false;
        state.singleCustomerBills = action.payload;
        state.error = null;
      })
      .addCase(fetchSingleCustomerBills.rejected, (state, action) => {
        state.loading = false;
        state.singleCustomerBills = [];
        state.error = action.payload;
      })
      .addCase(updateCustomerBill.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCustomerBill.fulfilled, (state, action) => {
        state.loading = false;
        const updatedBill = action.payload;
        const index = state.allCustomerBills.findIndex(
          (bill) => bill._id === updatedBill._id
        );
        if (index !== -1) {
          state.allCustomerBills[index] = updatedBill;
        }

        if (state.singleBill?._id === updatedBill._id) {
          state.singleBill = updatedBill;
        }

        state.error = null;
      })
      .addCase(updateCustomerBill.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
      })
  },
});

export const { resetSingleBill } = customerBillsSlice.actions;
export default customerBillsSlice.reducer;
