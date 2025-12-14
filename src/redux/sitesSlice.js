// src/redux/sitesSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getSiteByClient,
  getSiteById,
  getSites,
  postSite
} from "../services/sites";

// Thunks
export const fetchSites = createAsyncThunk(
  "sites/fetchSites",
  async (_, { rejectWithValue }) => {
    try {
      return await getSites();
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const fetchSiteById = createAsyncThunk(
  "sites/fetchSiteById",
  async (id, { rejectWithValue }) => {
    try {
      return await getSiteById(id);
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const fetchSiteByClient = createAsyncThunk(
  "sites/fetchSiteByClient",
  async (clientId, { rejectWithValue }) => {
    try {
      return await getSiteByClient(clientId);
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const createSite = createAsyncThunk(
  "sites/createSite",
  async (siteData, { rejectWithValue }) => {
    try {
      return await postSite(siteData);
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Slice
const sitesSlice = createSlice({
  name: "sites",
  initialState: {
    sites: [],
    selectedSite: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearSelectedSite(state) {
      state.selectedSite = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchSites
      .addCase(fetchSites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSites.fulfilled, (state, action) => {
        state.loading = false;
        state.sites = action.payload;
      })
      .addCase(fetchSites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetchSiteById
      .addCase(fetchSiteById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSiteById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedSite = action.payload;
      })
      .addCase(fetchSiteById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

       // fetchSiteByClient
      .addCase(fetchSiteByClient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSiteByClient.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedSite = action.payload;
      })
      .addCase(fetchSiteByClient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      // createSite
      .addCase(createSite.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSite.fulfilled, (state, action) => {
        state.loading = false;
        state.sites.push(action.payload);
      })
      .addCase(createSite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSelectedSite } = sitesSlice.actions;
export default sitesSlice.reducer;
