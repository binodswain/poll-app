import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/user/authSlice";
import dashboardSlice from "../features/dashboard/dashboardSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        dashboard: dashboardSlice,
    },
});
