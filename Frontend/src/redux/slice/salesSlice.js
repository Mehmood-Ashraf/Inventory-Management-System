import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/api";

const initialState = {
  todaySale: 0,
  loading: false,
  error: null,
};

export const fetchTodaySale = createAsyncThunk(
  "sales/fetchTodaySale",
  async (_, thunkAPI) => {
    try {
      const res = await api.get(`/customer-bill/today-sale`);
      return res?.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error?.response?.data?.message || "Error fetching today sale")
    }
  }
);



const salesSlice = createSlice({
    name : "Sales",
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder.addCase(fetchTodaySale.pending, (state) => {
            state.loading = true;
            state.error = null
        })
        .addCase(fetchTodaySale.fulfilled, (state,action) => {
            state.loading = false;
            state.todaySale = action.payload
        })
        .addCase(fetchTodaySale.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload
        })
    }
})

export default salesSlice.reducer;