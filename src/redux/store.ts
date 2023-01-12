import {configureStore} from "@reduxjs/toolkit";
import itemReducer from "./itemSlice";

export const store = configureStore({
    reducer: {
        items: itemReducer,
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>