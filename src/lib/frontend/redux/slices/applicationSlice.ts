import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";


interface ApplicationData {
    _id?: string;
    title: string;
    description: string;
    location: string;
    type: string;
    company: string;
    createdBy: string;
    cv: File;
    status: 'pending' | 'accepted' | 'rejected';
}


interface ApplicationState {
    applications: ApplicationData[];
    application: ApplicationData | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: ApplicationState ={
    applications: [],
    application: null,
    isLoading: false,
    error: null,
};


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
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message || 'Something Went Wrong');
            }
            return rejectWithValue('Something Went Wrong');
        }
    }
)


export const getAllApplication = createAsyncThunk(
    'application/getAll',
    async (_, {rejectWithValue}) => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get('http://localhost:3000/api/application', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            return response.data.data;
        } catch (error) {
            if(error instanceof Error){
                return rejectWithValue(error.message || 'something Went Wrong');
            }
            return rejectWithValue('Something Went Wrong');
        }
    }
);



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
            })
            .addCase(getAllApplication.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getAllApplication.fulfilled, (state, action) => {
                state.isLoading = false;
                state.applications = action.payload;
            })
            .addCase(getAllApplication.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export default applicationSlice.reducer;