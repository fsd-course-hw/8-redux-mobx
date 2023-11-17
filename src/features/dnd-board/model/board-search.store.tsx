import { createBaseSelector, registerSlice } from "@/shared/lib/redux";
import { createSelector, createSlice } from "@reduxjs/toolkit";

const boardSearchSlice = createSlice({
  name: "dnd-board/search",
  initialState: {
    query: "",
  },
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    resetQuery: (state) => {
      state.query = "";
    },
  },
});

const boardSearchBaseSelector = createBaseSelector(boardSearchSlice);

const selectQuery = createSelector(boardSearchBaseSelector, (s) => s.query);
const compareQuery = createSelector(
  selectQuery,
  (_: unknown, title: string) => title,
  (query, title) => title.toLowerCase().includes(query.toLowerCase()),
);

registerSlice([boardSearchSlice]);

export const boardSearchStore = {
  actions: {
    setQuery: boardSearchSlice.actions.setQuery,
    resetQuery: boardSearchSlice.actions.resetQuery,
  },
  selectors: {
    selectQuery,
    compareQuery,
  },
};
