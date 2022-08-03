import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getQuestions, saveQuestion, saveQuestionAnswer } from "./dashboardAPI";

const initialState = {
    loading: false,
    questions: null,
    newPoll: {
        optionOne: "",
        optionTwo: "",
        created: false,
    },
};

export const getQuestionsAsync = createAsyncThunk(
    "dashboard/getQuestions",
    async (_, { getState, rejectWithValue }) => {
        const response = await getQuestions();
        return response;
    }
);

export const saveQuestionAsync = createAsyncThunk(
    "dashboard/saveQuestion",
    async (payload, { getState, rejectWithValue, dispatch }) => {
        try {
            const author = getState().auth.loggedInUser.id;
            const response = await saveQuestion({ ...payload, author });
            dispatch(getQuestionsAsync());
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const saveQuestionAnswerAsync = createAsyncThunk(
    "dashboard/saveQuestionAnswer",
    async ({ qid, answer }, { getState, rejectWithValue, dispatch }) => {
        const authedUser = getState().auth.loggedInUser.id;
        const response = await saveQuestionAnswer({ authedUser, qid, answer });
        dispatch(getQuestionsAsync());
        return response;
    }
);

export const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getQuestionsAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(getQuestionsAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.questions = action.payload;
            });
    },
});

export const { logout } = dashboardSlice.actions;

export const selectDashboardData = (state) => state.dashboard;

export default dashboardSlice.reducer;
