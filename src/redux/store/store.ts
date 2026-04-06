import { configureStore } from "@reduxjs/toolkit";
import transactionsReducer from "@/redux/slices/transactionsSlice"
import roleReducer from "@/redux/slices/roleSlice";


export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    roles : roleReducer,
  }
});

store.subscribe(() => {
  try {
    const state = store.getState().transactions;
    localStorage.setItem("transactionsState", JSON.stringify(state));
  } catch (e) {
    console.warn("Failed to save state", e);
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;