import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UIState {
    modalOpen: boolean
}

const initialState: UIState = {
    modalOpen: false
}

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        openModal: (state, action: PayloadAction<boolean>) => { state.modalOpen = action.payload },
    },
})

export const { openModal } = uiSlice.actions

export default uiSlice.reducer