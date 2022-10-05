import { configureStore } from '@reduxjs/toolkit'

import userReducer from './user/userSlice'
import uiReducer from './ui/uiSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        ui: uiReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch