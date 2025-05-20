

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axiosInstance from '../utils/axiosInstance';

// // Fetch all available plans
// export const getPlans = createAsyncThunk(
//   'plans/getPlans',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.get('/subcriptions');
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || 'Failed to fetch plans');
//     }
//   }
// );

// // // Async thunk to subscribe user to a plan
// export const subscribeToPlan = createAsyncThunk(
//   "plans/subscribeToPlan",
//   async ({ userId, subscriptionId }, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.put(
//         `/user/${userId}/${subscriptionId}`
//       );
//       console.log(response.data)
//       return response.data;
//     } catch (error) {
//       console.error("Subscription error:", error);
//       return rejectWithValue(error?.response?.data?.error || "Failed to subscribe to plan");
//     }
//   }
// );

// // Check if subscription is usable (active)
// export const checkSubscriptionUsability = createAsyncThunk(
//   'plans/checkSubscriptionUsability',
//   async ({ user_id, subscription_id }, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.get(
//         `/usage/users/${user_id}/${subscription_id}/usability-status`
//       );
//       // Assume response.data is boolean true/false
//       console.log(response.data)
//       return response.data;
//     } catch (error) {
//       return rejectWithValue('Failed to check usability status');
//     }
//   }
// );

// const plansSlice = createSlice({
//   name: 'plans',
//   initialState: {
//     items: [],
//     status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
//     error: null,

//     subscriptionLoading: false,
//     subscriptionSuccess: false,
//     subscriptionError: null,

//     usabilityStatus: null, // true/false/null
//     usabilityLoading: false,
//     usabilityError: null,
//   },
//   reducers: {
//     resetSubscriptionState(state) {
//       state.subscriptionLoading = false;
//       state.subscriptionSuccess = false;
//       state.subscriptionError = null;
//     },
//     resetUsabilityState(state) {
//       state.usabilityStatus = null;
//       state.usabilityLoading = false;
//       state.usabilityError = null;
//     },
//   },
//   extraReducers(builder) {
//     builder
//       // getPlans
//       .addCase(getPlans.pending, (state) => {
//         state.status = 'loading';
//         state.error = null;
//       })
//       .addCase(getPlans.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.items = action.payload;
//       })
//       .addCase(getPlans.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       })

//       // subscribeToPlan
//       .addCase(subscribeToPlan.pending, (state) => {
//         state.subscriptionLoading = true;
//         state.subscriptionSuccess = false;
//         state.subscriptionError = null;
//       })
//       .addCase(subscribeToPlan.fulfilled, (state, action) => {
//         state.subscriptionLoading = false;
//         state.subscriptionSuccess = true;
//         // Optionally update plans or subscription info here if needed
//       })
//       .addCase(subscribeToPlan.rejected, (state, action) => {
//         state.subscriptionLoading = false;
//         state.subscriptionSuccess = false;
//         state.subscriptionError = action.payload;
//       })

//       // checkSubscriptionUsability
//       .addCase(checkSubscriptionUsability.pending, (state) => {
//         state.usabilityLoading = true;
//         state.usabilityError = null;
//       })
//       .addCase(checkSubscriptionUsability.fulfilled, (state, action) => {
//         state.usabilityLoading = false;
//         state.usabilityStatus = action.payload;
//       })
//       .addCase(checkSubscriptionUsability.rejected, (state, action) => {
//         state.usabilityLoading = false;
//         state.usabilityStatus = null;
//         state.usabilityError = action.payload;
//       });
//   },
// });

// export const { resetSubscriptionState, resetUsabilityState } = plansSlice.actions;

// export default plansSlice.reducer;





import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";

// ===================== Async Thunks =====================

// Fetch all plans
export const getPlans = createAsyncThunk(
  "plans/getPlans",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/subcriptions");
      return response.data;
    } catch (error) {
      console.error("Error fetching plans:", error);
      return rejectWithValue(
        error?.response?.data?.error || "Failed to fetch plans"
      );
    }
  }
);

// Subscribe user to a specific plan
export const subscribeToPlan = createAsyncThunk(
  "plans/subscribeToPlan",
  async ({ userId, subscriptionId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/user/${userId}/${subscriptionId}`);
      console.log("Subscription response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Subscription error:", error);
      return rejectWithValue(
        error?.response?.data?.error || "Failed to subscribe to plan"
      );
    }
  }
);

// Check subscription usability status
export const checkUsabilityStatus = createAsyncThunk(
  "plans/checkUsabilityStatus",
  async ({ userId, subscriptionId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/v1/usage/users/${userId}/${subscriptionId}/usability-status`
      );
      return response.data;
    } catch (error) {
      console.error("Usability status check failed:", error);
      return rejectWithValue(
        error?.response?.data?.error || "Failed to check usability"
      );
    }
  }
);

// ===================== Slice =====================

const plansSlice = createSlice({
  name: "plans",
  initialState: {
    // plan list
    items: [],
    status: "idle",
    error: null,

    // subscription
    isLoading: false,
    success: false,
    subscriptionError: null,

    // usability status
    usabilityStatus: null,
    usabilityLoading: false,
    usabilityError: null,
  },
  reducers: {
    resetSubscriptionState(state) {
      state.isLoading = false;
      state.success = false;
      state.subscriptionError = null;
    },
    resetUsabilityStatus(state) {
      state.usabilityStatus = null;
      state.usabilityLoading = false;
      state.usabilityError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // getPlans
      .addCase(getPlans.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getPlans.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(getPlans.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // subscribeToPlan
      .addCase(subscribeToPlan.pending, (state) => {
        state.isLoading = true;
        state.success = false;
        state.subscriptionError = null;
      })
      .addCase(subscribeToPlan.fulfilled, (state) => {
        state.isLoading = false;
        state.success = true;
        state.subscriptionError = null;
      })
      .addCase(subscribeToPlan.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.subscriptionError = action.payload;
      })

      // checkUsabilityStatus
      .addCase(checkUsabilityStatus.pending, (state) => {
        state.usabilityLoading = true;
        state.usabilityError = null;
        state.usabilityStatus = null;
      })
      .addCase(checkUsabilityStatus.fulfilled, (state, action) => {
        state.usabilityLoading = false;
        state.usabilityStatus = action.payload;
      })
      .addCase(checkUsabilityStatus.rejected, (state, action) => {
        state.usabilityLoading = false;
        state.usabilityError = action.payload;
      });
  },
});

// ===================== Exports =====================

export const { resetSubscriptionState, resetUsabilityStatus } = plansSlice.actions;
export default plansSlice.reducer;



/////////important


// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axiosInstance from "../utils/axiosInstance";

// // Async thunk to fetch plans
// export const getPlans = createAsyncThunk(
//   "plans/getPlans",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.get(
//         "/subcriptions"
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Error fetching plans:", error);
//       return rejectWithValue(error?.response?.data?.error || "Failed to fetch plans");
//     }
//   }
// );

// // Async thunk to subscribe user to a plan
// export const subscribeToPlan = createAsyncThunk(
//   "plans/subscribeToPlan",
//   async ({ userId, subscriptionId }, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.put(
//         `/user/${userId}/${subscriptionId}`
//       );
//       console.log(response.data)
//       return response.data;
//     } catch (error) {
//       console.error("Subscription error:", error);
//       return rejectWithValue(error?.response?.data?.error || "Failed to subscribe to plan");
//     }
//   }
// );

// const plansSlice = createSlice({
//   name: "plans",
//   initialState: {
//     items: [],
//     status: "idle",        // for getPlans status
//     error: null,           // error for getPlans

//     // subscription states
//     isLoading: false,
//     success: false,
//     subscriptionError: null,
//   },
//   reducers: {
//     resetSubscriptionState(state) {
//       state.isLoading = false;
//       state.success = false;
//       state.subscriptionError = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // getPlans cases
//       .addCase(getPlans.pending, (state) => {
//         state.status = "loading";
//         state.error = null;
//       })
//       .addCase(getPlans.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.items = action.payload;
//       })
//       .addCase(getPlans.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       })

//       // subscribeToPlan cases
//       .addCase(subscribeToPlan.pending, (state) => {
//         state.isLoading = true;
//         state.success = false;
//         state.subscriptionError = null;
//       })
//       .addCase(subscribeToPlan.fulfilled, (state) => {
//         state.isLoading = false;
//         state.success = true;
//         state.subscriptionError = null;
//       })
//       .addCase(subscribeToPlan.rejected, (state, action) => {
//         state.isLoading = false;
//         state.success = false;
//         state.subscriptionError = action.payload;
//       });
//   },
// });

// export const { resetSubscriptionState } = plansSlice.actions;
// export default plansSlice.reducer;


