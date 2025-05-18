import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../utils/axiosInstance'; // used for both POST and GET

// Async thunk for creating profile
export const createProfile = createAsyncThunk(
  'profile/createProfile',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/user', formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.error || 'Something went wrong');
    }
  }
);

// Async thunk for fetching profile by userId
export const fetchUserProfile = createAsyncThunk(
  'profile/fetchUserProfile',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/profile/${userId}`);
      console.log(response)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    data: null,          // profile data (for fetch and after create)
    isLoading: false,
    error: null,
  },
  reducers: {
    // optional synchronous reducers here if needed
  },
  extraReducers: (builder) => {
    // Handle createProfile
    builder
      .addCase(createProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.data = action.payload;  // update profile data after create
      })
      .addCase(createProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Handle fetchUserProfile
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default profileSlice.reducer;

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// export const fetchUserProfile = createAsyncThunk(
//   'profile/fetchUserProfile',
//   async (userId, thunkAPI) => {
//     try {
//       const response = await axios.get(
//         `https://saas-app-aydbb8fhdtckecc7.centralindia-01.azurewebsites.net/v1/profile/${userId}`
//       );
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// const profileSlice = createSlice({
//   name: 'profile',
//   initialState: {
//     data: null,
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchUserProfile.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchUserProfile.fulfilled, (state, action) => {
//         state.loading = false;
//         state.data = action.payload;
//       })
//       .addCase(fetchUserProfile.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export default profileSlice.reducer;


// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axiosInstance from '../utils/axiosInstance';
// import { toast } from 'react-toastify';

// // Async thunk for creating profile
// export const createProfile = createAsyncThunk(
//   "post/createProfile",
//   async (formData, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.post(`/user`, formData);
//       return response.data;
//     } catch (error) {
//       console.error("Create Profile API Error:", error); // For debugging
//       return rejectWithValue(error?.response?.data?.error || "Something went wrong");
//     }
//   }
// );

// // Slice for createProfile
// const createProfileSlice = createSlice({
//   name: "createProfile",
//   initialState: {
//     serverError: null,
//     userDetails: null,
//     isLoading: false,
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(createProfile.pending, (state) => {
//         state.serverError = null;
//         state.userDetails = null;
//         state.isLoading = true;
//       })
//       .addCase(createProfile.fulfilled, (state, action) => {
//         state.serverError = null;
//         state.userDetails = action.payload;
//         state.isLoading = false;
//       })
//       .addCase(createProfile.rejected, (state, action) => {
//         state.serverError = action.payload;
//         state.userDetails = null;
//         state.isLoading = false;
//       });
//   },
// });

// export default createProfileSlice.reducer;
