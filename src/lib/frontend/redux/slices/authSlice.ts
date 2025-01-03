import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";


interface UserData {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
}

interface LoginData {
    username: string;
    password: string;
}

interface AuthState {
    user: null;
    token: string;
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
            if(error instanceof Error) {
                return rejectWithValue(error.message || "Something Went Wrong");
            }
            return rejectWithValue('Something Went Wrong');
        }
    }
);

export const login = createAsyncThunk(
    'auth/login',
    async(loginData: LoginData, {rejectWithValue}) => {
        try {
            const response = await axios.post('http://localhost:3000/api/auth/login', loginData);
            const { token, user } = response.data.data;
            localStorage.setItem('token', token);
            localStorage.setItem('username', user.username);
            localStorage.setItem('id', user._id);
            return response.data;
        } catch (error) {
            if(error instanceof Error) {
                return rejectWithValue(error.message || "Something Went Wrong");
            }
            return rejectWithValue('Something Went Wrong');
        }
    }
);

const initialState: AuthState = {
    user: null,
    token: null,
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
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.data.user;
                state.token = action.payload.data.token;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export default authSlice.reducer;