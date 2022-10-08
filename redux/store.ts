import { configureStore } from '@reduxjs/toolkit'

import userReducer from './user/userSlice'
import uiReducer from './ui/uiSlice'
import jobReducer from './job/jobSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        ui: uiReducer,
        job: jobReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch