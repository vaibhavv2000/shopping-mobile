import productSlice from "../Redux/productSlice";
import userSlice from "../Redux/userSlice";
import {configureStore} from "@reduxjs/toolkit";

export const store = configureStore({
 reducer: {
  user: userSlice,
  product: productSlice,
 },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;