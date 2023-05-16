import { createSlice } from "@reduxjs/toolkit";

interface initialFormValue {
  industrySelect: null | string;
  salaryFrom: "" | number;
  salaryTo: "" | number;
}

export const initialState: initialFormValue = {
  industrySelect: null,
  salaryFrom: "",
  salaryTo: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter(state, action) {
      console.log(action);

      state.industrySelect = action.payload.industrySelect;
      state.salaryFrom = action.payload.salaryFrom;
      state.salaryTo = action.payload.salaryTo;
    },

    reset: (state) => initialState,
  },
});

export const { reset, setFilter } = filterSlice.actions;
export default filterSlice.reducer;
