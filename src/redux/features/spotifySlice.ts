import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface Params {
    token: string;
    query: string;
}

export const searchByQuery = createAsyncThunk(
    'search/query',
    async (params: Params, thunkAPI) => {

        // URL a la que realizar la solicitud POST
        const url = 'https://localhost:7145/api/SpotifyApi/search';

        // Datos a enviar en el cuerpo de la solicitud
        const body = {
            token: params.token,
            query: params.query,
            types: [1,2,3]
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                mode: 'cors',
                cache: "no-cache",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
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
            state.albumList = action.payload.albums;
            state.artistList = action.payload.artists;
            state.trackList = action.payload.tracks;
        })
    },
});

export const {
} = search.actions;
export default search.reducer;