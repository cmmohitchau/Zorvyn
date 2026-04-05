import { configureStore } from "@reduxjs/toolkit";
import accountsReducer from "../slices/accountsSlice";
import transactionsReducer from "../slices/transactionsSlice"
import roleReducer from "../slices/roleSlice";
import analyticsReducer  from "../slices/analyticsSlice"
import uiReducer from "../slices/uiSlice";

export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    roles : roleReducer,


  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;