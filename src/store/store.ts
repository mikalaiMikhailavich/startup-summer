import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import { apiSlice } from "./requests/api";
import { authRequests } from "./requests/auth";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware, authRequests.middleware),
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export type { RootState, AppDispatch };
