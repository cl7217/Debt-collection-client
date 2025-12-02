// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import clientsReducer from "../redux/clientsSlice";
import agentsReducer from "../redux/agentsSlice";

export const store = configureStore({
  reducer: {
    clients: clientsReducer,
    agents: agentsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
