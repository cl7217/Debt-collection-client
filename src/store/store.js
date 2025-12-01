// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import clientsReducer from "../redux/clientsSlice";

export const store = configureStore({
  reducer: {
    clients: clientsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
