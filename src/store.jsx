import { configureStore } from "@reduxjs/toolkit";
import plansReducer from './slices/plansSlice'
import authReducer from './slices/authSlice'

export const store = configureStore({
  reducer: {
    plans: plansReducer,
    auth: authReducer
  },
});
