import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";


interface ApplicationData {
    title: string;
    description: string;
    location: string;
    type: string;
    company: string;
    createdBy: string;
    cv: File;
    status: 'pending' | 'accepted' | 'rejected';
}

export const apply = createAsyncThunk(
    'application/apply',
    async(applicationData: ApplicationData, {rejectWithValue}) => {
        const token = localStorage.getItem('token');
        const formData = new FormData();
        Object.entries(applicationData).forEach(([key, value]) => {
            if(key === 'cv' && value instanceof File){
                formData.append(key, value);
            } else {
                formData.append(key, value as string);
            }
        })
        try {
            const response = await axios.post('http://localhost:3000/api/apply', applicationData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Something Went Wrong')
        }
    }
)


interface ApplicationState {
    application: any | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: ApplicationState ={
    application: null,
    isLoading: false,
    error: null,
};

const applicationSlice = createSlice({
    name: 'application',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(apply.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(apply.fulfilled, (state, action) => {
                state.isLoading = false;
                state.application = action.payload;
            })
            .addCase(apply.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export default applicationSlice.reducer;