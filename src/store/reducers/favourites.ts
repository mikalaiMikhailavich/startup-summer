import { createSlice } from "@reduxjs/toolkit";

interface initialFormValue {
  favourite: string[];
}

export const initialState: initialFormValue = {
  favourite: [],
};

const favoriteSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    setFavorite(state, action) {
      state.favourite = [state, action.payload];
    },
  },
});

export const { setFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
