import { configureStore } from "@reduxjs/toolkit";
import plansReducer from './slices/plansSlice'
import authReducer from './slices/authSlice'
import profileReducer from "./slices/profileSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    plans: plansReducer,
    profile: profileReducer,
  },
});
