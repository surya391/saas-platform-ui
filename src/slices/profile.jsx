import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import axiosInstance from "../utils/axiosInstance"
import { toast } from 'react-toastify'

// Async thunk for creating profile
export const createProfile = createAsyncThunk(
  "post/createProfile",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`profile/user`, formData, {
        // headers: {
        //   Authorization: localStorage.getItem('token'),
        // },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.error || "Something went wrong");
    }
  }
);

// Slice for createProfile
const createProfileSlice = createSlice({
    name: "createProfile",
    initialState: {
        serverError: null,
        userDetails: null,
        isLoading: false,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createProfile.pending, (state) => {
                state.serverError = null;
                state.userDetails = null;
                state.isLoading = true;
            })
            .addCase(createProfile.fulfilled, (state, action) => {
                state.serverError = null;
                state.userDetails = action.payload;
                state.isLoading = false;
            })
            .addCase(createProfile.rejected, (state, action) => {
                state.serverError = action.payload;
                state.userDetails = null;
                state.isLoading = false;
            });
    }
});

export default createProfileSlice.reducer;
