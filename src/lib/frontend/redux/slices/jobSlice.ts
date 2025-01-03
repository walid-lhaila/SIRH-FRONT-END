import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

interface Job {
    _id: string;
    title: string;
    description: string;
    location: string;
    company: string;
    type: string
    createdBy: string;
}

interface JobsState {
    items: Job[];
    loading: boolean;
    error: string | null;
}

const initialState: JobsState = {
    items: [],
    loading: false,
    error: null,
};

export const getAllJobs = createAsyncThunk(
    'jobs/getAllJobs',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('http://localhost:4000/JOB/getAll');
            return response.data;
        } catch (error) {
            if(error instanceof Error) {
                return rejectWithValue(error.message || "Something Went Wrong");
            }
            return rejectWithValue('Something Went Wrong');
        }
    }
);

const jobsSlice = createSlice({
    name: 'jobs',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllJobs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllJobs.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(getAllJobs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default jobsSlice.reducer;