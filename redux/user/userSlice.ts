import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../../interfaces'

interface UserState {
    user: User | null
    loadingUser: boolean
    isEdit: boolean
}

const initialState: UserState = {
    user: null,
    loadingUser: false,
    isEdit: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User | null>) => { state.user = action.payload },
        setUserAvatar: (state, action: PayloadAction<string>) => { if (state.user) state.user.avatarUrl = action.payload },
        loadingUserState: (state, action: PayloadAction<boolean>) => { state.loadingUser = action.payload },
        startEdit: (state, action: PayloadAction<boolean>) => { state.isEdit = action.payload },
    },
})

export const { setUser, setUserAvatar, loadingUserState, startEdit } = userSlice.actions

export default userSlice.reducer