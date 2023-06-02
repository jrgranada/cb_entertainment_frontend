import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface Params {
    token: string;
    query: string;
}

export const searchByQuery = createAsyncThunk(
    'search/query',
    async (params: Params, thunkAPI) => {

        try {

            const response = await fetch("https://localhost:7005/api/spotify/search-by-query?accessToken=" + params.token + "&query=" + params.query, {
                method: "GET",
                cache: "no-cache",
                mode: "cors",
            });

            const data = await response.json();
            return data;

        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

type SearchState = {
    albumList: Album[];
    artistList: Artist[];
    trackList: Track[];
};

const initialState = {
    albumList: [],
    artistList: [],
    trackList: []
} as unknown as SearchState;

export const search = createSlice({
    name: "search",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(searchByQuery.fulfilled, (state, action) => { 
            state.albumList = action.payload.albumes;
            state.artistList = action.payload.artists;
            state.trackList = action.payload.tracks;
        })
    },
});

export const {
} = search.actions;
export default search.reducer;