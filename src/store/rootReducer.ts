import { combineReducers } from "@reduxjs/toolkit";
import { pixemaApi } from "./requests/vacansy";

export const rootReducer = combineReducers({
  [pixemaApi.reducerPath]: pixemaApi.reducer,
});
