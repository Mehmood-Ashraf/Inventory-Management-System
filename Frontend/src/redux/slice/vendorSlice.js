import { createSlice, createAsyncThunk, autoBatchEnhancer } from "@reduxjs/toolkit";
import axios from "axios";
import { Satellite } from "lucide-react";
import api from "../../utils/api";


const initialState = {
  vendors: [],
  singleVendor : null,
  loading: false,
  error: null,
};


// getAllVendors API
export const fetchAllVendors = createAsyncThunk(
  "vendor/fetchVendors",
  async (searchInput, billNumber, thunkAPI) => {
    try {
      const res = await api.get(
        `/vendor/all?vendorName=${searchInput}&billNumber=${billNumber}`
      );
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Error fetching vendors");
    }
  }
);


// getSingleVendors API
export const fetchSingleVendor = createAsyncThunk(
  "vendor/fetchSingleVendor",
  async (id, thunkAPI) => {
    try {
      const res = await api.get(
        `/vendor/${id}`
      )
      return res.data.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Error Fetching single vendor")
    }
  }
)  


export const addVendor = createAsyncThunk(
  "vendor/addVendor",
  async (vendorData, thunkAPI) => {
    try {
      const res = await axios.post(`http://localhost:3000/api/vendor/add`, vendorData)
      return res.data.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Error adding vendor")
    }
  }
)


export const updateVendor = createAsyncThunk(
  "vendor/updataVendor",
  async({ id, vendorData }, thunkAPI) => {
    try {
      const res = await axios.put(`http://localhost:3000/api/vendor/update/${id}`, vendorData);
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Error updating vendor")
    }
  }
)

export const deleteVendor = createAsyncThunk(
  "vendor/deleteVendor",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`http://localhost:3000/api/vendor/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Error deleting vendor")
    }
  }
)


const vendorSlice = createSlice({
  name: "vendor",
  initialState,
  reducers: {
    clearSingleVendor : (state) => {
      state.singleVendor = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllVendors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllVendors.fulfilled, (state, action) => {
        state.loading = false;
        state.vendors = action.payload;
      })
      .addCase(fetchAllVendors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.vendors = [];
      })
      .addCase(fetchSingleVendor.pending, (state) => {
        state.loading = true,
        state.error = null
      })
      .addCase(fetchSingleVendor.fulfilled, (state, action) => {
          state.loading = false,
          state.singleVendor = action.payload
      })
      .addCase(fetchSingleVendor.rejected, (state, action) => {
        state.loading = false,
        state.error = action.payload,
        state.singleVendor = null
      })
      .addCase(addVendor.fulfilled, (state, action) => {
        state.vendors.push(action.payload)
      })
      .addCase(updateVendor.fulfilled, (state, action) => {
        state.vendors = state.vendors.map((vendor) => 
        vendor._id === action.payload._id ? action.payload : vendor
        );
        if(state.singleVendor?._id === action.payload._id) {
          state.singleVendor = action.payload
        }
      })
      .addCase(deleteVendor.fulfilled, (state, action) => {
        state.vendors = state.vendors.filter((vendor) => 
        vendor._id != action.payload
        );
        if(state.singleVendor?._id === action.payload){
          state.singleVendor = null
        }
      })
  },
});


export const { clearSingleVendor } = vendorSlice.actions
export default vendorSlice.reducer;