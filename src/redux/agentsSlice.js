import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAgents, postAgent } from "../services/agents";

export const fetchAgents = createAsyncThunk(
    "agents/fetchAgents",
    async () => {
        const res = await getAgents();
        return res;
    }
);

export const createAgent = createAsyncThunk(
    "agents/createAgent",
    async (data) => {
        const res = await postAgent(data);
        return res;
    }
);

export const updateAgent = createAsyncThunk(
    "agents/updateAgent",
    async (data) => {
        await update(data);
        return data;
    }
);

const agentsSlice = createSlice({
    name: "agents",
    initialState: {
        list: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAgents.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAgents.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchAgents.rejected, (state) => {
                state.loading = false;
                state.error = "Failed loading agents";
            })
            .addCase(createAgent.fulfilled, (state, action) => {
                state.list.push(action.payload);
            })
            .addCase(updateAgent.fulfilled, (state, action) => {
                const index = state.list.findIndex(a => a.id === action.payload.id);
                if (index !== -1) state.list[index] = action.payload;
            });
    }
});

export default agentsSlice.reducer;
