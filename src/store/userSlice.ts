import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type User = {
    name: string
    surname: string
    email: string
    favorites: number[]
}

type UserState = {
    user: User | null
}

const initialState: UserState = {
    user: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<User>) => {
            state.user = action.payload
        },
        logout: (state) => {
            state.user = null
        }, 
        updateFavorites: (state, action: PayloadAction<number[]>) => {
            if (state.user) {
                state.user.favorites = action.payload
            }
            
        }
    }
})

export const { login, logout, updateFavorites } = userSlice.actions
