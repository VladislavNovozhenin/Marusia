import { configureStore } from "@reduxjs/toolkit";
import { moviesSlice } from "./moviesSlice";
import { genresSlice } from "./genresSlice";
import { userSlice } from "./userSlice";

export const store = configureStore({
    reducer: {
        movies: moviesSlice.reducer,
        genres: genresSlice.reducer,
        user: userSlice.reducer
    }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch