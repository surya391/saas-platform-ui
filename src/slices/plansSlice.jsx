import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";
export const getPlans = createAsyncThunk(
  "plans/getPlans",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        "https://saas-app-aydbb8fhdtckecc7.centralindia-01.azurewebsites.net/v1/subcriptions"
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching plans:", error);
      return rejectWithValue(error?.response?.data?.error || "Failed to fetch plans");
    }
  }
);

const plansSlice = createSlice({
  name: "plans",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPlans.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getPlans.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(getPlans.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; 
      });
  },
});

export default plansSlice.reducer;
