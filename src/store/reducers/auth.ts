import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { access_token: null, refresh_token: null },
  reducers: {
    setTokens: (state, action) => {
      const { access_token, refresh_token } = action.payload;
      state.access_token = access_token;
      state.refresh_token = refresh_token;
    },
  },
});

export const { setTokens } = authSlice.actions;
export default authSlice.reducer;
