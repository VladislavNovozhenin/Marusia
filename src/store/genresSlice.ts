import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type Genreses = {
    genres: string[]
}

const initialState: Genreses = {
    genres: []
}

export const genresSlice = createSlice({
    name: 'genres',
    initialState,
    reducers: {
        getGenres: (state, action: PayloadAction<string[]>) => {
            state.genres = action.payload
        }
    }
})

export const { getGenres } = genresSlice.actions