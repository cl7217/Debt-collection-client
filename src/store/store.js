// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import clientsReducer from "../redux/clientsSlice";
import agentsReducer from "../redux/agentsSlice";
import sitesReducer from "../redux/sitesSlice";

export const store = configureStore({
  reducer: {
    clients: clientsReducer,
    agents: agentsReducer,
    sites: sitesReducer
  },
  
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
