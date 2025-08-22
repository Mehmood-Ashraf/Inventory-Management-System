import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
  vendors: [],
  loading: false,
  error: null,
};

// API call thunk
export const fetchVendors = createAsyncThunk(
  "vendor/fetchVendors",
  async (searchInput, thunkAPI) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/vendor/all?vendorName=${searchInput}`
      );
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Error fetching vendors");
    }
  }
);

const vendorSlice = createSlice({
  name: "vendor",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVendors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVendors.fulfilled, (state, action) => {
        state.loading = false;
        state.vendors = action.payload;
      })
      .addCase(fetchVendors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.vendors = [];
      });
  },
});

export default vendorSlice.reducer;
