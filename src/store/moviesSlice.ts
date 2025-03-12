import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Movie } from "../types"

export type Movies = {
    movies: Movie[]
}

export const initialState: Movies = {
    movies: []
}

export const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        getMovies: (state, action: PayloadAction<Movie[]>) => {
            state.movies = action.payload
        }
    }
})

export const { getMovies } = moviesSlice.actions