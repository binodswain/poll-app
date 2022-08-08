import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/user/authSlice";
import dashboardSlice from "../features/dashboard/dashboardSlice";

export const setupStore = (preloadedState = {}) =>
    configureStore({
        reducer: {
            auth: authSlice,
            dashboard: dashboardSlice,
        },
        preloadedState,
    });

export const store = setupStore();
