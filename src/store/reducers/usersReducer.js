import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  users: [], // Store all users for admin
  loading: false,
  isAuthenticated: false,
  error: null,
  message: null,
  adminStats: null,
  adminStatsLoading: false,
  adminStatsError: null,
};
   
export const userSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    // ...existing code...
    isLoginRequest: (state) => {
      state.loading = true;
      state.isAuthenticated = false;
    },
    isUserSuccess: (state, action) => {
        state.loading = false;  
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
    },
    isUserFail: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    setUserMessage:(state,action)=>{
      state.message = action.payload;
    },
    isRequest: (state, action) => {
        state.loading = true;
    },
    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
    clearUser: (state,action) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      state.message = action.payload
    },
    clearUserError: (state) => {
      state.error = null;
    },
    clearUserMessage: (state) => {
      state.message = null;
    },
    // Admin dashboard stats actions
    adminStatsRequest: (state) => {
      state.adminStatsLoading = true;
      state.adminStatsError = null;
    },
    adminStatsSuccess: (state, action) => {
      state.adminStatsLoading = false;
      state.adminStats = action.payload;
      state.adminStatsError = null;
    },
    adminStatsFail: (state, action) => {
      state.adminStatsLoading = false;
      state.adminStatsError = action.payload;
    },
    getAllUsersSuccess: (state, action) => {
      state.users = action.payload.users || [];
      state.loading = false;
      state.error = null;
    },
    clearAdminStats: (state) => {
      state.adminStats = null;
      state.adminStatsError = null;
      state.adminStatsLoading = false;
    },
    isSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
  },
});

export const {
  isLoginRequest,
  setUserMessage,
  isUserFail,
  isRequest,
  logoutUser,
  isUserSuccess,
  clearUserError,
  clearUserMessage,
  clearUser,
  adminStatsRequest,
  adminStatsSuccess,
  adminStatsFail,
  clearAdminStats,
  getAllUsersSuccess,
  isSuccess

} = userSlice.actions;

export default userSlice.reducer;
