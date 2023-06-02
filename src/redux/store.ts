import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counterSlice";
import searchReducer from "./features/spotifySlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

export const store = configureStore({
  reducer: {
    counterReducer,
    searchReducer
  },
  middleware:(getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
  devTools: process.env.NODE_ENV !== "production",
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;