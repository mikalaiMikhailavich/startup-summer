import { combineReducers } from "@reduxjs/toolkit";
import { apiSlice } from "./requests/api";
import { authRequests } from "./requests/auth";
import filterReducer from "./reducers/filter";
import authReducer from "./reducers/auth";
export const rootReducer = combineReducers({
  filter: filterReducer,
  auth: authReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
  [authRequests.reducerPath]: authRequests.reducer,
});
