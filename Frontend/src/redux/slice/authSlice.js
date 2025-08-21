import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'


export const loginAdmin = createAsyncThunk(
    "auth/loginAdmin",
    async ({email, password}, thunkAPI) => {
        try {
            const res = await axios.post(`http://localhost:3000/api/auth/login`, {email, password})
            const token = res.data.data.token
            return token
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)   
        }
    }
)

const authSlice = createSlice({
    name : "auth",
    initialState : {
        // admin : null,
        token : localStorage.getItem("token") || null,
        loading : false,
        error : null
    },
    reducers : {
        logout : (state) => {
            // state.admin = null,
            state.token = null,
            localStorage.removeItem("token")
        }
    },
    extraReducers : (builder) => {
        builder.addCase(loginAdmin.pending, (state) => {
            state.loading = true;
            state.error = null
        }).addCase(loginAdmin.fulfilled, (state, action) => {
            state.loading = false;
            state.token = action.payload;
            localStorage.setItem("token", action.payload);
        })
        .addCase(loginAdmin.rejected, (state, action) => {
            state.loading= false;
            state.error = action.payload
        })
    }
})

export const { logout } = authSlice.actions
export default authSlice.reducer