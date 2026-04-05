import { configureStore } from "@reduxjs/toolkit";
import accountsReducer from "../slices/accountsSlice";
import transactionsReducer from "../slices/transactionsSlice"
import analyticsReducer  from "../slices/analyticsSlice"
import uiReducer from "../slices/uiSlice";

export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,

  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;