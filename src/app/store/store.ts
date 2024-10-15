"use client";

import { configureStore  } from "@reduxjs/toolkit";
import messageSlice from "./messageSlice";
import userSlice from "./userSlice";


export const store = configureStore({
    reducer: {
        messageStates : messageSlice.reducer,
        userStates : userSlice.reducer,
    },  
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;