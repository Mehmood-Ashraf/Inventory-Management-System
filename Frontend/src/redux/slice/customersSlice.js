import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import api from "../../utils/api"


const initialState = {
    allCustomers : [],
    singleCustomer : null,
    loading : false,
    error : null
}


export const fetchAllCustomers = createAsyncThunk(
    "customer/fetchAllCustomers",
    async (searchInput, thunkAPI) => {
        try {
            const res = await api.get(`/customer/all?customerName=${searchInput}`)
            return res?.data?.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.data?.message || "Error fetching customers")
        }
    }
)



const customerSlice = createSlice({
    name : "customer",
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder.addCase(fetchAllCustomers.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchAllCustomers.fulfilled, (state, action) => {
            state.loading = false;
            state.allCustomers = action.payload
        })
        .addCase(fetchAllCustomers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.allCustomers = []
        })
    }
}
    
)


export default customerSlice.reducer;