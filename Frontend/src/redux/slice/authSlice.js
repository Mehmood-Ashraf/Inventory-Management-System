import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
import api from "../../utils/api";


export const loginAdmin = createAsyncThunk(
    "auth/loginAdmin",
    async ({email, password}, thunkAPI) => {
        try {
            const res = await api.post(`/auth/login`, {email, password})
            const token = res.data.data.token
            const adminName = res.data.data.adminDetails.adminName
            return {token, adminName}
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.message)
        }
    }
)

const authSlice = createSlice({
    name : "auth",
    initialState : {
        adminName : typeof window !== "undefined" ? sessionStorage.getItem("adminName") : "",
        token : typeof window !== "undefined" ? sessionStorage.getItem("token") : null,
        loading : false,
        error : null
    },
    reducers : {
        logout : (state) => {
            state.adminName = "",
            state.token = null,
            sessionStorage.removeItem("token")
            sessionStorage.removeItem("adminName")
        }
    },
    extraReducers : (builder) => {
        builder.addCase(loginAdmin.pending, (state) => {
            state.loading = true;
            state.error = null
        }).addCase(loginAdmin.fulfilled, (state, action) => {
            state.loading = false;
            state.token = action.payload.token;
            state.adminName = action.payload.adminName;
            sessionStorage.setItem("token", action.payload.token);
            sessionStorage.setItem("adminName", action.payload.adminName);
        })
        .addCase(loginAdmin.rejected, (state, action) => {
            state.loading= false;
            state.error = action.payload
        })
    }
})

export const { logout } = authSlice.actions
export default authSlice.reducer