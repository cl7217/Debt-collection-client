// src/redux/clientsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getClients,
  getClientById,
  postClient
} from "../services/clients";

// Thunks
export const fetchClients = createAsyncThunk(
  "clients/fetchClients",
  async (_, { rejectWithValue }) => {
    try {
      return await getClients();
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const fetchClientById = createAsyncThunk(
  "clients/fetchClientById",
  async (id, { rejectWithValue }) => {
    try {
      return await getClientById(id);
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const createClient = createAsyncThunk(
  "clients/createClient",
  async (clientData, { rejectWithValue }) => {
    try {
      return await postClient(clientData);
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Slice
const clientsSlice = createSlice({
  name: "clients",
  initialState: {
    clients: [],
    selectedClient: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearSelectedClient(state) {
      state.selectedClient = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchClients
      .addCase(fetchClients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.loading = false;
        state.clients = action.payload;
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetchClientById
      .addCase(fetchClientById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClientById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedClient = action.payload;
      })
      .addCase(fetchClientById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // createClient
      .addCase(createClient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createClient.fulfilled, (state, action) => {
        state.loading = false;
        state.clients.push(action.payload);
      })
      .addCase(createClient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSelectedClient } = clientsSlice.actions;
export default clientsSlice.reducer;
