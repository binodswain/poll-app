import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUser, getUserDetails } from "./authAPI";

const initialState = {
    loggedInUser: {
        id: "sarahedo",
        password: "password123",
        name: "Sarah Edo",
        avatarURL: "https://i.pravatar.cc/150?u=sarahedo@pravatar.com",
        answers: {
            "8xf0y6ziyjabvozdd253nd": "optionOne",
            "6ni6ok3ym7mf1p33lnez": "optionOne",
            am8ehyc8byjqgar0jgpub9: "optionTwo",
            loxhs1bqm25b708cmbf3g: "optionTwo",
        },
        questions: ["8xf0y6ziyjabvozdd253nd", "am8ehyc8byjqgar0jgpub9"],
    },
    loading: false,
    authError: null,
    pollUserDetails: null,
    allusers: null,
};

export const authenticateAsync = createAsyncThunk(
    "auth/login",
    async (payload, { rejectWithValue }) => {
        try {
            const response = await getUser(payload);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const getuserAsync = createAsyncThunk(
    "auth/getUserInfo",
    async (userid) => {
        const response = await getUserDetails(userid);
        return response;
    }
);

export const getUsersAsync = createAsyncThunk("auth/getUsers", async () => {
    const response = await getUserDetails();
    return response;
});

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.loggedInUser = false;
        },
        clearLoginForm: (state) => {
            state.authError = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(authenticateAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(authenticateAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.loggedInUser = action.payload;
            })
            .addCase(authenticateAsync.rejected, (state, action) => {
                state.loading = false;
                state.authError = action.payload;
            })
            .addCase(getuserAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(getuserAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.pollUserDetails = action.payload;
            })
            .addCase(getUsersAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUsersAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.allusers = action.payload;
            });
    },
});

export const { logout, clearLoginForm } = authSlice.actions;

export const selectLoginUser = (state) => state.auth.loggedInUser;

export default authSlice.reducer;
