import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import { pixemaApi } from "./requests/vacansy";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pixemaApi.middleware),
});
