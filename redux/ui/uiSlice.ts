import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type Modals = 'create-job' | 'disabled-account' | 'users-applied'

interface UIState {
    modalOpen: boolean
    typeModal: Modals
}

const initialState: UIState = {
    modalOpen: false,
    typeModal: 'create-job'
}

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        openModal: (state, action: PayloadAction<{ open: boolean, modal?: Modals }>) => {
            const { open, modal = 'create-job' } = action.payload
            state.modalOpen = open
            state.typeModal = modal
        },
    },
})

export const { openModal } = uiSlice.actions

export default uiSlice.reducer