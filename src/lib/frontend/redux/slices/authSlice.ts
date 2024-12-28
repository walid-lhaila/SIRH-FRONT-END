import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";


interface UserData {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
}

interface AuthState {
    user: any | null;
    isLoading: boolean;
    error: string | null;
}

export const register = createAsyncThunk(
    'auth/register',
    async(userData: UserData, {rejectWithValue}) => {
        try {
            const response = await axios.post('http://localhost:3000/api/auth/register', userData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const initialState: AuthState = {
    user: null,
    isLoading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.data;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading= false;
                state.error = action.payload as string;
            });
    },
});

export default authSlice.reducer;