import { configureStore } from "@reduxjs/toolkit";
import jobsReducer from './slices/jobSlice';
import authReducer from './slices/authSlice';
import applicationReducer from './slices/applicationSlice';

export const store = configureStore({
    reducer: {
        jobs: jobsReducer,
        auth: authReducer,
        application: applicationReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

