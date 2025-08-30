import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import api from "../../utils/api"

const initialState = {
    allProducts : [],
    singleProduct : null,
    loading : false,
    error : null
}

export const fetchAllProducts = createAsyncThunk(
    "product/fetchAllVendors",
    async (SearchInput, thunkAPI) => {
        try {
            const res = await api.get(`/product/all?productName=${SearchInput}`, SearchInput)
            return res?.data?.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.data?.message || "Error Fetching Products")
        }
    }
)



const productSlice = createSlice({
    name : "Product",
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder.addCase(fetchAllProducts.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(fetchAllProducts.fulfilled, (state, action) => {
            state.loading = false
            state.allProducts = action.payload
        })
        .addCase(fetchAllProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.allProducts = [];
        })
    }
})


export default productSlice.reducer;